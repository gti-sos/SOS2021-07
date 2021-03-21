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

app.listen(port, () => {
    console.log("Server currently listening on port " + port + "...")
});