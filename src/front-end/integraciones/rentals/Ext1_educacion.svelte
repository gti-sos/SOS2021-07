
<script>
      import { onMount } from "svelte";
  import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
    var x=[];
    var y= [];
    var x2=[];
    var y2= [];
    async function loadGraph() {
        const resData_Rental = await fetch("/api/v1/rentals");
        const resDataEduacionGastos = await fetch("https://education-expenditures.herokuapp.com/api/v1/reduced");
        

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

        var layout = {
            title: "Integracion G04",
            xaxis: {
                showgrid: false,
                showline: true,
                linecolor: 'rgb(102, 102, 102)',
                titlefont: {
                font: {
                    color: 'rgb(204, 204, 204)'
                }
                },
                tickfont: {
                font: {
                    color: 'rgb(102, 102, 102)'
                }
                },
                autotick: false,
                dtick: 10,
                ticks: 'outside',
                tickcolor: 'rgb(102, 102, 102)'
            },
            yaxis: {
                type: "linear",
                range: [0,100],
                autorange: true
            },
            height: 598,
            width: 1080,
            autosize: true,
            showlegend: true
        }


        

        Plotly.newPlot('myDiv', data, layout);

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
        <NavLink href="/#/integrations"><Button color="primary">Volver</Button></NavLink>
      </NavItem>
  </Nav>
  
    <div id='myDiv'>
    <p>Muestra integracion con los datos de grupo 04 </p>
  </main>