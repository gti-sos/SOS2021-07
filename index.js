var cool = require("cool-ascii-faces");
var express = require("express");
var app = express();
var port = (process.env.PORT || 10000);

var path = require("path");

app.use("/", express.static(path.join(__dirname,"public")));

app.get("/cool", (request,response) => {
    response.send(cool());
    console.log("New request to '/cool' has arrived");
});

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
    "<tr><th>autonomous communities</th><th>youth unemployment rates</th><th>provinces</th><th>years</th><th>unemployment rates</th><th>occupation variations</th></tr>"+
    "<tr><td>extremadura</td><td>48.1605</td><td>badajoz</td><td>2020</td><td>22.8954</td><td>-1.09999</td></tr>"+
    "<tr><td>extremadura</td><td>-</td><td>cáceres</td><td>2020</td><td>18.5352</td><td>100.00610</td></tr>"+
    "<tr><td>andalucía</td><td>52.1912</td><td>málaga</td><td>2020</td><td>19.3225</td><td>32.79998</td></tr>"+
    "<tr><td>andalucía</td><td>-</td><td>granada</td><td>2020</td><td>24.8484844928</td><td>13.79998</td></tr>"+
    "<tr><td>cataluña</td><td>38.1233</td><td>barcelona</td><td>2020</td><td>13.6676</td><td>29.69995</td></tr>"+
    "<tr><td>aragón</td><td>34.4671</td><td>zaragoza</td><td>2020</td><td>12.9139</td><td>1.39999</td></tr>"+
    "</table><//body></html>");
});
    
    //Tabla de Francisco
app.get("/info/rentals", (req, res) => {
    res.send("<html><body><table class='tftable' border='1'>"+
    "<tr><th>autonomous communities</th><th>province</th><th>year</th><th>rent</th><th>rent-variation</th><th>meter</th><th>salary</th></tr>"+
    "<tr><td>andalucía</td><td>sevilla</td><td>2018</td><td>560,5</td><td>4</td><td>94,6</td><td>29</td></tr>"+
    "<tr><td>cataluña</td><td>barcelona</td><td>2018</td><td>696</td><td>6</td><td>96,8</td><td>49</td></tr>"+
    "<tr><td>madrid</td><td>madrid</td><td>2018</td><td>780</td><td>4,6</td><td>86,5</td><td>51</td></tr>"+
    "<tr><td>castilla-y-león</td><td>salamanca</td><td>2018</td><td>468</td><td>22.2</td><td>91</td><td>24</td></tr>"+
    "<tr><td>castilla-y-león</td><td>palencia</td><td>2018</td><td>416,7</td><td>22.5</td><td>94,1</td><td>24</td></tr>"+
    "</table><//body></html>");
});

    //Tabla de Nuria...

app.listen(port, () => {
    console.log("Server currently listening on port ${port} ...")
});