<script>

import Error404 from "./error404.svelte";
import Init from "./init.svelte";
import Router from 'svelte-spa-router';
import RentalsAPI from "./rentalsAPI.svelte";


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