<script>
import { onMount } from "svelte";
import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
  const BASE_CONTACT_API_PATH = "/api/v1";

  var Social = [];
  var Rental = [];
  var errorMsg = "";
  var okMsg = "";
  var activeSpinner = true;

  async function loadApi() {
    
    const res = await fetch("/api/v2/province-budget-and-investment-in-social-promotion/loadInitialData").then(
      function (res) {
        if (res.ok) {
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
      }
    );
  }
  
  async function loadStats() {
    
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
   
    await loadStats();
    const res = await fetch(BASE_CONTACT_API_PATH + "/rentals");

    if (res.ok) {
      console.log("OK");
      Rental = await res.json();

      okMsg = "";
      
    } else {
      console.log("Error");
      errorMsg = "Error al cargar los datos de la API";
    }
  }

  async function getSocial() {
    
    await loadApi();
    const res = await fetch("/api/v2/province-budget-and-investment-in-social-promotion");

    if (res.ok) {
      const json = await res.json();
      Social = json;
      console.log("Ok");
    } else {
      errorMsg = "Error recuperando datos de Social";
      okMsg = "";
      console.log("ERROR!" + errorMsg);
    }
  }


  async function loadChart() {
    await getStats();
    await getSocial();

    var xAxis = [];
    var yAxis = [];
    var yAxis1 = [];


    var index = 0;
    Social.forEach(x => {
      var i = x.province+"-"+x.year;
      if (!xAxis.includes(i)){
        xAxis.push(i);
        yAxis.push(Math.round(parseFloat(x.percentage)));
        index++;

      }
    });

    Rental.forEach(x => {
      var i = x.province+"-"+x.year;
      if (!xAxis.includes(i)){
        if(x["rent_variation"]!=undefined){
          xAxis.push(i);
        yAxis.push(Math.round(x["rent_variation"]));
        }
        
      }
    });

    var yAxis1 = [];
    for (let i = 0; i < index; i++) {
      yAxis1.push(0);    
    }
    var c = yAxis.slice(index,yAxis.lengt);
  for (let i = 0; i < c.length; i++) {
    yAxis1.push(c[i]);
    
  }

    var ctx = document.getElementById("myChart").getContext("2d");

    var myChart = new Chart(ctx, {
      
      data: {
        
        datasets: [
          {
            type: 'bar',
            label: "Porcentaje inversion social",
            data: yAxis.slice(0,index),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)'
          
          },
          {
            type: 'bar',
            label: "Variacion de la renta",
            data: yAxis1,
            borderColor: 'rgb(204, 15, 241)',
            backgroundColor: 'rgba(204, 15, 241, 0.2)'
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
      <NavLink href="/"><Button color="primary">Página Inicial</Button></NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="/#/integrations"><Button color="primary">Volver</Button></NavLink>
    </NavItem>
</Nav>

  <div>
    <h2>Integración Budget G27</h2>
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
