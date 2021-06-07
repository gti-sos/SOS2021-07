<script>
  import { onMount } from "svelte";
  import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
  import chart from "chart.js";
  
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
  
  onMount(async () => {renderChart});
  
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
  
  
  async function renderChart() {
  		
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
  
 var ctx = document.getElementById("myChart");
        var chart = new Chart(ctx, {
            type:"radar",
            data: {
                labels: provinceData,
                datasets:[
                    {
                        label: labelInterno,
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
  
  renderChart();
	
	
</script>


<canvas id="myChart"></canvas>

