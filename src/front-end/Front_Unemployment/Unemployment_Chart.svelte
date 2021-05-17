<script>
  import { onMount } from "svelte";
  import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
  const BASE_CONTACT_API_PATH = "/api/v1";
let Uneployment_Data = [];
let Uneployment_Chart_Data = [];
let Uneployment_Chart_ProvinceYear_Data = [];
let Uneployment_Chart_Youth_Unemployment_Rate_Data = [];
let Uneployment_Chart_Unemployment_Rate_Data = [];
let Uneployment_Chart_Occupation_Variation_Data = [];
  let errorMsg = "";
  let okMsg = "";
  
  function distinctRecords(MYJSON, prop) {
    return MYJSON.filter((obj, pos, arr) => {
      return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }
  
  async function loadChart() {
    console.log("Fetching data...");
    const res = await fetch(BASE_CONTACT_API_PATH + "/unemployment");
    Uneployment_Data = await res.json();
    if (res.ok) {
      Uneployment_Data.forEach(stat => {
      
	  Uneployment_Chart_ProvinceYear_Data.push(stat.autonomous_community+"-"+stat.province+"-"+stat.year);
      Uneployment_Chart_Youth_Unemployment_Rate_Data.push(stat["youth_unemployment_rate"]);
      Uneployment_Chart_Unemployment_Rate_Data.push(stat["unemployment_rate"]);
      Uneployment_Chart_Occupation_Variation_Data.push(stat["occupation_variation"]);
      });
    }
    
    console.log("Unemployment Chart DaTa: " + Uneployment_Chart_Data);
    Highcharts.chart("container", {
      title: {
        text: "Datos Desempleo",
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
        categories: Uneployment_Chart_ProvinceYear_Data,
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
          name: "Tasa de desempleo juvenil",
          data: Uneployment_Chart_Youth_Unemployment_Rate_Data,
        },
        {
          name: "Tasa de desempleo",
          data: Uneployment_Chart_Unemployment_Rate_Data,
        },
        {
          name: "Variación de la ocupación",
          data: Uneployment_Chart_Occupation_Variation_Data,
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
      <NavLink href="/"><Button color="primary">Página Inicial</Button></NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="/#/unemployment/unemployment_graphic"><Button color="primary">Datos</Button></NavLink>
    </NavItem>
  </Nav>

  <div>
    <h2>
      Análiticas
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
        Gráfico de líneas básico que muestra los diferentes valores para los campos de Desempleo.
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