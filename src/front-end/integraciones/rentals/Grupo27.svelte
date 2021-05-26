<script>
    import Button from "sveltestrap/src/Button.svelte";
    async function loadGraph() {
        const resDatahappiness_rate = await fetch("/api/v1/rentals");
        const resDataGlobal_Competitiveness = await fetch("https://education-expenditures.herokuapp.com/api/v1");
        

        let Data = await resDatahappiness_rate.json();
        let Data1 = await resDataGlobal_Competitiveness.json();
        

        let datahappiness_rate = Data.map((x) => {
            let res = {
                name: x.province + " - " + x.year,
                value: x["salary"]
            };
            return res;
        });
        let dataGlobal_Competitiveness = Data1.map((x) => {
            let res = {
                name: x.country + " - " + x.year,
                value: x["education_expenditure_per_millions"]
            };
            return res;
        });
        
        let dataTotal =
            [
                {
                    name: "Ranking de Felicidad por Paises",
                    data: datahappiness_rate
                },
                {
                    name: "Ranking de Competitividad Global",
                    data: dataGlobal_Competitiveness
                }
            ];
        Highcharts.chart('container', {
            chart: {
                type: 'packedbubble',
                height: '40%'
            },
            title: {
                text: 'Mezcla de APIs'
            },
            tooltip: {
                useHTML: true,
                pointFormat: '<b>{point.name}:</b> {point.value}'
            },
            plotOptions: {
                packedbubble: {
                    minSize: '30%',
                    maxSize: '120%',
                    zMin: 0,
                    zMax: 500,
                    layoutAlgorithm: {
                        splitSeries: false,
                        gravitationalConstant: 0.02
                    },
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}',
                        filter: {
                            property: 'y',
                            operator: '>',
                            value: 250
                        },
                        style: {
                            color: 'black',
                            textOutline: 'none',
                            fontWeight: 'normal'
                        }
                    }
                }
            },
            series: dataTotal
        });
    }
    loadGraph();
</script>

<svelte:head>

    <script src="https://code.highcharts.com/highcharts.js" on:load={loadGraph}></script>
    <script src="https://code.highcharts.com/highcharts-more.js" on:load={loadGraph}></script>
    <script src="https://code.highcharts.com/modules/exporting.js" on:load={loadGraph}></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load={loadGraph}></script>

</svelte:head>

<main>

    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description" align ="center">
            Gráfica que muestra los datos de las 3 APIs. Los Ranking de las diversas APIs
        </p>
    </figure>

</main>