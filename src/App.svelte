<script lang="ts">
  
	
	import NotFound from "./front-end/complementos/NotFound.svelte";
	import Router from 'svelte-spa-router';
	import Rentals from "./front-end/Front_Rentals/Rentals.svelte";
	import Init from "./front-end/complementos/Init.svelte";
	import Unemployment from "./front-end/Front_Unemployment/Unemployment.svelte";
	import UnemploymentEdit from "./front-end/Front_Unemployment/Unemployment_Editor.svelte";
	import RentalsEdit from "./front-end/Front_Rentals/Rentals_Editor.svelte";
	import Buy_sell from "./front-end/Front_Buy_sell/Buy_sell.svelte";
	import Buy_sellEdit from "./front-end/Front_Buy_sell/Buy_sell_Editor.svelte";
	import Buy_sell_Chart from "./front-end/Front_Buy_sell/Buy_sell_Chart.svelte";
	import Rentals_Graphic from "./front-end/Front_Rentals/graficos.svelte";
	import Unemployment_Chart from "./front-end/Front_Unemployment/Unemployment_Chart.svelte";
	import Info from "./front-end/complementos/info.svelte";
	import Grafico_Comun from "./front-end/complementos/Grafico_Comun.svelte";

	const routes = {
		"/":Init,
		"/info": Info,
		"/common-graphic":Grafico_Comun,
		"/rentals": Rentals,
		"/rentals/:province/:year":RentalsEdit,
		"/unemployment": Unemployment,
		"/unemployment/:autonomous_community/:province/:year":UnemploymentEdit,
		"/buy_sell": Buy_sell,
		"/buy_sell/:autonomous_community/:province/:year":Buy_sellEdit,
		"/buy_sell/buy_sell_Charts":Buy_sell_Chart,
		"/rentals/rentals_graphic":Rentals_Graphic,
		"/unemployment/unemployment_graphic":Unemployment_Chart,
		'*': NotFound};
</script>

<main>
	<Router {routes}> </Router>
</main>

<style>
</style>