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
    EvictionData = await res.json();
	
    if (res.ok) {
	
      EvictionData.forEach(stat => {
	  
	  totalData.push(parseInt(stat.born));
	  countryData.push(stat.country);
      
      });
	  
    }
	
	const res2 = await fetch("https://sos2021-07.herokuapp.com/api/v2/buy_sell?offset=1&limit=5");
    BuyData = await res2.json();
	
	if(res2.ok) {
		
		 BuyData.forEach(stat => {
	  
	  desalojoData.push(parseInt(stat.eviction));
      
      });
		
	}
    
    console.log("totalData="+totalData);
	console.log("countryData="+countryData);
	console.log("desalojoData="+desalojoData);
	
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
        text: "Visual comparison of Mountains Panorama"
    },
    yAxis: {
        title: {
            text: 'Height Above Sea Level',
            x: -40
        },
        labels: {
            format: '{value:,.0f} MAMSL'
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
        valueSuffix: ' MAMSL'
    },
    series: [{
        xAxis: 1,
        lineColor: 'rgb(120,160,180)',
        color: 'rgb(140,180,200)',
        fillColor: 'rgb(140,180,200)',
        name: "Dachstein panorama seen from Krippenstein",
        data: [
            ['Kufstein', 2049],
            ['Hohe Wildstelle', 2746],
            ['Kleiner Miesberg', 2173],
            ['Großer Miesberg', 2202],
            ['Hochstein', 2543],
            ['Lackner Miesberg', 2232],
            ['Wasenspitze', 2257],
            ['Sinabell', 2349],
            ['Feister Scharte', 2198],
            ['Eselstein', 2556],
            ['Landfriedstein', 2536],
            ['Scheichenspitz', 2667],
            ['Schmiedstock', 2634],
            ['Gamsfeldspitze', 2611],
            ['Edelgriess', 2305],
            ['Koppenkarstein', 2863],
            ['Niederer Gjaidstein', 2483],
            ['Hoher Gjaidstein', 2794],
            ['Hoher Dachstein', 2995],
            ['Niederer Dachstein', 2934],
            ['Hohes Kreuz', 2837],
            ['Hoher Ochsenkogel', 2513]
        ]
    }, {
        xAxis: 2,
        lineColor: 'rgb(200, 190, 140)',
        color: 'rgb(200, 190, 140)',
        fillColor: 'rgb(230, 220, 180)',
        name: "Panorama from Col Des Mines",
        data: [
            ['Combin de la Tsessette', 4141],
            ['Grand Combin de Grafeneire', 4314],
            ['Combin de Corbassière', 3716],
            ['Petit Combin', 3672],
            ['Pointe de Boveire', 3212],
            ['Grand Aget', 3133],
            ['Mont Rogneux', 3084],
            ['Dents du Grand Lé', 2884],
            ['Monts Telliers', 2951],
            ['Grand Golliat', 3238],
            ['Mont Grande Rochère', 3326],
            ['Mont de la Fouly', 2871],
            ['Tête de la Payanne', 2452],
            ['Pointe Allobrogia', 3172],
            ['Six Blanc', 2334],
            ['Mont Dolent', 3820],
            ['Aiguille de Triolet', 3870],
            ['Le Tour Noir', 3836],
            ["Aiguille de l'A Neuve", 3753],
            ["Aiguille d'Argentière", 3900],
            ["Aiguille du Chardonnet", 3824],
            ["Aiguille du Tour", 3540],
            ["Aiguille du Pissoir", 3440],
            ["Le Catogne", 2598],
            ["Pointe de Prosom", 2762],
            ["Pointe Ronde", 2700],
            ["Mont Buet", 3096],
            ["Le Cheval Blanc", 2831],
            ["Pointe de la Finive", 2838],
            ["Pic de Tenneverge", 2985],
            ["Pointe d'Aboillon", 2819],
            ["Tour Sallière", 3220],
            ["Le Dôme", 3138],
            ["Haute Cime", 3257],
            ["Pierre Avoi", 2473],
            ["Cime de l'Est", 3178]
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
      <NavLink href="">API1</NavLink>
    </NavItem>
	<NavItem>
      <NavLink href="">API2</NavLink>
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