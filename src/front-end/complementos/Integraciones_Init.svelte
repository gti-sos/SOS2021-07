<script>
    import {
        Button,
        Icon,
        Nav,
    NavItem, 
    NavLink,
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
      <Nav>

        <NavItem>
          <NavLink href="/"><Button color="primary">Volver</Button></NavLink>
        </NavItem>
    </Nav>
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
                ><Button color="primary">G27 Budget</Button></a
              >

              <a href="/#/integrations/G30_rentals"
              ><Button color="info">G30 life-expectancy</Button></a
              >
              <a href="/#/integrations/Ext1_educacion"
              ><Button color="info">G04 Educacion</Button></a>

              <a href="/#/integrations/Ext2_Cartas"
                ><Button color="primary">Ext1 Cartas</Button></a>

              <a href="/#/integrations/Pokemon"
              ><Button color="primary">Ext2 Pokemon</Button></a>

              <a href="/#/integrations/crypto"
              ><Button color="primary">Ext3 crypto</Button></a>
              
              <a href="/#/integrations/Covid"
                ><Button color="primary">Ext4 Covid E1</Button></a
              >
              <a href="/#/integrations/Hearthstone"
                ><Button color="primary">Ext5 Hearthstone </Button></a
              >
              <a href="/#/integrations/SW"
                ><Button color="primary">Ext6 StarWars </Button></a
              >

              <a href="/#/integrations/NBA"
                ><Button color="primary">Ext7 NBA </Button></a
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
            
              <a href="/#/integrations/G06_unemployment"
                ><Button color="primary">G06 - Online Media Stats</Button></a
              >
              <a href="/#/integrations/G30_unemployment"
                ><Button color="primary">G30 - Smoker Stats</Button></a
              >
              <a href="/#/integrations/love_calculator"
                ><Button color="info">Externa 1 - Love Calculator</Button></a
              >
              <a href="/#/integrations/food"
                ><Button color="info">Externa 2 - Edaman Food</Button></a
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
              
              <a href="/#/buy_sell/IP"
                ><Button color="primary">INTEGRACION EXT IP</Button></a
              >
              <a href="/#/buy_sell/VIH"
                ><Button color="primary">API SOS VIH</Button></a
              >
              <a href="/#/buy_sell/natality"
                ><Button color="info">INTEGRACION BUY-NATALITY</Button></a
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
    