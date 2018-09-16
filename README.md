# liri_node_app

# Language Interpretation and Recognition Interface
A node command line app
## How to use Liri:

1. From within the liri directory, type `npm install` to make sure you have all the necessary packages. (See below for required packages.)  Open Git Bash command line 
program and type the following.

### Type `node liri.js concert-this <artist/band name here>.`
this uses the bandsintown api to lookup concert info.

### Type `node liri.js spotify-this-song '<song name here>'`
this uses the spotify api to lookup song info.

### Type `node liri.js movie-this '<movie name here>'`
this uses the omdb api to lookup movie info.

### Type `node liri.js do-what-it-says`
this references the randomt.txt file to lookup a song on spotify

All results will be colorfully displayed in the command line as well as logged into a text file.

Running `npm install` will take care of the necessary packages, but for reference's sake,here they are:
 
 - [chalk](https://www.npmjs.com/browse/keyword/chalk) (adds cool colors to terminal output)

- [moment](https://www.npmjs.com/package/moment) (formats date & time)

- [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) (Spotify API)

- [request](https://www.npmjs.com/package/request) (make HTTP calls)

- [DotEnv](https://www.npmjs.com/package/dotenv) (hides private client side info like API keys, and Client Secret)