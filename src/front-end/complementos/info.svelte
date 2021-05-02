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
    Row,
  } from "sveltestrap";
</script>


<main>
  <h1>SOS2021-07</h1>

  <h2>Team</h2>
  <Container>
    <Col>
      <a href="https://github.com/frankys99">Francisco Miguel Tristán Clavijo</a>
    </Col>
    <Col>
		  <a href="https://github.com/RoundPegInASquareHole">Alejandro Pariente Migoya</a>
		</Col>
		<Col>
		  <a href="https://github.com/nuresctor">Nuria Escamilla Torres</a>
		</Col>
	  </Container>


  <Container>
    <Col>
      <a href="http://github.com/gti-sos/SOS2021-07"
        ><b>Repositorio: </b>http://github.com/gti-sos/SOS2021-07</a
      >
    </Col>
  </Container>

  <h2>APIs</h2>
  <Container>
    
    
    <Col xs="auto">
      <Card class="mb-3">
        <CardHeader>
          <CardTitle><h5>Rentals</h5></CardTitle>
        </CardHeader>
        <CardBody>
          <CardSubtitle />
          <CardText>
            Alquileres: Sus precios, aumentos y otros campos dentro de un contexto de tiempo y localización.
          </CardText>
          <a href="/api/v1/rentals"
            ><Button color="primary">Backend</Button></a
          >
          <a href="/#/rentals"
            ><Button color="primary">Interfaz</Button></a
          >
          <a href="https://documenter.getpostman.com/view/14949877/TzJu8wZf"
            ><Button color="info">Documentación Postman</Button></a
          >
        </CardBody>
        <CardFooter
          >Desarrollador
          <a href="https://github.com/frankys99">Francisco Miguel Tristán Clavijo</a
          ></CardFooter
        >
      </Card>
    </Col>

    <Col xs="auto">
      <Card class="mb-3">
        <CardHeader>
          <CardTitle><h5>Unemployment</h5></CardTitle>
        </CardHeader>
        <CardBody>
          <CardSubtitle />
          <CardText>
            Desempleo: Ratios de desempleo general, desempleo joven y la variación del mismo a lo largo de un año en las diferentes provincias españolas.
          </CardText>
          <a href="/api/v1/unemployment"
            ><Button color="primary">Backend</Button></a
          >
          <a href="/#/unemployment"
            ><Button color="primary">Interfaz</Button></a
          >
          <a href="https://documenter.getpostman.com/view/15352819/TzJoE1VM"
            ><Button color="info">Documentación Postman</Button></a
          >
        </CardBody>
        <CardFooter
          >Desarrollador
          <a href="https://github.com/RoundPegInASquareHole">Alejandro Pariente Migoya</a
          ></CardFooter
        >
      </Card>
    </Col>

    <Col xs="auto">
      <Card class="mb-3">
        <CardHeader>
          <CardTitle><h5>Buy_sell</h5></CardTitle>
        </CardHeader>
        <CardBody>
          <CardSubtitle />
          <CardText>
           Compraventa: Datos como la variación anual de la compraventa de viviendas en España o número de deshaucios efectuados entre otros. 
          </CardText>
          <a href="/api/v1/buy_sell"
            ><Button color="primary">Backend</Button></a
          >
          <a href="/#/buy_sell"
            ><Button color="primary">Interfaz</Button></a
          >
          <a href="https://documenter.getpostman.com/view/14952576/TzJydbQv"
            ><Button color="info">Documentación Postman</Button></a
          >
        </CardBody>
        <CardFooter
          >Desarrollador
          <a href="https://github.com/nuresctor">Nuria Escamilla Torres</a
          ></CardFooter
        >
      </Card>
    </Col>


    <Col xs="auto">
      <Card class="mb-3">
        <CardHeader>
          Comprobacion Página no encontrada, ERROR 404
        </CardHeader>
        <CardBody>
          <CardSubtitle />
          <a href="/#/NoexisteEstaPagina"><Button color="primary">404</Button></a>
        </CardBody>
        
      </Card>
    </Col>


  </Container>


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
  b {
    color: #00c1ff;
  }
  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
