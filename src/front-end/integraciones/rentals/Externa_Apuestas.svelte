<script>
    import { onMount } from "svelte";
    import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
    let Data = [];
    let Coins = [];
    async function loadGraph() {
        const resCoins = await fetch("https://coinpaprika1.p.rapidapi.com/exchanges", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "SIGN-UP-FOR-KEY",
	    "x-rapidapi-host": "coinpaprika1.p.rapidapi.com",
	    "useQueryString": true
	}
});

        const rentalsData = await fetch("/api/v1/rentals");
        let Rentals = await rentalsData.json();
        
        let data_Rentals = Rentals.map((x) => {
            let res = {
                name: x.autonomous_community+", "+x.province + " (" + x.year + ") ",
                value: x["salary"]
            };
            return res;
        });
        Coins = await resCoins.json();
        console.log(Coins);
        Coins.forEach((x) => {
            let coin = {
                'name': x.name,
		        'value': x.markets
            };
           
            Data.push(coin);

        }); 
       
        let dataTotal =
            [
                {
                    name: "Renta",
                    data: data_Rentals
                },
                {
                    name: "Nombre de la Criptomoneda",
                    data: Data
                }
            ];
        Highcharts.chart('container', {
            chart: {
                type: 'packedbubble',
                height: '40%'
            },
            title: {
                text: 'Relación entre el número de mercados en la que se usa la criptomoneda y el salario en España'
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


</main>