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
  import { querystring } from "svelte-spa-router";
  
  ////////////////////////////////////// Nav  /////////////////////////////////////////////////////////////

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
    deleteAllStats();
  };
  
  /////////////////////////////// API //////////////////////////////////////////////////////////
  
  let buy_sell_Data = [];
  const BASE_CONTACT_API_PATH = "/api/v2";
  
  var insertStatInput = {
    autonomous_community: "",
    province: "",
    year: "",
    "surface": "",
    "annual_variation_percentage": "",
    "eviction": "",
  };
  
  var queryStatInput = {
    autonomous_community: "",
    province: "",
    year: "",
    "surface": "",
    "annual_variation_percentage": "",
    "eviction": "",
  };
  
  // -------------------- Alertas
  let isASearch = false;
  let errorMsg = "";
  let okMsg = "";
  let warningMsg = "";

  // ---------------------- Pagination
  let current_offset = 0;
  let limit = 10;

  let current_page = 1;
  let last_page = 1;
  let total = 0;

/////////////////////////////// FUNCIONES DE AYUDA ////////////////////////////////////////////

/**
   * Calcula la posicion de la pagina actual
   * @param size
   * @param startAt
   */
  function range(size, startAt = 0) {
    return [...Array(size).keys()].map((i) => i + startAt);
  }
  
  /**
   * Control del cambio de pagina
   * @param page
   * @param offset
   * @param search
   */
  function changePage(page, offset, search) {
    console.log("------Change page------");
    console.log(
      "Params page: " + page + " offset: " + offset + " search: " + search
    );
    last_page = Math.ceil(total / 10);
    console.log("new last page: " + last_page);
    if (page !== current_page) {
      console.log("enter if");
      current_offset = offset;
      current_page = page;
      console.log("page: " + page);
      console.log("current_offset: " + current_offset);
      console.log("current_page: " + current_page);
      if (search == false) {
        console.log(" search: false?" + search);
        getStats();
      } else {
        console.log(" search: true?" + search);
        searchStat();
      }
    }
    console.log("---------Exit change page-------");
  }
  
  /**
   * Total de elementos de una consulta
   */
  async function getNumTotal(fullQuery = "") {
    console.log("Fetching total entries");
    const res = await fetch(
      BASE_CONTACT_API_PATH + "/buy-sell" + fullQuery
    );
    if (res.ok) {
      const json = await res.json();
      total = json.length;
      changePage(current_page, current_offset, isASearch);
      console.log("getTotal: " + total);
    } else {
      total = 0;
      changePage(1, 0, false);
      console.log("ERROR!");
    }
  }
  
  /**
   * Reiniciar los inputs
   * @param flag
   */
  function resetInputs(flag) {
    console.log("Reseting inputs of: " + flag);
    switch (flag) {
      case "search":
        console.log("reseting search");
        queryStatInput = {
          autonomous_community: "",
    	  province: "",
    	  year: "",
    	  "surface": "",
 		  "annual_variation_percentage": "",
    	  "eviction": "",
        };
        current_page = 1;
        current_offset = 0;
        getStats();
        break;
      case "insert":
        console.log("reseting insert");
        insertStatInput = {
          autonomous_community: "",
    	  province: "",
    	  year: "",
    	  "surface": "",
    	  "annual_variation_percentage": "",
    	  "eviction": "",
        };
        break;
    }
  }
	
	//la que traduce
	
	function getInputNameSpanish(inputName) {
    switch (inputName) {
      case "autonomous_community":
        return "Comunidad Autónoma";
      case "province":
        return "Provincia";
      case "year":
        return "Año";
      case "surface":
        return "Superficie";
      case "annual_variation_percentage":
        return "Porcentaje de variación anual";
      case "eviction":
        return "Desalojo";
    }
  }
  
  ///////////////////////////////////// FUNCIONES DE LA API ////////////////////////////////////////77
  
  /**
   * LoadInitialData
   */
  async function loadStats() {
    console.log("Loading data...");
    const res = await fetch(
      BASE_CONTACT_API_PATH + "/buy-sell/loadInitialData"
    ).then(function (res) {
      if (res.ok) {
        getStats();
        errorMsg = "";
        okMsg = "Datos cargados correctamente";
        console.log("OK");
      } else {
        if (res.status === 409) {
          errorMsg = "Alguno de los datos ya se encuentran cargados";
        } else if (res.status === 500) {
          errorMsg = "No se ha podido acceder a la base de datos";
        }
        okMsg = "";
        console.log("ERROR!" + errorMsg);
      }
    });
  }
  
  /**
   * Get Stats
   */
  async function getStats() {
    console.log("Fetching data...");
    const res = await fetch(
      BASE_CONTACT_API_PATH +
        "/buy-sell?limit=" +
        limit +
        "&offset=" +
        current_offset
    );
    if (res.ok) {
      const json = await res.json();
      buy_sell_Data= json;
      console.log(`We have received ${buy_sell_Data.length} stats.`);
      isASearch = false;
      //errorMsg = "";
      warningMsg = "";
      getNumTotal();
      console.log("Ok");
    } else {
      if (buy_sell_Data.length == 0) {
        warningMsg = "No hay datos disponibles";
      }
      if (res.status === 500) {
        errorMsg = "No se ha podido acceder a la base de datos";
      }
      okMsg = "";
      console.log("ERROR!" + errorMsg);
    }
  }
  
  /**
   * Busqueda de elementos
   */
  async function searchStat() {
    console.log("Searching stat...");
    var msg = "";
    let fullQuery = "";
    let querySymbol = "?";
    //????
    if (isASearch == false) {
      current_offset = 0;
      current_page = 1;
    }
    //Input data
    var inputData = new Map(
      Object.entries(queryStatInput).filter((o) => {
        return o[1] != "";
      })
    );
    console.log(inputData);
    //Building query
    for (var [inputName, inputValue] of inputData.entries()) {
      
      if (inputValue !== null) {
        msg += getInputNameSpanish(inputName) + "=" + inputValue + " ";
        querySymbol += inputName + "=" + inputValue + "&";
      }
    }
    fullQuery = querySymbol.slice(0, -1);
    console.log("with query: " + fullQuery);
    if (fullQuery != "") {
      const res = await fetch(
        BASE_CONTACT_API_PATH +
          "/buy-sell/" +
          fullQuery +
          "&limit=" +
          limit +
          "&offset=" +
          current_offset
      );
      if (res.ok) {
        console.log("OK");
        const json = await res.json();
        buy_sell_Data = json;
        okMsg = "Resulado de la busqueda con " + msg;
        isASearch = true;
        errorMsg = "";
        getNumTotal(fullQuery);
      } else {
        buy_sell_Data = [];
        if (res.status === 404) {
          errorMsg = "No existe un dato con " + msg;
        } else if (res.status === 500) {
          errorMsg = "No se ha podido acceder a la base de datos";
        }
        okMsg = "";
        resetInputs("search");
        console.log("ERROR!" + errorMsg);
      }
    } else {
      getStats();
    }
  }
  
  // inserta
  
  async function insertStat() {
    console.log("Inserting stat: " + JSON.stringify(insertStatInput));
	
    //insertStatInput.autonomous_community = insertStatInput.autonomous_community;
    //insertStatInput.province = insertStatInput.province;
	
	insertStatInput.year = parseInt(insertStatInput.year);
	insertStatInput["surface"] = parseFloat(insertStatInput["surface"]);
    insertStatInput["annual_variation_percentage"] = parseFloat(insertStatInput["annual_variation_percentage"]);
    insertStatInput["eviction"] = parseFloat(insertStatInput["eviction"]);
    
    const res = await fetch(BASE_CONTACT_API_PATH + "/buy-sell/", {
      method: "POST",
      body: JSON.stringify(insertStatInput),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(function (res) {
      if (res.ok) {
        console.log("OK");
        errorMsg = "";
        okMsg = `La entrada ${insertStatInput.autonomous_community} ${insertStatInput.province} ${insertStatInput.year} ha sido insertada correctamente`;
        resetInputs("insert");
        if (isASearch) {
          searchStat();
        } else {
          getStats();
        }
      } else {
        if (res.status === 409) {
          errorMsg = `${insertStatInput.autonomous_community} ${insertStatInput.province} ${insertStatInput.year} ya se encuentra cargado`;
        } else if (res.status === 500) {
          errorMsg = "No se ha podido acceder a la base de datos";
        } else {
          errorMsg = "Todos los campos deben estar rellenados correctamene";
        }
        okMsg = "";
        resetInputs("insert");
        console.log("ERROR!" + errorMsg);
      }
    });
  }
  
  //borra
  
  async function deleteStat(autonomous_community, province, year) {
    console.log(`Deleting data with name ${autonomous_community} and province ${province} and year ${year}`);
    const res = await fetch(
      BASE_CONTACT_API_PATH + "/buy-sell/" + autonomous_community + "/" + province + "/" + year,
      {
        method: "DELETE",
      }
    ).then(function (res) {
      if (res.ok) {
        console.log("OK");
        //Un elemento en la pagina
        if (buy_sell_Data.length === 1) {
          buy_sell_Data = [];
          current_page = current_page - 1;
          current_offset = current_offset - 10;
        }
        if (isASearch) {
          searchStat();
        } else {
          getStats();
        }
        errorMsg = "";
        okMsg = `La entrada ${autonomous_community} ${province} ${year} ha sido borrada correctamente`;
      } else {
        if (res.status === 404) {
          errorMsg = `No se puede eliminar, la entrada ${autonomous_community} ${province} ${year} no existe`;
        } else if (res.status === 500) {
          errorMsg = "No se ha podido acceder a la base de datos";
        }
        okMsg = "";
        console.log("ERROR!" + errorMsg);
      }
    });
  }
  
  // borra todo
  
   async function deleteAllStats() {
    console.log("Deleting data...");
    const res = await fetch(BASE_CONTACT_API_PATH + "/buy-sell/", {
      method: "DELETE",
    }).then(function (res) {
      if (res.ok) {
        console.log("OK");
        buy_sell_Data = [];
        errorMsg = "";
        okMsg = "Todos los elementos han sido borrados";
        getNumTotal();
      } else {
        if (res.status === 404) {
          errorMsg = "No existen datos que borrar";
        } else if (res.status === 500) {
          errorMsg = "No se ha podido acceder a la base de datos";
        }
        okMsg = "";
        console.log("ERROR!" + errorMsg);
      }
    });
  }
  //functions executed
  onMount(getStats);
  getNumTotal();
  
  /////////////////////////////////////SCRIPT //////////////////////////////////////////////////7
  
  </script>

<main>
  <Nav>
    <NavItem>
      <NavLink href="/">Página Principal</NavLink>
    </NavItem>
  </Nav>

  <h2>COMPRA-VENTA</h2>

  <div>
    {#if errorMsg}
      <p class="msgRed" style="color: #9d1c24">ERROR: {errorMsg}</p>
    {/if}
    {#if okMsg}
      <p class="msgGreen" style="color: #155724">{okMsg}</p>
    {/if}
    {#if warningMsg}
      <p class="msgYellow" style="color: #a56604">{warningMsg}</p>
    {/if}
  </div>
  <div>
    <Button color="primary" on:click={toggle1}>Cargar datos inciales</Button>
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

    {#if buy_sell_Data.length === 0}
      <Button disabled color="danger" on:click={toggle2}
        >Borrar todos los datos</Button
      >
    {:else}
      <Button color="danger" on:click={toggle2}>Borrar todos los datos</Button>
      <Modal isOpen={open2} {toggle2}>
        <ModalHeader {toggle2}>¿Borrar todos los datos?</ModalHeader>
        <ModalBody>Esta acción no se puede deshacer.</ModalBody>
        <ModalFooter>
          <Button color="danger" on:click={toggle2P}>Borrar</Button>
          <Button color="secondary" on:click={toggle2}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    {/if}
  </div>

  <div>
    <h3>Listado de datos</h3>
    <Table bordered>
      <thead>
        <tr>
        <th> Comunidad Autónoma </th>
        <th>Provincia </th>
        <th>Año </th>
        <th>Superficie </th>
        <th>Porcentaje de variación anual </th>
        <th>Desalojo </th>
          <th colspan="2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td
            ><input
              type="text"
              placeholder="Ej Andalucía"
              bind:value={queryStatInput.autonomous_community}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder="Ej Granada"
              bind:value={queryStatInput.province}
            /></td
          >
          <td
            ><input
              type="number"
              placeholder="Ej 2021"
              min="1999"
              bind:value={queryStatInput.year}
            /></td
          >
          <td
            ><input
              type="number"
              placeholder="Ej 1000"
              min="0"
              bind:value={queryStatInput["surface"]}
            /></td
          >
          <td
            ><input
              type="number"
              placeholder="Ej 10"
              min="0"
              bind:value={queryStatInput["annual_variation_percentage"]}
            /></td
          >
          <td
            ><input
              type="number"
              placeholder="Ej 100"
              min="0"
              bind:value={queryStatInput["eviction"]}
            /></td
          >

          <td colspan="2"
            ><Button color="primary" on:click={searchStat}>Buscar</Button></td
          >
        </tr>
        <tr>
          <td colspan="9" />
        </tr>
        <tr>
          
		  <td
            ><input
              type="text"
              placeholder="Ej Andalucía"
              bind:value={queryStatInput.autonomous_community}
            /></td
          >
          <td
            ><input
              type="text"
              placeholder="Ej Granada"
              bind:value={queryStatInput.province}
            /></td
          >
          <td
            ><input
              type="number"
              placeholder="Ej 2021"
              min="1999"
              bind:value={queryStatInput.year}
            /></td
          >
          <td
            ><input
              type="number"
              placeholder="Ej 1000"
              min="0"
              bind:value={queryStatInput["surface"]}
            /></td
          >
          <td
            ><input
              type="number"
              placeholder="Ej 10"
              min="0"
              bind:value={queryStatInput["annual_variation_percentage"]}
            /></td
          >
          <td
            ><input
              type="number"
              placeholder="100"
              min="0"
              bind:value={queryStatInput["eviction"]}
            /></td
          >
		  
          <td colspan="2"
            ><Button color="primary" on:click={insertStat}>Insertar</Button></td
          >
        </tr>

        <tr>
          <td colspan="9" />
        </tr>

        {#each buy_sell_Data as stat}
          <tr>
            <td>{stat.autonomous_community}</td>
            <td>{stat.province}</td>
            <td>{stat.year}</td>
            <td>{stat["surface"]}</td>
            <td>{stat["annual_variation_percentage"]}%</td>
            <td>{stat["eviction"]}</td>
            <td>
              <a href="#/buy-sell/{stat.autonomous_community}/{stat.province}/{stat.year}">
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
  </div>

  <div>
    <p>Se muestran {buy_sell_Data.length} de un total de {total} entradas.</p>

    <!-- Pagination -->
    <Pagination ariaLabel="Web pagination">
      <PaginationItem class={current_page === 1 ? "disabled" : ""}>
        <PaginationLink
          previous
          href="#/buy-sell"
          on:click={() =>
            changePage(current_page - 1, current_offset - 10, isASearch)}
        />
      </PaginationItem>
      {#each range(last_page, 1) as page}
        <PaginationItem class={current_page === page ? "active" : ""}>
          <PaginationLink
            previous
            href="#/buy-sell"
            on:click={() => changePage(page, (page - 1) * 10, isASearch)}
            >{page}</PaginationLink
          >
        </PaginationItem>
      {/each}
      <PaginationItem class={current_page === last_page ? "disabled" : ""}>
        <PaginationLink
          next
          href="#/buy-sell"
          on:click={() =>
            changePage(current_page + 1, current_offset + 10, isASearch)}
        />
      </PaginationItem>
    </Pagination>
  </div>
</main>

<style>

main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
  p {
    display: inline;
  }
  .msgYellow {
    padding: 8px;
    background-color: #fff3cd;
  }
  .msgRed {
    padding: 8px;
    background-color: #f8d7da;
  }
  .msgGreen {
    padding: 8px;
    background-color: #d4edda;
  }
  div {
    margin-bottom: 20px;
  }
  h2 {
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
</style>