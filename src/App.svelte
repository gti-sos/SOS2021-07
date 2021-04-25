<script>

import Error404 from "./Error404.svelte";
import Init from "./Init.svelte";
import Router from 'svelte-spa-router';
import RentalsAPI from "./RentalsAPI.svelte";


	const componentes = {
		"/":Init,
		"/rentals": RentalsAPI,
		'*': Error404};
</script>

<main>
	<Router {componentes}> </Router>
</main>

<style>
	
</style>