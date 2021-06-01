<script>
    import {pop} from "svelte-spa-router";
  import Button from "sveltestrap/src/Button.svelte";

  async function loadGraph() {
      const resDataStarWars = await fetch("https://swapi.dev/api/people/?page=1");
      
      let starwar1 = await resDataStarWars.json();
      let starwar2 = starwar1.results;
     
     
     
    
      let dataStarWars = starwar2.map((d) => {
          let res = {
              name: d.name,
              value: parseInt(d["height"])
          };
          return res;
      });
      let dataStarWars2 = starwar2.map((d) => {
          let res = {
              name: d.name,
              value: parseInt(d["mass"])
          };
          return res;
      });
      let dataTotal =
          [
              {
                  name: "Altura de algunos personajes de StarWars",
                  data: dataStarWars
              },
              {
                  name: "Peso de algunos personajes de StarWars",
                  data: dataStarWars2
              }
          ];
      Highcharts.chart('container', {
          chart: {
              type: 'packedbubble',
              height: '60%'
          },
          title: {
              text: 'Peso y altura de algunos personajes de StarWars'
          },
          tooltip: {
              useHTML: true,
              pointFormat: '<b>{point.name}:</b> {point.value}'
          },
          plotOptions: {
              packedbubble: {
                  minSize: '20%',
                  maxSize: '100%',
                  zMin: 0,
                  zMax: 1000,
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
      <p class="highcharts-description">
          Peso y altura personajes starWars.
      </p>
  </figure>
  <div style="text-align:center;padding-bottom: 3%;">
      <Button outline align = "center" color="secondary" on:click="{pop}">Volver</Button>
      </div>
</main>