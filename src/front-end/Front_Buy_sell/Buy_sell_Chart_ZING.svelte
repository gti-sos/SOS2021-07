<script>
  import { onMount } from "svelte";
  import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
  const BASE_CONTACT_API_PATH = "/api/v2";
  
let buy_sell_Data = [];
let buy_sell_Chart_comunityprovinceyear_Data = [];
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
    const res = await fetch(BASE_CONTACT_API_PATH + "/buy_sell");
    buy_sell_Data = await res.json();
    if (res.ok) {
	
      buy_sell_Data.forEach(stat => {
	  estrin=estrin+stat.autonomous_community;
      b//uy_sell_Chart_comunityprovinceyear_Data.push(stat.autonomous_community);
      });
    }
	
	console.log(estrin);
	
	ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "b55b025e438fa8a98e32482b5f768ff5"]; // CHART CONFIG
    // -----------------------------
    let chartConfig = {
      type: 'wordcloud',
      options: {
        text: 'We the people of the United States, in order to form a more perfect union, establish justice, insure domestic tranquility, provide for the common defense, promote the general welfare, and secure the blessings of liberty to ourselves and our posterity, do ordain and establish this Constitution for the United States of America.',
        aspect: 'spiral',
        colorType: 'palette',
        ignore: ['establish', 'this'],
        maxItems: 50,
        minLength: '4px',
        palette: ['#D32F2F', '#1976D2', '#9E9E9E', '#E53935', '#1E88E5', '#7E57C2', '#F44336', '#2196F3', '#A1887F'],
        rotate: true,
        style: {
          tooltip: {
            text: 'We the people of the United States, in order to form a more perfect union, establish justice, insure domestic tranquility, provide for the common defense, promote the general welfare, and secure the blessings of liberty to ourselves and our posterity, do ordain and establish this Constitution for the United States of America.',
            padding: '5px',
            alpha: 0.9,
            backgroundColor: '#D32F2F',
            borderColor: 'none',
            borderRadius: '3px',
            fontColor: 'white',
            fontFamily: 'Georgia',
            textAlpha: 1,
            visible: true,
            width: '400px',
            wrapText: true
          },
          fontFamily: 'Merriweather',
          hoverState: {
            backgroundColor: '#1976D2',
            borderColor: 'none',
            borderRadius: '3px',
            fontColor: 'white'
          }
        }
      }
    };

    // RENDER CHARTS
    // -----------------------------
    zingchart.render({
      id: 'myChart',
      data: chartConfig
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
      <NavLink href="#/buy_sell/graficaZING">Gráfica CIRCULOS (zingchart)</NavLink>
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
    <a href="https://www.zingchart.com/" rel="noopener" class="zc-ref">Powered by ZingChart</a>
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
      height: 100%;
      width: 100%;
      min-height: 530px;
    }

    .zc-ref {
      display: none;
    }

</style>