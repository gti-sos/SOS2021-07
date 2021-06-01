
<script>
    import Button from "sveltestrap/src/Button.svelte";
    
    async function loadApi() {
    
    const resDataEduacionGastos = await fetch("/api/v2/life-expectancy-stats/loadInitialData").then(
      function (res) {
        if (res.ok) {
          errorMsg = "";
          okMsg = "Datos cargados correctamente";
          console.log("OK");
        } else {
          if (res.status === 500) {
            errorMsg = "No se ha podido acceder a la base de datos";
          }
          okMsg = "";
          console.log("ERROR!" + errorMsg);
        }
      }
    );
    }

    async function loadStats() {
    
    const res = await fetch(
      BASE_CONTACT_API_PATH + "/rentals/loadInitialData"
    ).then(function (res) {
      if (res.ok) {
        getStats();
        errorMsg = "";
        okMsg = "Datos cargados correctamente";
        console.log("OK");
      } else {
        if (res.status === 500) {
          errorMsg = "No se ha podido acceder a la base de datos";
        }
        okMsg = "";
        console.log("ERROR!" + errorMsg);
      }
    });
  }
    
    async function loadGraph() {
        const resData_Rental = await fetch("/api/v1/rentals");
        const resDataEduacionGastos = await fetch("/api/v2/life-expectancy-stats/loadInitialData");
    

        let Data = await resData_Rental.json();
        let Data1 = await resDataEduacionGastos.json();
        

        Data.map((x) => {
            myData['data'].push({
            name:x.province  + " - " +x.year,
            value: x["rent_variation"]
            });
            
        });
        Data1.map((x) => {
           
            extData['data'].push({
            name:x.country  + " - " +x.year,
            value: x["averageLifeExpectancy"]
            });
            
        });

        var myData={
            name: 'Variacion de la renta (Total)',
            data: []
        };
        var extData={
            name: 'Esperanza de  vida Media(Total)',
            data: []
        };
        
        var dataTotal = [];
        dataTotal.push(myData);
        dataTotal.push(extData);
        Highcharts.chart('container', {
            chart: {
                type: 'packedbubble',
                height: '40%'
            },
            title: {
                text: 'Mezcla de APIs'
            },
            tooltip: {
                useHTML: true,
                pointFormat: '<b>{point.name}:</b> {point.value}m CO<sub>2</sub>'
            },
            plotOptions: {
                packedbubble: {
                    minSize: '30%',
                    maxSize: '120%',
                    zMin: 0,
                    zMax: 500,
                    layoutAlgorithm: {
                        gravitationalConstant: 0.05,
                        splitSeries: true,
                        seriesInteraction: false,
                        dragBetweenSeries: true,
                        parentNodeLimit: true
                    },
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}',
                        filter: {
                            property: 'y',
                            operator: '>',
                            value: 250
                        },
                        style: {
                            color: 'black',
                            textOutline: 'none',
                            fontWeight: 'normal'
                        }
                    }
                }
            },
            series: dataTotal
        });
    }
    loadGraph();
</script>

<svelte:head>

    <script src="https://code.highcharts.com/highcharts.js" on:load={loadGraph}></script>
    <script src="https://code.highcharts.com/highcharts-more.js" on:load={loadGraph}></script>
    <script src="https://code.highcharts.com/modules/exporting.js" on:load={loadGraph}></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load={loadGraph}></script>

</svelte:head>

<main>

    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description" align ="center">
            Gráfica muestra los datos de en conjunto del porcentaje de salio por provincias de españa y el gasto en educacion segun capital en paises del mundo
        </p>
    </figure>

</main>