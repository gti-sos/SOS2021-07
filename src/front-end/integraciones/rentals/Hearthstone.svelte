

<script>
    import { onMount } from "svelte";
    import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
    var v =[];
    var l = [];
    async function loadGraph() {
       
        const resDataHearthstone = await fetch("https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/classes/Priest?cost=1", {
	        "method": "GET",
	        "headers": {
                "x-rapidapi-key": "9b2b2f4d65msh643a2276d42fb51p1e4972jsn8ab58ddd82c9",
	            "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com",
	            
	        }
        });
        
        let HearthstoneData = await resDataHearthstone.json();

        HearthstoneData.map((x) => { 
                l.push(x.name);
                v.push(parseInt(x["attack"]));
        });

        console.log(v);
        console.log(l);

       

      var data = [{
  values: v,
  labels: l,
  type: 'pie'
}];

var layout = {
            height: 400,
            width: 1300
            };

Plotly.newPlot('myDiv', data, layout);
    }
    loadGraph();
</script>

<svelte:head>

    <script src="https://cdn.plot.ly/plotly-1.58.4.min.js" on:load={loadGraph}></script>
    

</svelte:head>

<main>
    <h2 style="text-align: center;"> <i class="fas fa-car"></i> Cartas Hearthstone</h2>
  
    <Nav>
      <NavItem>
        <NavLink href="/"><Button color="primary">Página Inicial</Button></NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/#/rentals"><Button color="primary">Datos</Button></NavLink>
      </NavItem>
  </Nav>
  
    <div id='myDiv'>
    <p>Cartas de Hearthstone segun su ataque</p>
</main>