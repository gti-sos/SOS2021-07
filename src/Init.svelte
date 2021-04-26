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

    <h2>Descripción del proyecto</h2>
	  <p>Registros sobre la evolución de la compra-venta de viviendas en España por comunidades autónomas, provincias, años, precio metros cuadrados, porcentaje de la  variación anual de la compraventa y número de desahucios.</p>
<p>Registros sobre la evolución de los alquileres en España según comunidades autónomas, provincias, euros/mes, porcentaje de variación de precios, metros cuadrados, años.</p>
<p>Registros sobre el paro en España comunidades autónomas, provincias, años, porcentaje creación empleo por año, tasa de paro por edades, tasa de paro por sexo, tasa hogares con todos sus miembros en paro, contratos tiempo completo/parcial (en miles de personas), evolución de población inactiva, evolución tasa del paro por año.</p>
<p>Nuestra intención es relacionar la compraventa de viviendas con los precios de alquileres en las diferentes ubicaciones y su relación con el paro para ver como afecta el incremente del paro con el precio y situacion de las otras dos variables de datos.</p>


  <Container>
    <Col>
      <a href="http://github.com/gti-sos/SOS2021-07"
        ><b>Repository: </b>http://github.com/gti-sos/SOS2021-07</a
      >
    </Col>
    <Col>
      <a href="http://sos2021-07.herokuapp.com"
        ><b>URL: </b>http://sos2021-07.herokuapp.com</a
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
            Alquileres: Sus precios, aumentos y otros campos dentro de un contesto de tiempo y localización.
          </CardText>
          <a href="/api/v1/rentals"
            ><Button color="primary">Backend</Button></a
          >
          <a href="/#/rentals"
            ><Button color="primary">Frontend</Button></a
          >
          <a href="https://documenter.getpostman.com/view/14949877/TzJu8wZf"
            ><Button color="info">Documentacion Postman</Button></a
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
            (edita tu aqui de que va tu API)
          </CardText>
          <a href="/api/v1/unemployment"
            ><Button color="primary">Backend</Button></a
          >
          <a href="/#/unemployment"
            ><Button color="primary">Frontend</Button></a
          >
          <a href="https://documenter.getpostman.com/view/15352819/TzJoE1VM"
            ><Button color="info">Documentacion Postman</Button></a
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
          <CardTitle><h5>Buy sell</h5></CardTitle>
        </CardHeader>
        <CardBody>
          <CardSubtitle />
          <CardText>
            (edita tu aqui de que va tu API.)
          </CardText>
          <a href="/api/v1/buy_sell"
            ><Button color="primary">Backend</Button></a
          >
          <a href="/#/buy_sell"
            ><Button color="primary">Frontend</Button></a
          >
          <a href="https://documenter.getpostman.com/view/14952576/TzJoELSU"
            ><Button color="info">Documentacion Postman</Button></a
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
        </CardHeader>
        <CardBody>
          <CardSubtitle />
          <a href="/#/buy_sell"><Button color="primary">404 Check</Button></a>
        </CardBody>
        <CardFooter>Desarrollador</CardFooter
        >
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
