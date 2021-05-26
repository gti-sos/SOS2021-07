//Declaracion de variables globales
var cool = require("cool-ascii-faces");
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
const cors = require("cors");
app.use(cors());


var buy_sell_API = require("./src/back-end/buy_sell_API/v2");

//Alejandro
//var unemploymentAPI = require("./src/back-end/unemploymentAPI/v1"); //api v1
var unemploymentAPI = require("./src/back-end/unemploymentAPI/v2"); //api v2
var unemploymentAPI_Integration = require("./src/back-end/unemploymentAPI/integration"); //integracion

//Tristan
var rentalsAPI = require("./src/back-end/rentalsAPI");
var unemploymentAPI_Integration = require("./src/back-end/rentalsAPI/integration"); //integracion

var app = express();
app.use(bodyParser.json());

var port = (process.env.PORT || 10000);

var BASE_API_PATH = "/api/v1";

rentalsAPI.register(app);
buy_sell_API.register(app);

//Alejandro
unemploymentAPI.register(app); //importamos api declarada arriba
unemploymentAPI_Integration.register(app); //importamos integration declarado arriba


//integraciones proxys

//proxys Tristan
//Grupo 27: province-budget-and-investment-in-social-promotion


app.use("/province-budget-and-investment-in-social-promotion", function(req, res) {
    var apiServerHostG27 = ' http://sos2021-27.herokuapp.com';

    var url = apiServerHostG27 + req.url;
    console.log('piped: /inversion Social -> ' + url);

    req.pipe(request(url)).pipe(res);});

//Mostrar directamente el contenido de /public
app.use("/", express.static(path.join(__dirname, "public")));

//Cool faces
app.get("/cool", (req, res) => {
    res.send(cool());
    console.log("New request to '/cool' has arrived");
});

//Hello
app.get("/hello", (req, res) => {
    res.send("<html><body><h1>GET Hello from this tiny server</h1></body></html>");
});

app.post("/hello", (req, res) => {
    res.send("<html><body><h1>POST Hello from this tiny server</h1></body></html>");
});


//Tabla de Alejandro
app.get("/info/unemployment", (req, res) => {
    res.send("<html><body><table class='tftable' border='1'>"+
    "<tr><th>autonomous-community</th><th>youth-unemployment-rate</th><th>province</th><th>year</th><th>unemployment-rate</th><th>occupation-variation</th></tr>"+
    "<tr><td>extremadura</td><td>48.1605</td><td>badajoz</td><td>2020</td><td>22.8954</td><td>-1.09999</td></tr>"+
    "<tr><td>extremadura</td><td>-</td><td>caceres</td><td>2020</td><td>18.5352</td><td>100,00610</td></tr>"+
    "<tr><td>andalucia</td><td>52.1912</td><td>malaga</td><td>2020</td><td>19.3225</td><td>32.79998</td></tr>"+
    "<tr><td>andalucia</td><td>-</td><td>granada</td><td>2020</td><td>24.8484</td><td>13.79998</td></tr>"+
    "<tr><td>cataluna</td><td>38.1233</td><td>barcelona</td><td>2020</td><td>13.6676</td><td>29.69995</td></tr>"+
    "<tr><td>aragon</td><td>34.4671</td><td>zaragoza</td><td>2020</td><td>12.9139</td><td>1.39999</td></tr>"+
    "</table></body></html>");
});
    
//Tabla de Francisco
app.get("/info/rentals", (req, res) => {
    res.send("<html><body><table class='tftable' border='1'>"+
    "<tr><th>autonomous-community</th><th>province</th><th>year</th><th>rent</th><th>rent-variation</th><th>meter</th><th>salary</th></tr>"+
    "<tr><td>andalucia</td><td>sevilla</td><td>2018</td><td>560.5</td><td>4</td><td>94.6</td><td>29</td></tr>"+
    "<tr><td>cataluna</td><td>barcelona</td><td>2018</td><td>696</td><td>6</td><td>96.8</td><td>49</td></tr>"+
    "<tr><td>madrid</td><td>madrid</td><td>2018</td><td>780</td><td>4.6</td><td>86.5</td><td>51</td></tr>"+
    "<tr><td>castilla-y-leon</td><td>salamanca</td><td>2018</td><td>468</td><td>22.2</td><td>91</td><td>24</td></tr>"+
    "<tr><td>castilla-y-leon</td><td>palencia</td><td>2018</td><td>416.7</td><td>22.5</td><td>94.1</td><td>24</td></tr>"+
    "</table></body></html>");
}); 

//Tabla de Nuria
app.get("/info/buy_sell", (req, res) => {
    res.send("<html><body><table class='tftable' border='1'>"+
    "<tr><th>autonomous_community</th><th>province</th><th>year</th><th>surface</th><th>annual_variation_percentage</th><th>eviction</th></tr>"+
    "<tr><td>andalucia</td><td>sevilla</td><td>2018</td><td>1594.97</td><td>9.22</td><td>2.003</td></tr>"+
    "<tr><td>comunidad_de_madrid</td><td>madrid</td><td>2020</td><td>2357.05</td><td>6.25</td><td>2.872</td></tr>"+
    "<tr><td>cataluna</td><td>barcelona</td><td>2018</td><td>3470.8</td><td>9.35</td><td>2.381</td></tr>"+
    "<tr><td>navarra</td><td>navarra</td><td>2020</td><td>1400.22</td><td>10.22</td><td>1.057</td></tr>"+
    "<tr><td>region_de_murcia</td><td>murcia</td><td>2020</td><td>876.64</td><td>4.32</td><td>1.504</td></tr>"+
    "<tr><td>andalucia</td><td>malaga</td><td>2018</td><td>1496.23</td><td>14.02</td><td>2.636</td></tr>"+
    "<tr><td>cantabria</td><td>cantabria</td><td>2017</td><td>1202.38</td><td>6.9</td><td>705</td></tr>"+
    "<tr><td>comunidad_valenciana</td><td>valencia</td><td>2017</td><td>1.169.92</td><td>6.23</td><td>2.358</td></tr>"+
    "<tr><td>andalucia</td><td>granada</td><td>2017</td><td>1250.99</td><td>1.54</td><td>1.013</td></tr>"+
    "</table></body></html>");
});

//Puerto de escucha para localhost
app.listen(port, () => {
    console.log(`Server currently listening on port ${port} ...`)
});