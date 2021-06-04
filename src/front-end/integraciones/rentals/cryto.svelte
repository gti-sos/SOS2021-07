<script>
    import { onMount } from "svelte";
    import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
    let Data = [];
    let Coins = [];
    let myData =[];
    async function loadGraph() {
        const resCoins = await fetch("https://api.coinpaprika.com/v1/exchanges");

        const resRentals = await fetch("/api/v1/rentals");
        let Rental = await resRentals.json();
        
        let DataRental = Rental.map((x) => {
            let res = {
                name: x.province + " - " + x.year,
                value: x["salary"]
            };
            return res;
        });
        Coins = await resCoins.json();
        let DataCoins = Coins.map((x) => {
            let res = {
                name: x.name,
                value: x["markets"] 
            };
            return res;
        });

        console.log(DataRental);
        console.log(DataCoins );
       
        let dataTotal =
            [
                {
                    name: "Salario %",
                    data: DataRental
                },
                {
                    name: "Nombre de la Criptomoneda",
                    data: DataCoins
                }
            ];
        Highcharts.chart('container', {
            chart: {
                type: 'packedbubble',
                height: '40%'
            },
            title: {
                text: 'Relación entre el número de mercados en la que se usa la criptomoneda y el salario de las provincias de españa'
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
    <script src="https://code.highcharts.com/highcharts.js" on:load={loadGraph}></script>
    <script src="https://code.highcharts.com/highcharts-more.js" on:load={loadGraph}></script>
    <script src="https://code.highcharts.com/modules/exporting.js" on:load={loadGraph}></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load={loadGraph}></script>
</svelte:head>

<main>

    <figure class="highcharts-figure">
        <div id="container"></div>
        
    </figure>
    <div style="text-align:center;padding-bottom: 3%;">
        <Nav>
            <NavItem>
              <NavLink href="/"><Button color="primary">Página Inicial</Button></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/#/integrations"><Button color="primary">Volver</Button></NavLink>
            </NavItem>
        </Nav>
    </div>

</main>