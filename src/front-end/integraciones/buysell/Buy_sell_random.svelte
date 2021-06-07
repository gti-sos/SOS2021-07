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
		
		const res = await fetch(BASE_CONTACT_API_PATH + "/buy_sell");
    buy_sell_Data = await res.json();
    if (res.ok) {
	
      buy_sell_Data.forEach(stat => {
	  estrin=estrin+stat.autonomous_community+" "+stat.province+" ";
      //buy_sell_Chart_comunityprovinceyear_Data.push(stat.autonomous_community);
      });
	  
	  console.log("estrin="+estrin);
	  console.log("autor="+autor);
	  console.log("cita="+cita);
	  
	  estrin.join(autor);
	  estrin.join(cita);
	  
	  console.log("estrin="+estrin);
	  
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