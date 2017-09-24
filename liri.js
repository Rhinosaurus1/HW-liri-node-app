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

console.log("command is: " + command);
console.log("title is: " + title);

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
		if (!error) {

			//console logs tweets and tweet timestamps
			for(i=0;i<tweets.length;i++){
			    console.log("Tweet #"+ (tweets.length - i) + " ---- " + tweets[i].text + " ----Tweeted at---- " + tweets[i].created_at);
			}		
		}
	});
}


var spotifyStart = new spotify({
	id: 'c40df45743c941c8bf1eda221b50feb0',
	secret: '6fcaad76b1cf47d7be9703ea09d54e38'
});

function spotifyFunc(title){

	if(title === undefined){
		title = 'the sign ace of base';
	};
	console.log(title);

	spotifyStart.search({ type: 'track', query: title, limit:1 }, function(err, data) {
		if (err) {
		    return console.log('Error occurred: ' + err);
		}
			console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
			console.log("Song Name: " + data.tracks.items[0].name);
			console.log("Preview Link: " + data.tracks.items[0].preview_url);
			console.log("Album: " + data.tracks.items[0].album.name); 
	});
}


//sort commands and runs appropriate function
if(command === "my-tweets"){
	twitterFunc();
}
else if(command === "spotify-this-song"){
	spotifyFunc(title);
}
else{
	console.log("this is not a valid function request");
}

