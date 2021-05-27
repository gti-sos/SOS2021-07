<script>

  import { Nav, NavItem, NavLink } from "sveltestrap";

  //Uso API grupo 10
  const BASE_CONTACT_API_PATH = "/api/v1";

  var sanityStats = [];
  var natalityData = [];
  var errorMsg = "";
  var okMsg = "";
  var activeSpinner = true;

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
        getStats();

        errorMsg = "";
        okMsg = "Datos cargados correctamente";
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

  async function getSanityStats() {
    console.log("Fetching data...");
    await loadApi();
    const res = await fetch("/api/v2/province-budget-and-investment-in-social-promotion");

    if (res.ok) {
      const json = await res.json();
      sanityStats = json;

      console.log(`We have received ${sanityStats.length} sanity-stats.`);

      console.log("Ok");
    } else {
      errorMsg = "Error recuperando datos de sanity-stats";
      okMsg = "";
      console.log("ERROR!" + errorMsg);
    }
  }


  async function loadChart() {
    await getStats();
    await getSanityStats();

    var xAxis = [];
    var yAxis = [];
    var yAxis1 = [];

    //-------------------Sanity-stats
    console.log("Calculating sanity-stats...");
    var index = 0;
    sanityStats.forEach(element => {
      var e = element.province+"-"+element.year;
      if (!xAxis.includes(e)){
        xAxis.push(e);
        yAxis.push(Math.round(parseFloat(element.percentage)));
        index++;
        console.log("X: "+xAxis);
        console.log("Y: "+yAxis);
      }
    });
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log("Calculating natality-stats...");
    natalityData.forEach(element => {
      var e = element.province+"-"+element.date;
      if (!xAxis.includes(e)){
        if(element["rent_variation"]!=undefined){
          console.log("natalite-rite "+element["rent_variation"]);
          xAxis.push(e);
        yAxis.push(Math.round(element["rent_variation"]));
        console.log("X: "+xAxis);
        console.log("Y: "+yAxis);
        }
        
      }
    });

    var yAxis1 = [];
    for (let i = 0; i < index; i++) {
      yAxis1.push(0);    
    }
    var copy = yAxis.slice(index,yAxis.lengt);
  for (let i = 0; i < copy.length; i++) {
    yAxis1.push(copy[i]);
    
  }
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log("X: "+xAxis.length);
    console.log("Y: "+yAxis.length);
    console.log("X-Sanity: "+xAxis.slice(0,index));
    console.log("X-Natality: "+xAxis.slice(index,yAxis.length));
    console.log("Y-Sanity: "+yAxis.slice(0,index));
    console.log("Y-Natality: "+yAxis.slice(index,yAxis.length));
    console.log("index: "+index);



    var ctx = document.getElementById("myChart").getContext("2d");

    var myChart = new Chart(ctx, {
      
      data: {
        
        datasets: [
          {
            type: 'line',
            label: "Gasto en sanidad (%)",
            data: yAxis.slice(0,index),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)'
          
          },
          {
            type: 'bar',
            label: "Ratio de natalidad (%)",
            data: yAxis1,
            borderColor: 'rgb(54, 162, 235)'
          },
        ],
        labels: xAxis
      },
    });
  }
  activeSpinner=false;
</script>

<svelte:head>
  <script
    src="https://cdn.jsdelivr.net/npm/chart.js"
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
    <h2>Integración API SOS sanity-stats</h2>
  </div>

  {#if errorMsg}
    <p>{errorMsg}</p>
  {:else}
  {#if activeSpinner}
  <Spinner {primary} />
  {:else}
  <div>
    <canvas id="myChart" />
  </div>
  {/if}
   
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
</style>
