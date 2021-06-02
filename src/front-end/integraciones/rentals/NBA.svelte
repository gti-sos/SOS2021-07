

<script>
   import { onMount } from "svelte";
    import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
    var jugador1=[];
    var jugador2=[];
    var jugador3=[];
    var jugador4=[];
    

  async function loadGraph() {
     
      const resjugador1 = await fetch("https://free-nba.p.rapidapi.com/players/1", {
          "method": "GET",
          "headers": {
              "x-rapidapi-key": "9b2b2f4d65msh643a2276d42fb51p1e4972jsn8ab58ddd82c9",
              "x-rapidapi-host": "free-nba.p.rapidapi.com",
              
          }
      });
      
      jugador1 = await resjugador1.json();

      const resjugador2 = await fetch("https://free-nba.p.rapidapi.com/players/2", {
          "method": "GET",
          "headers": {
              "x-rapidapi-key": "9b2b2f4d65msh643a2276d42fb51p1e4972jsn8ab58ddd82c9",
              "x-rapidapi-host": "free-nba.p.rapidapi.com",
              
          }
      });
      
      jugador2 = await resjugador2.json();

      const resjugador3 = await fetch("https://free-nba.p.rapidapi.com/players/3", {
          "method": "GET",
          "headers": {
              "x-rapidapi-key": "9b2b2f4d65msh643a2276d42fb51p1e4972jsn8ab58ddd82c9",
              "x-rapidapi-host": "free-nba.p.rapidapi.com",
              
          }
      });
      
      jugador3 = await resjugador3.json();

      const resjugador4 = await fetch("https://free-nba.p.rapidapi.com/players/4", {
          "method": "GET",
          "headers": {
              "x-rapidapi-key": "9b2b2f4d65msh643a2276d42fb51p1e4972jsn8ab58ddd82c9",
              "x-rapidapi-host": "free-nba.p.rapidapi.com",
              
          }
      });
      
      jugador4 = await resjugador4.json();

      console.log(jugador1);
      console.log(jugador2);
      console.log(jugador3);
      console.log(jugador4);

      var name =[];
      var altura = [];

      
       
        name.push(jugador1.first_name+" "+ jugador1.last_name);
        altura.push(jugador1.height_inches)
        
       name.push(jugador2.first_name+" "+ jugador2.last_name);
       altura.push(jugador2.height_inches)
       
       name.push(jugador3.first_name+" "+ jugador3.last_name);
       altura.push(jugador3.height_inches)

       
       name.push(jugador4.first_name+" "+ jugador4.last_name);
       altura.push(jugador4.height_inches)

   
   console.log(name);
   console.log(altura);

      
   var trace1 = {
            x: name,
            y: altura,
            fill: 'tozeroy',
            type: 'scatter',
            name : "Jugador NBA"
        };
        
        
        var layout = {
            title: 'Basic Overlaid Area Chart'
        };
        var data = [trace1];
        Plotly.newPlot('myDiv', data, layout);
    }
  loadGraph();
</script>

<svelte:head>

    <script src='https://cdn.plot.ly/plotly-1.58.4.min.js' on:load={loadChart}></script>

</svelte:head>

<main>

    <h2 style="text-align: center;"> <i class="fas fa-car"></i> Jugadores NBA</h2>
  
    <Nav>
      <NavItem>
        <NavLink href="/"><Button color="primary">Página Inicial</Button></NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/#/rentals"><Button color="primary">Datos</Button></NavLink>
      </NavItem>
  </Nav>
  
    <div id='myDiv'>
    <p>Altura de jugadores de la NBA</p>
</main>