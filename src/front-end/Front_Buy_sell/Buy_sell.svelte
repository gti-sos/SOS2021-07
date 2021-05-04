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
    Pagination,
    PaginationItem,
    PaginationLink,
    UncontrolledAlert ,
  } from "sveltestrap";
  import { onMount } from "svelte";

  //Alertas
  let errorMsg = "";
  let okMsg = "";
  let errorStatus = 0;
  
  let fullQuery = "";

  //Pagination
  let current_offset = 0;
  let limit = 10;

  let current_page = 1;
  let last_page = 1;
  let total = 0;

  let newData = {
    autonomous_community: "",
    province: "",
    year: "",
   	"surface": "",
 	"annual_variation_percentage": "",
    "eviction": ""
  };

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
  let buy_sell_Data = [];
  let error = null;

  //Functions

  async function loadStats() {
    console.log("Loading data...");
    const res = await fetch("/api/v1/buy_sell/loadInitialData").then(
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

  async function searchStat() {
    console.log("Searching stat...");

    var campos = new Map(
      Object.entries(newData).filter((o) => {
        return o[1] != "";
      })
    );
    let querySymbol = "?";
    for (var [clave, valor] of campos.entries()) {
      querySymbol += clave + "=" + valor + "&";
    }
    fullQuery = querySymbol.slice(0, -1);

    if (fullQuery != "") {
      const res = await fetch(
        BASE_CONTACT_API_PATH + "/buy_sell/" + fullQuery
      );
      if (res.ok) {
        console.log("OK");
        const json = await res.json();
        buy_sell_Data = json;
        okMsg="Búsqueda realizada correctamente"
      } else {
        buy_sell_Data = [];
        if (res.status === 404) {
          errorMsg = "No se encuentra el dato solicitado";
        } else if (res.status === 500) {
          errorMsg = "No se han podido acceder a la base de datos";
        }
        okMsg = "";
        console.log("ERROR!" + errorMsg);
      }
    } else {
      errorMsg = "";
      okMsg = "Búsqueda realizada correctamente";
      getStats();
    }
  }

    //Total de datos en la BD
  async function getNumTotal() {
    const res = await fetch(
      "/api/v1/buy_sell");
    if (res.ok) {
      const json = await res.json();
      total = json.length;
      console.log("getTOTAL: " + total);
      changePage(current_page, current_offset);
    } else {
      errorMsg = "No se han encontrado datos.";
    }
  }
  //Calcula el rango entre ods valores
  function range(size, startAt = 0) {
    return [...Array(size).keys()].map((i) => i + startAt);
  }

    //Cambio de pagina
  function changePage(page, offset) {
    console.log("------Change page------");
    console.log("Params page: " + page + " offset: " + offset);
    last_page = Math.ceil(total / 10);
    console.log("new last page: " + last_page);
    if (page !== current_page) {
      console.log("enter if");
      current_offset = offset;
      current_page = page;
      console.log("page: " + page);
      console.log("current_offset: " + current_offset);
      console.log("current_page: " + current_page);
      getStats();
    }
    console.log("---------Exit change page-------");
  }

  async function getStats() {
    console.log("Fetching data...");

    const res = await fetch("/api/v1/buy_sell?limit=" +
      limit + 
      "&offset=" +
      current_offset
    );

    if (res.ok) {
      console.log("Ok");
      const json = await res.json();
      buy_sell_Data = json;
      console.log(`We have received ${buy_sell_Data.length} stats.`);
      getNumTotal();
    } else {
      console.log("Error");
    }
    init = false;
  }

  async function deleteStats() {
    console.log("Deleting data...");

    const res = await fetch("/api/v1/buy_sell/", {
      method: "DELETE",
    }).then(function (res) {
      if (res.ok) {
        console.log("OK");
        buy_sell_Data = [];
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

  async function deleteStat(autonomous_community, province, year) {
    console.log(`Deleting data with name ${autonomous_community}, ${province} and date ${year}`);

    const res = await fetch(
      "/api/v1/buy_sell/" + autonomous_community + "/" + province + "/" + year,
      {
        method: "DELETE",
      }
    ).then(function (res) {
      if (res.ok) {
        console.log("OK");
        if (buy_sell_Data.length == 1) {
          buy_sell_Data = [];
          currentPage = 1;
        }
        errorMsg = "";
        okMsg = "Operación realizada correctamente";
        getStats();
      } else {
        if(res.status==404){
          errorMsg = "No existe el dato a borrar";
        }else if(res.status ==500){
          errorMsg = "No se han podido acceder a la base de datos";
        }        
        okMsg = "";
        console.log("ERROR!" + errorMsg);
      }
    });
  }

  async function insertStat() {
    console.log("Inserting stat: " + JSON.stringify(newData));

    newData.autonomous_community = newData.autonomous_community;
    newData.province = newData.province;
    newData.year = parseInt(newData.year);
    newData["surface"] = parseFloat(newData["surface"]);
    newData["annual_variation_percentage"] = parseFloat(newData["annual_variation_percentage"]);
	newData["eviction"] = parseFloat(newData["eviction"]);

    const res = await fetch(
      "/api/v1/buy_sell/", {
      method: "POST",
      body: JSON.stringify(newData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(function (res) {
      if (res.ok) {
        console.log("OK");
        getStats();
        errorMsg = "";
        okMsg = "Operación realizada correctamente";
      } else {
        if(res.status===404){
          errorMsg = "No se encuentra el dato a borrar";
        }else if(res.status ===500){
          errorMsg = "No se han podido acceder a la base de datos";
        }        
        okMsg = "";
        console.log("ERROR!" + errorMsg);
      }
    });
  }

  onMount(getStats);
  getNumTotal();
</script>

<main>
  <Nav>
    <NavItem>
      <NavLink href="/"><Button color="primary">Volver</Button></NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="#" on:click={toggle1}><Button color="primary">Cargar datos inciales</Button></NavLink>
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
      {#if buy_sell_Data.length ===0}
      <NavLink disabled href="#" on:click={toggle2}><Button color="primary">Borrar Todo</Button></NavLink>
      {:else}
      <NavLink href="#" on:click={toggle2}><Button color="primary">Borrar Todo</Button></NavLink>
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
  <h2>Datos Compra-Venta</h2>

 
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
  {#if buy_sell_Data.length === 0}
    <p>No se han encontrado datos, por favor carga los datos iniciales o inserte uno usted mismo/a.</p>
    <Table borderer>
      <thead>
        <tr>
        <th> Comunidad Autónoma </th>
        <th>Provincia </th>
        <th>Año </th>
        <th>Superficie </th>
        <th>Porcentaje de variación anual </th>
        <th>Desalojo </th>
        </tr>
      </thead>
      <tbody>
        <tr>
        <td
          ><input
            type="text"
            placeholder=""
            bind:value={newData.autonomous_community}
          /></td
        >
        <td
          ><input
            type="text"
            placeholder=""
            bind:value={newData.province}
          /></td
        >
        <td
          ><input
            type="number"
            placeholder=""
            bind:value={newData.year}
          /></td
        >
        <td
          ><input
            type="number"
            placeholder=""
            bind:value={newData["surface"]}
          /></td
        >
        <td
          ><input
            type="number"
            placeholder=""
            bind:value={newData["annual_variation_percentage"]}
          /></td
        >
        <td
          ><input
            type="number"
            placeholder=""
            bind:value={newData["eviction"]}
          /></td
        >   
        <td><Button color="primary" on:click={insertStat}>Insertar</Button></td>
        </tr>
        </tbody>
        </Table>

  {:else}
    <Table borderer>
      <thead>
        <tr>
          <th> Comunidad Autónoma </th>
          <th>Provincia </th>
          <th>Año </th>
          <th>Superficie </th>
          <th>Porcentaje de variación anual </th>
          <th>Desalojo </th>
        </tr>
      </thead>
      <tbody>
        <tr>
        <td
          ><input
            type="text"
            placeholder=""
            bind:value={newData.autonomous_community}
          /></td
        >
        <td
          ><input
            type="text"
            placeholder=""
            bind:value={newData.province}
          /></td
        >
        <td
          ><input
            type="number"
            placeholder=""
            bind:value={newData.year}
          /></td
        >
        <td
          ><input
            type="number"
            placeholder=""
            bind:value={newData["surface"]}
          /></td
        >
        <td
          ><input
            type="number"
            placeholder=""
            bind:value={newData["annual_variation_percentage"]}
          /></td
        >
        <td
          ><input
            type="number"
            placeholder=""
            bind:value={newData["eviction"]}
          /></td
        >   
        <td><Button color="primary" on:click={insertStat}>Insertar</Button></td>
        <td>
          <Button color="secondary" on:click={searchStat}>Buscar</Button>
        </td>
      </tr>
      
        {#each buy_sell_Data as stat}
          <tr>
            <td>{stat.autonomous_community}</td>
            <td>{stat.province }</td>
            <td>{stat.year}</td>
            <td>{stat['surface']}</td>
            <td>{stat['annual_variation_percentage']}</td>
            <td>{stat['eviction']}</td>
            <td>
            <a href="#/buy_sell/{stat.autonomous_community}/{stat.province}/{stat.year}">
              <Button color="primary">Editar</Button>
            </a></td
          >
          <td
            ><Button
              color="danger"
              on:click={deleteStat(stat.autonomous_community, stat.province, stat.year)}>Borrar</Button
            ></td
          >
          </tr>
        {/each}
      </tbody>
    </Table>

    <!-- Pagination -->
  <Pagination ariaLabel="Web pagination">
    <PaginationItem class={current_page === 1 ? "disabled" : ""}>
      <PaginationLink
        previous
        href="#/buy_sell"
        on:click={() => changePage(current_page - 1, current_offset - 10)}
      />
    </PaginationItem>
    {#each range(last_page, 1) as page}
      <PaginationItem class={current_page === page ? "active" : ""}>
        <PaginationLink
          previous
          href="#/buy_sell"
          on:click={() => changePage(page, (page - 1) * 10)}
          >{page}</PaginationLink
        >
      </PaginationItem>
    {/each}
    <PaginationItem class={current_page === last_page ? "disabled" : ""}>
      <PaginationLink
        next
        href="#/buy_sell"
        on:click={() => changePage(current_page + 1, current_offset + 10)}
      />
    </PaginationItem>
  </Pagination>
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