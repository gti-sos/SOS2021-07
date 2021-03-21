var cool = require("cool-ascii-faces");
var express = require("express");
var app = express();
var port = 10000;

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

//F03 - tabla de Alejandro
res.send("<html><body><table class='tftable' border='1'>"+
"<tr><th>autonomous communities</th><th>youth unemployment rates</th><th>provinces</th><th>years</th><th>unemployment rates</th><th>occupation variations</th></tr>"+
"<tr><td>Extremadura</td><td>48.1605</td><td>Badajoz</td><td>2020</td><td>22.8954</td><td>-1.09999</td></tr>"+
"<tr><td>Extremadura</td><td>-</td><td>Cáceres</td><td>2020</td><td>18.5352</td><td>100.00610</td></tr>"+
"<tr><td>Andalucía</td><td>52.1912</td><td>Málaga</td><td>2020</td><td>19.3225</td><td>32.79998</td></tr>"+
"<tr><td>Andalucía</td><td>-</td><td>Granada</td><td>2020</td><td>24.8484844928</td><td>13.79998</td></tr>"+
"<tr><td>Cataluña</td><td>38.1233</td><td>Barcelona</td><td>2020</td><td>13.6676</td><td>29.69995</td></tr>"+
"<tr><td>Aragón</td><td>34.4671</td><td>Zaragoza</td><td>2020</td><td>12.9139</td><td>1.39999</td></tr>"+
"</table><//body></html>");

app.listen(port, () => {
    console.log("Server currently listening on port " + port + "...")
});