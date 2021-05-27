
<script>
  import Button from "sveltestrap/src/Button.svelte";
  async function loadGraph() {
      const resData_Rental = await fetch("/api/v1/rentals");
      const resDataEduacionGastos = await fetch("/api/v2/province-budget-and-investment-in-social-promotion/loadInitialData");
      

      let Data = await resData_Rental.json();
      let Data1 = await resDataSocial.json();
      

      let DataRental = Data.map((x) => {
          let res = {
              name: x.province + " - " + x.year,
              value: x["rent"]
          };
          return res;
      });
      let data_Social = Data1.map((x) => {
          let res = {
              name: x.province.toLowerCase() + " - " + x.year,
              value: x["invest_promotion"]
              
          };
          return res;
      });
      
      let dataTotal =
          [
              {
                  name: "Renta",
                  data: DataRental
              },
              {
                  name: "Inversion social",
                  data: data_Social
              }
          ];
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
              pointFormat: '<b>{point.name}:</b> {point.value}'
          },
          plotOptions: {
              packedbubble: {
                  minSize: '30%',
                  maxSize: '120%',
                  zMin: 0,
                  zMax: 500,
                  layoutAlgorithm: {
                      splitSeries: false,
                      gravitationalConstant: 0.02
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
          Gráfica muestra los datos de en conjunto del precio medio de la renta por provincias de españa y el y la inversion social en españa.
      </p>
  </figure>

</main>

 
