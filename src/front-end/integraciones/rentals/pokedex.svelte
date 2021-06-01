<script>
    import { onMount } from "svelte";
    import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";

    
      var Kanto = [];
      var Johto = [];
      var Hoenn = [];
      var Sinnoh = [];
      var errorMsg = "";
      var okMsg = "";
      var activeSpinner = true;
    
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
         errorMsg = "Error al cargar los datos de la API";
       }
     }
    
    
      async function loadChart() {
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
        yAxisJ.push(numberJ);
        console.log(numberJ);
        console.log(DexJ);
        console.log(xAxis);

        var pokemonsH = Hoenn.pokemon_entries.map(x=>x.entry_number)
        var numberH = pokemonsH.length
        var DexH = Hoenn.name
        xAxis.push(DexH);
        yAxisH.push(numberH);
        console.log(numberH);
        console.log(DexH);
        console.log(xAxis);


        
   
    
        
        var ctx = document.getElementById("myChart").getContext("2d");
        var myChart = new Chart(ctx, {
          
          data: {
            
            datasets: [
              {
                type: 'bar',
                label: "Pokedex Kanto",
                data: yAxisK,
                borderColor: 'rgb(204, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132)'
              
              },
              {
                type: 'bar',
                label: "Pokedex Jhoto",
                data: yAxisJ,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(155, 99, 132)'
              
              },
              {
                type: 'bar',
                label: "Pokedex Hoenn",
                data: yAxisH,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(215, 99, 132)'
              
              }
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
        <h2>Cantidad de pokemon de cada region</h2>
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
    