<script>
  import { Button, Nav, NavItem, NavLink } from "sveltestrap";

  async function loadGraph() {
    var url = new URL(
      "https://edamam-food-and-grocery-database.p.rapidapi.com/parser"
    );
    var params = { ingr: "apple" };
    url.search = new URLSearchParams(params).toString();

    const resDataFood = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "488a208a16msh97eb3347246d6e0p1c28dcjsn150c2b140e36",
        "x-rapidapi-host": "edamam-food-and-grocery-database.p.rapidapi.com",
      },
    });

    let foodData = await resDataFood.json();

    let data = [];
    let labels = [];

    foodData.hints.forEach((x) => {
      let alimento = x.food;
      labels.push(alimento.label);
      data.push(parseFloat(alimento.nutrients.CHOCDF));
    });
    let newLabels = labels.slice(1, 9);
    let newData = data.slice(1, 9);

    new RGraph.Radar({
      id: "cvs",
      data: [newData],
      options: {
        backgroundCirclesPoly: false,
        backgroundCirclesSpacing: 55,
        colors: ["transparent"],
        axesColor: "transparent",
        highlights: true,
        colorsStroke: ["green"],
        linewidth: 4,
        labels: newLabels,
        labelsAxes: "n",
        textSize: 8,
      },
    })
      .trace()
      .responsive([
        {
          maxWidth: null,
          width: 500,
          height: 400,
          css: { float: "right" },
        },
        {
          maxWidth: 600,
          width: 300,
          height: 300,
          css: { float: "none" },
        },
      ]);
  }
</script>

<svelte:head>
  <script
    src="https://www.rgraph.net/libraries/src/RGraph.common.core.js"></script>
  <script
    src="https://www.rgraph.net/libraries/src/RGraph.common.effects.js"></script>
  <script
    src="https://www.rgraph.net/libraries/src/RGraph.radar.js"
    on:load={loadGraph}></script>
</svelte:head>

<main>
  <div style="height: 400px; float:left">
    <canvas id="cvs" width="500" height="400"> [No canvas support] </canvas>
    <h1 class="love-description">Uso externo de Edaman Food</h1>
    <p class="love-description">
      Observa la relación de azúcar que tienen las manzanas según su variedad
      🍏.
    </p>

    <Nav>
      <NavItem>
        <NavLink href="/"
          ><Button color="primary">Página Inicial</Button></NavLink
        >
      </NavItem>
      <NavItem>
        <NavLink href="/#/integrations"
          ><Button color="primary">Volver</Button></NavLink
        >
      </NavItem>
    </Nav>
  </div>
</main>
