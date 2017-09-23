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

//sort commands and runs appropriate function
if(command === "my-tweets"){
	twitterFunc();
}
else{
	console.log("this is not a twitter function");
}

