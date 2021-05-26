<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    
async function loadChart(){
   
    var pokemon1={};
    var pokemon2={};
    var pokemon3={};
    var pokemon4={};
    var pokemon5={};

    var pokedex = [];
    const resData_N = await fetch("https://pokeapi.co/api/v2/pokedex/1");
    const resData_K = await fetch("https://pokeapi.co/api/v2/pokedex/2");
    const resData_J = await fetch("https://pokeapi.co/api/v2/pokedex/3");
    const resData_H = await fetch("https://pokeapi.co/api/v2/pokedex/4");
    const resData_S = await fetch("https://pokeapi.co/api/v2/pokedex/5");
    const myData1 = await resData_N.json();  
    const myData2 = await resData_K.json();  
    const myData3 = await resData_J.json();  
    const myData4 = await resData_H.json();  
    const myData5= await resData_S.json();  
    console.log(myData);
    
    myData1.data.forEach((v) =>{
         if(!(v.pokemon_species in pokemon1)){
            pokemon1[v.descriptions["descriptions"]] += 1;
            }
            else{
                
            }
        });

        myData2.data.forEach((v) =>{
         if(!(v.pokemon_species in pokemon2)){
            pokemon2[v.descriptions["descriptions"]] += 1;
            }
            else{
                
            }
        });

        myData3.data.forEach((v) =>{
         if(!(v.pokemon_species in pokemon3)){
            pokemon3[v.descriptions["descriptions"]] += 1;
            }
            else{
                
            }
        });

        myData4.data.forEach((v) =>{
         if(!(v.pokemon_species in pokemon4)){
            pokemon4[v.descriptions["descriptions"]] += 1;
            }
            else{
                
            }
        });

        myData5.data.forEach((v) =>{
         if(!(v.pokemon_species in pokemon5)){
            pokemon5[v.descriptions["descriptions"]] += 1;
            }
            else{
                
            }
        });

        
    
    for (var key in pokemon1){
        pokedex.push([key,pokemon1[key]]);
    }
    for (var key in pokemon2){
        pokedex.push([key,pokemon2[key]]);
    }
    for (var key in pokemon3){
        pokedex.push([key,pokemon3[key]]);
    }
    for (var key in pokemon4){
        pokedex.push([key,pokemon4[key]]);
    }
    for (var key in pokemon5){
        pokedex.push([key,pokemon5[key]]);
    }
    
Highcharts.chart('container', {
    chart: {
        renderTo: 'container',
        type: 'column',
        options3d: {
            enabled: true,
            alpha: 10,
            beta: 15,
            depth: 50,
            viewDistance: 20
        }
    },
    title: {
        text: 'Cantidad pokemon por cada pokedex'
    },
    accessibility: {
        announceNewData: {
            enabled: true
        }
    },
    xAxis: {
        type: 'category'
    },
    yAxis: {
        title: {
            text: 'numero de pokemon'
        }
    },
    legend: {
        enabled: false
    },
    plotOptions: {
        column: {
            depth: 20
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:12px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b><br/>'
    },
        series: [{
            name: 'numero pokemon',
            colorByPoint: true,
            data: pokedex
        }]
    });
}
</script>
<svelte:head>
  <script src="https://code.highcharts.com/highcharts.js" on:load={loadChart}></script>
  <script src="https://code.highcharts.com/modules/series-label.js"></script>
  <script src="https://code.highcharts.com/highcharts-3d.js"></script>
  <script src="https://code.highcharts.com/modules/cylinder.js"></script>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/modules/export-data.js"></script>
  <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

<main>
  <figure class="highcharts-figure">
  <div id ="container"></div>
  <p class="highcharts-description">
      Gráfico 3D que muestra la cantidad de cartas de pokemon segun pokedex.
  </p>
  </figure>
    <Button outline color="secondary" on:click="{pop}"> Atrás</Button>
</main>

<style>

#container {
    height: 600px;
    width: 900px;
}

.highcharts-figure, .highcharts-data-table table {
    min-width: 350px;
    max-width: 900px;
    margin: 1em auto;
}

</style>