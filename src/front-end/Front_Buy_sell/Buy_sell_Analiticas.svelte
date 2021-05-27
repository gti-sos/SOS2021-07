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
</script>
<svelte:head>
</svelte:head>

<main>
  <Nav>
    <NavItem>
      <NavLink href="/">Pรกgina Principal</NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="#/buy_sell">Datos</NavLink>
    </NavItem>
	<NavItem>
      <NavLink href="#/buy_sell/buy_sell_Charts">Grรกfica LINEAL (highchart)</NavLink>
    </NavItem>
	<NavItem>
      <NavLink href="#/buy_sell/graficaNL">Grรกfica AREA (highchart)</NavLink>
    </NavItem>
	<NavItem>
      <NavLink href="#/buy_sell/graficaZING">Grรกfica CIRCULOS (zingchart)</NavLink>
    </NavItem>
  </Nav>

  <div>
    <h2>
      Anรกliticas
    </h2>
  </div>
  
  <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Festudianteo.com%2Fmatematicas%2Fgraficas-concepto-y-caracteristicas%2F&psig=AOvVaw2Wr-I4j9s2-vzwFiw7gSGD&ust=1622194820500000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOCig-fI6fACFQAAAAAdAAAAABAK" alt="GRF" width="500" height="600">

  <div>
    {#if errorMsg}
      <p class="msgRed" style="color: #9d1c24">ERROR: {errorMsg}</p>
    {/if}
    {#if okMsg}
      <p class="msgGreen" style="color: #155724">{okMsg}</p>
    {/if}
  </div>
  
</main>

<style>
</style>