<script>
  import { onMount } from "svelte";
  import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
  const BASE_CONTACT_API_PATH = "/api/v2";
  
let buy_sell_Data = [];
let buy_sell_Chart_comunityprovinceyear_Data = [];
let buy_sell_Chart_eviction_Data = [];
  let errorMsg = "";
  let okMsg = "";
  
  function distinctRecords(MYJSON, prop) {
    return MYJSON.filter((obj, pos, arr) => {
      return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }
  
  async function loadChart() {
    console.log("Fetching data...");
    const res = await fetch(BASE_CONTACT_API_PATH + "/buy_sell");
    buy_sell_Data = await res.json();
    if (res.ok) {
	
      buy_sell_Data.forEach(stat => {
	  
      buy_sell_Chart_comunityprovinceyear_Data.push(stat.autonomous_community+"-"+stat.province+"-"+stat.year);
      buy_sell_Chart_eviction_Data.push(stat["eviction"]);   
      });
    }
	
	console.log(buy_sell_Chart_comunityprovinceyear_Data);
	console.log(buy_sell_Chart_eviction_Data);
	
	ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "b55b025e438fa8a98e32482b5f768ff5"];
    let chartConfig = {
      type: 'venn',
      title: {
        text: 'Facts About AngularJS'
      },
      tooltip: {
        text: '%t',
        borderRadius: '5px',
        fontSize: '15px'
      },
      series: [{
          text: 'Popularity Of AngularJS Online',
          values: [400],
          tooltip: {
            backgroundColor: '#006ACC'
          },
          backgroundColor: '#006ACC',
          join: [15]
        },
        {
          text: 'People Who Use AngularJS',
          values: [300],
          tooltip: {
            backgroundColor: '#FBB148'
          },
          backgroundColor: '#FBB148',
          join: [15]
        },
        {
          text: 'People Who Actually Know How To Use AngularJS',
          values: [100],
          tooltip: {
            backgroundColor: '#DD0031'
          },
          backgroundColor: '#DD0031',
          join: [15]
        }
      ]
    }

    zingchart.render({
      id: 'myChart',
      data: chartConfig,
      height: '100%',
      width: '100%',
    });
	
	
  }
</script>



<svelte:head>

	<script src="https://cdn.zingchart.com/zingchart.min.js" on:load={loadChart} ></script>
	
</svelte:head>

<main>
  <Nav>
    <NavItem>
      <NavLink href="/">Pรกgina Principal</NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="#/buy_sell">Datos</NavLink>
    </NavItem>
	<NavItem>
      <NavLink href="#/buy_sell/buy_sell_Charts">Grรกfica LINEAL (highchart)</NavLink>
    </NavItem>
	<NavItem>
      <NavLink href="#/buy_sell/graficaNL">Grรกfica AREA (highchart)</NavLink>
    </NavItem>
	<NavItem>
      <NavLink href="#/buy_sell/graficaZING">Grรกfica CIRCULOS (zingchart)</NavLink>
    </NavItem>
  </Nav>

  <div>
    <h2>
      Anรกliticas
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