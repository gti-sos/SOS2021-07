<script>

  import { onMount } from "svelte";
  import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
  
  const BASE_CONTACT_API_PATH = "/api/v2";
  export let params = {};
  
  let stat = {};
  let updateComunity = "XXXX";
  let updateProvince = "XXXX";
  let updateYear = 9999;
  let updateSurface  = 9999.9;
  let updateAnnual  = 9999.9;
  let updateEviction  =9999.9;
  let errorMsg = "";
  let okMsg = "";
  
  async function getStat() {
    console.log("Fetching stat..." + params.autonomous_community + " " + params.province + " " + params.year);
    const res = await fetch(
      BASE_CONTACT_API_PATH +
        "/buy-sell/" +
        params.autonomous_community +
        "/" +
        params.province +
		"/" +
		params.year);
		
    if (res.ok) {
      console.log("Ok:");
      const json = await res.json();
      stat = json;
      updateComunity = stat.autonomous_community;
      updateProvince = stat.province;
      updateYear = stat.year;
      updateSurface  = stat['surface'];
      updateAnnual  = stat['annual_variation_percentage'];
      updateEviction  = stat['eviction'];
      console.log("Received stat.");
    } else {
      if (res.status === 404) {
        errorMsg = `No existe dato con comunidad autonoma: ${params.autonomous_community} y provincia: ${params.province} y año: ${params.year}`;
      } else if (res.status === 500) {
        errorMsg = "No se han podido acceder a la base de datos";
      }
      okMsg = "";
      console.log("ERROR!" + errorMsg);
    }
  }
  async function updateStat() {
    console.log(
      "Updating stat..." +
        JSON.stringify(params.autonomous_community) +
        JSON.stringify(params.province) +
        JSON.stringify(params.year)
    );
    const res = await fetch(
      BASE_CONTACT_API_PATH +
        "/buy_sell/" +
        params.autonomous_community +
        "/" +
        params.province +
        "/" +
        params.year,
      {
        method: "PUT",
        body: JSON.stringify({
          autonomous_community: params.autonomous_community,
		  province: params.province,
          year: parseInt(params.year),
          "surface": parseFloat(updateSurface),
          "annual_variation_percentage": parseFloat(updateAnnual),
          "eviction": parseFloat(updateEviction),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(function (res) {
      if (res.ok) {
        console.log("OK");
        getStat();
        errorMsg = "";
        okMsg = `${params.autonomous_community} ${params.province} ${params.year} ha sido actualizado correctamente`;
      } else {
        if (res.status === 500) {
          errorMsg = "No se han podido acceder a la base de datos";
        } else if (res.status === 404) {
          errorMsg = "No se han encontrado el dato solicitado";
        } else if (res.status === 400) {
          errorMsg =
            "Todos los parámetros deben estar rellenados correctamente";
        }
        okMsg = "";
        getStat();
        console.log("ERROR!" + errorMsg);
      }
    });
  }
  onMount(getStat);
</script>

<main>
  <Nav>
    <NavItem>
      <NavLink href="#/buy-sell">Volver</NavLink>
    </NavItem>
  </Nav>

  <div>
    <h2>
      Editar campo <strong>{params.autonomous_community}</strong>
      <strong>{params.province}</strong>
	  <strong>{params.year}</strong>
    </h2>
  </div>

  <div>
    {#if errorMsg}
      <p class="msgRed" style="color: #9d1c24">ERROR: {errorMsg}</p>
    {/if}
    {#if okMsg}
      <p class="msgGreen" style="color: #155724">{okMsg}</p>
    {/if}
  </div>

  <div>
    <Table bordered>
      <thead>
        <tr>
          <th> Comunidad Autónoma </th>
    	  <th>Provincia </th>
          <th>Año </th>
          <th>Superficie </th>
          <th>Porcentaje de variación anual </th>
          <th>Desalojo </th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{updateComunity}</td>
          <td>{updateProvince}</td>
		  <td>{updateYear}</td>
          <td
            ><input
              type="number"
              placeholder="Ej 1000"
              min="0"
              bind:value={updateSurface}
            /></td
          >
          <td
            ><input
              type="number"
              placeholder="Ej 10"
              min="0"
              bind:value={updateAnnual}
            /></td
          >
          <td
            ><input
              type="number"
              placeholder="Ej 100"
              min="0"
              bind:value={updateEviction}
            /></td
          >
         
          <td>
            <Button outline color="primary" on:click={updateStat}
              >Actualizar</Button
            >
          </td>
        </tr>
      </tbody>
    </Table>
  </div>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
  div{
    margin-bottom: 15px;
  }
  p {
    display: inline;
  }
  .msgRed {
    padding: 8px;
    background-color: #f8d7da;
  }
  .msgGreen {
    padding: 8px;
    background-color: #d4edda;
  }
</style>