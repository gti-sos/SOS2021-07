<script>
  import { Button, Nav, NavItem, NavLink } from "sveltestrap";

  async function loadGraph() {
    let rgraphUnemploymentData = [];
    let rgraphG06Data = [];

    const DatosUnemployment = await fetch("/api/v2/unemployment");

    if (DatosUnemployment.ok) {
      const json_unemployment = await DatosUnemployment.json();
      rgraphUnemploymentData = json_unemployment;
    } else {
      console.log("ERROR!");
    }

    const DatosG06 = await fetch(
      "https://sos2021-06.herokuapp.com/api/v1/onlinemedia-stats"
    );

    if (DatosG06.ok) {
      const json_g06 = await DatosG06.json();
      rgraphG06Data = json_g06;
    } else {
      console.log("ERROR!");
    }

    let labels = [];
    let data = [];

    for (var i = 0; i <= 4; i++) {
      let dato_unemployment = rgraphUnemploymentData[i];
      let dato_g06 = rgraphG06Data[i];
      labels.push(dato_unemployment.province+"\n"+dato_g06.online_media);
      data.push([
        parseFloat(dato_unemployment.unemployment_rate),
        parseFloat(dato_g06.account_price_per_month)
      ]);
    }

    new RGraph.Bar({
      id: "cvs",
      data: data,
      options: {
        colors: ["#024E4E", "#009997"],
        xaxisLabels: labels,
        xaxis: false,
        yaxis: false,
        backgroundGridVlines: false,
        backgroundGridHlinesCount: 7,

        // The Y axis on this chart has seven values (eight if you
        // include zero) instead of five and the maximum value is
        // specifically set to 1,400,000
        yaxisLabelsCount: 5,
        yaxisScaleMax: 35,

        // The key is specified to appear in the margin and is aligned to
        // the left-hand-side of the main chart area.
        key: ["Unemployment rate", "Account price/month"],
        keyPosition: "margin",
        keyPositionX: 100,

        // The title is specified but is aligned to the left-hand-side
        // of the main chart area.
        title: "Precio de las principales plataformas de entretenimiento en según que provincias relacionadas con el desempleo.",

        titleX: 100,
        titleY: 0,
        titleBold: true,
        titleHalign: "left",

        // Use formatted tooltips to show tooltips
        tooltips:
          '<i>Results for <b style="font-size: 14pt">%{property:key[%{index}]}</b> in <b style="font-size: 14pt">%{property:xaxisLabels[%{group}]}</b>:</i><br /><span style="font-size: 20pt">$%{value_formatted}</span>',

        // Add some CSS values which are applied to the tooltip
        tooltipsCss: {
          textAlign: "center",
        },
        textAccessible: false,
      },
    })
      .draw()
      .on("beforedraw", function (obj) {
        RGraph.clear(obj.canvas, "white");
      })
      .responsive([
        {
          maxWidth: 1500,
          width: 800,
          height: 800,
          options: { textSize: 14, marginInner: 10, marginLeft: 100 },
          parentCss: { float: "left" },
        },
        {
          maxWidth: 1500,
          width: 700,
          height: 600,
          options: { textSize: 10, marginInner: 10, marginLeft: 50 },
          parentCss: { float: "none" },
        },
      ]);
  }
</script>

<svelte:head>
  <script
    src="https://www.rgraph.net/libraries/src/RGraph.common.core.js"></script>
  <script
    src="https://www.rgraph.net/libraries/src/RGraph.common.key.js"></script>
  <script
    src="https://www.rgraph.net/libraries/src/RGraph.bar.js"
    on:load={loadGraph}></script>
</svelte:head>

<main>
  <div style="height: 400px; float:left">
    <canvas id="cvs" width="500" height="400"> [No canvas support] </canvas>
    <p class="rgraph-description">Integración con G06 - onlinemedia-stats.</p>
    <p class="rgraph-description">Precio de las principales plataformas de entretenimiento relacionadas con el desempleo en según que provincias.</p>

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
