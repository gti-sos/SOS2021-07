var BUY_SELL_API_PATH = "/api/v1";
var buy_sell = [];

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

module.exports.register = (app) => {
	
	app.get(BUY_SELL_API_PATH + "/buy_sell", (req,res) => {    
    res.send(JSON.stringify(buy_sell,null,2));
});
	
	//5.2 El recurso debe contener una ruta /api/v1/YYYYYY/loadInitialData que al hacer un GET cree 2 o más recursos.
app.get(BUY_SELL_API_PATH + "/buy_sell/loadInitialData", (req,res) => {    
    if(buy_sell.length > 0) buy_sell.length = 0;

    buy_sell_initial.forEach(x => buy_sell.push(x));
    res.sendStatus(201);
});

//POST a la lista de recursos (p.e. “/api/v1/stats”) crea un nuevo recurso.
app.post(BUY_SELL_API_PATH + "/buy_sell",(req,res)=>{
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
app.get(BUY_SELL_API_PATH + "/buy_sell/:autonomous_community",(req,res) => {
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

app.get(BUY_SELL_API_PATH + "/buy_sell/:autonomous_community/:year",(req,res) => {
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
app.delete(BUY_SELL_API_PATH + "/buy_sell/:autonomous_community/:year", (req, res) =>{ 
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
app.put(BUY_SELL_API_PATH + "/buy_sell/:autonomous_community/:year", (req,res)=>{
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
app.post(BUY_SELL_API_PATH + "buy_sell/:autonomous_community", (req, res) => {
   res.sendStatus(405);
});

app.post(BUY_SELL_API_PATH + "/buy_sell/:autonomous_community/:year", (req, res) => {
    res.sendStatus(405);
});

//PUT a la lista de recursos (p.e. “/api/v1/stats”) debe dar un error de método no permitido.
app.put(BUY_SELL_API_PATH + "/buy_sell", (req, res) => {
    res.sendStatus(405);
});

//DELETE a la lista de recursos (p.e. “/api/v1/stats”) borra todos los recursos.
app.delete(BUY_SELL_API_PATH + "/buy_sell", (req, res) => {
    buy_sell.length = 0;
    res.sendStatus(200);
});
	
}