<script>
  import { onMount } from "svelte";
  import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
  
  let Data2 = [];
  let evictionData = [];
let provinceData=[];

  let errorMsg = "";
  let okMsg = "";
  
  function distinctRecords(MYJSON, prop) {
    return MYJSON.filter((obj, pos, arr) => {
      return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }
  
  //loadinitial de mis datos
  
  async function loadStats2() {
    
    const res = await fetch(
     "https://sos2021-07.herokuapp.com/api/v2/buy_sell/loadInitialData"
    ).then(function (res) {
      if (res.ok) {
        //getStats();
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
  		
		//API EXT IP
		
  		const extfetch = await fetch("http://api.ipify.org/?format=json");
        const ipaddr = await extfetch.json();
        var ipfin = ipaddr.ip;
        console.log(ipfin);
		
		const res2 = await fetch("https://sos2021-07.herokuapp.com/api/v2/buy_sell?offset=1&limit=6");
		let Data2 = await res2.json();
		
		Data2.forEach(stat => {
	  
	  evictionData.push(parseInt(stat.eviction));
	  provinceData.push(stat.province);

      });
	  
	  console.log(evictionData);
	console.log(provinceData);
  
 Highcharts.chart('container', {

    chart: {
        polar: true,
        type: 'line'
    },

    accessibility: {
        description: 'A spiderweb chart compares the allocated budget against actual spending within an organization. The spider chart has six spokes. Each spoke represents one of the 6 departments within the organization: sales, marketing, development, customer support, information technology and administration. The chart is interactive, and each data point is displayed upon hovering. The chart clearly shows that 4 of the 6 departments have overspent their budget with Marketing responsible for the greatest overspend of $20,000. The allocated budget and actual spending data points for each department are as follows: Sales. Budget equals $43,000; spending equals $50,000. Marketing. Budget equals $19,000; spending equals $39,000. Development. Budget equals $60,000; spending equals $42,000. Customer support. Budget equals $35,000; spending equals $31,000. Information technology. Budget equals $17,000; spending equals $26,000. Administration. Budget equals $10,000; spending equals $14,000.'
    },

    title: {
        text: 'Budget vs spending',
        x: -80
    },

    pane: {
        size: '80%'
    },

    xAxis: {
        categories: ['Sales', 'Marketing', 'Development', 'Customer Support',
            'Information Technology', 'Administration'],
        tickmarkPlacement: 'on',
        lineWidth: 0
    },

    yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0
    },

    tooltip: {
        shared: true,
        pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
    },

    legend: {
        align: 'right',
        verticalAlign: 'middle',
        layout: 'vertical'
    },

    series: [{
        name: 'Allocated Budget',
        data: [43000, 19000, 60000, 35000, 17000, 10000],
        pointPlacement: 'on'
    }, {
        name: 'Actual Spending',
        data: [50000, 39000, 42000, 31000, 26000, 14000],
        pointPlacement: 'on'
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
                pane: {
                    size: '70%'
                }
            }
        }]
    }

});
  
  }
	
	
</script>

<svelte:head>

<script src="https://code.highcharts.com/highcharts.src.js" on:load="{loadChart}"></script>
<script src="https://code.highcharts.com/modules/series-label.js" on:load="{loadChart}></script>
<script src="https://code.highcharts.com/modules/exporting.js" on:load="{loadChart}></script>
<script src="https://code.highcharts.com/modules/export-data.js" on:load="{loadChart}></script>
<script src="https://code.highcharts.com/modules/accessibility.js" on:load={loadChart}></script>
	
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
        A spiderweb chart or radar chart is a variant of the polar chart.
        Spiderweb charts are commonly used to compare multivariate data sets,
        like this demo using six variables of comparison.
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
    min-width: 320px;
    max-width: 700px;
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