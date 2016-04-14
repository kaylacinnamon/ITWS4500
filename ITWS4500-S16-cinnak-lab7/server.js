var Twitter = require('twitter');
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').Server(app);
var mongodb = require('mongodb');
var mongoServer = mongodb.Server;
var Db = mongodb.Db;
var jstoxml = require("jstoxml");

var tweetsBuffer = [];
var JSONExists = false;
var CSVExists = false;

//starts up the server
app.listen(3000, function() {
	console.log("Server up on localhost:3000");
});

app.use(express.static(__dirname));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
	extended: true
}));

//sends the data to the index.html file
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.get('/tweets', function(req, res) {
	//Twitter API credentials
	var client = new Twitter({
		consumer_key: 'kBSDn1HUeFuvY1ctFQkAVJNrE',
		consumer_secret: 'iFJuYBiMdX0E7xhdYDJm4XfMKx9XH5L3aupjGCUVT6BBU8K6ou',
		access_token_key: '28867595-2UvqeDLeXERQspoMfvhjD7q2fTe9fm6Z7g41cAsUj',
		access_token_secret: 'AiSuoazADAm2PcxJZRL6JEdRfYg3AtKBLrwvEF2zLVC9W'
	});

	//default number of tweets being loaded
	var maxCount = 10;
	var exportType = "";
	tweetsBuffer = [];
	
	//use the query the user wants if there is one, else set the query to RPI's location
	if(req.query && req.query.search) {
		var query = {track: req.query.search}
	} else {
		var query = {locations:'-73.68,42.72,-73.67,42.73'};
	}

	client.stream('statuses/filter', query, function(stream) {
		//if a user puts in a number of tweets that they want, change the variable
		if (req.query.count) {
			maxCount = req.query.count;
		}
		stream.on('data', function(tweet) {
			//shows tweets in the console so I know the app is getting them
			console.log(tweet.text);
			//adds the tweet to the array
			tweetsBuffer.push(tweet);
			//once the array has the number of tweets the user wants or the default number
			if(tweetsBuffer.length == maxCount) {
				//place the tweets onto the index.html file
				res.status(200).json(tweetsBuffer);
				//stop the stream
				stream.destroy();
			}
		});
		

		stream.on('error', function(error) {
			console.log(error);
			throw error;
		});
	});
});

app.post('/export', function(req, res) {
	var exportT = req.body.exportType;
	//if the user wants a JSON file
	if (exportT == "JSON") {
		fs.exists("ITWS4500-S16-cinnak-tweets.json", function(exists) {
			//if the file already exists
			if (exists) {
				JSONExists = true;
			}
			//if the file doesn't exist
			else {
				JSONExists = false;
			}
		});
		//write to the JSON file
	 	fs.writeFile("ITWS4500-S16-cinnak-tweets.json", JSON.stringify(tweetsBuffer));
	}
	//if the user wants a CSV file
	else if (exportT == "CSV") {
		var contents = JSON.stringify(tweetsBuffer);
		//parse the contents into JSON first
		var jsonContent = JSON.parse(contents);
		//header of the CSV file
		var CSVFile = '"created_at", "id", "text", "user_id", "user_name", "user_screen_name", "user_location", "user_followers_count", "user_friends_count", "user_created_at", "user_time_zone", "user_profile_background_color", "user_profile_image_url", "geo", "coordinates", "place"\n';
		//parse each variable for each tweet
		for (var i = 0; i < jsonContent.length; ++i) {
			CSVFile += '"' + jsonContent[i].created_at + '", "' +
			jsonContent[i].id + '", "' + jsonContent[i].text + '", "' +
			jsonContent[i].user.id + '", "' + jsonContent[i].user.name + '", "' +
			jsonContent[i].user.screen_name + '", "' + jsonContent[i].user.location + '", "' +
			jsonContent[i].user.followers_count + '", "' + jsonContent[i].user.friends_count + '", "' +
			jsonContent[i].user.created_at + '", "' + jsonContent[i].user.time_zone + '", "' +
			jsonContent[i].user.profile_background_color + '", "' + jsonContent[i].user.profile_image_url + '", "' +
			jsonContent[i].geo + '", "' + jsonContent[i].coordinates + '", "' +
			jsonContent[i].place + '"' + "\n";
		}
		fs.exists("ITWS4500-S16-cinnak-tweets.csv", function(exists) {
			//if the file already exists
			if (exists) {
				CSVExists = true;
			}
			//if the file doesn't exist
			else {
				CSVExists = false;
			}
		});
		//write to the JSON file
		fs.writeFile("ITWS4500-S16-cinnak-tweets.csv", CSVFile);
	}
});

app.get('/export', function(req, res) {
	//these messages are posted in a JavaScript alert
	//each message varies depending on if the files exist or not
	if (JSONExists && CSVExists) {
		return res.json({myJSON: 'The JSON file already exists and has been updated with the following tweets.', myCSV: 'The CSV file already exists and has been updated with the following tweets.'});
	}
	else if (JSONExists && !CSVExists) {
		return res.json({myJSON: 'The JSON file already exists and has been updated with the following tweets.', myCSV: 'A CSV file has been created with the following tweets.'});
	}
	else if (!JSONExists && CSVExists) {
		return res.json({myJSON: 'A JSON file has been created with the following tweets.', myCSV: 'The CSV file already exists and has been updated with the following tweets.'});
	}
	else {
		return res.json({myJSON: 'A JSON file has been created with the following tweets.', myCSV: 'A CSV file has been created with the following tweets.'});
	}
});

app.get('/build', function(req, res) {
	var MongoClient = mongodb.MongoClient;
	var url = 'mongodb://localhost:2000/ITWS4500-S16-cinnak-lab7-db';

	//connects to the database
	MongoClient.connect(url, function(err, db) {
		if (err) {
			console.log("Unable to connect to the mongoDB server. Error: ", err);
		}
		else {
			console.log("Connection established to: ", url);
			//gets rid of previous tweets if they were already there
			db.collection('tweets', {}, function(err, tweets) {
				tweets.remove({}, function(err, result) {
					if (err) {
						console.log(err);
					}
					db.close();
				});
			});
		}
	});
	//connects to the database
	MongoClient.connect(url, function(err, db) {
		if (err) {
			console.log("Unable to connect to the mongoDB server. Error: ", err);
		}
		else {
			//inserts the tweets
			var contents = JSON.stringify(tweetsBuffer);
			var jsonContent = JSON.parse(contents);
			var collection = db.collection('tweets');
			collection.insert(jsonContent, function(err, result) {
				if (err) {
					console.log(err);
				}
				else {
					db.close();
				}
			});
			return res.json({myBuild: 'The Mongo database has been created with the loaded tweets.'});
		}
	});
});

app.get('/read', function(req, res) {
	var MongoClient = mongodb.MongoClient;
	var url = 'mongodb://localhost:2000/ITWS4500-S16-cinnak-lab7-db';

	//connects to the database
	MongoClient.connect(url, function(err, db) {
		db.collection('tweets', function(err, collection) {
			if (!err) {
				//finds all of the tweets
				collection.find().toArray(function(err, docs) {
					if (!err) {
						db.close();
						//sends the tweets to the front end
						res.status(200).json(docs);
					}
					else {
						console.log(err);
					}
				});
			}
			else {
				console.log(err);
			}
		});
	});
});

app.post('/XML', function(req, res) {
	//gets the file name from the user
	var XMLFile = req.body.fileName;
	var newFileName = XMLFile + ".xml";
	var XMLdata = "";
	var MongoClient = mongodb.MongoClient;
	var url = 'mongodb://localhost:2000/ITWS4500-S16-cinnak-lab7-db';

	//connects to the database
	MongoClient.connect(url, function(err, db) {
		db.collection('tweets', function(err, collection) {
			if (!err) {
				//finds all of the tweets
				collection.find().toArray(function(err, docs) {
					if (!err) {
						//puts the tweets into XML format
						XMLdata = jstoxml.toXML(docs, {header: true, indent: '	'});
						//writes to the XML file
						fs.writeFile(newFileName, XMLdata);
						db.close();
					}
					else {
						console.log(err);
					}
				});
			}
			else {
				console.log(err);
			}
		});
	});
});

app.get('/XML', function(req, res) {
	return res.json({myXML: 'An XML file has been created.'});
});