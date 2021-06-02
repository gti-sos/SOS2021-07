
<script>
     import { onMount } from "svelte";
    import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
    var provincias = [];
    var rental =[];
    var esperanza = [];
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
        var myData={
            name: 'Variacion de la renta (Total)',
            data: []
        };
        var extData={
            name: 'Esperanza de  vida Media(Total)',
            data: []
        };
        
        var dataTotal = [];

        const resData_Rental = await fetch("/api/v1/rentals");
        const resDataEduacionGastos = await fetch("/api/v2/life-expectancy-stats/loadInitialData");
    

        let Data = await resData_Rental.json();
        let Data1 = await resDataEduacionGastos.json();
        

     
    

        Data1.forEach(d => { 
          console.log(d);
            let province_minus = d.province.toLowerCase(); 
            console.log(province_minus);
            Data.forEach((data) => {     
              let provinciaMia =data.province;
              console.log(data.province);
                if(data.provinciaMia==province_minus){
                  console.log(data.province);
                    provincias.push(province_minus);
                    esperanza.push(d["averageLifeExpectancy"]);
                    rental.push(data["rent_variation"]);
                }
            })
        });

        console.log(provincias);
        console.log(esperanza);
        console.log(rental );
        
       
        var trace1 = {
            type: 'scatter',
            x : provincias,
            y : esperanza,
            mode: 'markers',
            name: 'esperanza de vida media',
            marker: {
                color: 'rgba(156, 165, 196, 0.95)',
                line: {
                color: 'rgba(156, 165, 196, 1.0)',
                width: 1,
                },
                symbol: 'circle',
                size: 26
            }
        };
        var trace2 = {
            type: 'scatter',
            x: provincias,
            y: rental,
            mode: 'markers',
            name: 'Variación de la renta',
            marker: {
                color: 'rgba(204, 204, 204, 0.95)',
                line: {
                color: 'rgba(217, 217, 217, 1.0)',
                width: 1,
                },
                symbol: 'circle',
                size:26
            }
            };
        var data = [trace1, trace2];
        var layout = {
            title: 'Muestra la ezperanza de vida según comunidad autonoma y la variacion de la renta segun al comunidad',
            xaxis: {
                showgrid: false,
                showline: true,
                linecolor: 'rgb(102, 102, 102)',
                titlefont: {
                font: {
                    color: 'rgb(204, 204, 204)'
                }
                },
                tickfont: {
                font: {
                    color: 'rgb(102, 102, 102)'
                }
                },
                autotick: false,
                dtick: 10,
                ticks: 'outside',
                tickcolor: 'rgb(102, 102, 102)'
            },
            margin: {
                l: 140,
                r: 40,
                b: 50,
                t: 80
            },
            legend: {
                font: {
                size: 10,
                },
                yanchor: 'middle',
                xanchor: 'right'
            },
            width: 1200,
            height: 600,
            paper_bgcolor: 'rgb(254, 247, 234)',
            plot_bgcolor: 'rgb(254, 247, 234)',
            hovermode: 'closest'
            };
            Plotly.newPlot('myDiv', data, layout);  
    }
    loadGraph();
</script>

<svelte:head>

  <script src='https://cdn.plot.ly/plotly-latest.min.js' on:load={loadGraph}></script>

</svelte:head>

<main>
  <h2 style="text-align: center;"> <i class="fas fa-car"></i> Integracion grupo 30 </h2>
  
  <Nav>
    <NavItem>
      <NavLink href="/"><Button color="primary">Página Inicial</Button></NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="/#/rentals"><Button color="primary">Datos</Button></NavLink>
    </NavItem>
</Nav>

  <div id='myDiv'>
  

</main>