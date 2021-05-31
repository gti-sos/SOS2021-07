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
      <NavLink href="/">Página Principal</NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="#/buy_sell">Datos</NavLink>
    </NavItem>
	<NavItem>
      <NavLink href="#/buy_sell/buy_sell_Charts">Gráfica LINEAL (highchart)</NavLink>
    </NavItem>
	<NavItem>
      <NavLink href="#/buy_sell/graficaNL">Gráfica AREA (highchart)</NavLink>
    </NavItem>
	<NavItem>
      <NavLink href="#/buy_sell/graficaZING">Gráfica CIRCULOS (zingchart)</NavLink>
    </NavItem>
  </Nav>

  <div>
    <h2>
      Analíticas
    </h2>
  </div>
  
  <img src="images/grafica.jpg" alt="background image" width="800" height="600" />
  

  
</main>

<style>

</style>