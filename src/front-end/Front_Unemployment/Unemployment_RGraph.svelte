<script>
    import { Button, Nav, NavItem, NavLink } from "sveltestrap";

    async function loadGraph() {
        console.log("1");
        let rgraphUnemploymentData = [];

        const DatosUnemployment = await fetch("/api/v2/unemployment");
        console.log(2);

        if (DatosUnemployment.ok) {
            const json = await DatosUnemployment.json();
            rgraphUnemploymentData = json;
        } else {
            console.log("ERROR!");
        }
        console.log(3);

        let labels_unemp = [];
        let data_unemp = [];
        let data_youth_unemp = [];

        for (var i = 0; i <= 10; i++) {
            let dato = rgraphUnemploymentData[i];
            labels_unemp.push(dato.province);
            data_youth_unemp.push(parseFloat(dato.youth_unemployment_rate));
            data_unemp.push(parseFloat(dato.unemployment_rate));
        }

        new RGraph.Radar({
            id: "cvs",
            data: [data_unemp, data_youth_unemp],
            options: {
                backgroundCirclesPoly: true,
                backgroundCirclesSpacing: 30,
                colors: ["transparent"],
                axesColor: "transparent",
                highlights: true,
                colorsStroke: ["red", "black"],
                linewidth: 3,
                labels: labels_unemp,
                labelsAxes: "n",
                textSize: 10,
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
        <h1 class="rgraph-description">Gráfico de desempleo RGraph.</h1>

        <Nav>
            <NavItem>
                <NavLink href="/"
                    ><Button color="primary">Página Inicial</Button></NavLink
                >
            </NavItem>
            <NavItem>
                <NavLink href="/#/unemployment"
                    ><Button color="primary">Volver</Button></NavLink
                >
            </NavItem>
        </Nav>
    </div>
</main>
