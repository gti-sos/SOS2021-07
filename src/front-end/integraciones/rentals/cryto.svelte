<script>
    import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    let Data = [];
    let Coins = [];
    let myData =[];
    async function loadGraph() {
        const resCoins = await fetch("https://coinpaprika1.p.rapidapi.com/exchanges", {
	"method": "GET",
	"headers": {
		'x-rapidapi-key': '9b2b2f4d65msh643a2276d42fb51p1e4972jsn8ab58ddd82c9',
        'x-rapidapi-host': 'coinpaprika1.p.rapidapi.com',
        useQueryString: true
	}
});

        const resDataHappiness_rate = await fetch("/api/v1/rentals");
        let Happy = await resDataHappiness_rate.json();
        
        let DataRental = Happy.map((x) => {
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
                    name: "Ranking de Felicidad",
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
                text: 'Relación entre el número de mercados en la que se usa la criptomoneda y el Ranking de Felicidad'
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
            Gráfica que muestra el ranking de felicidad y el número de mercados en la que se usa la criptomoneda.
        </p>
    </figure>
    <div style="text-align:center;padding-bottom: 3%;">
    <Button outline align = "center" color="secondary" on:click="{pop}">Volver</Button>
    </div>

</main>