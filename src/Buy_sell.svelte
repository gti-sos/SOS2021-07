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
  let buy_sellData = [];
  let error = null;

  //Functions
  async function loadStats() {
    console.log("Loading data...");
    const res = await fetch("api/v1/buy_sell/loadInitialData").then(
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

    const res = await fetch("api/v1/buy_sell/");

    if (res.ok) {
      console.log("Ok");
      const json = await res.json();
      buy_sellData = json;
      console.log(`We have received ${buy_sellData.length} contacs.`);
    } else {
      console.log("Error");
    }
    init = false;
  }

  async function deleteStats() {
    console.log("Deleting data...");

    const res = await fetch("api/v1/buy_sell/", {
      method: "DELETE",
    }).then(function (res) {
      if (res.ok) {
        console.log("OK");
        buy_sellData = [];
        error = 0;
      } else if (res.status = 404) {
        error = 404;
        console.log("ERROR Data not found in database");
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
      {#if buy_sellData.length ===0}
      <NavLink disabled href="#" on:click={toggle2}>Borrar todos los datos</NavLink>
      {:else}
      <NavLink href="#" on:click={toggle2}>Borrar todos los datos</NavLink>
      <Modal isOpen={open2} {toggle2}>
        <ModalHeader {toggle2}>¿Borrar todos los datos?</ModalHeader>
        <ModalBody>Esta acción no se puede deshacer.</ModalBody>
        <ModalFooter>
          <Button color="danger" on:click={toggle2P}>Borrar</Button>
          <Button color="secoondary" on:click={toggle2}>Cancelar</Button>
        </ModalFooter>
      </Modal>
      {/if}
    </NavItem>
  </Nav>
  <h2>Buy Sell Data</h2>

 
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
  {#if buy_sellData.length === 0}
    <p>No se han encontrado datos, por favor carga los datos iniciales.</p>
  {:else}
    <Table borderer>
      <thead>
        <tr>
          <th> autonomous_community </th>
          <th>province </th>
          <th>year </th>
          <th>surface </th>
          <th>annual_variation_percentage </th>
          <th>eviction </th>
        </tr>
      </thead>
      <tbody>
        {#each buy_sellData as stat}
          <tr>
            <td>{stat.autonomous_community}</td>
            <td>{stat.province}</td>
            <td>{stat.year}</td>
            <td>{stat['surface'] }</td>
            <td>{stat['annual_variation_percentage']}</td>
            <td>{stat['eviction']}</td>
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
