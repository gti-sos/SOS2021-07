
<script>
    import Button from "sveltestrap/src/Button.svelte";
    async function loadGraph() {
        
        const resDataEduacionGastos = await fetch("https://covid19.secuoyas.io/api/v1/es/ccaa?ultimodia=true");
        

        
        let Data1 = await resDataEduacionGastos.json();
        

       
        let dataGastos_Educacion = Data1.map((x) => {
            let res = {
                name: x.nombreLugar + " - " +  "(hoy)",
                value: x["casosRecuperadosDiario"]
            };
            return res;
        });
        
        let dataTotal =
            [
                
                {
                    name: "Gasto en educación por capital",
                    data: dataGastos_Educacion
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
            Gráfica muestra los datos de en conjunto del porcentaje de salio por provincias de españa y el gasto en educacion segun capital en paises del mundo
        </p>
    </figure>

</main>