<script>
  import { onMount } from "svelte";
  import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
  const BASE_CONTACT_API_PATH = "/api/v2";
let buy_sell_Data = [];
let buy_sell_Chart_Data = [];
//let buy_sell_Chart_autonomous_community_Data = [];
//let buy_sell_Chart_province_Data = [];
//let buy_sell_Chart_year_Data = [];
let buy_sell_Chart_comunityprovinceyear_Data = [];
let buy_sell_Chart_surface_Data = [];
let buy_sell_Chart_annual_variation_percentage_Data = [];
let buy_sell_Chart_eviction_Data = [];
  let errorMsg = "";
  let okMsg = "";
  
  function distinctRecords(MYJSON, prop) {
    return MYJSON.filter((obj, pos, arr) => {
      return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }
  
  async function loadChart() {
    console.log("Fetching data...");
    const res = await fetch(BASE_CONTACT_API_PATH + "/buy_sell");
    buy_sell_Data = await res.json();
    if (res.ok) {
	console.log(res.json());
	console.log(buy_sell_Data);
      buy_sell_Data.forEach(stat => {
      //buy_sell_Chart_autonomous_community_Data.push(stat.autonomous_community);
      //buy_sell_Chart_province_Data.push(stat.province);
      //buy_sell_Chart_year_Data.push(stat.year);
	  buy_sell_Chart_comunityprovinceyear_Data.push(stat.autonomous_community+"-"+stat.province+"-"+stat.year);
      buy_sell_Chart_surface_Data.push(stat["surface"]);
      buy_sell_Chart_annual_variation_percentage_Data.push(stat["annual_variation_percentage"]);
      buy_sell_Chart_eviction_Data.push(stat["eviction"]);   
      });
    }
    
    console.log("BUY SELL Chart DaTa: " + buy_sell_Chart_Data);
    Highcharts.chart("container", {
      title: {
        text: "buy sell stats",
      },
      yAxis: {
        title: {
          text: "Valor",
        },
      },
      xAxis: {
        title: {
          text: "Comunidad-Provincia-Año",
        },
        categories: buy_sell_Chart_comunityprovinceyear_Data,
      },
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
      },
      annotations: [
        {
          labels: [
            {
              point: "date",
              text: "",
            },
            {
              point: "min",
              text: "Min",
              backgroundColor: "white",
            },
          ],
        },
      ],
      series: [
        {
          name: "Superficie",
          data: buy_sell_Chart_surface_Data,
        },
        {
          name: "Porcentaje de variación anual (%)",
          data: buy_sell_Chart_annual_variation_percentage_Data,
        },
        {
          name: "Desalojo",
          data: buy_sell_Chart_eviction_Data,
        }
        
      ],
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom",
              },
            },
          },
        ],
      },
    });
  }
</script>
<svelte:head>
  <script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://code.highcharts.com/modules/series-label.js"></script>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/modules/export-data.js"></script>
  <script
    src="https://code.highcharts.com/modules/accessibility.js"
    on:load={loadChart}></script>
</svelte:head>
<main>
  <Nav>
    <NavItem>
      <NavLink href="/">Pรกgina Principal</NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="#/buy_sell">Datos</NavLink>
    </NavItem>
	<NavItem>
      <NavLink href="#/buy_sell/buy_sell_Charts">Gráfica LINEAL (highchart)</NavLink>
    </NavItem>
	<NavItem>
      <NavLink href="#/buy_sell/graficaNL">Gráfica AREA (highchart)</NavLink>
    </NavItem>
	<NavItem>
      <NavLink href="#/buy_sell/graficaZING">Gráfica NUBE (zingchart)</NavLink>
    </NavItem>
  </Nav>

  <div>
    <h2>
      Analíticas
    </h2>
  </div>

  <div>
    {#if errorMsg}
      <p class="msgRed" style="color: #9d1c24">ERROR: {errorMsg}</p>
    {/if}
    {#if okMsg}
      <p class="msgGreen" style="color: #155724">{okMsg}</p>
    {/if}
  </div>

  <div>
    <figure class="highcharts-figure">
      <div id="container" />
      <p class="highcharts-description">
        Gráfico de líneas básico que muestra los diferentes valores para los campos de compra venta.
      </p>
    </figure>
  </div>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
  div{
    margin-bottom: 15px;
  }
  p {
    display: inline;
  }
  .msgRed {
    padding: 8px;
    background-color: #f8d7da;
  }
  .msgGreen {
    padding: 8px;
    background-color: #d4edda;
  }
  .highcharts-figure,
  .highcharts-data-table table {
    min-width: 360px;
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