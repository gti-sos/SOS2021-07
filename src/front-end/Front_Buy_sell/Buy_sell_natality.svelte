<script>
  import { onMount } from "svelte";
  import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
  
let EvictionData = [];
let BuyData = [];

let desalojoData = [];
let countryData=[];
let totalData=[];

  let errorMsg = "";
  let okMsg = "";
  
  function distinctRecords(MYJSON, prop) {
    return MYJSON.filter((obj, pos, arr) => {
      return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }
  
   async function loadStats() {
    
    const res = await fetch(
     "https://sos2021-01.herokuapp.com/api/v2/natality-stats/loadInitialData"
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
  
  loadStats();
  
  async function loadStats2() {
    
    const res = await fetch(
     "https://sos2021-07.herokuapp.com/api/v2/buy_sell/loadInitialData"
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
  
  loadStats2();
  
 async function loadChart() {
    console.log("Fetching data...");
	
    const res = await fetch("https://sos2021-01.herokuapp.com/api/v2/natality-stats?limit=5&offset=1");
	const res2 = await fetch("https://sos2021-07.herokuapp.com/api/v2/buy_sell?offset=1&limit=5");
    let Data = await res.json();
	let Data2 = await res2.json();
	
	let EvictionData = Data.map((x) => {
            let res = {
                name: x.country,
                value: parseInt(x.born)
            };
            return res;
        });
	
    let BuyData = Data2.map((x) => {
            let res = {
                name: x.autonomous_community,
                value: parseInt(x.eviction)
            };
            return res;
        });
    
    console.log("EvictionData="+EvictionData);
	
	for (let sos in EvictionData) {
 	 console.log(`${EvictionData[sos].name}: ${EvictionData[sos].value}`);
}
	
   Highcharts.chart('container', {
    chart: {
        type: 'area',
        options3d: {
            enabled: true,
            alpha: 15,
            beta: 30,
            depth: 200
        }
    },
    title: {
        text: "GRUPO 01 INTEGRACIÓN BUY-NATALITY"
    },
    yAxis: {
        title: {
            text: '',
            x: -40
        },
        labels: {
            format: '{value:,.0f} '
        },
        gridLineDashStyle: 'Dash'
    },
    xAxis: [{
        visible: false
    }, {
        visible: false
    }, {
        visible: false
    }],
    plotOptions: {
        area: {
            depth: 100,
            marker: {
                enabled: false
            },
            states: {
                inactive: {
                    enabled: false
                }
            }
        }
    },
    tooltip: {
        valueSuffix: ' '
    },
    series: [{
        xAxis: 1,
        lineColor: 'rgb(120,160,180)',
        color: 'rgb(140,180,200)',
        fillColor: 'rgb(140,180,200)',
        name: "API NATALITY - nacimientos",
        data: [
            [EvictionData[0].name, EvictionData[0].value],
            [EvictionData[1].name, EvictionData[1].value],
			[EvictionData[2].name, EvictionData[2].value],
			[EvictionData[3].name, EvictionData[3].value],
			[EvictionData[4].name, EvictionData[4].value]
        ]
    }, {
        xAxis: 2,
        lineColor: 'rgb(200, 190, 140)',
        color: 'rgb(200, 190, 140)',
        fillColor: 'rgb(230, 220, 180)',
        name: "API BUY - desahucios",
        data: [
            [BuyData[0].name, BuyData[0].value],
			[BuyData[1].name, BuyData[1].value],
			[BuyData[2].name, BuyData[2].value],
			[BuyData[3].name, BuyData[3].value],
			[BuyData[4].name, BuyData[4].value]
        ]
    }]
});
	
  }
  //loadChart();
</script>
<svelte:head>

<script src="https://code.highcharts.com/highcharts.js"  on:load={loadChart} ></script>
<script src="https://code.highcharts.com/highcharts-3d.js"  on:load={loadChart} ></script>
<script src="https://code.highcharts.com/modules/exporting.js"  on:load={loadChart} ></script>
<script src="https://code.highcharts.com/modules/export-data.js" on:load={loadChart} ></script>
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

  <div id="container"></div>
  
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
    min-width: 310px; 
    max-width: 800px;
    margin: 0 auto;
}


</style>