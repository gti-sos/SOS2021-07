<script>
  import { Button, Nav, NavItem, NavLink } from "sveltestrap";

  async function loadGraph() {

    let highchartsUnemploymentData = [];

    const DatosUnemployment = await fetch(
      "/api/v2/unemployment"
    );

    if (DatosUnemployment.ok) {
      const json = await DatosUnemployment.json();
      highchartsUnemploymentData = json;
    } else {
      console.log("ERROR!");
    }

    let aux = [];
    let valores = [];

    highchartsUnemploymentData.forEach((x) => {
      aux = {
        name:
          parseInt(x.year) + ", " + x.autonomous_community + ", " + x.province,
        data: [
          parseFloat(x.youth_unemployment_rate),
          parseFloat(x.unemployment_rate),
          parseFloat(x.occupation_variation),
        ],
      };
      valores.push(aux);
    });

    Highcharts.chart('container', {
      chart: {
        type: 'areaspline',
      },
      title: {
        text: 'highchartsUnemploymentData',
      },
      legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 0,
        y: 100,
        floating: false,
        borderWidth: 1,
        backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
      },
      xAxis: {
        categories: [
          "youth unemployment rate",
          "unemployment rate",
          "occupation variation",
        ],
        plotBands: [
          {
            from: 4.5,
            to: 6.5,
            color: "rgba(68, 170, 213, .2)",
          },
        ],
      },
      yAxis: {
        title: {
          text: "Unidades",
        }
      },
      tooltip: {
        shared: true,
        valueSuffix: "units",
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        areaspline: {
          fillOpacity: 0.5,
        },
      },
      series: valores,
    });
  }
</script>

<svelte:head>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/modules/export-data.js"></script>
  <script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>
  <figure class="highcharts-figure">
    <div id="container" />
    <p class="highcharts-description">Gráfico de desempleo Highcharts.</p>
  
  <Nav>
    <NavItem>
      <NavLink href="/"><Button color="primary">Página Inicial</Button></NavLink
      >
    </NavItem>
    <NavItem>
      <NavLink href="/#/unemployment"
        ><Button color="primary">Volver</Button></NavLink
      >
    </NavItem>
  </Nav>
</figure>
</main>

<style>
  #container {
    height: 400px;
  }

.highcharts-description {
  text-align: center;
}
  .highcharts-figure,
  .highcharts-data-table table {
    min-width: 310px;
    max-width: 800px;
    margin: 1em auto;
  }

  .highcharts-data-table table {
    font-family: Verdana, sans-serif;
    border-collapse: collapse;
    border: 1px solid #ebebeb;
    margin: 10px auto;
    text-align: center;
    width: 100%;
    max-width: 500px;
  }
  .highcharts-data-table caption {
    padding: 1em 0;
    font-size: 1.2em;
    color: #555;
  }
  .highcharts-data-table th {
    font-weight: 600;
    padding: 0.5em;
  }
  .highcharts-data-table td,
  .highcharts-data-table th,
  .highcharts-data-table caption {
    padding: 0.5em;
  }
  .highcharts-data-table thead tr,
  .highcharts-data-table tr:nth-child(even) {
    background: #f8f8f8;
  }
  .highcharts-data-table tr:hover {
    background: #f1f7ff;
  }
</style>
