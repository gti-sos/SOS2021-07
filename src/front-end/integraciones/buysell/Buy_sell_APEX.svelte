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
              "https://sos2021-07.herokuapp.com/api/v2/buy_sell/loadInitialData"
          ); // La bd no termina de ser consistente, es necesario esto para que funcione siempre.
		  
		  const porsiacaso2 = await fetch(
              "https://sos2021-27.herokuapp.com/api/v2/azar-games-and-bet-activities/loadInitialData"
          ); // La bd no termina de ser consistente, es necesario esto para que funcione siempre.
  
        const pobres = await fetch(
            "https://sos2021-07.herokuapp.com/api/v2/buy_sell?year=2018&province=sevilla"
        );
        let pobresJsons = [];
        pobresJsons = await pobres.json();
		
		 if (pobres.ok) {
	
      pobresJsons.forEach(stat => {
	  
	  sintechos.push(parseInt(stat.surface));
      
      });
    }
  
        const activities = await fetch(
            "https://sos2021-27.herokuapp.com/api/v2/azar-games-and-bet-activities?year=2018&province=Seville"
        );
        let activitiesJsons = [];
        activitiesJsons = await activities.json();
  
  	 if (activities.ok) {
	
      activitiesJsons.forEach(stat => {
	  
	  bingomaqs.push(parseInt(stat.catering_bingo_machine));
      
      });
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
          text: 'Diferencia entre la superficie y maquinas de bingo',
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
            text: 'superficie',
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
   
    <div id="myChart" class="chart--container"></div>
	
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