<script>
    import { Button, Nav, NavItem, NavLink } from "sveltestrap";
  
    const BASE_CONTACT_API_PATH_v1 = "/api/v1";
    const BASE_CONTACT_API_PATH_v2 = "/api/v2";
  
    let Rentals_Data = [];
    let Rentals_Chart_Data = [];
    let Buy_Sell_Data = [];
    let Buy_sell_Chart = [];
    let Unemployment_Data=[];
    let Unemployment_Chart = [];
  
    var dates = [];
    let msg = "";
  
    function distinctRecords(MYJSON, prop) {
      return MYJSON.filter((obj, pos, arr) => {
        return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === pos;
      });
    }
  
    async function loadChart() {
      console.log("Fetching data...");
  
      const res = await fetch(BASE_CONTACT_API_PATH_v1 + "/rentals");
      const res1 = await fetch(BASE_CONTACT_API_PATH_v2 + "/buy_sell");
      const res2 = await fetch(BASE_CONTACT_API_PATH_v1 + "/unemployment");
  
      if (res.ok && res1.ok && res2.ok) {
        console.log("procesing Buy Sell data....");
        if (res1.ok) {
          Buy_Sell_Data = await res1.json();
          console.log("RES OK");
          //Quitamos fechas repetidas y las ordenamos
          var distinctDates1 = distinctRecords(Buy_Sell_Data, "date");
          distinctDates1.sort(function (a, b) {
            return a.date - b.date;
          });
          distinctDates1.forEach((element) => {
            dates.push(element.date);
            console.log("dates: " + element.date);
          });
          console.log("Distinct dates: " + dates);
  
          //Sumamos los valores para las fechas iguales
         
          dates.forEach((e) => {
            var yAxis = Buy_Sell_Data
              .filter((d) => d.date === e)
              .map((dr) => dr["annual_variation_percentage"])
              .reduce((acc, dr) => dr + acc);
            console.log("YAxis: " + yAxis);
            Buy_sell_Chart.push(Math.round(yAxis));
          });
          msg = "";
        }
        console.log("procesing Rentals data....");
        if (res.ok) {
          Rentals_Data = await res.json();
          console.log("RES OK");
          //Quitamos fechas repetidas y las ordenamos
          var distinctDates = distinctRecords(Rentals_Data, "date");
          distinctDates.sort(function (a, b) {
            return a.date - b.date;
          });
          distinctDates.forEach((element) => {
            if (!dates.includes(element.date)) {
              dates.push(element.date);
              console.log("dates: " + element.date);
            }
          });
          console.log("Distinct dates: " + dates);
  
          //Sumamos los valores para las fechas iguales
          
          
          
          dates.forEach((e) => {
            var yAxis = Rentals_Data
              .filter((d) => d.date === e)
              .map((nr) => nr["rent_variation"])
              .reduce((acc, nr) => nr + acc,0);
            console.log("YAxis: " + yAxis);
            Rentals_Chart_Data.push(Math.round(yAxis));
            
          });
          msg = "";
        }
  
        if(res2.ok){
          Unemployment_Data = await res2.json();
          console.log("RES2 OK");
          //Quitamos fechas repetidas y las ordenamos
          var distinctDates = distinctRecords(Unemployment_Data, "date");
          distinctDates.sort(function (a, b) {
            return a.date - b.date;
          });
          distinctDates.forEach((element) => {
            if (!dates.includes(element.date)) {
              dates.push(element.date);
              console.log("dates: " + element.date);
            }
          });
          console.log("Distinct dates: " + dates);
  
          //Sumamos los valores para las fechas iguales         
          dates.forEach((e) => {
            var yAxis = Unemployment_Data
              .filter((d) => d.date === e)
              .map((qli) => qli["unemployment_rate"])
              .reduce((acc, qli) => qli + acc,0);
            console.log("YAxis: " + yAxis);
            Unemployment_Chart.push(Math.round(yAxis));
            
          });
          msg = "";
        }
      } else {
        console.log("ERROR MSG");
        msg = "Por favor primero cargue los datos en todas las APIs";
      }
  
      console.log("Buy Sell Chart DaTa: " + Buy_sell_Chart);
      console.log("Rentals Chart DaTa: " + Rentals_Chart_Data);
      console.log("Unemployment Chart Data: " + Unemployment_Chart);
  
      Highcharts.chart("container", {
        title: {
          text: "Rentals / Buy Sell / Unemployment",
        },
        yAxis: {
          title: {
            text: "Ratio",
          },
        },
        xAxis: {
          title: {
            text: "Años",
          },
          categories: dates,
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
            name: "Variación Alquileres (%)",
            data: Rentals_Chart_Data,
          },
          {
            name: "Variación Compraventa (%)",
            data: Buy_sell_Chart,
          },
          {
            name: "Tasa Desempleo",
            data: Unemployment_Chart,
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
        <NavLink href="/">Volver</NavLink>
      </NavItem>
    </Nav>
  
    <div>
      <h2>Análiticas</h2>
    </div>
  
    {#if msg}
      <p>{msg}</p>
    {:else}
      <figure class="highcharts-figure">
        <div id="container" />
        <p class="highcharts-description">
            Gráfico que muestra la relación del desempleo y como afecta al alquiler y compraventa de casa/pisos.
        </p>
      </figure>
    {/if}
  </main>
  
  <style>
    main {
      text-align: center;
      padding: 1em;
      margin: 0 auto;
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
  