<script>
  import { onMount } from "svelte";

  import { Table, Button, Nav, NavItem, NavLink, UncontrolledAlert } from "sveltestrap";

  const BASE_API_PATH = "/api/v2";
  export let params = {};
  let stat = {};
  let updateComunity = "";
  let updateProvince = "";
  let updateYear = 0;
  let updateUnempRate = 0.0;
  let updateYouthUnempRate = 0.0;
  let updateOcupVariation = 0.0;
  let errorMsg = "";
  let okMsg = "";
  let error = null;
  
  async function getStat() {
    console.log("Fetching stat..." + params.autonomous_community + " " + params.province + " " + params.year);
    const res = await fetch(
      BASE_API_PATH +"/unemployment/" + params.autonomous_community + "/" + params.province + "/" + params.year
    );

    if (res.ok) {
      console.log("Ok:");
      const json = await res.json();
      stat = json;
      updateComunity = stat.autonomous_community;
      updateProvince = stat.province;
      updateYear = stat.year;
      updateUnempRate = stat.unemployment_rate;
      updateYouthUnempRate = stat.youth_unemployment_rate;
      updateOcupVariation = stat.occupation_variation;
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
        "/unemployment/" +
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
          "unemployment_rate": parseFloat(updateUnempRate),
          "youth_unemployment_rate": parseFloat(updateYouthUnempRate),
          "occupation_variation": parseFloat(updateOcupVariation)
        }),
        headers: {
          "Content-Type": "application/json",
        }
      }
    ).then(function (res) {
      if (res.ok) {
        console.log("OK");
        error = 0;
        errorMsg = "";
        okMsg = `${params.autonomous_community} ${params.province} ${params.year} han sido actualizados correctamente`;
      } else {
         if(res.status == 500){
           error = 1000;
          errorMsg = "No se ha podido acceder a la base de datos";
        } else if (res.status == 400) {
          error = 1005;
          errorMsg = "Hay campo/s vacío/s.";
        } else if (res.status == 409) {
          error = 409;
          errorMsg = "Este dato ya existe.";
        }
        okMsg = "";
        console.log("ERROR!" + errorMsg);
      }
      console.log(okMsg);
    });
  }

  onMount(getStat);
</script>

<main>
  <Nav>
    <NavItem>
      <NavLink href="/#/unemployment"><Button color="primary">Volver</Button></NavLink>
    </NavItem>
  </Nav>

  <h2>
    Editar campo 
    <strong>{params.autonomous_community}</strong>
    <strong>{params.province}</strong>
    <strong>{params.year}</strong>
  </h2>

  <Table bordered>
    <thead>
      <tr>
        <th> Comunidad autónoma</th>
        <th>Tasa de desempleo juvenil</th>
        <th>Provincia</th>
        <th>Año</th>
        <th>Tasa de desempleo</th>
        <th>Variación de ocupación</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><input type="text" id="input_autonomous_community" placeholder="andalucia" min="1"   bind:value={updateComunity} /></td>
        <td><input type="number" placeholder="52.1912" min="1"   bind:value={updateYouthUnempRate} /></td>
        <td><input type="text" placeholder="malaga" min="1"   bind:value={updateProvince} /></td>
        <td><input type="number" placeholder="2020" min="1"   bind:value={updateYear} /></td>
        <td><input type="number" placeholder="19.3225" min="1"   bind:value={updateUnempRate} /></td>
        <td><input type="number" placeholder="32.79998" min="1.0" bind:value={updateOcupVariation} /></td>

        <td><Button outline color="primary" on:click={updateStat}>Actualizar</Button> </td>

      </tr>
    </tbody>
  </Table>

  <!-- Alerts -->
    {#if error === 0}
      <UncontrolledAlert  color="success" >
          Operación realizada correctamente.
        
      </UncontrolledAlert>
    {/if}

    {#if error === 409}
      <UncontrolledAlert  color="warning" >
          El dato ya se encuentra cargado.
      </UncontrolledAlert>

    {:else if error === 404}
      <UncontrolledAlert  color="danger">
          No se encuentra en la base de datos.
        
      </UncontrolledAlert>
    {:else if error === 1000}
      <UncontrolledAlert  color="danger" >
       Error con la base de datos.
      </UncontrolledAlert>

    {:else if error === 1005}
      <UncontrolledAlert  color="danger" >
       Actualización incorrecta. Todos los campos deben contener un valor.
      </UncontrolledAlert>
    {/if}

</main>

<style>
  main{
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
</style>