var cool = require("cool-ascii-faces");
var express = require("express");
var app = express();
var port = 10000;

app.get('*', (request, response) => {
    response.redirect('http:3000//' + request.headers.host + request.url);
});

app.get("/cool", (request,response) => {
    response.send(cool());
    console.log("New request to '/cool' has arrived");
});

app.listen(port, () => {
    console.log("Server currently listening on port " + port + "...")
});
