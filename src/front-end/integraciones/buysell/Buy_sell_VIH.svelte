<script>
  import { onMount } from "svelte";
  import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
  
let buyData = [];
let evictionData = [];
let desaData=[];
let totalData=[];
let ano=2018;


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
     "https://sos2021-07.herokuapp.com/api/v2/buy_sell/loadInitialData"
    ).then(function (res) {
      if (res.ok) {
        loadChart();
        errorMsg = "";
        okMsg = "Datos cargados correctamente";
        console.log("OK");
      } else {
        if (res.status === 500) {
          errorMsg = "No se ha podido acceder a la base de datos";
        }
		loadChart();
        okMsg = "";
        console.log("ERROR!" + errorMsg);
      }
    });
  }
  
 async function loadChart() {
    console.log("Fetching data...");
	// cogemos para año 2018
    const res = await fetch("https://sos2021-07.herokuapp.com/api/v2/buy_sell?year=2018");
    buyData = await res.json();
    if (res.ok) {
	
      buyData.forEach(stat => {
	  
	  evictionData.push(parseInt(stat.eviction));
      
      });
    }
	
	const res2 = await fetch("http://sos2021-25.herokuapp.com/api/v1/evictions?year=2018&location=andalusia");
    desaData = await res2.json();
    if (res2.ok) {
	
      desaData.forEach(stat => {
	  
	  totalData.push(parseInt(stat.total));
      
      });
    }
	
	let cont=0;
	
	for(let o of evictionData){
		cont=cont+o;
	}
    
    console.log("evictionData"+evictionData);
	console.log("contador"+cont);
	console.log("total"+totalData);
	
   var chart = Highcharts.chart('container', {

    chart: {
        type: 'column'
    },

    title: {
        text: 'Highcharts responsive chart'
    },

    subtitle: {
        text: 'Resize the frame or click buttons to change appearance'
    },

    legend: {
        align: 'right',
        verticalAlign: 'middle',
        layout: 'vertical'
    },

    xAxis: {
        categories: ano,
        labels: {
            x: -10
        }
    },

    yAxis: {
        allowDecimals: false,
        title: {
            text: 'Amount'
        }
    },

    series: [{
        name: 'suma de deshaucios de algunas provincias de andalucia',
        data: [cont]
    }, {
        name: 'total de deshaucios de andalucia',
        data: totalData
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    layout: 'horizontal'
                },
                yAxis: {
                    labels: {
                        align: 'left',
                        x: 0,
                        y: -5
                    },
                    title: {
                        text: null
                    }
                },
                subtitle: {
                    text: null
                },
                credits: {
                    enabled: false
                }
            }
        }]
    }
});

	
 }
 
</script>
<svelte:head>


//<script src="https://code.highcharts.com/highcharts.js"></script>
//<script src="https://code.highcharts.com/highcharts-3d.js"></script>
//<script src="https://code.highcharts.com/modules/exporting.js"></script>
//<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js" on:load={loadStats} ></script>
	
</svelte:head>
<main>

  <Nav>
        <NavItem>
          <NavLink href="/"><Button color="primary">Pรกgina Inicial</Button></NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/#/integrations"><Button color="primary">Volver</Button></NavLink>
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
  
  <figure class="highcharts-figure">
    <div id="container"></div>
    <p class="highcharts-description">
        This demo shows how breakpoints can be defined in order to
        change the chart options depending on the screen width. All
        charts automatically scale to the container size, but in this
        case we also change the positioning of the legend and axis
        elements to accomodate smaller screens.
    </p>
</figure>

<div id="button-bar">
    <button id="small">Small</button>
    <button id="large">Large</button>
    <button id="auto">Auto</button>
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

#button-bar {
    min-width: 310px;
    max-width: 800px;
    margin: 0 auto;
}



</style>