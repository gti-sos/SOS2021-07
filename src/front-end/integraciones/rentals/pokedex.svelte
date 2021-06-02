<script>
  import { onMount } from "svelte";
import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";

  
    var Kanto = [];
    var Johto = [];
    var Hoenn = [];
    var Sinnoh = [];
    var errorMsg = "";
    var okMsg = "";
    var msg = "";
 
  
    async function loadApiKANTO() {
      
      const res = await fetch("https://pokeapi.co/api/v2/pokedex/2").then(
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
    
    async function loadApiJhoto() {
      
      const res = await fetch("https://pokeapi.co/api/v2/pokedex/3"
      ).then(function (res) {
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
      });
    }

    async function loadApiHoenn() {
      
      const res = await fetch("https://pokeapi.co/api/v2/pokedex/4"
      ).then(function (res) {
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
      });
    }

    async function loadApiSinnoh() {
      
      const res = await fetch("https://pokeapi.co/api/v2/pokedex/5"
      ).then(function (res) {
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
      });
    }
  
    //comienza el coger los datos
    async function getKanto() {
     
      await loadApiKANTO();
      const res = await fetch("https://pokeapi.co/api/v2/pokedex/2");
  
      if (res.ok) {
        console.log("OK");
        Kanto = await res.json();
  
        okMsg = "";
        
      } else {
        console.log("Error");
        errorMsg = "Error al cargar los datos de la API";
      }
    }
  
    async function getJhoto() {
     
     await loadApiJhoto();
     const res = await fetch("https://pokeapi.co/api/v2/pokedex/3");
 
     if (res.ok) {
       console.log("OK");
       Johto = await res.json();
 
       okMsg = "";
       
     } else {
       console.log("Error");
       errorMsg = "Error al cargar los datos de la API";
     }
   }

   async function getHoenn() {
     
     await loadApiHoenn();
     const res = await fetch("https://pokeapi.co/api/v2/pokedex/4");
 
     if (res.ok) {
       console.log("OK");
       Hoenn = await res.json();
 
       okMsg = "";
       
     } else {
       console.log("Error");
       errorMsg = "Error al cargar los datos de la API";
     }
   }

   async function getSinnoh() {
     
     await loadApiSinnoh();
     const res = await fetch("https://pokeapi.co/api/v2/pokedex/5");
 
     if (res.ok) {
       console.log("OK");
       Sinnoh = await res.json();
 
       okMsg = "";
       
     } else {
       console.log("Error");
       errorMsg = "Error al cargar los datos de  la API";
     }
   }
  
  
    async function loadGraph() {
      await getKanto();
      await getJhoto();
      await getHoenn();
      await getSinnoh();
  
      var xAxis = [];
      var yAxisK = [];
      var yAxisJ = [];
      var yAxisH = [];
      var yAxisS = [];
  
  
      var index = 0;
      var i = 0;
      
      var pokemonsK = Kanto.pokemon_entries.map(x=>x.entry_number)
      var numberK = pokemonsK.length
      var DexK = Kanto.name
      xAxis.push(DexK);
      yAxisK.push(numberK);
      console.log(numberK);
      console.log(DexK);
      console.log(xAxis);

      var pokemonsJ = Johto.pokemon_entries.map(x=>x.entry_number)
      var numberJ = pokemonsJ.length
      var DexJ = Johto.name
      xAxis.push(DexJ);
      yAxisJ.push(0 );
      yAxisJ.push(numberJ);
      console.log(numberJ);
      console.log(DexJ);
      console.log(xAxis);

      var pokemonsH = Hoenn.pokemon_entries.map(x=>x.entry_number)
      var numberH = pokemonsH.length
      var DexH = Hoenn.name
      xAxis.push(DexH);
      yAxisH.push(0);
      yAxisH.push(0);
      yAxisH.push(numberH);
      console.log(numberH);
      console.log(DexH);
      console.log(xAxis);


      
 
  
      
      var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: [DexK,DexJ,DexH],
        datasets: [
          {
            label: "Pokemons",
            data: [numberK,numberJ,numberH],
            backgroundColor: ["rgb(240, 162, 2)", "rgb(123, 158, 137)","rgb(73, 128, 37)"],
            
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Comparativa del numero de pokemon en la pokedex de cada region'
            }
        },
      },
    });
  }
  </script>
  
  <svelte:head>
  <script src="https://cdn.jsdelivr.net/npm/chart.js" on:load={loadGraph}></script>
</svelte:head>
  
  <main>
    <div>
      <h2>Integración API SOS poverty-risks</h2>
      <p>por favor espere unos segundos a que se cargue la gráfica</p>
    </div>
  
    {#if msg}
      <p>{msg}</p>
    {:else}
      <div>
        <canvas id="myChart" />
      </div>
    {/if}
    <Nav>
      <NavItem>
        <NavLink href="/"><Button color="primary">Página Inicial</Button></NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/#/integrations"><Button color="primary">Volver</Button></NavLink>
      </NavItem>
  </Nav>
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