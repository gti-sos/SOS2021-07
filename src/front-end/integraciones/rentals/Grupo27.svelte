<script>
    import { onMount } from "svelte";
    import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
    async function loadGraph() {
        const invercionData = await fetch("/api/v2/province-budget-and-investment-in-social-promotion");
        const rentalsData = await fetch("/api/v1/rentals");
        let invercion = await invercionData.json();
        let rentals = await rentalsData.json();
        
        console.log(Life);
        let data_Rentals = rentals.map((x) => {
            let res = {
                name: x.province + " - " + x.year,
                value: x["rent"]
            };
            return res;
        });
        let data_Invercion = invercion.map((x) => {
            let res = {
                name: x.province + " - " + x.year,
                value: x["invest_promotion"]
            };
            return res;
        });
        let dataTotal =
            [
                {
                    name: "Renta",
                    data: data_Rentals
                },
                {
                    name: "Inversión en promoción social",
                    data: data_Invercion
                }
            ];
        Highcharts.chart('container', {
            chart: {
                type: 'packedbubble',
                height: '40%'
            },
            title: {
                text: 'Relación entre edad de la Media de la Esperanza de Vida y el Ranking de Felicidad'
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
                    zMax: 1000,
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
</svelte:head>

<main>

    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description" align = "center">
            Gráfica que muestra el ranking de felicidad y la media de la esperanza de vida.
        </p>
    </figure>


</main>