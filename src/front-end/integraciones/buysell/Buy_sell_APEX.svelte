<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
	import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

    async function loadGraph() {
        let SmokingData = [];
        let SmokingDataGraph = [];
        const resData = await fetch("https://sos2021-11.herokuapp.com/api/v2/smoking_stats");
        SmokingData = await resData.json();
        console.log(SmokingData);
        SmokingData.forEach((x) => {
            SmokingDataGraph.push({
                name: x.country + " " + x.year,
                data: [
                    "",
                    parseInt(x.smoking_men),
                    parseInt(x.smoking_women),
                    parseInt(x.smoking_population),
                    "",
                ],
                pointPlacement: "on",
            });
        });
        am4core.ready(function() {
            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end
            var chart = am4core.create("chartdiv", am4charts.PieChart);
            chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
            chart.data =SmokingData;
            chart.radius = am4core.percent(100);
            chart.innerRadius = am4core.percent(40);
            chart.startAngle = 180;
            chart.endAngle = 360;  
            var series = chart.series.push(new am4charts.PieSeries());
            series.dataFields.value ="smoking_population" ;
            series.dataFields.category ="country" ;
            series.slices.template.cornerRadius = 10;
            series.slices.template.innerCornerRadius = 7;
            series.slices.template.draggable = true;
            series.slices.template.inert = true;
            series.alignLabels = false;
            series.hiddenState.properties.startAngle = 90;
            series.hiddenState.properties.endAngle = 90;
            chart.legend = new am4charts.Legend();
}); // end am4core.ready()
    }
loadGraph();
</script>

<svelte:head>
    
</svelte:head>


<main>
    <h2>INTEGRACION DE API 11</h2>
    <div id="chartdiv"></div>
    <p class="highcharts-description">
      Gráfico donde mostramos los datos de la poblacion fumadora de cada pais
    </p>
    <Button outline color="secondary" on:click={pop}>
      <i class="fas fa-arrow-circle-left" /> Volver
  </Button>
</main>

<style>
     h2 {
    color: #ff9900;
    text-align: center;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
   
    
    
   
</style>