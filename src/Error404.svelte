<script>
	import {
		Button
	  } from "sveltestrap";
	</script>
	
	<main>
	  <h2>404</h2>
	<h4>Vaya! No hemos encontrado lo que nos pides</h4>
	<p>La página que buscabas no existe. Comprueba que hayas escrito bien la dirrección.</p>
	<p>Disculpe las molestias</p>
	  <a href="/">
		<Button color="primary">Volver a la página Inicial</Button></a>
	
	</main>
	
	<style>
		main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
		max-width: 380px;
	  }
	  h2{
		font-size: 100px;
	  }
	  h4{
		background-color: grey;
		color: white;
		padding: 10px;
		margin: 5px;
		
	  }
	</style>