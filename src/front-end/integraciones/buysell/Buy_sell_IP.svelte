<script>
  import { onMount } from "svelte";
  import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
  
  
  let Data2 = [];
  let ipfin;
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
        loadChart();
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
  		
		//API EXT IP
		
  		const extfetch = await fetch("http://api.ipify.org/?format=json");
        const ipaddr = await extfetch.json();
        ipfin = ipaddr.ip;
		
		const res2 = await fetch("https://sos2021-07.herokuapp.com/api/v2/buy_sell?offset=1&limit=6");
		let Data2 = await res2.json();
		
		Data2.forEach(stat => {
	  
	  evictionData.push(parseInt(stat.eviction));
	  provinceData.push(stat.province);

      });
	  
	  console.log(evictionData);
	console.log(provinceData);
  
 var ctx = document.getElementById("myChart").getContext("2d");
        var myChart = new Chart(ctx, {
            type:"radar",
            data: {
                labels: provinceData,
                datasets:[
                    {
                        label: "Deshaucios por provincias",
                        backgroundColor: '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6),
                        borderColor: "rgb(255, 99, 132)",
                        data: evictionData
                    }
                ]
            },
            options: {
                title:{
                    display: true,
                    text: ipfin
                }
            }
        });
  
  }
	
	
</script>

<svelte:head>
  <script
    src="https://cdn.jsdelivr.net/npm/chart.js"
    on:load={loadStats2}></script>
</svelte:head>

<main>
    <Nav>
        <NavItem>
          <NavLink href="/"><Button color="primary">Pรกgina Inicial</Button></NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/"><Button color="primary">Volver</Button></NavLink>
        </NavItem>
    </Nav>
    
    
    <div class="chart-container">
      <canvas id="myChart" />
    </div>
	
	<div>
		<h1>IP ${ipfin}</h1>
	</div>
  
</main>

<style>
    
  </style>

<canvas id="myChart"></canvas>

