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
      <a href=""
        ><Button color="primary">API1</Button></a
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

<br>
<br>
<br>

<div>
	<TabContent>
  <TabPane tabId="alpha" tab="Alpha" active>
    <h2>Alpha</h2>
    <img
      alt="Alpha Flight"
      src="https://upload.wikimedia.org/wikipedia/en/4/49/Alpha_Flight_cast_picture_%28John_Byrne_era%29.gif">
  </TabPane>
  <TabPane tabId="bravo" tab="Bravo">
    <h2>Bravo</h2>
    <img
      alt="Johnny Bravo"
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Johnny_Bravo_series_logo.png/320px-Johnny_Bravo_series_logo.png">
  </TabPane>
  <TabPane tabId="charlie" tab="Charlie">
    <h2>Charlie</h2>
    <img
      alt="Charlie Brown"
      src="https://upload.wikimedia.org/wikipedia/en/2/22/Charlie_Brown.png">
  </TabPane>
</TabContent>
</div>

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