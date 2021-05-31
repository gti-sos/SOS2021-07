<script lang="ts">
  
	
	import NotFound from "./front-end/complementos/NotFound.svelte";
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
	import Buy_sell_Integraciones from "./front-end/Front_Buy_sell/Buy_sell_Integraciones.svelte";
	import Buy_sell_VIH from "./front-end/Front_Buy_sell/Buy_sell_VIH.svelte";
	import Buy_sell_Chart_NL from "./front-end/Front_Buy_sell/Buy_sell_Chart_NL.svelte";
	import Buy_sell_Chart_ZING from "./front-end/Front_Buy_sell/Buy_sell_Chart_ZING.svelte";
	import Buy_sell_Analiticas from "./front-end/Front_Buy_sell/Buy_sell_Analiticas.svelte";
	import Rentals_Graphic from "./front-end/Front_Rentals/graficos.svelte";
	import Rentals_Graphic2 from "./front-end/Front_Rentals/graficos3.svelte";
	import Unemployment_Chart from "./front-end/Front_Unemployment/Unemployment_Chart.svelte";
	import Info from "./front-end/complementos/info.svelte";
	import Integracion_G27_Tristan from "./front-end/integraciones/rentals/G27.svelte";
	import IntegracionExt_Educacion from "./front-end/integraciones/rentals/Ext1_educacion.svelte";
	import Integracion_G30_Tristan from "./front-end/integraciones/rentals/G30.svelte";
	import cartas from "./front-end/integraciones/rentals/Ext2_cartas.svelte";
	import Covid19_Tristan from "./front-end/integraciones/rentals/Covid.svelte";
	import Grafico_Comun from "./front-end/complementos/Grafico_Comun.svelte";

	const routes = {
		"/":Init,
		"/info": Info,
		"/integrations":IntegracionesInit,
		"/integrations/G27_rentals":Integracion_G27_Tristan,
		"/integrations/G30_rentals":Integracion_G30_Tristan,
		"/integrations/Ext2_Cartas":cartas,
		"/integrations/Covid":Covid19_Tristan,
		"/integrations/Ext1_educacion":IntegracionExt_Educacion,
		"/common-graphic":Grafico_Comun,
		"/rentals": Rentals,
		"/rentals/:province/:year":RentalsEdit,
		"/unemployment": Unemployment,
		"/unemployment/:autonomous_community/:province/:year":UnemploymentEdit,
		"/buy_sell": Buy_sell,
		"/buy_sell/:autonomous_community/:province/:year":Buy_sellEdit,
		"/buy_sell/buy_sell_Charts":Buy_sell_Chart,
		"/buy_sell/integraciones":Buy_sell_Integraciones,
		"/buy_sell/VIH":Buy_sell_VIH,
		"/buy_sell/graficaNL":Buy_sell_Chart_NL,
		"/buy_sell/graficaZING":Buy_sell_Chart_ZING,
		"/buy_sell/analiticas":Buy_sell_Analiticas,
		"/rentals/rentals_graphic":Rentals_Graphic,
		"/rentals/rentals_graphic2":Rentals_Graphic2,
		"/unemployment/unemployment_graphic":Unemployment_Chart,
		'*': NotFound};
</script>

<main>
	<Router {routes}> </Router>
</main>

<style>
</style>