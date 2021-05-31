<script>
  import {
    Button,
    Icon,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardSubtitle,
    CardText,
    CardTitle,
    Col,
    Container,
    Nav,
    NavItem,
    NavLink,
    Row,
  } from "sveltestrap";
   import { TabContent, TabPane } from 'sveltestrap';
</script>

<main>
  <Nav>
    <NavItem>
      <NavLink href="/">Volver</NavLink>
    </NavItem>
  </Nav>

  
<div>
  <Card class="mb-3">
    <CardHeader>
      <CardTitle><h1>INTEGRACIONES</h1></CardTitle>
    </CardHeader>
    <CardBody>
      <CardSubtitle />
      <CardText />
      <a href="/#/buy_sell/deshaucios"
        ><Button color="primary">API DESHAUCIOS</Button></a
      >
      <a href=""
        ><Button color="primary">API2</Button></a
      >
      <a href="">
        <Button color="primary">API3</Button></a
      >
      <a href="">
        <Button color="primary">API4</Button></a
      >
    </CardBody>
  </Card>
</div>

<img src="images/integration.png" alt="background image" width="800" height="600" />


</main>

<style>
   main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
  div{
    margin-bottom: 15px;
  }
  b {
    color: #00c1ff;
  }
  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>