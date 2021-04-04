var cool = require("cool-ascii-faces");

var express = require("express");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json());

var path = require("path");
var port = (process.env.PORT || 10000);

//Ruta base API
var BASE_API_PATH="/api/v1";

var unemployment_initial = [
    {
        "autonomous-community":"extremadura",
        "youth-unemployment-rate":48.1605,
        "province":"badajoz",
        "year":2020,
        "unemployment-rate":22.8954,
        "occupation-variation":-1.09999
    },
    {
        "autonomous-community":"extremadura",
        "youth-unemployment-rate":"-",
        "province":"cáceres",
        "year":2020,
        "unemployment-rate":18.5352,
        "occupation-variation":100.00610
    },
    {
        "autonomous-community":"andalucía",
        "youth-unemployment-rate":52.1912,
        "province":"málaga",
        "year":2020,
        "unemployment-rate":19.3225,
        "occupation-variation":32.79998
    }
];

//API unemployment - Alejandro
var unemployment = [
    {
        "autonomous-community":"extremadura",
        "youth-unemployment-rate":48.1605,
        "province":"badajoz",
        "year":2020,
        "unemployment-rate":22.8954,
        "occupation-variation":-1.09999
    },
    {
        "autonomous-community":"extremadura",
        "youth-unemployment-rate":"-",
        "province":"cáceres",
        "year":2020,
        "unemployment-rate":18.5352,
        "occupation-variation":100.00610
    },
    {
        "autonomous-community":"andalucía",
        "youth-unemployment-rate":52.1912,
        "province":"málaga",
        "year":2020,
        "unemployment-rate":19.3225,
        "occupation-variation":32.79998
    }
];

app.get(BASE_API_PATH + "/unemployment/loadInitialData", (req, res) => {
    res.send(JSON.stringify(unemployment_initial,null,2));
});

app.get(BASE_API_PATH + "/unemployment", (req, res) => {
    res.send(JSON.stringify(unemployment,null,2));
});

app.post(BASE_API_PATH + "/unemployment", (req, res) => {
    var newUnemploymentEntry = req.body;
    console.log('New unemployment entry to be added: <${JSON.stringfy(newUnemploymentEntry,null,2)}>');
    unemployment.push(newUnemploymentEntry);
    res.sendStatus(201);
});

app.delete(BASE_API_PATH + "/unemployment", (req, res) => {
    
});

app.put(BASE_API_PATH + "/unemployment", (req, res) => {
    
});

//API rentals - Francisco

var rentals_initial = [
    {
        "autonomous_community": "andalucía",
        "province": "sevilla",
        "year":2018,
        "rent":560.5,
        "rent-variation":4,
        "meter":94.6,
        "salary":29
    },

    {
        "autonomous_community": "madrid",
        "province": "madrid",
        "year":2018,
        "rent":780,
        "rent-variation":4.6,
        "meter":86.5,
        "salary":51
    },

    {
        "autonomous_community": "cataluña",
        "province": "barcelona",
        "year":2018,
        "rent":696,
        "rent-variation":6,
        "meter":96.8,
        "salary":49
    },

    {
        "autonomous_community": "castilla-y-león",
        "province": "salamanca",
        "year":2018,
        "rent":468,
        "rent-variation":2.2,
        "meter":91,
        "salary":24
    },

    {
        "autonomous_community": "madrid",
        "province": "madrid",
        "year":2020,
        "rent":848,
        "rent-variation":3.7,
        "meter":71,
        "salary":55.7
    }
];

var rentals = [
    {
        "autonomous_community": "polla",
        "province": "sevilla",
        "year":2018,
        "rent":560.5,
        "rent-variation":4,
        "meter":94.6,
        "salary":29
    },

    {
        "autonomous_community": "madrid",
        "province": "madrid",
        "year":2018,
        "rent":780,
        "rent-variation":4.6,
        "meter":86.5,
        "salary":51
    },

    {
        "autonomous_community": "cataluña",
        "province": "barcelona",
        "year":2018,
        "rent":696,
        "rent-variation":6,
        "meter":96.8,
        "salary":49
    },

    {
        "autonomous_community": "castilla-y-león",
        "province": "salamanca",
        "year":2018,
        "rent":468,
        "rent-variation":2.2,
        "meter":91,
        "salary":24
    },

    {
        "autonomous_community": "madrid",
        "province": "madrid",
        "year":2020,
        "rent":848,
        "rent-variation":3.7,
        "meter":71,
        "salary":55.7
    }
];

app.get(BASE_API_PATH + "/rentals/loadInitialData", (req, res) => {
    
    console.log('START - LOAD INITIAL DATA \n'+
    JSON.stringify(rentals_initial,null,2)+
    '\n END - LOAD INITIAL DATA');
});

app.get(BASE_API_PATH + "/rentals", (req, res) => {
    res.send(JSON.stringify(rentals,null,2));
});

app.post(BASE_API_PATH + "/rentals", (req, res) => {
    var newRentalsEntry = req.body;
    console.log('New rentals entry to be added: <${JSON.stringfy(newRentalsEntry,null , 2)}>');
    rentals.push(newRentalsEntry);
    res.sendStatus(201);
});


app.get(BASE_API_PATH+'/rentals/:autonomous_community',(req,res)=>{
    var autonomous_community_url = req.params.autonomous_community;

    rentals.find({autonomous_community:autonomous_community_url},(err,docs)=>{
        if(docs.length>=1){
            res.send(
                docs.map(ti=>{
                    delete ti._id;
                    return ti;
                })
            );
            console.log(
                '\n START - SHOW THOSE DATA FROM DB\n'+
                JSON.stringify(docs, null, 2)+
                '\n END - SHOW THOSE DATA FROM DB\n'
            );
        }else {
            res.sendStatus(404);
            console.log('\n 404 - RENTALS NOT FOUND');
        }
    });
});


app.get(BASE_API_PATH+'/rentals/:autonomous_community/:province/:year',(req,res)=>{
    var autonomous_community_url = req.params.autonomous_community;
    var province_url = req.params.province;
    var year_url = req.params.year;


    rentals.find({autonomous_community:autonomous_community_url, province: province_url, year: parseInt(year_url)},(err,docs)=>{
        if(docs.length>=1){
            res.send(
                docs.map(ti=>{
                    delete ti._id;
                    return ti;
                })[0]
            );
            console.log(
                '\n START - SHOW THOSE DATA FROM DB\n'+
                JSON.stringify(docs, null, 2)+
                '\n END - SHOW THOSE DATA FROM DB\n'
            );
        }else {
            res.sendStatus(404);
            console.log('\n 404 - RENTALS NOT FOUND');
        }
    });
});

app.delete(BASE_API_PATH + 'rentals/:autonomous_community', (req, res) => {
    var autonomous_community_url = req.params.autonomous_community;
    
    rentals.remove({autonomous_community: autonomous_community_url},{multi:true},(err, numRemoved)=>{
        if(numRemoved==0){
            res.sendStatus(404);
            console.log('RENTALS NOT FOUND');
        }else{
            res.sendStatus(200);
            console.log(
                '\n START - DELETE THOSE DATA FROM DB\n'+
                numRemoved + 
                '\n END - DELETE THOSE DATA FROM DB\n'
            );
        }
    });
});


app.delete(BASE_API_PATH + 'rentals/:autonomous_community/:province/:year', (req, res) => {
    var autonomous_community_url = req.params.autonomous_community;
    var province_url = req.params.province;
    var year_url = req.params.year;

    
    rentals.remove({autonomous_community: autonomous_community_url, province: province_url, year: parseInt(year_url)},{multi:true},(err, numRemoved)=>{
        if(numRemoved==0){
            res.sendStatus(404);
            console.log('RENTALS NOT FOUND');
        }else{
            res.sendStatus(200);
            console.log(
                '\n START - DELETE THOSE DATA FROM DB\n'+
                numRemoved + 
                '\n END - DELETE THOSE DATA FROM DB\n'
            );
        }
    });
});


app.put(BASE_API_PATH + "rentals/:autonomous_community/:province/:year", (req, res) => {
    var newRentalsEntry = req.body;
    var autonomous_community_url = req.params.autonomous_community;
    var province_url = req.params.province;
    var year_url = req.params.year;

    if (
        newRentalsEntry.autonomous_community == null||
        newRentalsEntry.province == null||
        newRentalsEntry.year == null||
        newRentalsEntry.rent == null||
        newRentalsEntry.rent_variation == null||
        newRentalsEntry.meter == null||
        newRentalsEntry.salary == null||
        newRentalsEntry==''
    ) {
        res.sendStatus(400);
        console.log('\n 400 - RENTALS CAN NOT BE EMPITY OR NULL');
    }else{
        rentals.update(
            {autonomous_community: autonomous_community_url, 
            province: province_url, year: parseInt(year_url)},
            {
                autonomous_community: newRentalsEntry.autonomous_community,
                province: newRentalsEntry.province,
                year: newRentalsEntry.year,
                rent: newRentalsEntry.rent,
                rent_variation: newRentalsEntry.rent_variation,
                meter: newRentalsEntry.meter,
                salary: newRentalsEntry.salary
            },
            {},
            (err,numRemoved)=>{
                res.sendStatus(200);
                console.log(
                    '\n START - UPDATE THIS DATA FROM DB\n'+
                    numRemoved+
                    '\n END - UPDATE THIS DATA FROM DB\n'
                );
            }
        );
    }
});

app.post(BASE_API_PATH + "rentals/:autonomous_community", (req, res) => {
   res.sendStatus(405);
   console.log('METHOD NOT ALLOWED\n');
});

app.post(BASE_API_PATH + "/rentals/:autonomous_community/:province/:year", (req, res) => {
    res.sendStatus(405);
    console.log('METHOD NOT ALLOWED\n');
 });

 app.put(BASE_API_PATH + "/rentals", (req, res) => {
    res.sendStatus(405);
    console.log('METHOD NOT ALLOWED\n');
 });

 app.delete(BASE_API_PATH + "/rentals", (req, res) => {
    rentals.remove({}, {multi: true}, function(err,numRemoved){
        if(numRemoved>=1){
            res.sendStatus(200);
            console.log(
                '\n START - DELETE ALL DATA FROM DB\n'+
                numRemoved+
                '\n END - DELETE ALL DATA FROM DB\n'
            );
        }else{
            res.sendStatus(404);
            console.log('NO DATA TO REMOVE');
        }
    });
 });


//API buy-sell - Nuria

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

//F03
    //Tabla de Alejandro
app.get("/info/unemployment", (req, res) => {
    res.send("<html><body><table class='tftable' border='1'>"+
    "<tr><th>autonomous-community</th><th>youth-unemployment-rate</th><th>province</th><th>year</th><th>unemployment-rate</th><th>occupation-variation</th></tr>"+
    "<tr><td>extremadura</td><td>48.1605</td><td>badajoz</td><td>2020</td><td>22.8954</td><td>-1.09999</td></tr>"+
    "<tr><td>extremadura</td><td>-</td><td>cáceres</td><td>2020</td><td>18.5352</td><td>100,00610</td></tr>"+
    "<tr><td>andalucía</td><td>52.1912</td><td>málaga</td><td>2020</td><td>19.3225</td><td>32.79998</td></tr>"+
    "<tr><td>andalucía</td><td>-</td><td>granada</td><td>2020</td><td>24.8484</td><td>13.79998</td></tr>"+
    "<tr><td>cataluña</td><td>38.1233</td><td>barcelona</td><td>2020</td><td>13.6676</td><td>29.69995</td></tr>"+
    "<tr><td>aragón</td><td>34.4671</td><td>zaragoza</td><td>2020</td><td>12.9139</td><td>1.39999</td></tr>"+
    "</table><//body></html>");
});
    
    //Tabla de Francisco
app.get("/info/rentals", (req, res) => {
    res.send("<html><body><table class='tftable' border='1'>"+
    "<tr><th>autonomous-community</th><th>province</th><th>year</th><th>rent</th><th>rent-variation</th><th>meter</th><th>salary</th></tr>"+
    "<tr><td>andalucía</td><td>sevilla</td><td>2018</td><td>560.5</td><td>4</td><td>94.6</td><td>29</td></tr>"+
    "<tr><td>cataluña</td><td>barcelona</td><td>2018</td><td>696</td><td>6</td><td>96.8</td><td>49</td></tr>"+
    "<tr><td>madrid</td><td>madrid</td><td>2018</td><td>780</td><td>4.6</td><td>86.5</td><td>51</td></tr>"+
    "<tr><td>castilla-y-león</td><td>salamanca</td><td>2018</td><td>468</td><td>22.2</td><td>91</td><td>24</td></tr>"+
    "<tr><td>castilla-y-león</td><td>palencia</td><td>2018</td><td>416.7</td><td>22.5</td><td>94.1</td><td>24</td></tr>"+
    "</table><//body></html>");
}); 

    //Tabla de Nuria
app.get("/info/buy-sell", (req, res) => {
    res.send("<html><body><table class='tftable' border='1'>"+
    "<tr><th>autonomous-community</th><th>province</th><th>year</th><th>surface</th><th>annual-variation-percentage</th><th>eviction</th></tr>"+
    "<tr><td>andalucía</td><td>sevilla</td><td>2018</td><td>1594.97</td><td>9.22</td><td>2.003</td></tr>"+
    "<tr><td>comunidad de madrid</td><td>madrid</td><td>2020</td><td>2357.05</td><td>6.25</td><td>2.872</td></tr>"+
    "<tr><td>cataluña</td><td>barcelona</td><td>2018</td><td>3470.8</td><td>9.35</td><td>2.381</td></tr>"+
    "<tr><td>navarra</td><td>navarra</td><td>2020</td><td>1400.22</td><td>10.22</td><td>1.057</td></tr>"+
    "<tr><td>región de murcia</td><td>murcia</td><td>2020</td><td>876.64</td><td>4.32</td><td>1.504</td></tr>"+
    "<tr><td>andalucía</td><td>málaga</td><td>2018</td><td>1496.23</td><td>14.02</td><td>2.636</td></tr>"+
    "<tr><td>cantabria</td><td>cantabria</td><td>2017</td><td>1202.38</td><td>6.9</td><td>705</td></tr>"+
    "<tr><td>comunidad valenciana</td><td>valencia</td><td>2017</td><td>1.169.92</td><td>6.23</td><td>2.358</td></tr>"+
    "<tr><td>andalucía</td><td>granada</td><td>2017</td><td>1250.99</td><td>1.54</td><td>1.013</td></tr>"+
    "</table><//body></html>");
	
});

app.listen(port, () => {
    console.log("Server currently listening on port ${port} ...")
});