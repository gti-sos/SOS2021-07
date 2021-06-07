<script>
  import { Nav, NavItem, NavLink } from "sveltestrap";
  
  var employmentData = [];
  var natalityData = [];
  var msg = "";
  /**
   * Carga los datos de la API SOS
   */
  async function loadApi() {
    console.log("Loading data...");
    const res = await fetch(
      "https://sos2021-24.herokuapp.com/api/v2/children-employment/loadinitialdata"
    ).then(function (res) {
      if (res.ok) {
        msg = "";
        console.log("OK");
      } else {
        if (res.status === 500) {
          msg = "No se ha podido acceder a la base de datos";
        }
        console.log("ERROR!" + msg);
      }
    });
  }
  /**
   * Carga los datos de nuestra API
   */
  async function loadStats() {
    console.log("Loading data...");
    const res = await fetch("https://sos2021-07.herokuapp.com/api/v2/buy_sell/loadInitialData"
    ).then(function (res) {
      if (res.ok) {
        msg = "";
        console.log("OK");
      } else {
        if (res.status === 500) {
          msg = "No se ha podido acceder a la base de datos";
        }
        console.log("ERROR!" + msg);
      }
    });
  }
  /**
   * Obtiene los datos de nuestra API
   */
  async function getStats() {
    console.log("Fetching data...");
    await loadStats();
    const res = await fetch("https://sos2021-07.herokuapp.com/api/v2/buy_sell");
    if (res.ok) {
      console.log("OK");
      natalityData = await res.json();
      msg = "";
      console.log(`We have received ${natalityData.length} natality-stats.`);
    } else {
      console.log("Error");
      msg = "Error al cargar los datos de la API";
    }
  }
  /**
   * Obtiene los datos de la API SOS
   */
  async function getEmplymentData() {
    console.log("Fetching data...");
    await loadApi();
    const res = await fetch(
      "https://sos2021-24.herokuapp.com/api/v2/children-employment"
    );
    if (res.ok) {
      const json = await res.json();
      employmentData = json;
      console.log(`We have received ${employmentData.length} chidlren-stats.`);
      console.log("Ok");
    } else {
      msg = "Error recuperando datos de platform-stats";
      console.log("ERROR!" + msg);
    }
  }
  /**
   * Parsea un JSON a Map
   * @param j json
   * @param k propiedad 1 como clave
   * @param v propiedad 2 como valor
   */
  function jsonToMap(j, k, v) {
    var res = new Map();
    j.forEach((element) => {
      var key = element[k];
      var value = element[v];
      console.log("key: " + key);
      console.log("value: " + value);
      if (res.has(key)) {
        var newValue = res.get(key) + value;
        res.set(key, newValue);
      } else {
        res.set(key, value);
      }
    });
    return res;
  }
  /**
   * Carga los datos en la grafica
   */
  async function loadChart() {
    await getStats();
    await getEmplymentData();
    var labels = [];
    var data = [];
    var result = jsonToMap(
      employmentData,
      "year",
      "percent_children_employment_t"
    );
    var result1 = jsonToMap(natalityData, "year", "annual_variation_percentage");
    console.log("Calculating children-hiv...");
    labels.push("Niños empleados");
    var total = 0;
    for (let [key, value] of result) {
      total += value;
    }
    data.push(total);
    console.log("Calculating natality-stats...");
    var total1 = 0;
    labels.push("indice fecundacion");
    for (let [key, value] of result1) {
      total1 += value;
    }
    data.push(total1);
    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "polarArea",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Niños empleados y ratio de fecundación",
            data: data,
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(75, 192, 192)",
              "rgb(255, 205, 86)",
              "rgb(201, 203, 207)",
              "rgb(54, 162, 235)",
              "rgb(240, 162, 2)",
              "rgb(123, 158, 137)",
              "rgb(171, 35, 70)",
            ],
          },
        ],
      },
      options: {
        plugins: {
            title: {
                display: true,
                text: 'Comparativa del total de niños empleados y el total de índice de fecundación'
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          line: {
            borderWidth: 3,
          },
        },
      },
    });
  }
</script>

<svelte:head>
  <script
    src="https://cdn.jsdelivr.net/npm/chart.js"
    on:load={loadChart}></script>
</svelte:head>

<main>
  

  <div>
    <h2>Integración API SOS children-employment</h2>
    <p>por favor espere unos segundos a que se cargue la gráfica</p>
  </div>
  
  <Nav>
        <NavItem>
          <NavLink href="/"><Button color="primary">Pรกgina Inicial</Button></NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/#/integrations"><Button color="primary">Volver</Button></NavLink>
        </NavItem>
    </Nav>

  
    <div>
      <canvas id="myChart" />
    </div>
 
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
  #myChart{
    width: 400px;
    height: 500px;
  }
</style>