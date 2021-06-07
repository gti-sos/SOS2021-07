<script>
  import {
    Button,
    Nav,
    NavItem,
    NavLink,
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
    Row,
  } from "sveltestrap";
</script>

<body>
  <Nav>
    <NavItem>
      <NavLink href="/"><Button color="primary">Volver</Button></NavLink>
    </NavItem>
  </Nav>
  <h3 align="center">Videos</h3>
  <div class="columna">
    <h5 align="center">Video Fco. Miguel</h5>
    <iframe
      title="Video Fco. Miguel "
      width="400"
      height="200"
      src="https://www.youtube.com/embed/QYJ7eOJIu_A"
      frameborder="0"
      allow="accelerometer;autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    /> 
  </div>
  <div class="columna">
    <h5 align="center">Video Alejandro Pariente</h5>
    <iframe
      width="400"
      height="200"
      src="https://www.youtube.com/embed/ZprLapvV3zk"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
  </div>
  <div class="columna">
    <h5 align="center">Video Nuria Escamilla Torres</h5>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/_b6myIUY5jA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
</body>

<style>
  .columna {
    width: 33%;
    float: left;
  }
</style>
