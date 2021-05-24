var path = require('path');
var Datastore = require('nedb');

//required vars and cons

const BASE_API_PATH = "/api/v1";
const datafile = path.join(__dirname, 'rentals_integration.db');
const db = new Datastore({ filename: datafile, autoload: true });

var rentalsData = [];




module.exports.register = (app) => {

    app.get(BASE_API_PATH + "/rentals/loadInitialData", (req, res) => {    

        
        var rentals_initial = [
            {
                "autonomous_community": "castilla-y-leon",
                "province": "salamanca",
                "year":2018,
                "rent":468,
                "rent_variation":2.2,
                "meter":91,
                "salary":24.0
            },
           
            {
                "autonomous_community": "andalucia",
                "province": "sevilla",
                "year":2018,
                "rent":560.5,
                "rent_variation":4.0,
                "meter":94.6,
                "salary":29.0
            },
            
            {
                "autonomous_community": "cataluna",
                "province": "barcelona",
                "year":2018,
                "rent":696,
                "rent_variation":6.0,
                "meter":96.8,
                "salary":49.0
            },
            {
                "autonomous_community": "comunidad_de_madrid",
                "province": "madrid",
                "year":2020,
                "rent":848,
                "rent_variation":3.7,
                "meter":71,
                "salary":55.7
            }
        ];
    
        db.find({ $or: [{ autonomous_community: "castilla-y-leon" }, { autonomous_community: "comunidad_de_madrid" }, { autonomous_community: "cataluna" },{ autonomous_community: "andalucia" }] }, { _id: 0 }, function (err, data) {
            if (err) {
              console.error("ERROR accesing DB");
              res.sendStatus(500);
            } else {
              if (data.length == 0) {
                db.insert(rentals_initial);
                console.log(`DB Load: <${JSON.stringify(rentals_initial, null, 2)}>`);
                res.sendStatus(201);
              } else {
                console.error(`Initial data exists`);
                res.sendStatus(409);
              }
            }
          });
});

//GET a lista de recursos rentals
app.get(BASE_API_PATH + "/rentals", (req, res) => {
   
	
    console.log("New GET .../rentals");
    var query = req.query;

     
    for (i in query) {

      if (i == 'year') {
        query[i] = parseInt(query[i]);
      } else if (i == 'rent') {
        query[i] = parseInt(query[i]);
      } else if (i == 'rent_variation') {
        query[i] = parseFloat(query[i]);
      } else if (i == 'meter') {
        query[i] = parseInt(query[i]);
      } else if (i == 'salary') {
        query[i] = parseFloat(query[i]);
      }
    }
    console.log(`Query:  ${query}`);
    
    var limit = query.limit;
    var offset = query.offset;
    delete query.offset;
    delete query.limit;

    db.find(query).skip(offset).limit(limit).exec((error, data) => {
      if (error) {
        console.error("ERROR accesing DB: "+ error);
        res.sendStatus(500);
        } else{
            if(data.length == 0){
                console.error("There is no data " + data.length);
                res.sendStatus(404);
            }else{
                data.forEach(x => { delete x._id; });
                res.status(200).send(JSON.stringify(data, null, 2));
             console.log("Get resource list:"+JSON.stringify(data, null, 2));
            }
        }
    });
});

//GET al recurso /:autonomous_community
/*app.get(BASE_API_PATH + "/rentals/:autonomous_community",(req,res) => {
    var autonomous_community_url = req.params.autonomous_community;

    for (var i of rentals){
        if (i.autonomous_community == autonomous_community_url) {
            var resultado = rentals.filter(x => x.autonomous_community == autonomous_community_url);
            res.send(JSON.stringify(resultado,null,2));
            return res.status(200)
        }
    }
    res.sendStatus(404);
}); */

//GET al recurso /:province/:year//
app.get(BASE_API_PATH + "/rentals/:province/:year",(req,res) => {
    var province_url = req.params.province;
    var year_url = parseInt(req.params.year);

    db.find({ $and: [{ province: province_url }, { year: year_url }] }, { _id: 0 }, function (err, resource) {
      if (err) {
        console.error("ERROR accesing DB: "+ err);
        res.sendStatus(500);
      } else {
        if (resource.length == 0) {
          console.error("No data found");
          res.sendStatus(404);
        } else {
            delete resource[0]._id;
            res.status(200).send(JSON.stringify(resource[0], null, 2));
        }
            
      }
    });
});





  
  }