<script>
  import { onMount } from "svelte";
  import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
  async function loadGraph() {
      const rentalsData = await fetch("/api/v1/rentals");
      const buy_sellData = await fetch("/api/v2/buy_sell");
      const unemploymentData = await fetch("/api/v2/unemployment");
      let Data = await rentalsData.json();
      let Data1 = await buy_sellData.json();
      let Data2 = await unemploymentData.json();
      let data_rentals = Data.map((x) => {
          let res = {
              name: x.autonomous_community+", "+ x.province + " - " + x.year,
              value: x["rent_variation"]
          };
          return res;
      });
      let data_buy_sell = Data1.map((x) => {
          let res = {
              name: x.autonomous_community+", "+ x.province + " - " + x.year,
              value: x["annual_variation_percentage"]
          };
          return res;
      });
      let data_unemployment = Data2.map((x) => {
          let res = {
              name: x.autonomous_community+", "+ x.province + " - " + x.year,
              value: x["occupation_variation"]
          };
          return res;
      });
      let dataTotal =
          [
              {
                  name: "Ratio alquileres",
                  data: data_rentals
              },
              {
                  name: "Ratio de Compraventa",
                  data: data_buy_sell
              },
              {
                  name: "Ratio de ocupación",
                  data: data_unemployment
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
          Gráfica que muestra los datos de las 3 APIs. La variacion de las diversas APIs
      </p>
      <Nav>
        <NavItem>
          <NavLink href="/"><Button color="primary">Volver</Button></NavLink>
        </NavItem>
    </Nav>
  </figure>

</main>