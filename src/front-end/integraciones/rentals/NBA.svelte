

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

      const resjugador5 = await fetch("https://free-nba.p.rapidapi.com/players/5", {
          "method": "GET",
          "headers": {
              "x-rapidapi-key": "9b2b2f4d65msh643a2276d42fb51p1e4972jsn8ab58ddd82c9",
              "x-rapidapi-host": "free-nba.p.rapidapi.com",
              
          }
      });
      
      jugador5 = await resjugador5.json();

      var name =[];
      var altura = [];

      for (var item in jugador1){
       
        name.push(jugador1[item].first_name+" "+ jugador1[item].last_name);
        altura.push(jugador1[item].height_inches)
    }

    for (var item in jugador2){
       
       name.push(jugador2[item].first_name+" "+ jugador2[item].last_name);
       altura.push(jugador2[item].height_inches)
   }
   for (var item in jugador3){
       
       name.push(jugador3[item].first_name+" "+ jugador3[item].last_name);
       altura.push(jugador3[item].height_inches)
   }
   for (var item in jugador4){
       
       name.push(jugador4[item].first_name+" "+ jugador4[item].last_name);
       altura.push(jugador4[item].height_inches)
   }
   for (var item in jugador5){
       
       name.push(jugador5[item].first_name+" "+ jugador5[item].last_name);
       altura.push(jugador5[item].height_inches)
   }

      
      let dataTotal =
          [
              
              {
                  name: "Vida de las criaturas",
                  data: Hearthstone
              },
              {
                  name: "Ataque de las criaturas",
                  data: Hearthstone1
              }

          ];

          Highcharts.chart('container', {
    chart: {
        type: 'area'
    },
    accessibility: {
        description: 'Image description: An area chart compares the nuclear stockpiles of the USA and the USSR/Russia between 1945 and 2017. The number of nuclear weapons is plotted on the Y-axis and the years on the X-axis. The chart is interactive, and the year-on-year stockpile levels can be traced for each country. The US has a stockpile of 6 nuclear weapons at the dawn of the nuclear age in 1945. This number has gradually increased to 369 by 1950 when the USSR enters the arms race with 6 weapons. At this point, the US starts to rapidly build its stockpile culminating in 32,040 warheads by 1966 compared to the USSR’s 7,089. From this peak in 1966, the US stockpile gradually decreases as the USSR’s stockpile expands. By 1978 the USSR has closed the nuclear gap at 25,393. The USSR stockpile continues to grow until it reaches a peak of 45,000 in 1986 compared to the US arsenal of 24,401. From 1986, the nuclear stockpiles of both countries start to fall. By 2000, the numbers have fallen to 10,577 and 21,000 for the US and Russia, respectively. The decreases continue until 2017 at which point the US holds 4,018 weapons compared to Russia’s 4,500.'
    },
    title: {
        text: 'US and USSR nuclear stockpiles'
    },
    subtitle: {
        text: 'Sources: <a href="https://thebulletin.org/2006/july/global-nuclear-stockpiles-1945-2006">' +
            'thebulletin.org</a> &amp; <a href="https://www.armscontrol.org/factsheets/Nuclearweaponswhohaswhat">' +
            'armscontrol.org</a>'
    },
    xAxis: {
        categories: [
            name[0],
            name[1],
            name[2],
            name[3],
            name[4]
        ],
        plotBands: [{ // visualize the weekend
            from: 4.5,
            to: 6.5,
            color: 'rgba(68, 170, 213, .2)'
        }]
    },
    yAxis: {
        title: {
            text: 'Nuclear weapon states'
        },
        labels: {
            min: 0,
        title: {
            text: 'Rainfall (mm)'
        }
        }
    },
    tooltip: {
        pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
    },
    plotOptions: {
        areaspline: {
            fillOpacity: 0.5
        }
    },
    series: [{
        name: 'Jugadores NBA',
        data: altura
    }]
});
  }
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