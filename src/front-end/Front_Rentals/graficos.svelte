<script>
    import { onMount } from "svelte";
    import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
    const BASE_CONTACT_API_PATH = "/api/v1";
    async function loadGraph() {
        
        let MyData = [];
        let MyDataGraph = [];
        
        const resData = await fetch(BASE_CONTACT_API_PATH + "/rentals");
        MyData = await resData.json();
        MyData.forEach( (x) => {
                MyDataGraph.push({name: x.autonomous_community+", "+x.province + " (" + x.year + ") ", 3: 
                [parseFloat(x.rent), parseFloat(x.rent_variation), parseFloat(x.meter),parseFloat(x.salary)]});
            });
            Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Alquileres'
        },
        xAxis: {
            categories: [
                "Renta",
                "Variación",
                "Metros",
                "Salarios"
            ],
            crosshair: true
        },
        yAxis: {
            min: -2,
            max: 85,
            title: {
                    text: 'Valor'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.1,
                borderWidth: 0
            }
        },
        series: MyDataGraph
    });
    }
    loadGraph();
    </script>
    
    <svelte:head>
        <script src="https://code.highcharts.com/highcharts.js" on:load="{loadGraph}"></script>
        <script src="https://code.highcharts.com/modules/exporting.js" on:load="{loadGraph}"></script>
        <script src="https://code.highcharts.com/modules/export-data.js" on:load="{loadGraph}"></script>
        <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
        
    </svelte:head>
    
    <body style="background-color:#082EFF;">
    </body>
    
    <main>
        <Nav>
            <NavItem>
              <NavLink href="/"><Button color="primary">Página Inicial</Button></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/#/rentals"><Button color="primary">Datos</Button></NavLink>
            </NavItem>
        </Nav>
        
        <figure class="highcharts-figure">
            <div id="container"></div>
            <p class="highcharts-description">
                El grafico nos muestra distintos datos sobre la renta en España
            </p>
        </figure>
    
    </main>
    <style>
        #container {
            height: 400px;
        }
        .highcharts-figure, .highcharts-data-table table {
            min-width: 310px; 
            max-width: 800px;
            margin: 1em auto;
        }
        
        .highcharts-data-table table {
            font-family: Verdana, sans-serif;
            border-collapse: collapse;
            border: 1px solid rgb(235, 235, 235);
            margin: 10px auto;
            text-align: center;
            width: 100%;
            max-width: 500px;
        }
        .highcharts-data-table caption {
            padding: 1em 0;
            font-size: 1.2em;
            color: #555;
        }
        .highcharts-data-table th {
            font-weight: 600;
            padding: 0.5em;
        }
        .highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
            padding: 0.5em;
        }
        .highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
            background: #f8f8f8;
        }
        .highcharts-data-table tr:hover {
            background: #f1f7ff;
        }
    </style>