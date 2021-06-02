
var path = require('path');
var Datastore = require('nedb');
const { compose } = require('underscore');

const datafile = path.join(__dirname, 'unemployment.db');
const db = new Datastore({ filename: datafile, autoload: true });

var UNEMPLOYMENT_API_PATH = "/api/v2";

var unemployment = [];

module.exports.register = (app) => {

    //Carga del conjunto de datos inicial
    app.get(UNEMPLOYMENT_API_PATH + "/unemployment/loadInitialData", (req, res) => {

        var unemployment_initial = [
            {
                "autonomous_community": "madrid",
                "youth_unemployment_rate": 31.7662,
                "province": "madrid",
                "year": 2020,
                "unemployment_rate": 12.1491,
                "occupation_variation": 40399.90
            },
            {
                "autonomous_community": "murcia",
                "youth_unemployment_rate": 37.4509,
                "province": "murcia",
                "year": 2020,
                "unemployment_rate": 16.4211,
                "occupation_variation": -1199.95
            },
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
                "youth_unemployment_rate": 48.1605,
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
                "occupation_variation": -42199.95
            },
            {
                "autonomous_community": "andalucia",
                "youth_unemployment_rate": 52.1912,
                "province": "granada",
                "year": 2020,
                "unemployment_rate": 24.8484,
                "occupation_variation": 10899.99
            },
            {
                "autonomous_community": "andalucia",
                "youth_unemployment_rate": 52.1912,
                "province": "cadiz",
                "year": 2020,
                "unemployment_rate": 24.0474,
                "occupation_variation": -24399.99
            },
            {
                "autonomous_community": "andalucia",
                "youth_unemployment_rate": 52.1912,
                "province": "sevilla",
                "year": 2020,
                "unemployment_rate": 23.8074,
                "occupation_variation": -16100.03
            },
            {
                "autonomous_community": "andalucia",
                "youth_unemployment_rate": 52.1912,
                "province": "huelva",
                "year": 2020,
                "unemployment_rate": 20.6911,
                "occupation_variation": 8900
            },
            {
                "autonomous_community": "andalucia",
                "youth_unemployment_rate": 52.1912,
                "province": "cordoba",
                "year": 2020,
                "unemployment_rate": 20.0753,
                "occupation_variation": 8500
            },
            {
                "autonomous_community": "andalucia",
                "youth_unemployment_rate": 52.1912,
                "province": "jaen",
                "year": 2020,
                "unemployment_rate": 20.1441,
                "occupation_variation": 1900
            },
            {
                "autonomous_community": "andalucia",
                "youth_unemployment_rate": 52.1912,
                "province": "almeria",
                "year": 2020,
                "unemployment_rate": 17.1404,
                "occupation_variation": 21899.99
            },
            {
                "autonomous_community": "castilla la mancha",
                "youth_unemployment_rate": 37.3831,
                "province": "guadalajara",
                "year": 2020,
                "unemployment_rate": 13.6976,
                "occupation_variation": -899.99
            },
            {
                "autonomous_community": "castilla la mancha",
                "youth_unemployment_rate": 37.3831,
                "province": "cuenca",
                "year": 2020,
                "unemployment_rate": 14.0043,
                "occupation_variation": -2300
            },
            {
                "autonomous_community": "castilla la mancha",
                "youth_unemployment_rate": 37.3831,
                "province": "albacete",
                "year": 2020,
                "unemployment_rate": 19.7889,
                "occupation_variation": -6600
            },
            {
                "autonomous_community": "castilla la mancha",
                "youth_unemployment_rate": 37.3831,
                "province": "ciudad real",
                "year": 2020,
                "unemployment_rate": 19.9999,
                "occupation_variation": -3100
            },
            {
                "autonomous_community": "castilla la mancha",
                "youth_unemployment_rate": 37.3831,
                "province": "toledo",
                "year": 2020,
                "unemployment_rate": 16.7832,
                "occupation_variation": 4900.09
            },
            {
                "autonomous_community": "cantabria",
                "youth_unemployment_rate": 27.9069,
                "province": "cantabria",
                "year": 2020,
                "unemployment_rate": 11.8581,
                "occupation_variation": 1199.99
            },
            {
                "autonomous_community": "asturias",
                "youth_unemployment_rate": 37.5000,
                "province": "asturias",
                "year": 2020,
                "unemployment_rate": 14.0845,
                "occupation_variation": -300.01
            },
            {
                "autonomous_community": "la rioja",
                "youth_unemployment_rate": 29.5454,
                "province": "la rioja",
                "year": 2020,
                "unemployment_rate": 11.8480,
                "occupation_variation": -4199.99
            },
            {
                "autonomous_community": "navarra",
                "youth_unemployment_rate": 31.7460,
                "province": "navarra",
                "year": 2020,
                "unemployment_rate": 11.4832,
                "occupation_variation": -699.98
            },
            {
                "autonomous_community": "pais vasco",
                "youth_unemployment_rate": 39.0384,
                "province": "vizcaya",
                "year": 2020,
                "unemployment_rate": 12.0379,
                "occupation_variation": -11500
            },
            {
                "autonomous_community": "pais vasco",
                "youth_unemployment_rate": 39.0384,
                "province": "guipuzcoa",
                "year": 2020,
                "unemployment_rate": 9.2500,
                "occupation_variation": 7299.98
            },
            {
                "autonomous_community": "pais vasco",
                "youth_unemployment_rate": 39.0384,
                "province": "alava",
                "year": 2020,
                "unemployment_rate": 11.2924,
                "occupation_variation": 99.99
            },
            {
                "autonomous_community": "galicia",
                "youth_unemployment_rate": 37.1158,
                "province": "a coruña",
                "year": 2020,
                "unemployment_rate": 12.7018,
                "occupation_variation": -11500
            },
            {
                "autonomous_community": "galicia",
                "youth_unemployment_rate": 37.1158,
                "province": "lugo",
                "year": 2020,
                "unemployment_rate": 8.8489,
                "occupation_variation": -300
            },
            {
                "autonomous_community": "galicia",
                "youth_unemployment_rate": 37.1158,
                "province": "potevedra",
                "year": 2020,
                "unemployment_rate": 15.2133,
                "occupation_variation": -9200.01
            },
            {
                "autonomous_community": "galicia",
                "youth_unemployment_rate": 37.1158,
                "province": "ourense",
                "year": 2020,
                "unemployment_rate": 11.6459,
                "occupation_variation": -299.99
            },
            {
                "autonomous_community": "ceuta",
                "youth_unemployment_rate": 70.5882,
                "province": "ceuta",
                "year": 2020,
                "unemployment_rate": 28.0898,
                "occupation_variation": -1600
            },
            {
                "autonomous_community": "melilla",
                "youth_unemployment_rate": 47.2758,
                "province": "melilla",
                "year": 2020,
                "unemployment_rate": 21.6080,
                "occupation_variation": -225.03
            }
        ];

        if (db.getAllData().length > 0) {
            res.sendStatus(409);
        } else {
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

        if (query.occupation_variation || query.youth_unemployment_rate || query.unemployment_rate) {
            console.log("Busque únicamente por comunidad provincia y/o año.");
            res.sendStatus(400);
        } else {
            db.find(query).skip(offset).limit(limit).exec((error, data) => {
                if (error) {
                    console.error("ERROR accesing DB in GET" + error);
                    res.sendStatus(500);
                }
                else if (data.length == 0) {
                    console.error("No data found");
                    res.sendStatus(404);
                } else {
                    data.forEach(x => { delete x._id; });
                    res.status(200).send(JSON.stringify(data, null, 2));
                    console.log("GET resource:" + JSON.stringify(data, null, 2));
                }
            });
        }
    });
    /*
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
     */
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
                        || !newData.unemployment_rate
                        || !newData.occupation_variation
                        || !newData.youth_unemployment_rate) {
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
            || !newData.unemployment_rate
            || !newData.occupation_variation) {
            console.log("Data is missing or incorrect.");
            return res.sendStatus(400);
        } else {
            db.update({ "autonomous_community": params.autonomous_community, "province": params.province, "year": parseInt(params.year) }, newData, (error, data) => {
                if (error) {
                    console.error("ERROR accesing DB in GET " + error);
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