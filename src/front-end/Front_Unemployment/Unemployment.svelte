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
    UncontrolledAlert,
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
    youth_unemployment_rate: "",
    province: "",
    year: "",
    unemployment_rate: "",
    occupation_variation: "",
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

  //API
  let unemploymentData = [];
  let error = null;

  //Functions

  async function loadStats() {
    console.log("Loading data...");
    const res = await fetch("/api/v2/unemployment/loadInitialData").then(
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
      const res = await fetch("/api/v2/unemployment/" + fullQuery);
      if (res.ok) {
        console.log("OK");
        const json = await res.json();
        unemploymentData = json;
        error = 0;
      } else {
        unemploymentData = [];
        if (res.status === 404) {
          errorMsg = "No se encuentra el dato solicitado";
          error = 404;
        } else if (res.status === 500) {
          errorMsg = "No se han podido acceder a la base de datos";
          error = 1000;
        } else if (res.status === 400) {
          errorMsg =
            "Búsqueda errónea. Rellene únicamente los campos comunidad autónoma, provincia y/o año.";
          error = 1006;
        }
        okMsg = "";
        console.log("ERROR!" + errorMsg);
      }
    } else {
      errorMsg = "";
      error = 1005;
      getStats();
    }
  }

  //Total de datos en la BD
  async function getNumTotal() {
    const res = await fetch("/api/v2/unemployment");
    if (res.ok) {
      const json = await res.json();
      total = json.length;
      console.log("getTOAL: " + total);
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
    console.log("Change page...");
    console.log("Params page: " + page + " offset: " + offset);
    last_page = Math.ceil(total / limit);
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
    console.log("Exit change page...");
  }

  async function getStats() {
    console.log("Fetching data...");

    const res = await fetch(
      "/api/v2/unemployment?limit=" + limit + "&offset=" + current_offset
    );

    if (res.ok) {
      console.log("Ok");
      const json = await res.json();
      unemploymentData = json;
      console.log(`We have received ${unemploymentData.length} stats.`);
      getNumTotal();
    } else {
      console.log("Error");
    }
    init = false;
  }

  async function deleteStats() {
    console.log("Deleting data...");

    const res = await fetch("/api/v2/unemployment/", {
      method: "DELETE",
    }).then(function (res) {
      if (res.ok) {
        console.log("OK");
        unemploymentData = [];
        error = 0;
      } else if ((res.status = 404)) {
        error = 404;
        console.log("ERROR Data not found in database");
      } else {
        error = 1000;
        console.log("ERROR");
      }
    });
  }

  async function deleteStat(autonomous_community, province, year) {
    console.log(
      `Deleting data with name ${autonomous_community}, ${province} and date ${year}`
    );

    const res = await fetch(
      "/api/v2/unemployment/" +
        autonomous_community +
        "/" +
        province +
        "/" +
        year,
      {
        method: "DELETE",
      }
    ).then(function (res) {
      if (res.ok) {
        console.log("OK");
        if (unemploymentData.length == 1) {
          unemploymentData = [];
          currentPage = 1;
        }
        errorMsg = "";
        error = 0;
        getStats();
      } else {
        if (res.status == 404) {
          errorMsg = "No existe el dato a borrar";
        } else if (res.status == 500) {
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
    newData["unemployment_rate"] = parseFloat(newData["unemployment_rate"]);
    newData["occupation_variation"] = parseFloat(
      newData["occupation_variation"]
    );

    const res = await fetch("/api/v2/unemployment/", {
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
        error = 0;
      } else {
        if (res.status === 400) {
          errorMsg = "Inserción incompleta.";
          error = 400;
        } else if (res.status === 500) {
          errorMsg = "No se han podido acceder a la base de datos";
        } else if (res.status == 409) {
          errorMsg = "Conflicto de carga.";
          error = 409;
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
      <NavLink href="/#/unemployment/unemployment_highchart_graphic"
        ><Button color="primary">Gráfico HighChart</Button></NavLink
      >
    </NavItem>

    <NavItem>
      <NavLink href="/#/unemployment/unemployment_rgraph_graphic"
        ><Button color="primary">Gráfico RGraph</Button></NavLink
      >
    </NavItem>

    <NavItem>
      <NavLink href="#" on:click={toggle1}
        ><Button color="primary">Cargar datos inciales</Button></NavLink
      >
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
      {#if unemploymentData.length === 0}
        <NavLink disabled href="#" on:click={toggle2}
          ><Button color="primary">Borrar Todo</Button></NavLink
        >
      {:else}
        <NavLink href="#" on:click={toggle2}
          ><Button color="primary">Borrar Todo</Button></NavLink
        >
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

  <h2>Datos Desempleo</h2>

  <!-- Alerts -->
  {#if error === 0}
    <UncontrolledAlert color="success">
      Operación realizada correctamente.
    </UncontrolledAlert>
  {/if}

  {#if error === 409}
    <UncontrolledAlert color="warning">
      El dato o los datos a cargar ya existen en la base de datos.
    </UncontrolledAlert>
  {:else if error === 404}
    <UncontrolledAlert color="warning">
      No se encuentra en la base de datos.
    </UncontrolledAlert>
  {:else if error === 1000}
    <UncontrolledAlert color="danger">Error desconocido.</UncontrolledAlert>
  {:else if error === 1005}
    <UncontrolledAlert color="danger">
      Búsqueda vacía. Por favor, rellene los campos comunidad autónoma,
      provincia y/o año.
    </UncontrolledAlert>
  {:else if error === 1006}
    <UncontrolledAlert color="danger">
      Búsqueda errónea. Por favor, rellene únicamente los campos comunidad
      autónoma, provincia y/o año.
    </UncontrolledAlert>
  {:else if error === 400}
    <UncontrolledAlert color="danger">
      Inserción errónea. Por favor, rellene todos los campos.
    </UncontrolledAlert>
  {/if}

  <!-- Table -->
  {#if unemploymentData.length === 0}
    <p>
      No se han encontrado datos, por favor carga los datos iniciales o inserte
      uno usted mismo/a.
    </p>

    <Table borderer>
      <thead>
        <tr>
          <th>Comunidad autónoma</th>
          <th>Tasa de desempleo juvenil</th>
          <th>Provincia</th>
          <th>Año</th>
          <th>Tasa de desempleo</th>
          <th>Variación de ocupación</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td
            ><input
              type="text"
              id="input_autonomous_community"
              placeholder="andalucia"
              bind:value={newData.autonomous_community}
            />
          </td>

          <td>
            <input
              type="number"
              id="input_youth_unemployment_rate"
              placeholder="52.1912"
              min="1"
              bind:value={newData["youth_unemployment_rate"]}
            />
          </td>

          <td>
            <input
              type="text"
              id="input_province"
              placeholder="malaga"
              bind:value={newData.province}
            />
          </td>

          <td
            ><input
              type="number"
              id="input_year"
              placeholder="2020"
              min="1900"
              bind:value={newData.year}
            /></td
          >
          <td
            ><input
              type="number"
              id="input_unemployment_rate"
              placeholder="19.3225"
              min="1"
              bind:value={newData["unemployment_rate"]}
            /></td
          >
          <td
            ><input
              type="number"
              id="input_occupation_variation"
              placeholder="32.79998"
              min="1.0"
              bind:value={newData["occupation_variation"]}
            /></td
          >
          <td
            ><Button color="primary" on:click={insertStat}>Insertar</Button></td
          >
        </tr>
      </tbody>
    </Table>
  {:else}
    <Table borderer>
      <thead>
        <tr>
          <th>Comunidad Autónoma </th>
          <th>Tasa de desempleo juvenil </th>
          <th>Provincia </th>
          <th>Año </th>
          <th>Tasa de desempleo </th>
          <th>Variación de ocupación </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td
            ><input
              type="text"
              id="input_autonomous_community"
              placeholder="andalucia"
              bind:value={newData.autonomous_community}
            /></td
          >
          <td
            ><input
              type="number"
              id="input_youth_unemployment_rate"
              placeholder="52.1912"
              min="1"
              bind:value={newData["youth_unemployment_rate"]}
            /></td
          >
          <td
            ><input
              type="text"
              id="input_province"
              placeholder="malaga"
              bind:value={newData.province}
            /></td
          >
          <td>
            <input
              type="number"
              id="input_year"
              placeholder="2020"
              min="1900"
              bind:value={newData.year}
            />
          </td>

          <td>
            <input
              type="number"
              id="input_unemployment_rate"
              placeholder="19.3225"
              min="1"
              bind:value={newData["unemployment_rate"]}
            />
          </td>

          <td>
            <input
              type="number"
              id="input_occupation_variation"
              placeholder="32.79998"
              min="1.0"
              bind:value={newData["occupation_variation"]}
            />
          </td>

          <td>
            <Button color="primary" on:click={insertStat}>Insertar</Button>
          </td>
          <td>
            <Button color="secondary" on:click={searchStat}>Buscar</Button>
          </td>
        </tr>

        {#each unemploymentData as stat}
          <tr>
            <td>{stat.autonomous_community}</td>
            <td>{stat["youth_unemployment_rate"]}</td>
            <td>{stat.province}</td>
            <td>{stat.year}</td>
            <td>{stat["unemployment_rate"]}</td>
            <td>{stat["occupation_variation"]}</td>
            <td>
              <a
                href="#/unemployment/{stat.autonomous_community}/{stat.province}/{stat.year}"
              >
                <Button color="primary">Editar</Button>
              </a></td
            >
            <td
              ><Button
                color="danger"
                on:click={deleteStat(
                  stat.autonomous_community,
                  stat.province,
                  stat.year
                )}>Borrar</Button
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
          href="#/unemployment"
          on:click={() => changePage(current_page - 1, current_offset - limit)}
        />
      </PaginationItem>
      {#each range(last_page, 1) as page}
        <PaginationItem class={current_page === page ? "active" : ""}>
          <PaginationLink
            previous
            href="#/unemployment"
            on:click={() => changePage(page, (page - 1) * 10)}
            >{page}</PaginationLink
          >
        </PaginationItem>
      {/each}
      <PaginationItem class={current_page === last_page ? "disabled" : ""}>
        <PaginationLink
          next
          href="#/unemployment"
          on:click={() => changePage(current_page + 1, current_offset + limit)}
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
