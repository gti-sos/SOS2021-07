<script lang="ts">
  
	
	import NotFound from "./front-end/complementos/NotFound.svelte";
	import Router from 'svelte-spa-router';
	import Rentals from "./front-end/Front_Rentals/Rentals.svelte";
	import Init from "./front-end/complementos/Init.svelte";
	import Unemployment from "./front-end/Front_Unemployment/Unemployment.svelte";
	import Buy_sell from "./front-end/Front_Buy_sell/Buy_sell.svelte";
	import Info from "./front-end/complementos/info.svelte";
	const routes = {
		"/":Init,
		"/info": Info,
		"/rentals": Rentals,
		"/unemployment": Unemployment,
		"/buy_sell": Buy_sell,
		'*': NotFound};
</script>

<main>
	<Router {routes}> </Router>
</main>

<style>
</style>