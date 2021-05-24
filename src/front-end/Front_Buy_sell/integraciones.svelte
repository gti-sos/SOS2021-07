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