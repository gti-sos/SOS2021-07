<script>
  import { onMount } from "svelte";
  import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
  async function loadGraph() {
      const res = await fetch("api/v1/rentals");
      let datos = await res.json();
      let comunidad = datos.filter((datos)=> datos.year).map((datos) => datos.autonomous_community +", "+datos.province+ "("+datos.year+")");
      let Renta = datos.filter((datos) => datos.year).map((datos) => datos.rent);
      let Variacion = datos.filter((datos) => datos.year).map((datos) => datos.rent_variation);
      let Metros = datos.filter((datos) => datos.year).map((datos) => datos.meter);
      let Salario = datos.filter((datos) => datos.year).map((datos) => datos.salary);
      function makeTrace(i) {
          if (i == 0) {
              return {
                  x: comunidad,
                  y: Array.apply(null, Renta),
                  line: { 
                      shape: 'spline' ,
                      color: 'red'
                  },
                  visible: i === 0,
                  name: 'Renta',
              };
          } else if (i == 1) {
              return {
                  x: comunidad,
                  y: Array.apply(null, Variacion),
                  line: { 
                      shape: 'spline' ,
                      color: 'red'
                  },
                  visible: i === 0,
                  name: 'Variacion',
              };
          } else if (i == 2) {
              return {
                  x: comunidad,
                  y: Array.apply(null, Metros),
                  line: { 
                      shape: 'spline' ,
                      color: 'red'
                  },
                  visible: i === 0,
                  name: 'Metros',
              };
          }else if (i == 3) {
              return {
                  x: comunidad,
                  y: Array.apply(null, Salario),
                  line: { 
                      shape: 'spline' ,
                      color: 'red'
                  },
                  visible: i === 0,
                  name: 'Salario',
              };
          }
          
      }
      Plotly.plot('graph', [0, 1, 2, 3].map(makeTrace), {
          updatemenus: [{
              y: 0.8,
              yanchor: 'top',
              
          }, {
              y: 1,
              yanchor: 'top',
              buttons: [{
                  method: 'restyle',
                  args: ['visible', [true, false, false, false, false]],
                  label: 'Renta'
              }, {
                  method: 'restyle',
                  args: ['visible', [false, true, false, false, false]],
                  label: 'Variacion'
              }, {
                  method: 'restyle',
                  args: ['visible', [false, false, true, false, false]],
                  label: 'Metros'
              }, {
                  method: 'restyle',
                  args: ['visible', [false, false, false, true,false]],
                  label: 'Salario'
              }]
          }],
      });
  }
</script>

<svelte:head>
  <script src="https://cdn.plot.ly/plotly-latest.min.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>
  <h2 style="text-align: center;"> <i class="fas fa-car"></i> Alquileres en España</h2>

  <Nav>
    <NavItem>
      <NavLink href="/"><Button color="primary">Página Inicial</Button></NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="/#/rentals"><Button color="primary">Datos</Button></NavLink>
    </NavItem>
</Nav>

  <div id="graph"></div>
  <p>Muestra datos sobre el alquiler en provincias de España</p>
</main>

<style>
</style>