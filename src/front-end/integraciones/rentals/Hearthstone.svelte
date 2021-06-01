

<script>
      import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    async function loadGraph() {
       
        const resDataHearthstone = await fetch("https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/classes/Priest?cost=1", {
	        "method": "GET",
	        "headers": {
                "x-rapidapi-key": "9b2b2f4d65msh643a2276d42fb51p1e4972jsn8ab58ddd82c9",
	            "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com",
	            
	        }
        });
        
        let HearthstoneData = await resDataHearthstone.json();

        let Hearthstone1 = HearthstoneData.map((x) => {
            let res = {
                name: x.name,
                y: parseInt(x["attack"])
            };
            return res;
        });

      console.log();
        let dataTotal =
            [
                
                {
                    name: "Ataque de las criaturas",
                    data: Hearthstone1
                }

            ];

            Highcharts.chart('container', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Browser market shares in January, 2018'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: ' puntos'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },
    series: [{
        name: 'ataque',
        colorByPoint: true,
        data: Hearthstone1
    }]
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
        <Button outline align = "center" color="secondary" on:click="{pop}"> Volver</Button>
        </div>
</main>