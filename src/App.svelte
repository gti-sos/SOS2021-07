<script lang="ts">
  
	import NotFound from "./front-end/complementos/NotFound.svelte";
	import about from "./front-end/complementos/Acerca_de.svelte";
	import Router from 'svelte-spa-router';
	import IntegracionesInit from "./front-end/complementos/Integraciones_Init.svelte"
	import Rentals from "./front-end/Front_Rentals/Rentals.svelte";
	import Init from "./front-end/complementos/Init.svelte";
	import Unemployment from "./front-end/Front_Unemployment/Unemployment.svelte";
	import UnemploymentEdit from "./front-end/Front_Unemployment/Unemployment_Editor.svelte";
	import RentalsEdit from "./front-end/Front_Rentals/Rentals_Editor.svelte";
	import Buy_sell from "./front-end/Front_Buy_sell/Buy_sell.svelte";
	import Buy_sellEdit from "./front-end/Front_Buy_sell/Buy_sell_Editor.svelte";
	import Buy_sell_Chart from "./front-end/Front_Buy_sell/Buy_sell_Chart.svelte";
	import Buy_sell_VIH from "./front-end/integraciones/buysell/Buy_sell_VIH.svelte";
	import Buy_sell_natality from "./front-end/integraciones/buysell/Buy_sell_natality.svelte";
	import Buy_sell_Chart_NL from "./front-end/Front_Buy_sell/Buy_sell_Chart_NL.svelte";
	import Buy_sell_Chart_ZING from "./front-end/Front_Buy_sell/Buy_sell_Chart_ZING.svelte";
	import Buy_sell_Analiticas from "./front-end/Front_Buy_sell/Buy_sell_Analiticas.svelte";
	import Buy_sell_IP from "./front-end/integraciones/buysell/Buy_sell_IP.svelte";
	import Buy_sell_random from "./front-end/integraciones/buysell/Buy_sell_random.svelte";
	import Buy_sell_APEX from "./front-end/integraciones/buysell/Buy_sell_APEX.svelte";
	import Buy_sell_another from "./front-end/integraciones/buysell/Buy_sell_another.svelte";
	import Buy_sell_pobreza from "./front-end/integraciones/buysell/Buy_sell_pobreza.svelte";
	import Rentals_Graphic from "./front-end/Front_Rentals/graficos.svelte";
	import Rentals_Graphic2 from "./front-end/Front_Rentals/graficos3.svelte";
	import Unemployment_HighChart from "./front-end/Front_Unemployment/Unemployment_HighChart.svelte";
	import Unemployment_RGraph from "./front-end/Front_Unemployment/Unemployment_RGraph.svelte";
	import Info from "./front-end/complementos/info.svelte";
	import Integracion_G27_Tristan from "./front-end/integraciones/rentals/G27.svelte";
	import Integracion_G06_Alex from "./front-end/integraciones/unemployment/G06.svelte";
	import Integracion_G30_Alex from "./front-end/integraciones/unemployment/G30.svelte";
	import Integracion_LoveCalculator_Alex from "./front-end/integraciones/unemployment/LoveCalculator.svelte";
	import Integracion_Food_Alex from "./front-end/integraciones/unemployment/EdamanFood.svelte";
	import IntegracionExt_Educacion from "./front-end/integraciones/rentals/Ext1_educacion.svelte";
	import Integracion_G30_Tristan from "./front-end/integraciones/rentals/G30.svelte";
	import cartas from "./front-end/integraciones/rentals/Ext2_cartas.svelte";
	import Pokemon from "./front-end/integraciones/rentals/pokedex.svelte";
	import SW from "./front-end/integraciones/rentals/SW.svelte";
	import moneda from "./front-end/integraciones/rentals/cryto.svelte";
	import NBA from "./front-end/integraciones/rentals/NBA.svelte";
	import Hearthstone from "./front-end/integraciones/rentals/Hearthstone.svelte";
	import Covid19_Tristan from "./front-end/integraciones/rentals/Covid.svelte";
	import Grafico_Comun from "./front-end/complementos/Grafico_Comun.svelte";

	const routes = {
		"/":Init,
		"/info": Info,
		"/integrations":IntegracionesInit,
		"/about":about,
		"/integrations/G27_rentals":Integracion_G27_Tristan,
		"/integrations/G30_rentals":Integracion_G30_Tristan,
		"/integrations/G06_unemployment":Integracion_G06_Alex,
		"/integrations/G30_unemployment":Integracion_G30_Alex,
		"/integrations/love_calculator":Integracion_LoveCalculator_Alex,
		"/integrations/food":Integracion_Food_Alex,
		"/integrations/Ext2_Cartas":cartas,
		"/integrations/Pokemon":Pokemon,
		"/integrations/SW":SW,
		"/integrations/NBA":NBA,
		"/integrations/crypto":moneda,
		"/integrations/Hearthstone":Hearthstone,
		"/integrations/Covid":Covid19_Tristan,
		"/integrations/Ext1_educacion":IntegracionExt_Educacion,
		"/analytics":Grafico_Comun,
		"/rentals": Rentals,
		"/rentals/:province/:year":RentalsEdit,
		"/unemployment": Unemployment,
		"/unemployment/:autonomous_community/:province/:year":UnemploymentEdit,
		"/buy_sell": Buy_sell,
		"/buy_sell/:autonomous_community/:province/:year":Buy_sellEdit,
		"/buy_sell/buy_sell_Charts":Buy_sell_Chart,
		"/buy_sell/VIH":Buy_sell_VIH,
		"/buy_sell/graficaNL":Buy_sell_Chart_NL,
		"/buy_sell/graficaZING":Buy_sell_Chart_ZING,
		"/buy_sell/analiticas":Buy_sell_Analiticas,
		"/buy_sell/natality":Buy_sell_natality,
		"/buy_sell/IP":Buy_sell_IP,
		"/buy_sell/random":Buy_sell_random,
		"/buy_sell/APEX":Buy_sell_APEX,
		"/buy_sell/another":Buy_sell_another,
		"/buy_sell/pobreza":Buy_sell_pobreza,
		"/rentals/rentals_graphic":Rentals_Graphic,
		"/rentals/rentals_graphic2":Rentals_Graphic2,
		"/unemployment/unemployment_highchart_graphic":Unemployment_HighChart,
		"/unemployment/unemployment_rgraph_graphic":Unemployment_RGraph,
		'*': NotFound};
</script>

<main>
	<Router {routes}> </Router>
</main>

<style>
</style>