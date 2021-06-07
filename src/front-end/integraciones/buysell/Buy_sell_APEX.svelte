<script>
    import { onMount } from "svelte";
  
    import {
        Jumbotron,
        Navbar,
        Nav,
        NavItem,
        NavLink,
        NavbarBrand,
        Dropdown,
        DropdownToggle,
        DropdownMenu,
        DropdownItem,
    } from "sveltestrap";
    let isOpen = false;
  
    var sintechos = [];
    var bingomaqs = [];
    async function getData() {
      const porsiacaso = await fetch(
              "/api/v2/children-out-school/loadInitialData"
          ); // La bd no termina de ser consistente, es necesario esto para que funcione siempre.
  
        const pobres = await fetch(
            "/api/v2/children-out-school"
        );
        let pobresJsons = [];
        pobresJsons = await pobres.json();
  
        const activities = await fetch(
            "https://sos2021-27.herokuapp.com/api/v2/azar-games-and-bet-activities/"
        );
        let activitiesJsons = [];
        activitiesJsons = await activities.json();
  for (let pobreza of pobresJsons) {
              for (let ludopatia of activitiesJsons) {
                  if (pobreza.year == ludopatia.year) {
                      if (
                          (pobreza.country == "Spain" &&
                              ludopatia.province == "Seville" && ludopatia.year == "2016"&& pobreza.year == "2016")
                      ) {
  
  
                          sintechos.push(pobreza.children_out_school_total);
                          bingomaqs.push(parseInt(ludopatia.catering_bingo_machine));
  
                         
                      }
                  }
              }
        
      
            }
          
   
    console.log(sintechos);
        console.log(bingomaqs);
          
          }
  
  
  
  
  
    
  
    //  onMount(getData);
    async function loadGraph() {
      getData().then(() => {
        ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "b55b025e438fa8a98e32482b5f768ff5"];
        let chartConfig = {
      gui: {
        contextMenu: {
          backgroundColor: '#306EAA', // sets background for entire contextMenu
          button: {
            backgroundColor: '#2D66A4',
            lineColor: '#2D66A4',
            visible: true
          },
          docked: true,
          gear: {
            alpha: 1,
            backgroundColor: '#2D66A4'
          },
          item: {
            backgroundColor: '#306EAA',
            borderColor: '#306EAA',
            borderWidth: '0px',
            color: '#fff',
            fontFamily: 'Lato'
          },
          position: 'right'
        }
      },
      graphset: [{
        type: 'ring',
        backgroundColor: '#FBFCFE',
        title: {
          text: 'Diferencia entre abandono y maquinas de bingo',
          padding: '15px',
          fontColor: '#1E5D9E',
          fontFamily: 'Lato',
          fontSize: '14px'
        },
        subtitle: {
          text: '2016',
          padding: '5px',
          fontColor: '#777',
          fontFamily: 'Lato',
          fontSize: '12px'
        },
        legend: {
          adjustLayout: true,
          align: 'center',
          backgroundColor: '#FBFCFE',
          borderWidth: '0px',
          item: {
            cursor: 'pointer',
            fontColor: '#777',
            fontSize: '12px',
            offsetX: '-6px'
          },
          marker: {
            type: 'circle',
            borderWidth: '0px',
            cursor: 'pointer',
            size: 5
          },
          mediaRules: [{
            maxWidth: '500px',
            visible: false
          }],
          toggleAction: 'remove',
          verticalAlign: 'bottom'
        },
        plot: {
          valueBox: [{
              type: 'all',
              text: '%t',
              placement: 'out'
            },
            {
              type: 'all',
              text: '%npv%',
              placement: 'in'
            }
          ],
          animation: {
            effect: 'ANIMATION_EXPAND_VERTICAL',
            sequence: 'ANIMATION_BY_PLOT_AND_NODE'
          },
          backgroundColor: '#FBFCFE',
          borderWidth: '0px',
          hoverState: {
            cursor: 'hand',
          },
          slice: '60%'
        },
        plotarea: {
          margin: '70px 0px 10px 0px',
          backgroundColor: 'transparent',
          borderRadius: '10px',
          borderWidth: '0px'
        },
        scaleR: {
          refAngle: 270
        },
        tooltip: {
          text: '<span style="color:%color">Variable: %t</span><br><span style="color:%color">Valor: %v</span>',
          anchor: 'c',
          backgroundColor: 'none',
          borderWidth: '0px',
          fontSize: '16px',
          mediaRules: [{
            maxWidth: '500px',
            y: '54%'
          }],
          sticky: true,
          thousandsSeparator: ',',
          x: '50%',
          y: '50%'
        },
        noData: {
          text: 'No Selection',
          alpha: .6,
          backgroundColor: '#20b2db',
          bold: true,
          fontSize: '18px',
          textAlpha: .9
        },
        series: [{
            text: 'maquinas de bingo',
            values: bingomaqs,
            backgroundColor: '#00BAF2',
            lineColor: '#00BAF2',
            lineWidth: '1px',
            marker: {
              backgroundColor: '#00BAF2'
            }
          },
          {
            text: 'abandono escolar',
            values: sintechos,
            backgroundColor: '#E80C60',
            lineColor: '#E80C60',
            lineWidth: '1px',
            marker: {
              backgroundColor: '#E80C60'
            }
          }
        
          
        ]
      }]
    };
    zingchart.render({
      id: 'myChart',
      data: chartConfig,
      height: '100%',
      width: '100%',
    })
  }); 
          
    }
  </script>
  
  <svelte:head>
  
   <script
      src="https://cdn.zingchart.com/zingchart.min.js"
      on:load={loadGraph}></script>
  </svelte:head>
  
  <main>
    <body>
        <Jumbotron class="p-3" style="background-color: #FFB833">
            <h1 class="titulo; mainDiv" style="color: white">
                Integración Api abandono
            </h1>
        </Jumbotron>
        <Navbar style="background-color: #FFB833; color:white;" light expand="lg" >
          <NavbarBrand href="#/">INICIO</NavbarBrand>
          <Nav navbar>
            <NavItem>
              <NavLink href="#/suicide-records">Registro de suicidios</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#/province-budget-and-investment-in-social-promotion">Inversion promoción social</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#/azar-games-and-bet-activities">Actividad en loteria</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#/integrations">Integraciones</NavLink>
            </NavItem>
            <Dropdown nav {isOpen} toggle="{() => isOpen = !isOpen}">
              <DropdownToggle nav caret> Gráficas </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem href="#/graphics/suicide-records">Registro de suicidios</DropdownItem>
                <DropdownItem href="#/graphics/line/province-budget-and-investment-in-social-promotion">Inversion promoción social</DropdownItem>
                <DropdownItem href="#/graphics/azar-games-and-bet-activities">Actividad en loteria</DropdownItem>
                <DropdownItem divider/>
                <DropdownItem href="#/analytics">Conjunto</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <NavItem>
              <NavLink style="float:right; color:white; margin:left;" href="#/about">Acerca de</NavLink>
            </NavItem>
          </Nav>
      </Navbar>
    </body>
    <br />
    <h1 class="titulo2">Abandono escolar y maquinas de bingo activas</h1>
   
    <div id="myChart" class="chart--container"></div>>
  </main>
  
  <style>
   @import 'https://fonts.googleapis.com/css?family=Montserrat';
    @import 'https://fonts.googleapis.com/css?family=Lato:400';
    .chart--container {
      height: 100%;
      width: 100%;
      min-height: 530px;
    }
    .zc-ref {
      display: none;
    }
  </style>