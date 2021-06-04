<script>
  import { Button, Nav, NavItem, NavLink } from "sveltestrap";

  async function loadGraph() {
    let rgraphUnemploymentData = [];
    let rgraphG30Data = [];

    const DatosUnemployment = await fetch("/api/v2/unemployment");

    if (DatosUnemployment.ok) {
      const json_unemployment = await DatosUnemployment.json();
      rgraphUnemploymentData = json_unemployment;
    } else {
      console.log("ERROR!");
    }

    const DatosG30 = await fetch("/proxySmoker");

    if (DatosG30.ok) {
      const json_g30 = await DatosG30.json();
      rgraphG30Data = json_g30;
    } else {
      console.log("ERROR!");
    }

    let labels_unemp = [];
    let labels_g30 = [];
    let data_unemp = [];
    let data_g30 = [];

    let acum_unemp = [];
    let acum_g30 = [];

    for (var i = 0; i <= 1; i++) {
      let dato_unemployment = rgraphUnemploymentData[i];
      let dato_g30 = rgraphG30Data[i];
      let ocup_var_positive = parseFloat(
        dato_unemployment.occupation_variation
      );
      if (ocup_var_positive < 0) ocup_var_positive = ocup_var_positive * -1;

      labels_unemp.push(dato_unemployment.province);
      labels_g30.push(dato_g30.province);

      data_unemp.push(ocup_var_positive);
      acum_unemp.push(ocup_var_positive + 10400.0);

      data_g30.push(parseFloat(dato_g30.dailySmoker));
      acum_g30.push(
        parseFloat(dato_g30.ocasionalSmoker) +
          parseFloat(dato_g30.exSmoker) +
          parseFloat(dato_g30.nonSmoker) +
          parseFloat(dato_g30.dailySmoker)
      );
    }

    // These global settings are applied to all objects that are created
    // subsequently. If you're creating multiple charts that use the same
    // properties and settings you can use the RGraph.SVG.GLOBALS object
    // to 'centralise' the configuration.
    RGraph.SVG.GLOBALS = {
      colors: ["#666"],
      donut: true,
      donutWidth: 30,
      marginLeft: 5,
      marginRight: 5,
      marginTop: 5,
      marginBottom: 5,
    };

    // Create the outer Donuts background
    var pie1a = new RGraph.SVG.Pie({
      id: "chart-container",
      data: [acum_unemp[0]],
      options: {},
    }).draw();

    // Create the outer Donut. This chart shows the real values.
    var pie1b = new RGraph.SVG.Pie({
      id: "chart-container",
      data: [data_unemp[0], acum_unemp[0] - data_unemp[0]],
      options: {
        colors: ["blue", "transparent"],
      },
    }).roundRobin();

    // Create the second Donuts background. Note the reduction in the
    // radius setting.
    var pie2a = new RGraph.SVG.Pie({
      id: "chart-container",
      data: [acum_unemp[1]],
      options: {
        radius: pie1a.radius - 33,
      },
    }).draw();

    // Create the second Donuts foreground. It uses the same radius
    // as the above Donut.
    var pie2b = new RGraph.SVG.Pie({
      id: "chart-container",
      data: [data_unemp[1], acum_unemp[1] - data_unemp[1]],
      options: {
        radius: pie2a.radius,
        colors: ["blue", "transparent"],
      },
    }).roundRobin();

    // Create the background for the third Donut chart. The radius has
    // been reduced again from the second Donut chart.
    var pie3a = new RGraph.SVG.Pie({
      id: "chart-container",
      data: [acum_g30[0]],
      options: {
        radius: pie2a.radius - 33,
      },
    }).draw();

    // The foreground for the third donut chart.
    var pie3b = new RGraph.SVG.Pie({
      id: "chart-container",
      data: [data_g30[0], acum_g30[0] - data_g30[0]],
      options: {
        radius: pie3a.radius,
        colors: ["red", "transparent"],
      },
    }).roundRobin();

    // The background for the fourth Donut chart. Again,
    // the radius has been reduced from the previous
    // Donut chart.
    var pie4a = new RGraph.SVG.Pie({
      id: "chart-container",
      data: [acum_g30[1]],
      options: {
        radius: pie3a.radius - 33,
      },
    }).draw();

    // The foreground for the the fourth Donut chart.
    var pie4b = new RGraph.SVG.Pie({
      id: "chart-container",
      data: [data_g30[1], acum_g30[1] - data_g30[1]],
      options: {
        radius: pie4a.radius,
        colors: ["red", "transparent"],
      },
    }).roundRobin();

    // Add some custom text - the label - for the outer Donut chart.
    RGraph.SVG.text({
      object: pie1a,
      text: "(" + String(data_unemp[0]) + ") " + labels_unemp[0],
      x: pie1a.centerx - 5,
      y: pie1a.centery - pie1a.radius + RGraph.SVG.GLOBALS.donutWidth / 2,
      color: "white",
      bold: true,
      halign: "right",
      valign: "center",
      background: "blue",
      padding: 2,
    });

    // The label for the second Donut.
    RGraph.SVG.text({
      object: pie1a,
      text: "(" + String(data_unemp[1]) + ") " + labels_unemp[1],
      x: pie2a.centerx - 5,
      y: pie2a.centery - pie2a.radius + RGraph.SVG.GLOBALS.donutWidth / 2,
      color: "white",
      bold: true,
      halign: "right",
      valign: "center",
      background: "blue",
      padding: 2,
    });

    // The label for the third Donut.
    RGraph.SVG.text({
      object: pie1a,
      text: "(" + String(data_g30[0]) + ") " + labels_g30[0],
      x: pie3a.centerx - 5,
      y: pie3a.centery - pie3a.radius + RGraph.SVG.GLOBALS.donutWidth / 2,
      color: "white",
      bold: true,
      halign: "right",
      valign: "center",
      background: "red",
      padding: 2,
    });

    // The label for the fourth Donut - the innermost one.
    RGraph.SVG.text({
      object: pie1a,
      text: "(" + String(data_g30[1]) + ") " + labels_g30[1],
      x: pie4a.centerx - 5,
      y: pie4a.centery - pie4a.radius + RGraph.SVG.GLOBALS.donutWidth / 2,
      color: "white",
      bold: true,
      halign: "right",
      valign: "center",
      background: "red",
      padding: 2,
    });
  }
</script>

<svelte:head>
  <script
    src="https://www.rgraph.net/libraries/src/RGraph.svg.common.core.js"></script>
  <script
    src="https://www.rgraph.net/libraries/src/RGraph.svg.pie.js"
    on:load={loadGraph}></script>
</svelte:head>

<main>
  <div style="height: 400px; float:left">
    <div
      style="width: 350px; background-color:black; height: 350px; border-radius: 5px"
      id="chart-container">
  </div>
    <Nav>
      <NavItem>
        <Button style="background-color:blue">Variación de la ocupación</Button>
      </NavItem>
      <NavItem>
        <Button style="background-color:red">Fumadores diarios</Button>
      </NavItem>
    </Nav>

    <h1 class="pie-description">Integración con G30 - Smoker Stats.</h1>
    <p class="pie-description">
      Muestra, en unidades, en azul la variación de la ocupación de las
      provincias y en rojo el número de fumadores diarios de las comunidades
      autónomas.
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
