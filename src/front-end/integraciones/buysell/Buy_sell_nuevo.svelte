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

	
    async function apiExterna6(){
        const gamesData = await  fetch("https://rawg-video-games-database.p.rapidapi.com/games",{
          method:'GET',
          headers:{
            "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
            "x-rapidapi-key": "2499b9262cmsh73c0da1a5a197bap189468jsn3435f2f24ddf",
            "useQueryString": true
          }
        });
        var games = await gamesData.json();
        var res=[];
        
        games=games.results.map((g)=>{
          return '<li>'+g.slug+'</li>';
        });
        // console.log(games);
        
        var gamesHtml = document.getElementById('games');
        games.forEach((g)=>{
          gamesHtml.innerHTML+=g;
        });
      }
  

	
apiExterna6();
</script>

<main>

<br>
<div id='caja'>
    <h1>API Externa</h1>
    <h3>Lista de juegos más conocidos</h3>
    <div id="games"></div>
    <div style="text-align: center">fuente: <a href="https://rapidapi.com/accujazz/api/rawg-video-games-database?endpoint=apiendpoint_e4e2766f-1422-4b88-bd10-22acdb7c9a16" target="_blank">aqui</a></div>
    </div><br>
  <Button outline color="secondary" on:click="{pop}"> Atras</Button>
  
 </main>