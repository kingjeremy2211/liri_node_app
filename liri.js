
require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var request = require('request');
var Spotify = require('node-spotify-api');
var chalk = require('chalk');
var chalkAnimation = require('chalk-animation');
var spotify = new Spotify(keys.spotify);
var moment = require('moment');


var action = process.argv[2];
var parameter = process.argv.slice(3).join(" ");

function switchCase() {

  switch (action) {

    case 'concert-this':
      bandsInTown(parameter);                   
      break;                          

    case 'spotify-this-song':
      spotSong(parameter);
      break;

    case 'movie-this':
      movieInfo(parameter);
      break;

    case 'do-what-it-says':
      getRandom();
      break;

      default:                            
      logIt("Invalid Instruction");
      break;

  }
}

function bandsInTown(parameter){

  var bandName = "";
if (action === 'concert-this')
{ 
	
	for (var i = 3; i < process.argv.length; i++)
	{
		bandName+=process.argv[i];
	}
	console.log(bandName);
}
else
{
	Name = parameter;
}



var queryUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";


request(queryUrl, function(err, res, body) {
  var bandInfo = JSON.parse(body)[0];
  if (!err && res.statusCode === 200) {
      logIt(chalk.magenta("\n-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-\n"));
      logIt(chalk.bold.red.bgRed("Name: " + bandInfo.venue.name));
      logIt(chalk.bold.red.bgRed("City: " + bandInfo.venue.city));
      logIt(chalk.bold.red.bgRed("Date of Event " +  moment(bandInfo.datetime).format("MM/DD/YYYY")));
      logIt(chalk.magenta("\n-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-\n"));
      }
  });
}

function spotSong(parameter) {
	var songName;

  if (parameter === "") {
    songName = "The Sign";
  } else {
    songName = parameter;
  }

  console.log("Searching for: " + songName);
	console.log("------------------------");

	spotify.search({ type: 'track', query: songName}, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }

	    var matchedTracks = [];
	    var dataItems = data.tracks.items;

	    for (var i=0; i<20; i++){
	    	if (data.tracks.items[i].name == songName){
	    		matchedTracks.push(i);
	    	}
	    }

	    console.log(matchedTracks.length + " tracks found that match your query.");


	    if (matchedTracks.length > 0){
      console.log(chalk.magenta("----------------------------------------------------"));
    	console.log(chalk.bold.green.bgRed("Track: " + dataItems[matchedTracks[0]].name));	
			console.log(chalk.bold.green.bgRed("Artist: " + dataItems[matchedTracks[0]].artists[0].name));
			console.log(chalk.bold.green.bgRed("Album: " + dataItems[matchedTracks[0]].album.name));
			console.log(chalk.bold.green.bgRed("Spotify link: " + dataItems[matchedTracks[0]].external_urls.spotify));
      console.log(chalk.magenta("----------------------------------------------------"));
			
		}
		else if (matchedTracks.length == 0){
			console.log("Sorry, but spotify does not contain that song in their database :(");
		}
		
	});
}


function movieInfo(parameter) {


  var findMovie;
  if (parameter === undefined) {
    findMovie = "Mr. Nobody";
  } else {
    findMovie = parameter;
  }

  var queryUrl = "http://www.omdbapi.com/?t=" + findMovie + "&y=&plot=short&apikey=trilogy";
  
  request(queryUrl, function(err, res, body) {
  	var bodyOf = JSON.parse(body);
    if (!err && res.statusCode === 200) {
      logIt(chalk.magenta("\n-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-\n"));
      logIt(chalk.bold.red.bgRed("Title: " + bodyOf.Title));
      logIt(chalk.bold.red.bgRed("Release Year: " + bodyOf.Year));
      logIt(chalk.bold.red.bgRed("IMDB Rating: " + bodyOf.imdbRating));
      logIt(chalk.bold.red.bgRed("Rotten Tomatoes Rating: " + bodyOf.Ratings[1].Value)); 
      logIt(chalk.bold.red.bgRed("Country: " + bodyOf.Country));
      logIt(chalk.bold.red.bgRed("Language: " + bodyOf.Language));
      logIt(chalk.bold.red.bgRed("Plot: " + bodyOf.Plot));
      logIt(chalk.bold.red.bgRed("Actors: " + bodyOf.Actors));
      logIt(chalk.magenta("\n-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-\n"));
    }
  });
}

function getRandom() {
fs.readFile('random.txt', "utf8", function(error, data){

    if (error) {
        return logIt(error);
      }

  
    var dataArr = data.split(",");
    
    if (dataArr[0] === "spotify-this-song") 
    {
      var songcheck = dataArr[1].trim().slice(1, -1);
      spotSong(songcheck);
    } 
    else if (dataArr[0] === "concert-this") 
    { 
      if (dataArr[1].charAt(1) === "'")
      {
      	var dLength = dataArr[1].length - 1;
      	console.log(data);
      	bandsInTown(data);
      }
      else
      {
	      var bandName = dataArr[1].trim();
	      console.log(bandName);
	      bandsInTown(bandName);
	  }
  	  
    } 
    else if(dataArr[0] === "movie-this") 
    {
      var movie_name = dataArr[1].trim().slice(1, -1);
      movieInfo(movie_name);
    } 
    
    });

}

function logIt(dataToLog) {

	console.log(dataToLog);

	fs.appendFile('log.txt', dataToLog + '\n', function(err) {
		
		if (err) return logIt('Error logging data to file: ' + err);	
	});
}


switchCase();