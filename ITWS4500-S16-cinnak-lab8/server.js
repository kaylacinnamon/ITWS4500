var express = require('express');
var app = express();
var server = require('http').Server(app);
var sparql = require('sparql');
var bodyParser = require('body-parser');

var sparqlBuffer = [];
var search = "";

//starts up the server
app.listen(3000, function() {
	console.log("Server up on localhost:3000");
});

app.use(express.static(__dirname));

app.use(bodyParser.urlencoded ({
	extended: true
}));

//sends the data to the index.html file
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

//gets the query from the user
app.post('/sparql', function(req, res) {
	search = req.body.search;
});

//returns the results of the query
app.get('/sparql', function(req, response) {
	sparqlBuffer = [];

	//creates a new SPARQL client with an endpoint
	var SparqlClient = new sparql.Client('http://dbpedia.org/sparql');
	SparqlClient.query(search, function(err, res) {
		if (!err) {
			var data = res.results.bindings;
			var header = res.head.vars;

			//push the results into an array
			sparqlBuffer.push(header);
			for (var i = 0; i < data.length; ++i) {
				sparqlBuffer.push(data[i]);
			}

			//send the results to the front end
			response.status(200).json(sparqlBuffer);
		}
		else {
			console.log(err);
		}
	});
});