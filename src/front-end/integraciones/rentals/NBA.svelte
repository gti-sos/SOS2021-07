

<script>
    import {pop} from "svelte-spa-router";
  import Button from "sveltestrap/src/Button.svelte";
    var jugador1=[];
    var jugador2=[];
    var jugador3=[];
    var jugador4=[];
    var jugador5=[];

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

      


   Highcharts.chart('container', {
    chart: {
        type: 'areaspline'
    },
    title: {
        text: 'Average fruit consumption during one week'
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 150,
        y: 100,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
    },
    xAxis: {
        categories: [
            name[0],
            name[1],
            name[2],
            name[3]
        ],
        plotBands: [{ // visualize the weekend
            from: 4.5,
            to: 6.5,
            color: 'rgba(68, 170, 213, .2)'
        }]
    },
    yAxis: {
        title: {
            text: 'Fruit units'
        }
    },
    tooltip: {
        shared: true,
        valueSuffix: ' units'
    },
    credits: {
        enabled: false
    },
    plotOptions: {
        areaspline: {
            fillOpacity: 0.5
        }
    },
    series: [ {
        name: 'Jugadores NBA',
        data: altura
    }]
});}
  loadGraph();
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
  </figure>
  <div style="text-align:center;padding-bottom: 3%;">
      <Button outline align = "center" color="secondary" on:click="{pop}"> Volver</Button>
      </div>
</main>