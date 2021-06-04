<script>
  import { onMount } from "svelte";
  import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
  var v = [];
  var l = [];
  async function loadGraph() {
    const DatosUnemployment = await fetch("/api/v2/unemployment");

    if (DatosUnemployment.ok) {
      const json_unemployment = await DatosUnemployment.json();
      var unemploymentData = json_unemployment;
    } else {
      console.log("ERROR!");
    }

    var provinciaA1 = unemploymentData[0].province;
    var provinciaA2 = unemploymentData[1].province;

    var url = new URL("https://love-calculator.p.rapidapi.com/getPercentage");
    var params = { fname: provinciaA1, sname: provinciaA2 };
    url.search = new URLSearchParams(params).toString();

    const resDataLoveCalculator1 = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "488a208a16msh97eb3347246d6e0p1c28dcjsn150c2b140e36",
        "x-rapidapi-host": "love-calculator.p.rapidapi.com",
      },
      params: {
        fname: provinciaA1,
        sname: provinciaA2,
      },
    });

    let loveCalculatorData = await resDataLoveCalculator1.json();

    //OTRA PAREJA
    var provinciaB1 = unemploymentData[2].province;
    var provinciaB2 = unemploymentData[3].province;

    var url = new URL("https://love-calculator.p.rapidapi.com/getPercentage");
    var params = { fname: provinciaB1, sname: provinciaB2 };
    url.search = new URLSearchParams(params).toString();

    const resDataLoveCalculator2 = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "488a208a16msh97eb3347246d6e0p1c28dcjsn150c2b140e36",
        "x-rapidapi-host": "love-calculator.p.rapidapi.com",
      },
      params: {
        fname: provinciaB1,
        sname: provinciaB2,
      },
    });

    let loveCalculatorData2 = await resDataLoveCalculator2.json();

    new RGraph.Gauge({
      id: "cvs",
      min: 0,
      max: 100,
      value: [loveCalculatorData.percentage, 0],
      options: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15,
        marginBottom: 15,

        // Configure the top titles appearance
        titleTop:
          "¿CUÁNTO AMA " + loveCalculatorData.fname.toUpperCase() + " A..",
        titleTopSize: 10,
        titleTopFont: "arial",
        titleTopColor: "pink",
        titleTopSize: 8,
        titleTopItalic: true,

        // Configure the bottom titles appearance
        titleBottom: ".." + loveCalculatorData.sname.toUpperCase() + "?",
        titleBottomSize: 8,
        titleBottomItalic: true,
        titleBottomFont: "arial",
        titleBottomColor: "pink",
        titleBottomPos: 0.7,

        // The rest of the configuration for the Gauge chart - the needle,
        // centerpin, tickmarks and the border
        colorsRanges: [
          [90, 100, "pink"],
          [80, 90, "red"],
          [40, 80, "orange"],
          [0, 40, "green"],
        ],
        backgroundColor: "black",
        backgroundGradient: true,
        centerpinColor: "pink",
        needleSize: [null, 0],
        needleColors: [
          "Gradient(transparent:white:white:white:white:white)",
          "Gradient(transparent:#d66:#d66:#d66:#d66)",
        ],
        textColor: "white",
        tickmarksLargeColor: "white",
        tickmarksMediumColor: "white",
        tickmarksSmallColor: "white",
        borderOuter: "pink",
        borderInner: "purple",
      },
    })
      .draw()
      .responsive([
        {
          maxWidth: null,
          css: { float: "none" },
          parentCss: { textAlign: "none", float: "left" },
        },
        {
          maxWidth: 600,
          css: { float: "none" },
          parentCss: { textAlign: "center", float: "none" },
        },
      ]);

    //OTRO
    new RGraph.Gauge({
      id: "cvs2",
      min: 0,
      max: 100,
      value: [loveCalculatorData2.percentage, 0],
      options: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15,
        marginBottom: 15,

        // Configure the top titles appearance
        titleTop:
          "¿CUÁNTO AMA " + loveCalculatorData2.fname.toUpperCase() + " A..",
        titleTopSize: 10,
        titleTopFont: "arial",
        titleTopColor: "pink",
        titleTopSize: 8,
        titleTopItalic: true,

        // Configure the bottom titles appearance
        titleBottom: ".." + loveCalculatorData2.sname.toUpperCase() + "?",
        titleBottomSize: 8,
        titleBottomItalic: true,
        titleBottomFont: "arial",
        titleBottomColor: "pink",
        titleBottomPos: 0.7,

        // The rest of the configuration for the Gauge chart - the needle,
        // centerpin, tickmarks and the border
        colorsRanges: [
          [90, 100, "pink"],
          [80, 90, "red"],
          [40, 80, "orange"],
          [0, 40, "green"],
        ],
        backgroundColor: "black",
        backgroundGradient: true,
        centerpinColor: "pink",
        needleSize: [null, 0],
        needleColors: [
          "Gradient(transparent:white:white:white:white:white)",
          "Gradient(transparent:#d66:#d66:#d66:#d66)",
        ],
        textColor: "white",
        tickmarksLargeColor: "white",
        tickmarksMediumColor: "white",
        tickmarksSmallColor: "white",
        borderOuter: "pink",
        borderInner: "purple",
      },
    })
      .draw()
      .responsive([
        {
          maxWidth: null,
          css: { float: "none" },
          parentCss: { textAlign: "none", float: "left" },
        },
        {
          maxWidth: 600,
          css: { float: "none" },
          parentCss: { textAlign: "center", float: "none" },
        },
      ]);
  }
  loadGraph();
</script>

<svelte:head>
  <script
    src="https://www.rgraph.net/libraries/src/RGraph.common.core.js"></script>
  <script
    src="https://www.rgraph.net/libraries/src/RGraph.gauge.js"
    on:load={loadGraph}></script>
</svelte:head>

<main>
  <div style="height: 400px; float:left">
    <canvas id="cvs" width="300" height="300">[No canvas support]</canvas>
    <canvas id="cvs2" width="300" height="300">[No canvas support]</canvas>
    <h1 class="love-description">Integración externa con Love Calculator.</h1>
    <p class="love-description">
      Dadas dos parejas de provincias, calcula cuánto se quieren.
    </p>
    <p class="love-description" style="color:blueviolet;">
      Vive la expriencia del amor interprovincial español y descubre quién se
      quiere más ♥.
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
