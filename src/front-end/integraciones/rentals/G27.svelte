<script>
  import { onMount } from "svelte";

  import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";

  const BASE_CONTACT_API_PATH = "/api/v1";

  let natalityData = [];
  var illiteracyData = [];

  var errorMsg = "";
  var okMsg = "";

  function jsonToMap(j, k, v) {
    var res = new Map();
    j.forEach((element) => {
      var key = element[k];
      var value = element[v];
      if (res.has(key)) {
        var newValue = res.get(key) + value;
        res.set(key, newValue);
      } else {
        res.set(key, value);
      }
    });
    return res;
  }

  async function loadApi() {
    console.log("Loading data...");
    const res = await fetch("/api/v2/province-budget-and-investment-in-social-promotion/loadInitialData").then(
      function (res) {
        if (res.ok) {
          errorMsg = "";
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
    console.log("Loading data...");
    const res = await fetch(
      BASE_CONTACT_API_PATH + "/rentals/loadInitialData"
    ).then(function (res) {
      if (res.ok) {
        errorMsg = "";
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

  async function getStats() {
    console.log("Fetching data...");
    await loadStats();
    const res = await fetch(BASE_CONTACT_API_PATH + "/rentals");

    if (res.ok) {
      console.log("OK");
      natalityData = await res.json();

      okMsg = "";
      console.log(`We have received ${natalityData.length} natality-stats.`);
    } else {
      console.log("Error");
      errorMsg = "Error al cargar los datos de la API";
    }
  }

  async function getIlliteracyData() {
    console.log("Fetching data...");
    await loadApi();
    const res = await fetch("/api/v2/province-budget-and-investment-in-social-promotion");

    if (res.ok) {
      const json = await res.json();
      illiteracyData = json;

      console.log(
        `We have received ${illiteracyData.length} illiteracy-stats.`
      );

      console.log("Ok");
    } else {
      errorMsg = "Error recuperando datos de poverty-risks";
      okMsg = "";
      console.log("ERROR!" + errorMsg);
    }
  }
  function commonValues(dataset1, dataset2) {
    var data1 = dataset1.map(function (v) {
      return v.toLowerCase();
    });
    var data2 = dataset2.map(function (v) {
      return v.toLowerCase();
    });
    return data1.filter((value) => data2.includes(value));
  }

  function capitalLetters(dataset) {
    for (let index = 0; index < dataset.length; index++) {
      var str = dataset[index];
      var space = str.indexOf(" ");
      if (str.indexOf(" ") !== -1) {
        dataset[index] =
          str.charAt(0).toUpperCase() +
          str.substr(1, space) +
          str.charAt(space + 1).toUpperCase() +
          str.substr(space + 2, str.length);
      } else {
        dataset[index] = str.charAt(0).toUpperCase() + str.substr(1);
      }
    }
  }

  async function loadChart() {
    await getStats();
    await getIlliteracyData();

    var result = jsonToMap(illiteracyData, "province", "invest_promotion");
    var result1 = jsonToMap(natalityData, "province", "rent");

    var commonCountries = commonValues(
      Array.from(result.keys()),
      Array.from(result1.keys())
    );

    var template = {
      name: "",
      data: [],
    };

    var data = [];

    var countriesWithCapitalLetter = commonValues(
      Array.from(result.keys()),
      Array.from(result1.keys())
    );
    capitalLetters(countriesWithCapitalLetter);

    console.log("capitalletter country " + countriesWithCapitalLetter);
    console.log("common countries: " + commonCountries);

   
    var arrayAux = [];
    for (let j = 0; j < countriesWithCapitalLetter.length; j++) {
      var c = countriesWithCapitalLetter[j];
      arrayAux.push(result.get(c));
      console.log("templatedata " + arrayAux);
    }
    data.push({
name: " Inversion social",
data: arrayAux
    });
    arrayAux = [];
    for (let j = 0; j < commonCountries.length; j++) {
      var c = commonCountries[j];
      arrayAux.push(result1.get(c));
    }
    data.push({
name:"Renta",
data: arrayAux
    });

    console.log(data);
    Highcharts.chart("container", {
      chart: {
        type: "bar",
      },
      title: {
        text: "Renta e inversion social",
      },
      xAxis: {
        categories: commonCountries,
        title: {
          text: null,
        },
      },
     
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
          },
        },
      },
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "top",
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || "#FFFFFF",
        shadow: true,
      },
      credits: {
        enabled: false,
      },
      series: data,
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
      <NavLink href="/">Página Principal</NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="/#/integrations/">volver</NavLink>
    </NavItem>
  </Nav>

  <div>
    <h2>Integración API SOS G27 Budget</h2>
  </div>

  {#if errorMsg}
    <p>{errorMsg}</p>
  {:else}
    <figure class="highcharts-figure">
      <div id="container" />
    </figure>
  {/if}
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
  div {
    margin-bottom: 15px;
  }
  .highcharts-figure,
  .highcharts-data-table table {
    min-width: 310px;
    max-width: 800px;
    margin: 1em auto;
  }

  #container {
    height: 400px;
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
