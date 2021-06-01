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


      
 
  
      
      Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Monthly Average Rainfall'
    },
    subtitle: {
        text: 'Source: WorldClimate.com'
    },
    xAxis: {
        categories: [
            'Kanto',
            'Jhoto',
            'Hoen'
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Rainfall (mm)'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'Numero de  pokemons',
        data: [numberK, numberJ, numberH]

    }]
});
    }
    activeSpinner=false;
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
        <p class="highcharts-description">
            pokedex.
        </p>
    </figure>
    <div style="text-align:center;padding-bottom: 3%;">
        <Button outline align = "center" color="secondary" on:click="{pop}">Volver</Button>
        </div>
  </main>