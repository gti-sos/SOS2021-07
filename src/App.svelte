<script lang="ts">
  
	

	import NotFound from "./NotFound.svelte";
	import Router from 'svelte-spa-router';
	import Rentals from "./Rentals.svelte";
	import Init from "./Init.svelte";
	import Unemployment from "./Unemployment.svelte";
	import Buy_sell from "./Buy_sell.svelte";

	const routes = {
		"/info ":Init,
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