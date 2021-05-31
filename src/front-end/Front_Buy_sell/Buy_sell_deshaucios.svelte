<script>
  import { onMount } from "svelte";
  import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
  const BASE_CONTACT_API_PATH = "/api/v2";
  
let HIVData = [];
let yearData = [];
let living_withData=[];
let newly_infectedData=[];
let total_infectedData=[];

let estrin='';
  let errorMsg = "";
  let okMsg = "";
  
  function distinctRecords(MYJSON, prop) {
    return MYJSON.filter((obj, pos, arr) => {
      return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === pos;
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
	
	ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "b55b025e438fa8a98e32482b5f768ff5"];
    // -----------------------------
    let chartConfig = {
      type: 'vbar3d',
      '3dAspect': {
        depth: 90,
        true3d: 1
      },
      backgroundColor: '#FBFCFE',
      title: {
        text: 'Revenue',
        padding: '15px',
        fontColor: '#1E5D9E',
        fontFamily: 'Lato'
      },
      legend: {
        marginTop: '55px',
        marginRight: '50px',
        alpha: 1,
        borderColor: '#CCCCCC',
        shadow: false,
        toggleAction: 'remove'
      },
      plot: {
        tooltip: {
          visible: false
        },
        aspect: 'cylinder',
        backgroundColor: '#FBFCFE',
        barsOverlap: '100%',
        borderWidth: '0px',
        marker: {
          size: '4px'
        },
        mode: 'normal',
        stacked: true,
        stackType: '100%'
      },
      plotarea: {
        margin: '70px 30px 50px 90px',
        backgroundColor: 'transparent'
      },
      scaleX: {
        margin: '20px',
        padding: '20px',
        backgroundColor: 'none',
        guide: {
          alpha: .25,
          lineColor: '#1E5D9E',
          lineGapSize: '4px',
          lineStyle: 'dotted',
          rules: [{
            rule: '%i == 0',
            visible: false
          }],
          visible: true
        },
        item: {
          padding: '5px',
          fontColor: '#1E5D9E',
          fontFamily: 'Montserrat'
        },
        label: {
          text: 'Years'
        },
        labels: yearData,
        lineWidth: '0px',
        offsetY: '-20px',
        tick: {
          lineColor: '#D1D3D4',
          rules: [{
            rule: '%i == 0',
            visible: false
          }]
        }
      },
      scaleY: {
        values: '0:100:20',
        format: '$%v',
        guide: {
          alpha: .25,
          lineColor: '#1E5D9E',
          lineGapSize: '4px',
          lineStyle: 'dotted',
          rules: [{
            rule: '%i == 0',
            visible: false
          }],
          visible: true
        },
        item: {
          padding: '0 10 0 0',
          fontColor: '#1E5D9E',
          fontFamily: 'Montserrat'
        },
        label: {
          text: 'Personas'
        },
        lineWidth: '0px',
        maxValue: 100,
        tick: {
          lineColor: '#D1D3D4',
          rules: [{
            rule: '%i == 0',
            visible: false
          }]
        }
      },
      series: [{
          text: 'Viviendo con VIH',
          values: living_withData,
          backgroundColor: '#00BAF2',
          lineColor: '#00BAF2',
          lineWidth: '1px',
          marker: {
            backgroundColor: '#00BAF2'
          }
        },
        {
          text: 'Nuevos infectados',
          values: newly_infectedData,
          backgroundColor: '#E80C60',
          lineColor: '#E80C60',
          lineWidth: '1px',
          marker: {
            backgroundColor: '#E80C60'
          }
        },
        {
          text: 'Total de infectados',
          values: total_infectedData,
          backgroundColor: '#9B26AF',
          lineColor: '#9B26AF',
          lineWidth: '1px',
          marker: {
            backgroundColor: '#9B26AF'
          }
        }
      ]
    };

    zingchart.render({
      id: 'myChart',
      data: chartConfig,
      height: '100%',
    });
	
	
}
</script>



<svelte:head>

	<script src="https://cdn.zingchart.com/zingchart.min.js" on:load={loadChart} ></script>
	
</svelte:head>

<main>
  <Nav>
    <NavItem>
      <NavLink href="/">Página Principal</NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="#/buy_sell">Datos</NavLink>
    </NavItem>
	<NavItem>
      <NavLink href="#/buy_sell/buy_sell_Charts">Gráfica LINEAL (highchart)</NavLink>
    </NavItem>
	<NavItem>
      <NavLink href="#/buy_sell/graficaNL">Gráfica AREA (highchart)</NavLink>
    </NavItem>
	<NavItem>
      <NavLink href="#/buy_sell/graficaZING">Gráfica NUBE (zingchart)</NavLink>
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

  <div id="myChart" class="chart--container">
    <a class="zc-ref" href="https://www.zingchart.com/">Powered by ZingChart</a>
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

.chart--container {
      min-height: 530px;
      width: 100%;
      height: 100%;
    }

    .zc-ref {
      display: none;
    }

</style>