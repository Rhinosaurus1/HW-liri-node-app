//this is the beginning of the end my friend

//write the code you need to grab the data from keys.js.  Then store the keys in a variable.
var tweets = require("./keys.js");

//require other modules
var twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require('request');

//set array for user inputs
var nodeArray = process.argv;

//assign command and title from user inputs
var command = nodeArray[2];
var title = nodeArray[3];

//set-up for twitter API call
var client = new twitter({
  consumer_key: tweets.consumer_key,
  consumer_secret: tweets.consumer_secret,
  access_token_key: tweets.access_token_key,
  access_token_secret: tweets.access_token_secret
});


//function to run twitter API call 
function twitterFunc(){

	//limits response to most recent 20 tweets
	var params = {count: 20};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (error) {
		    return console.log('Error occurred: ' + error);
		}
		else{
			//console logs tweets and tweet timestamps
			for(i=0;i<tweets.length;i++){
			    console.log("Tweet #"+ (tweets.length - i) + " ---- " + tweets[i].text + " ----Tweeted at---- " + tweets[i].created_at);
			}		
		}
	});
}

//set-up for spotify API call
var spotifyStart = new spotify({
	id: 'c40df45743c941c8bf1eda221b50feb0',
	secret: '6fcaad76b1cf47d7be9703ea09d54e38'
});

//function to run spotify API call
function spotifyFunc(title){

	//assigns default if no user input for title
	if(title === undefined){
		title = 'the sign ace of base';
	};

	//API search call and response log
	spotifyStart.search({ type: 'track', query: title, limit:1 }, function(error, data) {
		if (error) {
		    return console.log('Error occurred: ' + error);
		}
		else{
			console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
			console.log("Song Name: " + data.tracks.items[0].name);
			console.log("Preview Link: " + data.tracks.items[0].preview_url);
			console.log("Album: " + data.tracks.items[0].album.name);
		} 
	});
}

//function to run omdb API call
function omdbFunc(title){

	if(title === undefined){
		title = 'mr nobody';
	};

	//concatenate title with search url and API key
	var url = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=40e9cece";

	//call to API and return response
	request(url, function(error, response, data) {
		if (error) {
		    return console.log('Error occurred: ' + error);
		}
	    else if (!error && response.statusCode === 200) {
		    console.log("Movie Title: " + JSON.parse(data).Title);
		    console.log("Year Released: " + JSON.parse(data).Year);
		    console.log("IMDB Rating: " + JSON.parse(data).imdbRating);
		    console.log("Rotten Tomatoes Rating: " + JSON.parse(data).Ratings[1].Value);
		    console.log("Production Country(s): " + JSON.parse(data).Country);
		    console.log("Language(s): " + JSON.parse(data).Language);
		    console.log("Plot Summary: " + JSON.parse(data).Plot);
		    console.log("Actors: " + JSON.parse(data).Actors);
	  }
	});
}

//sort commands and runs appropriate function
if(command === "my-tweets"){
	twitterFunc();
}
else if(command === "spotify-this-song"){
	spotifyFunc(title);
}
else if(command === "movie-this"){
	omdbFunc(title);
}
else{
	console.log("this is not a valid function request");
}

