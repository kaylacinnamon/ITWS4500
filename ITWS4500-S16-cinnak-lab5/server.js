var Twitter = require('twitter');
var express = require('express');
var fs = require('fs');
var app = express();
var server = require('http').Server(app);

//starts up the server
app.listen(3000, function() {
	console.log("Server up on localhost:3000");
});

app.use(express.static(__dirname));

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

	var tweetsBuffer = [];

	//default number of tweets being loaded
	var maxCount = 10;
	
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
				//write the tweets to the JSON file
				fs.writeFile("ITWS4500-S16-cinnak-tweets.json", JSON.stringify(tweetsBuffer));
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