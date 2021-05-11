//required modules
var path = require('path');
var Datastore = require("nedb");
var initialdata = require(path.join(__dirname, 'initialData.js'));

//required variables
var BASE_API_PATH = "/api/v2";
var datafile = path.join(__dirname, 'buy_sell.db');
var db = new Datastore({ filename: datafile, autoload: true});


//implementation
module.exports.register = (app) => {
	
    //Crea 2 o mรกs recursos.
    app.get(BASE_API_PATH + "/buy_sell/loadInitialData", (req, res) => {
        
        db.find({ $or: [{ autonomous_community: "cantabria" }, { autonomous_community: "andalucia" }] }, { _id: 0 }, function (err, data) {
            if (err) {
                console.error("ERROR accesing DB in GET");
                res.sendStatus(500);
            } else {
                if (data.length == 0) {
                    db.insert(initialdata);
                    console.log(`Loaded initial data: <${JSON.stringify(initialdata, null, 2)}>`);
                    res.sendStatus(201);
                } else {
                    console.error(`initial data already exists`);
                    res.sendStatus(409);
                }
            }
        });

    });

    //Devuelve una lista con todos los recursos (un array de objetos en JSON)
    app.get(BASE_API_PATH + "/buy_sell", (req, res) => {
        var query = req.query;

        var limit = parseInt(query.limit);
        var offset = parseInt(query.offset)

        var cookedQuery = [];


        //Parseo de paremetros de la busqueda
        for (d in query) {
            var queryObject = {};
            if (d == 'autonomous_community') {
                queryObject[d] = query[d];
            } else if (d == 'province') {
                queryObject[d] = query[d];
            } else if (d == 'year') {
                queryObject[d] = parseInt(query[d]);
            } else if (d == 'surface') {
                queryObject[d] = parseFloat(query[d]);
            } else if (d == 'annual_variation_percentage') {
                queryObject[d] = parseFloat(query[d]);
            } else if (d == 'eviction') {
                queryObject[d] = parseFloat(query[d]);
            }else{
                queryObject[d]=null;
            }
            if (d != 'limit' && d != 'offset') {
                cookedQuery.push(queryObject);
            }


        }

        //Comprobamos si se ha utilizado limit o offset
        if (!isNaN(limit) || !isNaN(offset)) {

            //Comprobamos si ha habido una busqueda
            if (Object.keys(query).length === 0) {

                //Si la busqueda no tiene nada se devuelven todos los elementos
                db.find({}, { _id: 0 }, (err, data) => {
                    if (err) {
                        console.error("ERROR accesing DB in GET");
                        res.sendStatus(500);
                    } else {
                        if (data.length == 0) {
                            console.error("No data found");
                            res.sendStatus(404);
                        } else {
                            console.log(`requested buy sell stats dataset`);
                            res.status(200).send(JSON.stringify(data, null, 2));
                        }
                    }
                });

            } else {
                //Sino Se pasan los paremetros de la busqueda
                db.find({ $and: cookedQuery }, { _id: 0 }).skip(offset).limit(limit).exec((err, data) => {
                    if (err) {
                        console.error("ERROR accesing DB in GET");
                        res.sendStatus(500);
                    } else if (data.length == 0) {
                        console.error("No data found");
                        res.sendStatus(404);
                    } else {
                        console.log(`requested buy sell stats dataset`);
                        res.status(200).send(JSON.stringify(data, null, 2));
                    }
                });
            }

        } else {
            //Sino se utilizan limit u offset
            if (Object.keys(query).length === 0) {
                //Si la busqueda no tiene nada se devuelven todos los elementos
                db.find({}, { _id: 0 }, function (err, data) {
                    if (err) {
                        console.error("ERROR accesing DB in GET");
                        res.sendStatus(500);
                    } else {
                        if (data.length == 0) {
                            console.error("No data found");
                            res.sendStatus(404);
                        } else {
                            console.log(`requested buy sell stats dataset`);
                            res.status(200).send(JSON.stringify(data, null, 2));
                        }
                    }
                });

            } else {
                //Sino Se pasan los paremetros de la busqueda
                db.find({ $and: cookedQuery }, { _id: 0 }, function (err, data) {
                    if (err) {
                        console.error("ERROR accesing DB in GET");
                        res.sendStatus(500);
                    } else if (data.length == 0) {
                        console.error("No data found");
                        res.sendStatus(404);
                    } else {
                        console.log(`requested buy sell stats dataset`);
                        res.status(200).send(JSON.stringify(data, null, 2));
                    }
                });
            }
        }

    });
 
    //crea un nuevo recurso.
    app.post(BASE_API_PATH + "/buy_sell", (req, res) => {
        var newData = req.body;

        var newComunity = req.body.autonomous_community;
		var newProvince = req.body.province;
        var newYear = parseInt(req.body.year);


        db.find({ $and: [{ autonomous_community: newComunity }, { province: newProvince }, { year: newYear }] }, { _id: 0 }, function (err, data) {
            if (err) {
                console.error("ERROR accesing DB in POST");
                res.sendStatus(500);
            } else {
                if (data.length == 0) {
                    //Comprobamos los parametros del recurso a insertar
                    if (!newData.autonomous_community
                        || !newData.province
                        || !newData.year
                        || !newData['surface']
                        || !newData['annual_variation_percentage']
                        || !newData['eviction']
                        || Object.keys(newData).length != 6) {

                        console.log("Numero de parametros incorrectos");
                        res.sendStatus(400);
                    } else {
                        //Insertamos el recurso
                        console.log(`new buy sell stat to be added: <${JSON.stringify(newData, null, 2)}>`);
                        db.insert(newData);
                        res.sendStatus(201);
                    }
                } else {
                    //El recurso a crear ya existe
                    console.log("Conflict detected");
                    res.sendStatus(409);
                }
            }
        });
    });


    //GET 
    app.get(BASE_API_PATH + "/buy_sell/:autonomous_community/:province/:year", (req, res) => {
        var ComunitySelected = req.params.autonomous_community;
		var ProvinceSelected = req.params.province;
        var YearSelected = parseInt(req.params.year);

        db.find({ $and: [{ autonomous_community: ComunitySelected }, { province: ProvinceSelected }, { year: YearSelected }] }, { _id: 0 }, function (err, data) {
            if (err) {
                console.error("ERROR accesing DB in GET");
                res.sendStatus(500);
            } else {
                if (data.length == 0) {
                    console.error("No data found");
                    res.sendStatus(404);
                } else {
                    console.log(`GET stat by community: <${ComunitySelected}> and province: <${ProvinceSelected}> and year: <${YearSelected}>`);
                    res.status(200).send(JSON.stringify(data[0], null, 2));
                }
            }
        });
    });

  app.put(BASE_API_PATH + "/buy_sell/:autonomous_community/:province/:year", (req,res) => {
    var oldObject = req.params;
    var newObject = req.body;
    var autonomous_community_url = req.body.autonomous_community;
    var province_url = req.body.province;
    var year_url = parseInt(req.body.year);
    var surface_url = parseFloat(req.body.surface);
    var annual_variation_percentage_url = parseFloat(req.body.annual_variation_percentage);
    var eviction_url = parseFloat(req.body.eviction);
    
    if (!newObject.autonomous_community
        || !newObject.province
        || !newObject.year
        || !newObject['surface']  
        || !newObject['annual_variation_percentage']
        || !newObject['eviction']
        || Object.keys(newObject).length != 6) {
            console.log("invalid update, incorrect or empty data");
        res.sendStatus(400);
    } else {
        
        db.update({"autonomous_community": oldObject.autonomous_community, "province": oldObject.province, "year": parseInt(oldObject.year)}, newObject, (err, resource) => {
            if (err) {
                console.error("ERROR accesing DB: "+ err);
                res.sendStatus(500);
            } else{
                if(resource==0){ 
                    console.error("No data found");
                    res.sendStatus(404);
                }else {
                    console.log("Put done successfully");
                    res.sendStatus(200);
                }
            }
        });
    }
});

    //PUT a la lista de recursos (ERROR)
    app.put(BASE_API_PATH + "/buy_sell", (req, res) => {
        console.log("Put a una lista de recursos no se puede");
        return res.sendStatus(405);

    });
	
	//Post al recurso /:autonomous_community => Method Not Allowed
    app.post(BASE_API_PATH + "/buy_sell/:autonomous_community", (req, res) => {
        res.sendStatus(405);

    });

    //Post al recurso /:autonomous_community/:province/:year => Method Not Allowed
    app.post(BASE_API_PATH + "/buy_sell/:autonomous_community/:province/:year", (req, res) => {
        res.sendStatus(405);
    });

    //DELETE /
    app.delete(BASE_API_PATH + "/buy_sell/:autonomous_community/:province/:year", (req, res) => {
  
		var ComunitySelected = req.params.autonomous_community;
		var ProvinceSelected = req.params.province;
        var YearSelected = parseInt(req.params.year);
		
        db.remove({ $and: [{ autonomous_community: ComunitySelected }, { province: ProvinceSelected }, { year: YearSelected }] }, { multi: true }, function (err, dataDeleted) {
            if (err) {
                console.error("ERROR accesing DB in DELETE");
                res.sendStatus(500);
            } else {
                if (dataDeleted == 0) {
                    console.error("No data found");
                    res.sendStatus(404);
                } else {
                    console.log(`stat with community: <${ComunitySelected}> and province: <${ProvinceSelected}> and year: <${YearSelected}> deleted`);
                    res.sendStatus(200);
                }
            }
        });
    });

    //DELETE a la lista de recursos.
    app.delete(BASE_API_PATH + "/buy_sell", (req, res) => {
        db.remove({}, { multi: true }, function (err, numRemoved) {
            if (err) {
                console.error("ERROR deleting DB contacts in DELETE");
                res.sendStatus(500);
            } else {
                if (numRemoved == 0) {
                    console.error("ERROR buy_sell not found");
                    res.sendStatus(404);
                } else {
                    res.sendStatus(200);
                }
            }
        });

    })
}
