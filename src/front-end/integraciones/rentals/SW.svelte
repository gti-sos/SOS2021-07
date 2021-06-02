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
              y: parseInt(d["height"])
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
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false
    },
    title: {
        text: 'Browser<br>shares<br>2017',
        align: 'center',
        verticalAlign: 'middle',
        y: 60
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            dataLabels: {
                enabled: true,
                distance: -50,
                style: {
                    fontWeight: 'bold',
                    color: 'white'
                }
            },
            startAngle: -90,
            endAngle: 90,
            center: ['50%', '75%'],
            size: '110%'
        }
    },
    series: [{
        type: 'pie',
        name: 'Browser share',
        innerSize: '50%',
        data: dataStarWars
    }]
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