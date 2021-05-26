<script>
  import { onMount } from "svelte";
  import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
  const BASE_CONTACT_API_PATH = "/api/v2";
let buy_sell_Data = [];
let buy_sell_Chart_Data = [];
//let buy_sell_Chart_autonomous_community_Data = [];
//let buy_sell_Chart_province_Data = [];
//let buy_sell_Chart_year_Data = [];
let buy_sell_Chart_comunityprovinceyear_Data = [];
let buy_sell_Chart_surface_Data = [];
let buy_sell_Chart_annual_variation_percentage_Data = [];
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
      //buy_sell_Chart_autonomous_community_Data.push(stat.autonomous_community);
      //buy_sell_Chart_province_Data.push(stat.province);
      //buy_sell_Chart_year_Data.push(stat.year);
	  buy_sell_Chart_comunityprovinceyear_Data.push(stat.autonomous_community+"-"+stat.province+"-"+stat.year);
      buy_sell_Chart_surface_Data.push(stat["surface"]);
      buy_sell_Chart_annual_variation_percentage_Data.push(stat["annual_variation_percentage"]);
      buy_sell_Chart_eviction_Data.push(stat["eviction"]);   
      });
    }
    
    console.log("BUY SELL Chart DaTa: " + buy_sell_Chart_Data);
   Highcharts.chart('container', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'BUY SELL STATS'
    },
    subtitle: {
        text: 'TIPO BAR'
    },
    xAxis: {
        categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
        title: {
            text: 'comunidad autónoma y provincia'
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Valor',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    tooltip: {
        valueSuffix: ' millions'
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Superficie',
        data: [107, 31, 635, 203, 2]
    }, {
        name: '% variación anual',
        data: [133, 156, 947, 408, 6]
    }, {
        name: 'Desalojo',
        data: [814, 841, 3714, 727, 31]
    }]
});
	
	
  }
</script>
<svelte:head>
  <script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://code.highcharts.com/modules/series-label.js"></script>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/modules/export-data.js"></script>
  <script
    src="https://code.highcharts.com/modules/accessibility.js"
    on:load={loadChart}></script>
</svelte:head>
<main>
  <Nav>
    <NavItem>
      <NavLink href="/">Página Principal</NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="#/buy_sell">Datos</NavLink>
    </NavItem>
  </Nav>

<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js"></script>

<figure class="highcharts-figure">
    <div id="container"></div>
    <p class="highcharts-description">
        Bar chart showing horizontal columns. This chart type is often
        beneficial for smaller screens, as the user can scroll through the data
        vertically, and axis labels are easy to read.
    </p>
</figure>

</main>

<style>
  .highcharts-figure, .highcharts-data-table table {
    min-width: 310px; 
    max-width: 800px;
    margin: 1em auto;
}

#container {
    height: 400px;
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