<script>
    import { onMount } from "svelte";
import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";

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
      console.log(dataStarWars);
     
      
          Highcharts.chart('container', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false
    },
    title: {
        text: 'Altura<br>Personajes<br>StarWars',
        align: 'center',
        verticalAlign: 'middle',
        y: 60
    },
    tooltip: {
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} cm</b></td></tr>',
    },
    accessibility: {
        point: {
            valueSuffix: 'cm'
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
        name: 'Altura',
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
          Peso personajes starWars.
      </p>
  </figure>
  <Nav>
    <NavItem>
      <NavLink href="/"><Button color="primary">Página Inicial</Button></NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="/#/integrations"><Button color="primary">Volver</Button></NavLink>
    </NavItem>
</Nav>
</main>