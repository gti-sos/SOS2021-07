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
    
      
    
    
      
    
      <h2>Integraciones</h2>
      <Container>
        
        
        <Col xs="auto">
          <Card class="mb-3">
            <CardHeader>
              <CardTitle><h5>Rentals</h5></CardTitle>
            </CardHeader>
            <CardBody>
              <CardSubtitle />
              
              <a href="/#/integrations/G27_rentals"
                ><Button color="primary">G27</Button></a
              >
              <a href="/#/integrations/criptomoneda"
                ><Button color="primary">Criptomoneda E1</Button></a
              >
              <a href="https://documenter.getpostman.com/view/14949877/TzJu8wZf"
                ><Button color="info">API Externa 1</Button></a
              >
            </CardBody>
            
          </Card>
        </Col>
    
        <Col xs="auto">
          <Card class="mb-3">
            <CardHeader>
              <CardTitle><h5>Unemployment</h5></CardTitle>
            </CardHeader>
            <CardBody>
              <CardSubtitle />
            
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
            
            
          </Card>
        </Col>
    
        <Col xs="auto">
          <Card class="mb-3">
            <CardHeader>
              <CardTitle><h5>Buy_sell</h5></CardTitle>
            </CardHeader>
            <CardBody>
              <CardSubtitle />
              
              <a href="/api/v2/buy_sell"
                ><Button color="primary">Backend</Button></a
              >
              <a href="/#/buy_sell"
                ><Button color="primary">Interfaz</Button></a
              >
              <a href="/#/buy_sell/buy_sell_Charts"
                ><Button color="info">Analíticas</Button></a
              >
              <a href="https://documenter.getpostman.com/view/14952576/TzJydbQv"
                ><Button color="info">Documentación Postman v1</Button></a
              >
              <a href="https://documenter.getpostman.com/view/14952576/TzRUA75V"
                ><Button color="info">Documentación Postman v2</Button></a
              >
              <a href="/#/buy_sell/buy_sell_Integraciones"
                ><Button color="info">Integraciones</Button></a
              >
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
    