
<script>
      import { onMount } from "svelte";
  import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
    var x=[];
    var y= [];
    var x2=[];
    var y2= [];
    async function loadGraph() {
        const resData_Rental = await fetch("/api/v1/rentals");
        const resDataEduacionGastos = await fetch("https://education-expenditures.herokuapp.com/api/v1");
        

        let Data = await resData_Rental.json();
        let Data1 = await resDataEduacionGastos.json();
        

        Data.map((z) => {
            x.push(z.province + " - " + z.year);
            y.push(parseFloat(z["salary"]));
               
        });

        Data1.map((p) => {
            x2.push(p.country + " - " + p.year);
            y2.push(parseFloat(p["education_expenditure_per_capita"]));
            
        });
        
        
        
        var trace1 = {
        x: x,
        y: y,
        name: '% salario',
        type: 'bar'
        };

        var trace2 = {
        x: x2,
        y: y2,
        name: 'Gasto en educación por capital',
        type: 'bar'
        };

        var data = [trace1, trace2];

        

        Plotly.newPlot('myDiv', data);

    }
    loadGraph();
</script>

<svelte:head>

    <script src="https://cdn.plot.ly/plotly-1.58.4.min.js" on:load="{loadGraph}"></script>

</svelte:head>

<main>
    <h2 style="text-align: center;"> <i class="fas fa-car"></i> integracion G04</h2>
  
    <Nav>
      <NavItem>
        <NavLink href="/"><Button color="primary">Página Inicial</Button></NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/#/rentals"><Button color="primary">Datos</Button></NavLink>
      </NavItem>
  </Nav>
  
    <div id='myDiv'>
    <p>Muestra integracion con los datos de grupo 04 </p>
  </main>