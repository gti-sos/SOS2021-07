<script>
import { onMount } from "svelte";
import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
var atributo = [];
var numeroCarta = [];
  
  var msg = "";
    
async function loadChart(){
   
    var cards={};
    var cardAtribute = [];
    const resData = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php");
    const myData = await resData.json();  
    console.log(myData);
    
    myData.data.forEach((v) =>{
        console.log(v.attribute);
        if(!(v.attribute==undefined)){
            if(v.attribute in cards){
                cards[v.attribute] += 1;
            }
            else{
                cards[v.attribute]= 1;
            }
        }
         
        });
        console.log(cards);
    
    for (var key in cards){
        atributo.push(key);
        numeroCarta.push(cards[key]);
        
    }
    
    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: atributo,
        datasets: [
          {
            label: "Numero de cartas con ese atributo",
            data: numeroCarta,
            backgroundColor: [
              "rgba(155, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Cartas de YU-GI-OH por atributo'
            }
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
</script>
<svelte:head>
  <script
    src="https://cdn.jsdelivr.net/npm/chart.js"
    on:load={loadChart}></script>
</svelte:head>

<main>
    <Nav>
        <NavItem>
          <NavLink href="/"><Button color="primary">Página Inicial</Button></NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/#/integrations"><Button color="primary">Volver</Button></NavLink>
        </NavItem>
    </Nav>
    
    {#if msg}
    <p>{msg}</p>
  {:else}
    <div class="chart-container">
      <canvas id="myChart" />
    </div>
  {/if}
</main>

<style>
    main {
      text-align: center;
      padding: 1em;
      margin: 0 auto;
    }
    div {
      margin-bottom: 15px;
    }
    #myChart{
      width: 400px;
      height: 500px;
    }
  </style>