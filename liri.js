require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
// var spotify = require("node-spotify-api");
// var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var fs = require("fs");

var input = process.argv[2];
var query = process.argv.slice(3).join(" ");

function command(input, query) {
  switch (input) {
    case "concert-this":
      concert();
      break;
    case "spotify-this-song":
      song();
      break;
    case "movie-this":
      movie();
      break;
    case "do-what-it-says":
      doWhat(query);
      break;
    default:
      console.log("enter something");
      break;
  }
}
command(input, query);

// cond(concert-this)
// create a function concert(userChoice)
// cond(spotify-this-song)
// create a function spotify()
// cond(do-what-it-says)
// create a function dowhatitsays()

function movie() {
  if (!query) {
    query = "mr nobody";
  }
  axios
    .get("http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy")
    .then(function(response) {
      console.log("Your search for '" + query + "' returned the following:");
      console.log(
        "Title: " +
          response.data.Title +
          "\nYear: " +
          response.data.Year +
          "\nIMDb Rating: " +
          response.data.imdbRating +
          "\nRotten Tomatoes Rating: " +
          response.data.Ratings[1].Value +
          "\nCountry: " +
          response.data.Country +
          "\nLanguage: " +
          response.data.Language +
          "\nPlot: " +
          response.data.Plot +
          "\nActors: " +
          response.data.Actors
      );
      console.log("------------------------");
    });
}

// concert(userChoice)
// have to use axios
// use this url : "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
// display name, location, date

// dowhatitsays()
// fs.readFile
// data.split(', ')[1]
// spotify(data.split(', ')[1])
