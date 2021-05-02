
var path = require('path');
var Datastore = require('nedb');

const datafile = path.join(__dirname, 'unemployment.db');
const db = new Datastore({ filename: datafile, autoload: true });

var UNEMPLOYMENT_API_PATH = "/api/v1";

var unemployment = [];

module.exports.register = (app) => {

    //Carga del conjunto de datos inicial
    app.get(UNEMPLOYMENT_API_PATH + "/unemployment/loadInitialData", (req, res) => {

        var unemployment_initial = [
            {
                "autonomous_community": "extremadura",
                "youth_unemployment_rate": 48.1605,
                "province": "badajoz",
                "year": 2020,
                "unemployment_rate": 22.8954,
                "occupation_variation": -1.09999
            },
            {
                "autonomous_community": "extremadura",
                "youth_unemployment_rate": null,
                "province": "caceres",
                "year": 2020,
                "unemployment_rate": 18.5352,
                "occupation_variation": 100.00610
            },
            {
                "autonomous_community": "andalucia",
                "youth_unemployment_rate": 52.1912,
                "province": "malaga",
                "year": 2020,
                "unemployment_rate": 19.3225,
                "occupation_variation": 32.79998
            },
            {
                "autonomous_community": "andalucia",
                "youth_unemployment_rate": null,
                "province": "granada",
                "year": 2020,
                "unemployment_rate": 24.8484,
                "occupation_variation": 13.79998
            }
        ];

        if (db.getAllData().length > 0) res.sendStatus(409);

        //evitar que se acumulen datos carga tras carga
        //db.remove({}, { multi: true }, function (err, numRemoved) { });

        //carga de datos
        else {
            db.insert(unemployment_initial);
            res.sendStatus(201);
        }
    });

    //Get a lista de recursos /unemployment con busquedas incluidas
    app.get(UNEMPLOYMENT_API_PATH + '/unemployment', (req, res) => {
        var query = req.query;

        if (query.hasOwnProperty("autonomous_community")) {
            query.autonomous_community = query.autonomous_community;
        }
        if (query.hasOwnProperty("year")) {
            query.year = parseInt(query.year);
        }
        if (query.hasOwnProperty("province")) {
            query.province = query.province;
        }
        if (query.hasOwnProperty("youth_unemployment_rate")) {
            query.youth_unemployment_rate = parseInt(query.youth_unemployment_rate);
        }
        if (query.hasOwnProperty("unemployment_rate")) {
            query.unemployment_rate = parseInt(query.unemployment_rate);
        }
        if (query.hasOwnProperty("occupation_variation")) {
            query.occupation_variation = parseInt(query.occupation_variation);
        }
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
    app.get(UNEMPLOYMENT_API_PATH + "/unemployment/:autonomous_community", (req, res) => {
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
                    res.send(JSON.stringify(data[0], null, 2));
                }
            }
        });
    });

    //Get al recurso /:autonomous_community/:province/:year
    app.get(UNEMPLOYMENT_API_PATH + "/unemployment/:autonomous_community/:province/:year", (req, res) => {
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
                    res.send(JSON.stringify(data[0], null, 2));
                }
            }
        });
    });

    //Post a la lista de recursos unemployment
    app.post(UNEMPLOYMENT_API_PATH + "/unemployment", (req, res) => {
        var newData = req.body;

        db.find({ autonomous_community: newData.autonomous_community, year: newData.year, province: newData.province }, (error, data) => {
            if (error) {
                console.error("ERROR accesing DB in POST: " + error);
                res.sendStatus(500);
            } else {
                if (data.length == 0) {
                    if (!newData.autonomous_community
                        || !newData.year
                        || !newData.province
                        || !newData['unemployment_rate']
                        || !newData['occupation_variation']) {
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
    app.post(UNEMPLOYMENT_API_PATH + "/unemployment/:autonomous_community", (req, res) => {
        res.sendStatus(405);

    });

    //Post al recurso /:autonomous_community/:province/:year => Method Not Allowed
    app.post(UNEMPLOYMENT_API_PATH + "/unemployment/:autonomous_community/:province/:year", (req, res) => {
        res.sendStatus(405);
    });

    //Put a lista de recursos unemployment => Method Not Allowed
    app.put(UNEMPLOYMENT_API_PATH + "/unemployment", (req, res) => {
        res.sendStatus(405);
    });

    //Put al recurso /:autonomous_community/:province/:year

    app.put(UNEMPLOYMENT_API_PATH + "/unemployment/:autonomous_community/:province/:year", (req, res) => {
        var params = req.params;
        var newData = req.body;

        if (!newData.autonomous_community
            || !newData.year
            || !newData.province
            || !newData['unemployment_rate']
            || !newData['occupation_variation']) {
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
    app.delete(UNEMPLOYMENT_API_PATH + "/unemployment", (req, res) => {
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

    //Delete al recurso /:autonomous_community/:province/:year
    app.delete(UNEMPLOYMENT_API_PATH + "/unemployment/:autonomous_community/:province/:year", (req, res) => {
        var params = req.params;

        db.find({ autonomous_community: params.autonomous_community, year: parseInt(params.year), province: params.province }, (error, data) => {
            if (error) {
                console.log("ERROR accesing DB," + error);
                res.sendStatus(500); //Error de servidor
            }
            else {
                if (data.length == 0)
                    res.sendStatus(404);
                else {
                    db.remove({ $and: [{ autonomous_community: params.autonomous_community, province: params.province, year: parseInt(params.year) }] }, { _id: 0 }, function (error, resource) {
                        if (error) {
                            console.error("ERROR accesing DB: " + error);
                            res.sendStatus(500);
                        } else {
                            res.sendStatus(200);
                        }
                    });
                }
            }
        });
    });
}