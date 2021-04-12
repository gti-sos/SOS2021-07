var BASE_API_PATH = "/api/v1";

var rentals = [];

var rentals_initial = [
    {
        "autonomous_community": "castilla-y-leon",
        "province": "salamanca",
        "year":2018,
        "rent":468,
        "rent_variation":2.2,
        "meter":91,
        "salary":24
    },
    {
        "autonomous_community": "andalucia",
        "province": "malaga",
        "year":2018,
        "rent":615,
        "rent_variation":7.4,
        "meter":101.6,
        "salary":28.8
    },
    {
        "autonomous_community": "andalucia",
        "province": "sevilla",
        "year":2018,
        "rent":560.5,
        "rent_variation":4,
        "meter":94.6,
        "salary":29
    },
    {
        "autonomous_community": "madrid",
        "province": "madrid",
        "year":2018,
        "rent":780,
        "rent_variation":4.6,
        "meter":86.5,
        "salary":51
    },
    {
        "autonomous_community": "cataluna",
        "province": "barcelona",
        "year":2018,
        "rent":696,
        "rent_variation":6,
        "meter":96.8,
        "salary":49
    },
    {
        "autonomous_community": "madrid",
        "province": "madrid",
        "year":2020,
        "rent":848,
        "rent_variation":3.7,
        "meter":71,
        "salary":55.7
    }
];


module.exports.register = (app) => {

    app.get(BASE_API_PATH + "/rentals/loadInitialData", (req, res) => {    

        
        if(rentals.length > 0) rentals.length = 0;

    rentals_initial.forEach(x => rentals.push(x));
    res.sendStatus(201);
});

//GET a lista de recursos rentals
app.get(BASE_API_PATH + "/rentals", (req, res) => {
    res.send(JSON.stringify(rentals,null,2));
});

//GET al recurso /:autonomous_community
app.get(BASE_API_PATH + "/rentals/:autonomous_community",(req,res) => {
    var autonomous_community_url = req.params.autonomous_community;

    for (var i of rentals){
        if (i.autonomous_community == autonomous_community_url) {
            var resultado = rentals.filter(x => x.autonomous_community == autonomous_community_url);
            res.send(JSON.stringify(resultado,null,2));
            return res.status(200)
        }
    }
    res.sendStatus(404);
});

//GET al recurso /:autonomous_community/:year
app.get(BASE_API_PATH + "/rentals/:autonomous_community/:year",(req,res) => {
    var autonomous_community_url = req.params.autonomous_community;
    var year_url = parseInt( req.params.year);

    for (var i of rentals){
        if (i.autonomous_community == autonomous_community_url && i.year == year_url) {
            return res.status(200).json(i);
        }
    }
    res.sendStatus(404);
});

//POST a lista de recursos rentals
app.post(BASE_API_PATH + '/rentals',(req,res)=>{
	var newObject = req.body;

    if (newObject['autonomous_community'] === null
        || newObject['province'] === null
        || newObject['year'] === null
        || newObject['rent'] === null
        || newObject['rent_varation'] === null
        || newObject['meter'] === null
        || newObject['salary'] === null
        || Object.keys(newObject).length != 7) {
        res.sendStatus(400);
    }
    else{
        console.log(`New unemployment entry to be added: <${JSON.stringify(newObject,null,2)}>`);
	    rentals.push(newObject);
	    res.sendStatus(201);
    }
});

app.delete(BASE_API_PATH + "/rentals/:autonomous_community/:year", (req, res) => { 
    var autonomous_community_url = req.params.autonomous_community;
    var year_url = parseInt(req.params.year);

	for (var i = 0; i <  rentals.length; i++){
		if(rentals[i].autonomous_community == autonomous_community_url && rentals[i].year == year_url){
			rentals.splice(i,1);
			
			return res.sendStatus(200);
		}
	}
	res.sendStatus(404);
});

app.put(BASE_API_PATH + "/rentals/:autonomous_community/:year", (req,res) => {
    var autonomous_community_url = req.params.autonomous_community;
    var year_url = parseInt(req.params.year);
    
    for(var i in rentals){
		if(rentals[i].autonomous_community == autonomous_community_url && rentals[i].year == year_url){
			var newRentals = req.body;
			rentals[i] = newRentals;
            res.sendStatus(200);
		}
	}
});

app.post(BASE_API_PATH + "rentals/:autonomous_community", (req, res) => {
   res.sendStatus(405);
});

app.post(BASE_API_PATH + "/rentals/:autonomous_community/:year", (req, res) => {
    res.sendStatus(405);
 });

 app.put(BASE_API_PATH + "/rentals", (req, res) => {
    res.sendStatus(405);
 });

 app.delete(BASE_API_PATH + "/rentals", (req, res) => {
    rentals.length = 0;
    res.sendStatus(200);
  });

}