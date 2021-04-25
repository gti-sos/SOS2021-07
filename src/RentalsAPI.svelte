<script>
	import {
	  Nav,
	  Modal,
	  ModalBody,
	  ModalFooter,
	  ModalHeader,
	  NavItem,
	  NavLink,
	  Button,
	  Table,
	  UncontrolledAlert ,
	} from "sveltestrap";
  
	// Nav
  
	//Load
	let open1 = false;
	const toggle1 = () => (open1 = !open1);
	const toggle1P = () => {
	  open1 = !open1;
	  loadStats();
	};
	//Delete
	let open2 = false;
	const toggle2 = () => (open2 = !open2);
	const toggle2P = () => {
	  open2 = !open2;
	  deleteStats();
	};
  
	//Alerts
	let visible = true;
  
	//API
	let rentalsData = [];
	let error = null;
  
	//Functions
	async function loadStats() {
	  console.log("Cargando Datos...");
	  const res = await fetch("api/v1/rentals/loadInitialData").then(
		function (res) {
		  if (res.ok) {
			console.log("OK");
			getStats();
			error = 0;
		  } else if (res.status == 409) {
			error = 409;
			console.log("Conflict");
		  } else {
			error = 404;
			console.log("Error");
		  }
		}
	  );
	}
  
	async function getStats() {
	  console.log("Fetching data...");
  
	  const res = await fetch("api/v1/rentals/");
  
	  if (res.ok) {
		console.log("Ok");
		const json = await res.json();
		rentalsData = json;
		console.log(`We have received ${rentalsData.length} contacs.`);
	  } else {
		console.log("Error");
	  }
	  init = false;
	}
  
	async function deleteStats() {
	  console.log("Eliminando datos...");
  
	  const res = await fetch("api/v1/rentals/", {
		method: "DELETE",
	  }).then(function (res) {
		if (res.ok) {
		  console.log("OK");
		  rentalsData = [];
		  error = 0;
		} else if (res.status = 404) {
		  error = 404;
		  console.log("No data found");
		} else {
		  error = 1000;
		  console.log("ERROR");
		}
	  });
	}
  
	getStats();
  </script>
  
  <main>
	<Nav>
	  <NavItem>
		<NavLink href="/">Volver</NavLink>
	  </NavItem>
	  <NavItem>
		<NavLink href="#" on:click={toggle1}>Cargar datos inciales</NavLink>
		<Modal isOpen={open1} {toggle1}>
		  <ModalHeader {toggle1}>¿Cargar los datos iniciales?</ModalHeader>
		  <ModalBody>
			Esta acción cargará los datos siempre y cuando no existan previamente.
		  </ModalBody>
		  <ModalFooter>
			<Button color="primary" on:click={toggle1P}>Cargar</Button>
			<Button color="secondary" on:click={toggle1}>Cancelar</Button>
		  </ModalFooter>
		</Modal>
	  </NavItem>
	  <NavItem>
		{#if rentalsData.length ===0}
		<NavLink disabled href="#" on:click={toggle2}>Borrar todos los datos</NavLink>
		{:else}
		<NavLink href="#" on:click={toggle2}>Borrar todos los datos</NavLink>
		<Modal isOpen={open2} {toggle2}>
		  <ModalHeader {toggle2}>¿Borrar todos los datos?</ModalHeader>
		  <ModalBody>Esta acción no se puede deshacer.</ModalBody>
		  <ModalFooter>
			<Button color="danger" on:click={toggle2P}>Borrar</Button>
			<Button color="secondary" on:click={toggle2}>Cancelar</Button>
		  </ModalFooter>
		</Modal>
		{/if}
	  </NavItem>
	</Nav>
	<h2>Natality Stats</h2>
  
   
	<!-- Alerts -->
	  {#if error === 0}
		<UncontrolledAlert  color="success" >
			Operación realizada correctamente.
		  
		</UncontrolledAlert>
	  {/if}
  
	  {#if error === 409}
		<UncontrolledAlert  color="warning" >
			Los datos ya se encuentran cargados.
		  
		</UncontrolledAlert>
	  {:else if error === 404}
		<UncontrolledAlert  color="danger">
			No se encuentra en la base de datos.
		  
		</UncontrolledAlert>
	  {:else if error ===1000}
		<UncontrolledAlert  color="danger" >
		 Error desconocido.
		</UncontrolledAlert>
	  {/if}
	
  <!-- Table -->
	{#if rentalsData.length === 0}
	  <p>No hay ningun dato para mostrar. Pruebe a cargar los datos iniciales</p>
	{:else}
	  <Table borderer>
		<thead>
		  <tr>
			<th> autonomous_community </th>
			<th>province </th>
			<th>year </th>
			<th>rent </th>
			<th>rent_variation</th>
			<th>meter</th>
			<th>salary </th>
		  </tr>
		</thead>
		<tbody>
		  {#each rentalsData as Data}
			<tr>
			  <td>{Data["autonomous_community"]}</td>
			  <td>{Data["province"]}</td>
			  <td>{Data["year"]}</td>
			  <td>{Data["rent"]}</td>
			  <td>{Data["rent_variation"]}</td>
			  <td>{Data["meter"]}</td>
			  <td>{Data["salary"]}</td>
			</tr>
		  {/each}
		</tbody><tbody />
	  </Table>
	{/if}
  </main>
  
  <style>
	main {
	  text-align: center;
	  padding: 1em;
	  margin: 0 auto;
	}
  
	h2 {
	  text-transform: uppercase;
	  font-size: 4em;
	  font-weight: 100;
	}
  </style>