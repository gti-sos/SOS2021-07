<script>
  import { onMount } from "svelte";

  import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";

  const BASE_CONTACT_API_PATH = "/api/v1";
  export let params = {};
  let data = {};
  let updateComunity = "";
  let updateProvince = "";
  let updateYear = 0;
  let updateRent = 0.0;
  let updateRent_V = 0.0;
  let updateMeter = 0.0;
  let updateSalary = 0.0;
  let errorMsg = "";
  let okMsg = "";
  
  async function getStat() {
    console.log("Fetching stat..." + params.province + " " + params.year);
    const res = await fetch(
      BASE_CONTACT_API_PATH +"/rentals/" + params.province +"/" + params.year
    );

    if (res.ok) {
      console.log("Ok:");
      const json = await res.json();
      data = json;
      updateComunity = data["autonomous_community"];
      updateProvince = data.province;
      updateYear = data.year;
      updateRent = data["rent"];
      updateRent_V = data["rent_variation"];
      updateMeter = data["meter"];
      updateSalary = data["salary"];
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

  async function updateData() {
    console.log(
      "Updating stat..." +
        JSON.stringify(params.province) +
        JSON.stringify(params.year)
    );

    const res = await fetch(
      BASE_CONTACT_API_PATH +
        "/rentals/" +
        params.province +
        "/" +
        params.year,
      {
        method: "PUT",
        body: JSON.stringify({
          "autonomous_community": updateComunity,
          "province": params.province,
          "year": params.year,
          "rent": parseFloat(updateRent),
          "rent_variation": parseFloat(updateRent_V),
          "meter": parseFloat(updateMeter),
          "salary": parseFloat(updateSalary),
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
        okMsg = "Operación realizada correctamente";
      } else {
        if(res.status===409){
          errorMsg = "El dato ya se encuentra cargado";
        }else if(res.status ===500){
          errorMsg = "No se han podido acceder a la base de datos";
        }else if(res.status ===404){
          errorMsg = "No se han encontrado el dato solicitado";
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
      <NavLink href="#/rentals">Volver</NavLink>
    </NavItem>
  </Nav>

  <h2>
    Editar campo 
    <strong>{params.province}</strong>
    <strong>{params.year}</strong>
  </h2>
  <Table bordered>
    <thead>
      <tr>
        <th> Comunidad Autónoma </th>
        <th>Provincia </th>
        <th>Año </th>
        <th>Renta </th>
        <th>Variación Renta </th>
        <th>Metros </th>
        <th>Salario </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><input type="text" placeholder="" min="1"   bind:value={updateComunity} /></td>
        <td>{updateProvince}</td>
        <td>{updateYear}</td>
        <td><input type="number" placeholder="500.0" min="1"   bind:value={updateRent} /></td>
        <td><input type="number" placeholder="11.5" min="1"   bind:value={updateRent_V} /></td>
        <td><input type="number" placeholder="100.0" min="1"   bind:value={updateMeter} /></td>
        <td><input type="number" placeholder="900.4" min="1.0" bind:value={updateSalary} /></td>
        
        <td>
          <Button outline color="primary" on:click={updateData}>Actualizar</Button>
        </td>
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