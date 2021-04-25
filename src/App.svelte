<script lang="ts">
  
	

	import NotFound from "./NotFound.svelte";
	import Router from 'svelte-spa-router';
	import Rentals from "./Rentals.svelte";
	import Init from "./Init.svelte";

	const routes = {
		"/":Init,
		"/rentals": Rentals,

		'*': NotFound};
</script>

<main>
	<Router {routes}> </Router>
</main>

<style>

</style>