<script>
import { onMount } from "svelte";
import Button from "sveltestrap/src/Button.svelte";
import { pop } from "svelte-spa-router";
const BASE_CONTACT_API_PATH = "/api/v2";

let cita;
let autor;
let buy_sell_Data = [];
let buy_sell_Chart_comunityprovinceyear_Data = [];
let estrin='';

    onMount(loadQuote);
	//esta funcion me carga la api externa
    async function loadQuote(){
        const resData = await fetch("https://quotes15.p.rapidapi.com/quotes/random/?language_code=es", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "quotes15.p.rapidapi.com",
                "x-rapidapi-key": "15f4056b92mshce2e627ff99101dp16fe2ajsn4bc9dff05513"
            }
        })
        const quoteData = await resData.json(); 
        cita = quoteData["content"];
        autor = quoteData["originator"]["name"];
		
    }
	//FUNCION QUE ME CARGA LAS COSAS
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
         loadChart();
      }
    });
  }
  
  async function loadChart() {
  
  const res = await fetch(BASE_CONTACT_API_PATH + "/buy_sell");
    buy_sell_Data = await res.json();
    if (res.ok) {
	
      buy_sell_Data.forEach(stat => {
	  estrin=estrin+stat.autonomous_community+" "+stat.province+" ";
      //buy_sell_Chart_comunityprovinceyear_Data.push(stat.autonomous_community);
      });
	  
	  estrin=estrin+cita;
	  estrin=estrin+autor;
	  console.log(estrin);
	  
    }
  	
  }
	
	
</script>



<main>


<br>
<blockquote class="blockquote text-center">
    
    <h1 class="display-4">{cita}</h1>
    <footer class="blockquote-footer"> <cite title="Source Title">{autor}</cite></footer>
  </blockquote>
  <Button outline color="secondary" on:click="{pop}"> Atrรกs</Button>

</main>