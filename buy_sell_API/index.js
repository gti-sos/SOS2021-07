var path = require('path');
var Datastore = require('nedb');
const datafile = path.join(__dirname, 'buy_sell.db');
const db = new Datastore({ filename: datafile, autoload: true });

var BUY_SELL_API_PATH = "/api/v1";
var buy_sell = [];


module.exports.register = (app) => {
	
	///////////////////////////////////////////////////////////////////////////////////
	//Carga del conjunto de datos inicial
    app.get(BUY_SELL_API_PATH + "/buy_sell/loadInitialData", (req, res) => {

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

        if (db.getAllData().length > 0) res.sendStatus(409);

        else {
            db.insert(buy_sell_initial);
            res.sendStatus(201);
        }
    });
	
	 //Get a lista de recursos /buy_sell con busquedas incluidas
    app.get(BUY_SELL_API_PATH + '/buy_sell', (req, res) => {
        var query = req.query;

        if (query.hasOwnProperty("autonomous_community")) {
            query.autonomous_community = query.autonomous_community;
        }
		if (query.hasOwnProperty("province")) {
            query.province = query.province;
        }
        if (query.hasOwnProperty("year")) {
            query.year = parseInt(query.year);
        }
        if (query.hasOwnProperty("surface")) {
            query.surface = parseFloat(query.surface);
        }
        if (query.hasOwnProperty("annual_variation_percentage")) {
            query.annual_variation_percentage = parseFloat(query.annual_variation_percentage);
        }
        if (query.hasOwnProperty("eviction")) {
            query.eviction = parseFloat(query.eviction);
        }
		//lo del offset y el limit
        if (query.offset) {
            var offset = parseInt(query.offset);
            delete query.offset;
        }
        if (query.limit) {
            var limit = parseInt(query.limit);
            delete query.limit;
        }

        db.find(query).skip(offset).limit(limit).exec((error, data) => {
            if (error) {
                console.error("ERROR accesing DB in GET" + error);
                res.sendStatus(500);
            }
            else {
                if (data.length == 0) {
                    console.error("No data found");
                    res.send(JSON.stringify(data, null, 2));
                }
                else {
                    data.forEach(x => { delete x._id; });
                    res.status(200).send(JSON.stringify(data, null, 2));
                    console.log("GET resource:" + JSON.stringify(data, null, 2));
                }
            }
        });
    });
	
	//Get al recurso /:autonomous_community

    app.get(BUY_SELL_API_PATH + "/buy_sell/:autonomous_community", (req, res) => {
        var params = req.params;

        db.find({ autonomous_community: params.autonomous_community }, (error, data) => {
            if (error) {
                console.error("ERROR accesing DB in GET");
                res.sendStatus(500);
            } else {
                if (data.length == 0) {
                    console.error("No data found");
                    res.sendStatus(404);
                } else {
                    delete data[0]._id;
                    res.send(JSON.stringify(data, null, 2));
                }
            }
        });
    });
	
	 //Get al recurso /:autonomous_community/:province/:year
    app.get(BUY_SELL_API_PATH + "/buy_sell/:autonomous_community/:province/:year", (req, res) => {
        var params = req.params;

        db.find({ autonomous_community: params.autonomous_community, province: params.province, year: parseInt(params.year) }, (error, data) => {
            if (error) {
                console.error("ERROR accesing DB in GET");
                res.sendStatus(500);
            } else {
                if (data.length == 0) {
                    console.error("No data found");
                    res.sendStatus(404);
                } else {
                    delete data[0]._id;
                    res.send(JSON.stringify(data, null, 2));
                }
            }
        });
    });
	
	//Post a la lista de recursos 
    app.post(BUY_SELL_API_PATH + "/buy_sell", (req, res) => {
        var newData = req.body;

        db.find({ autonomous_community: newData.autonomous_community, year: newData.year, province: newData.province }, (error, data) => {
            if (error) {
                console.error("ERROR accesing DB in POST: " + error);
                res.sendStatus(500);
            } else {
                if (data.length == 0) {
                    if (!newData.autonomous_community
                        || !newData.province
                        || !newData.year
                        || !newData['surface']
						|| !newData['annual_variation_percentage']
                        || !newData['eviction']) {
                        res.sendStatus(400);
                    } else {
                        console.log(`New resource added to the database <${JSON.stringify(newData, null, 2)}>`);
                        db.insert(newData);
                        res.sendStatus(201);
                    }
                } else {
                    res.sendStatus(409);
                }
            }
        });
    });
	
	//Post al recurso /:autonomous_community => Method Not Allowed
    app.post(BUY_SELL_API_PATH + "/buy_sell/:autonomous_community", (req, res) => {
        res.sendStatus(405);

    });
	
	//Post al recurso /:autonomous_community/:province/:year => Method Not Allowed
    app.post(BUY_SELL_API_PATH + "/buy_sell/:autonomous_community/:province/:year", (req, res) => {
        res.sendStatus(405);
    });
	
	//Put a lista de recursos  => Method Not Allowed
    app.put(BUY_SELL_API_PATH + "/buy_sell", (req, res) => {
        res.sendStatus(405);
    });
	
	  //Put al recurso /:autonomous_community/:province/:year

    app.put(BUY_SELL_API_PATH + "/buy_sell/:autonomous_community/:province/:year", (req, res) => {
        var params = req.params;
        var newData = req.body;

        if (!newData.autonomous_community
            || !newData.year
            || !newData.province
            || !newData['surface']
			|| !newData['annual_variation_percentage']
            || !newData['eviction']) {
            console.log("Data is missing or incorrect.");
            return res.sendStatus(400);
        } else {
            db.update({ "autonomous_community": params.autonomous_community, "province": params.province, "year": parseInt(params.year) }, newData, (error, data) => {
                if (error) {
                    console.error("ERROR accesing DB in GET" + error);
                    res.sendStatus(500);
                } else {
                    if (data.length == 0) {
                        console.error("No data found");
                        res.sendStatus(404);
                    } else {
                        console.log("Successful PUT");
                        res.sendStatus(200);
                    }
                }
            });
        }
    });
	
	//Delete a lista de recursos
    app.delete(BUY_SELL_API_PATH + "/buy_sell", (req, res) => {
        db.remove({}, { multi: true }, function (error, numRemoved) {
            if (error) {
                console.error("ERROR deleting DB: " + error);
                res.sendStatus(500);
            } else {
                if (numRemoved == 0) {
                    console.error("ERROR: DB was empty");
                    res.sendStatus(404);
                } else {
                    res.sendStatus(200);
                }
            }
        });
    });
	////////////////////////////////////////////////////////////////////////////////////

//DELETE a la lista de recursos (p.e. “/api/v1/stats”) borra todos los recursos.
app.delete(BUY_SELL_API_PATH + "/buy_sell", (req, res) => {
    buy_sell.length = 0;
	console.log("PRUEBA");
    res.sendStatus(200);
});
	
}