//Declaracion de variables globales
var cool = require("cool-ascii-faces");
var unemploymentAPI = require("./unemploymentAPI");
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var rentalsAPI = require("./rentalsAPI");

var app = express();
unemploymentAPI.register(app);
app.use(bodyParser.json());

var port = (process.env.PORT || 10000);

var BASE_API_PATH = "/api/v1";

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

/*
* 
*
*
*
*
*
*
* API rentals - Francisco
*
*
*
*
*
*
*
*
*/
//Conjunto de datos para la carga inicial

rentalsAPI.register(app);

/*
* 
*
*
*
*
*
*
* API buy-sell - Nuria
*
*
*
*
*
*
*
*
*/
var buy_sell = [];

//5.1 Tener desplegado en Heroku la API en la ruta: /api/v1/YYYYYY
app.get(BASE_API_PATH + "/buy_sell", (req,res) => {    
    res.send(JSON.stringify(buy_sell,null,2));
});

// Recursos que se van a crear
var buy_sell_initial = [
    {
        "autonomous_community":"andalucia",
        "province":"sevilla",
        "year":2018,
        "surface":1594.97,
        "annual_variation_percentage":9.22,
        "eviction":2.003
    },
    {
        "autonomous_community":"comunidad_de_madrid",
        "province":"madrid",
        "year":2020,
        "surface":2357.05,
        "annual_variation_percentage":6.25,
        "eviction":2.872
    },
    {
        "autonomous_community":"cataluna",
        "province":"barcelona",
        "year":2018,
        "surface":3470.8,
        "annual_variation_percentage":9.35,
        "eviction":2.381
    },
	{
        "autonomous_community":"navarra",
        "province":"navarra",
        "year":2020,
        "surface":1400.22,
        "annual_variation_percentage":10.22,
        "eviction":1.057
    }
];

//5.2 El recurso debe contener una ruta /api/v1/YYYYYY/loadInitialData que al hacer un GET cree 2 o más recursos.
app.get(BASE_API_PATH + "/buy_sell/loadInitialData", (req,res) => {    
    if(buy_sell.length > 0) buy_sell.length = 0;

    buy_sell_initial.forEach(x => buy_sell.push(x));
    res.sendStatus(201);
});

//POST a la lista de recursos (p.e. “/api/v1/stats”) crea un nuevo recurso.
app.post(BASE_API_PATH + "/buy_sell",(req,res)=>{
	var newObject = req.body;

    if(
        newObject.autonomous_community== null||
        newObject.province== null||
        newObject.year== null||
        newObject.surface== null||
        newObject.annual_variation_percentage== null||
        newObject.eviction== null||
        newObject=="")
    {
        res.sendStatus(400);
    }
    else {
        console.log(`Nuevo elemento creado: <${JSON.stringify(newObject,null,2)}>`);
	    buy_sell.push(newObject);
	    res.sendStatus(201);
    }
});

//GET a un recurso (p.e. “/api/v1/stats/sevilla/2013”) devuelve ese recurso (un objeto en JSON) .
app.get(BASE_API_PATH + "/buy_sell/:autonomous_community",(req,res) => {
    var autonomous_community_url = req.params.autonomous_community;

    for (var i of buy_sell){
        if (i.autonomous_community == autonomous_community_url) {
            var resultado = buy_sell.filter(x => x.autonomous_community == autonomous_community_url);
            res.send(JSON.stringify(resultado,null,2));
            return res.status(200)
        }
    }
    res.sendStatus(404);
});

app.get(BASE_API_PATH + "/buy_sell/:autonomous_community/:year",(req,res) => {
    var autonomous_community_url = req.params.autonomous_community;
    var year_url = parseInt( req.params.year);

    for (var i of buy_sell){
        if (i.autonomous_community == autonomous_community_url && i.year == year_url) {
            return res.status(200).json(i);
            
        }
    }
    res.sendStatus(404);
});

// DELETE a un recurso (p.e. “/api/v1/stats/sevilla/2013”) borra ese recurso (un objeto en JSON).
app.delete(BASE_API_PATH + "/buy_sell/:autonomous_community/:year", (req, res) =>{ 
    var autonomous_community_url = req.params.autonomous_community;
    var year_url = parseInt(req.params.year);

    for (var i = 0; i <  buy_sell.length; i++){
		if(buy_sell[i].autonomous_community == autonomous_community_url && buy_sell[i].year == year_url){
			buy_sell.splice(i,1);
			return res.sendStatus(200);
		}
	}
	res.sendStatus(404);
});

// PUT a un recurso (p.e. “/api/v1/stats/sevilla/2013”) actualiza ese recurso. 
app.put(BASE_API_PATH + "/buy_sell/:autonomous_community/:year", (req,res)=>{
    var autonomous_community_url = req.params.autonomous_community;
    var year_url = parseInt(req.params.year);
	
    for(var i in buy_sell){
		if(buy_sell[i].autonomous_community == String(autonomous_community_url) && buy_sell[i].year == String(year_url)){
			var newData = req.body;
			buy_sell[i] = newData;
            return res.sendStatus(200);
        }
    }
	res.sendStatus(404);
});

//POST a un recurso (p.e. “/api/v1/stats/sevilla/2013”) debe dar un error de método no permitido.
app.post(BASE_API_PATH + "buy_sell/:autonomous_community", (req, res) => {
   res.sendStatus(405);
});

app.post(BASE_API_PATH + "/buy_sell/:autonomous_community/:year", (req, res) => {
    res.sendStatus(405);
});

//PUT a la lista de recursos (p.e. “/api/v1/stats”) debe dar un error de método no permitido.
app.put(BASE_API_PATH + "/buy_sell", (req, res) => {
    res.sendStatus(405);
});

//DELETE a la lista de recursos (p.e. “/api/v1/stats”) borra todos los recursos.
app.delete(BASE_API_PATH + "/buy_sell", (req, res) => {
    buy_sell.length = 0;
    res.sendStatus(200);
});

/*
*
*
*
* Feedback_03
*
*
*/
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