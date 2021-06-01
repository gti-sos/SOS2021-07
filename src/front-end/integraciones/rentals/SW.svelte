<script>
    import { onMount } from "svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    onMount(loadGeoDB);

    async function loadGeoDB(){
        const resData = await fetch("https://swapi.dev/api/people/?page=1");
       
        
        const Datas = await resData.json(); 
        

        
        

        //Estos son los 3 paises elegidos
        var theGreat3 =[Datas[1]["name"],myData[2]["name"],myData[3]["name"]];
        //Son los paises que en 2017 la edad media de la poblacion que murio por sobredosis fue la menor
        var theGreat3Ages =[Datas[1]["mass"],Datas[2]["mass"],Datas[3]["mass"]];
        
        var theGreat3Together=[theGreat3[0]+", peso: "+theGreat3Ages[0] + " kg",theGreat3[1]+", peso: "+theGreat3Ages[1] + " kg",theGreat3[2]+", peso: "+theGreat3Ages[2] + " kg",]
        
        console.log(theGreat3);
        console.log(theGreat3Ages);

        
        
        
        ['rgb(56, 75, 126)', 'rgb(18, 36, 37)', 'rgb(34, 53, 101)', 'rgb(36, 55, 57)', 'rgb(6, 4, 4)']

     

        var data = [{
        values: theGreat3Ages,
        labels: theGreat3Together,
        type: 'pie',
        textinfo: "percent",
        marker: { colors: ['rgb(33, 75, 99)', 'rgb(79, 129, 102)', 'rgb(151, 179, 100)', 'rgb(175, 49, 35)', 'rgb(36, 73, 147)']}
}];

var layout = {
  title: "Número de habitantes en los paises que en 2017 los fallecidos por sobredosis tuvieron menor edad media" ,
  height: 600,
  width: 1400
};

Plotly.newPlot('myDiv', data, layout);
     }


    function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
}    
</script>
<svelte:head>
      <script src='https://cdn.plot.ly/plotly-latest.min.js' on:load="{loadGeoDB}"></script>
  </svelte:head>

<main>
    <div id='myDiv'><!-- Plotly chart will be drawn inside this DIV --></div>
    <Button outline color="secondary" on:click="{pop}"> Atrás</Button>
</main>