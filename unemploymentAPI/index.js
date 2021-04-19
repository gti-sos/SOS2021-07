var UNEMPLOYMENT_API_PATH = "/api/v1";

const _ = require('lodash');

const uniqueID = require('uuid');

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

var unemployment = [];

module.exports.register = (app) => {

    //Carga del conjunto de datos inicial
    app.get(UNEMPLOYMENT_API_PATH + "/unemployment/loadInitialData", (req, res) => {
        if (unemployment.length > 0) unemployment.length = 0;

        unemployment_initial.forEach(x => {
            x["id"] = uniqueID(); 
            unemployment.push(x)
        });
        res.sendStatus(201);
    });

    //Get a lista de recursos /unemployment con busquedas incluidas
    app.get(UNEMPLOYMENT_API_PATH + '/unemployment', (req, res) => {
        var resultado = [];
        var autonomous_community_query = req.query.autonomous_community;
        var province_query = req.query.province;

        if (typeof autonomous_community_query != 'undefined')
            unemployment.filter(function (x) {
                if (x.autonomous_community == autonomous_community_query) {
                    resultado.push(x);
                }
            });

        if (typeof province_query != 'undefined')
            unemployment.filter(function (x) {
                if (x.province == province_query) {
                    resultado.push(x);
                }
            });

        resultado = _.uniqBy(resultado, 'id');

        if (Object.keys(req.query).length === 0) {
            resultado = unemployment;
        }

        res.send(JSON.stringify(resultado, null, 2));
    });

    //Get al recurso /:autonomous_community
    app.get(UNEMPLOYMENT_API_PATH + "/unemployment/:autonomous_community", (req, res) => {
        var autonomous_community_url = req.params.autonomous_community;

        var resultado = unemployment.filter(x => x.autonomous_community == autonomous_community_url);
        res.send(JSON.stringify(resultado, null, 2));
    });

    //Get al recurso /:autonomous_community/:province/:year
    app.get(UNEMPLOYMENT_API_PATH + "/unemployment/:autonomous_community/:province/:year", (req, res) => {
        var autonomous_community_url = req.params.autonomous_community;
        var year_url = req.params.year;
        var province_url = req.params.province;

        var resultado = unemployment.filter(x =>
            x.autonomous_community == autonomous_community_url
            && x.year == year_url
            && x.province == province_url);
        res.send(JSON.stringify(resultado, null, 2));
    });

    //Post a la lista de recursos unemployment
    app.post(UNEMPLOYMENT_API_PATH + "/unemployment", (req, res) => {
        var newObject = req.body;

        if (newObject['autonomous_community'] === null
            || newObject['province'] === null
            || newObject['year'] === null
            || newObject['youth_unemployment_rate'] === null
            || newObject['unemployment_rate'] === null
            || newObject['occupation_variation'] === null
            || Object.keys(newObject).length != 6) {
            res.sendStatus(400);
        }
        else {
            console.log(`New unemployment entry to be added: <${JSON.stringify(newObject, null, 2)}>`);
            newObject["id"] = uniqueID();
            unemployment.push(newObject);
            res.sendStatus(201);
        }
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
        var autonomous_community_url = req.params.autonomous_community;
        var year_url = parseInt(req.params.year);
        var province_url = req.params.province;

        for (var i in unemployment) {
            if (unemployment[i].autonomous_community == autonomous_community_url
                && unemployment[i].year == year_url
                && unemployment[i].province == province_url) {
                var newData = req.body;
                unemployment[i] = newData;
                return res.sendStatus(200);
            }
        }
        res.sendStatus(404);
    });

    //Delete a lista de recursos
    app.delete(UNEMPLOYMENT_API_PATH + "/unemployment", (req, res) => {
        unemployment.length = 0;
        res.sendStatus(200);
    });

    //Delete al recurso /:autonomous_community/:province/:year
    app.delete(UNEMPLOYMENT_API_PATH + "/unemployment/:autonomous_community/:province/:year", (req, res) => {
        var autonomous_community_url = req.params.autonomous_community;
        var province_url = req.params.province;
        var year_url = parseInt(req.params.year);

        for (var i = 0; i < unemployment.length; i++) {
            if (unemployment[i].autonomous_community == autonomous_community_url
                && unemployment[i].year == year_url
                && unemployment[i].province == province_url) {
                unemployment.splice(i, 1);
                return res.sendStatus(200);
            }
        }
        res.sendStatus(404);
    });

}