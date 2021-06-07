<script>
  import { onMount } from "svelte";
  import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
  
let HIVData = [];
let yearData = [];
let living_withData=[];
let newly_infectedData=[];
let total_infectedData=[];

let buy_sell_Chart_surface_Data = [];
let buy_sell_Chart_eviction_Data = [];

  let errorMsg = "";
  let okMsg = "";
  
  function distinctRecords(MYJSON, prop) {
    return MYJSON.filter((obj, pos, arr) => {
      return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }
  
   async function loadStats() {
    
    const res = await fetch(
     "https://sos2021-24.herokuapp.com/api/v2/children-with-hiv/loadInitialData"
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
  
 async function loadChart() {
    console.log("Fetching data...");
    const res = await fetch("https://sos2021-24.herokuapp.com/api/v2/children-with-hiv?country=Ethiopia");
    HIVData = await res.json();
    if (res.ok) {
	
      HIVData.forEach(stat => {
	  
	  yearData.push(parseInt(stat.year));
	  living_withData.push(parseInt(stat.living_with));
	  newly_infectedData.push(parseInt(stat.newly_infected));
	  total_infectedData.push(parseInt(stat.total_infected));
      
      });
    }
    
    console.log(yearData);
	console.log(living_withData);
	console.log(newly_infectedData);
	console.log(total_infectedData);
	
   Highcharts.chart('container', {
    chart: {
        type: 'column',
        options3d: {
            enabled: true,
            alpha: 15,
            beta: 15,
            viewDistance: 25,
            depth: 40
        }
    },

    title: {
        text: 'GRUPO 24 Administrador de datos de Niños/as con VIH'
    },

    xAxis: {
        categories: yearData,
        labels: {
            skew3d: true,
            style: {
                fontSize: '16px'
            }
        }
    },

    yAxis: {
        allowDecimals: false,
        min: 0,
        title: {
            text: 'Numero de personas',
            skew3d: true
        }
    },

    tooltip: {
        headerFormat: '<b>{point.key}</b><br>',
        pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} / {point.stackTotal}'
    },

    plotOptions: {
        column: {
            stacking: 'normal',
            depth: 40
        }
    },

    series: [{
        name: 'Viviendo con VIH',
        data: living_withData,
        //stack: 'male'
    }, {
        name: 'Nuevos infectados',
        data: newly_infectedData,
        //stack: 'male'
    }, {
        name: 'Total de infectados',
        data: total_infectedData,
        //stack: 'female'
    }]
});
	
  }
</script>
<svelte:head>


<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/highcharts-3d.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js" on:load={loadChart} ></script>
	
</svelte:head>
<main>

  <Nav>
    <NavItem>
      <NavLink href="/">Página Principal</NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="/">Volver</NavLink>
    </NavItem>
	<NavItem>
      <NavLink href="/#/buy_sell/VIH">API SOS VIH</NavLink>
    </NavItem>
	<NavItem>
      <NavLink href="/#/buy_sell/natality">INTEGRACION BUY-NATALITY</NavLink>
    </NavItem>
	<NavItem>
      <NavLink href="">API3</NavLink>
    </NavItem>
	<NavItem>
      <NavLink href="">API4</NavLink>
    </NavItem>
  </Nav>

  <div>
    <h2>
      Analíticas
    </h2>
  </div>

  <div>
    {#if errorMsg}
      <p class="msgRed" style="color: #9d1c24">ERROR: {errorMsg}</p>
    {/if}
    {#if okMsg}
      <p class="msgGreen" style="color: #155724">{okMsg}</p>
    {/if}
  </div>

  <div>
  
    <figure class="highcharts-figure">
    <div id="container"></div>
    <p class="highcharts-description">
        Chart showing grouped and stacked 3D columns. These features are
        available both for 2D and 3D column charts.
    </p>
</figure>
	
  </div>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
  div{
    margin-bottom: 15px;
  }
  p {
    display: inline;
  }
  .msgRed {
    padding: 8px;
    background-color: #f8d7da;
  }
  .msgGreen {
    padding: 8px;
    background-color: #d4edda;
  }
  
  #container {
  height: 400px; 
}

.highcharts-figure, .highcharts-data-table table {
  min-width: 310px; 
  max-width: 800px;
  margin: 1em auto;
}

.highcharts-data-table table {
  font-family: Verdana, sans-serif;
  border-collapse: collapse;
  border: 1px solid #EBEBEB;
  margin: 10px auto;
  text-align: center;
  width: 100%;
  max-width: 500px;
}
.highcharts-data-table caption {
  padding: 1em 0;
  font-size: 1.2em;
  color: #555;
}
.highcharts-data-table th {
  font-weight: 600;
  padding: 0.5em;
}
.highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
  padding: 0.5em;
}
.highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
  background: #f8f8f8;
}
.highcharts-data-table tr:hover {
  background: #f1f7ff;
}


</style>