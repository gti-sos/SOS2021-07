<script>
  import { onMount } from "svelte";

  import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";

  const BASE_API_PATH = "/api/v1";
  export let params = {};
  let stat = {};
  let updateComunity = "";
  let updateProvince = "";
  let updateYear = 0;
  let updateSurface  = 0.0;
  let updateAnnual  = 0.0;
  let updateEviction  = 0.0;
  let errorMsg = "";
  let okMsg = "";
  ////
  async function getStat() {
    console.log("Fetching stat..." + params.autonomous_community + " " + params.province + " " + params.year);
    const res = await fetch(
      BASE_API_PATH +"/buy_sell/" + params.autonomous_community + "/" + params.province + "/" + params.year
    );

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
      if(res.status===404){
          errorMsg = "No se encuentra el dato solicitado";
        }else if(res.status ===500){
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
      BASE_API_PATH +
        "/buy_sell/" +
        params.autonomous_community +
        "/" +
        params.province +
        "/" +
        params.year,
      {
        method: "PUT",
        body: JSON.stringify({
          "autonomous_community": updateComunity,
          "province": updateProvince,
          "year": parseInt(updateYear),
          "surface": parseFloat(updateSurface),
          "annual_variation_percentage": parseFloat(updateAnnual),
          "eviction": parseFloat(updateEviction)
        }),
        headers: {
          "Content-Type": "application/json",
        }
      }
    ).then(function (res) {
      if (res.ok) {
        console.log("OK");
        getStat();
        errorMsg = "";
        okMsg = `${params.autonomous_community} ${params.province} ${params.year} han sido actualizados correctamente`;
      } else {
         if(res.status ===500){
          errorMsg = "No se ha podido acceder a la base de datos";
        }else if(res.status ===404){
          errorMsg = "No se ha encontrado el dato solicitado";
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
      <NavLink href="/#/buy_sell"><Button color="primary">Volver</Button></NavLink>
    </NavItem>
  </Nav>

  <h2>
    Editar campo <strong>{params.autonomous_community}</strong>
    <strong>{params.province}</strong>
    <strong>{params.year}</strong>
  </h2>
  <Table bordered>
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
        <td><input type="text" placeholder="" bind:value={updateComunity} /></td>
        <td><input type="text" placeholder="" bind:value={updateProvince} /></td>
        <td><input type="number" placeholder=""   bind:value={updateYear} /></td>
        <td><input type="number" placeholder="{params.surface}"   bind:value={updateSurface} /></td>
        <td><input type="number" placeholder="12"  bind:value={updateAnnual} /></td>
        <td><input type="number" placeholder="params.eviction" bind:value={updateEviction} /></td>
        <td>
          <a href="#/buy_sell/">
          <Button outline color="primary" on:click={updateStat}>Actualizar</Button>
        </a></td>
      </tr>
    </tbody>
  </Table>
  {#if errorMsg}
    <p style="color: red">ERROR: {errorMsg}</p>
  {/if}
  {#if okMsg}
  <p style="color: green">{okMsg}</p>
  {/if}

</main>

<style>
  main{
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
</style>
////