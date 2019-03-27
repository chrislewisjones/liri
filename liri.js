require("dotenv").config(); // grabbing the .env containing the keys
var keys = require("./keys.js"); // link the keys.js
var axios = require("axios"); // requiring axios for OMDB and bands APIs
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
moment().format();
var fs = require("fs");

// entry using process.argv
var input = process.argv[2];
var query = process.argv.slice(3).join(" ");

function command(input, query) {
  switch (input) {
    case "movie-this":
      movie();
      break;
    case "concert-this":
      concert();
      break;
    case "spotify-this-song":
      song();
      break;
    case "do-what-it-says":
      doWhat(query);
      break;
    default:
      console.log("Have another go");
      break;
  }
}
command(input, query);

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

function concert() {
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        query +
        "/events?app_id=codingbootcamp"
    )
    .then(function(response) {
      for (var i = 0; i < response.data.length; i++) {
        var date = response.data[i].datetime;
        var dateConvert = moment(date).format("MM/DD/YYYY");
        console.log("Your search for '" + query + "' returned the following:");
        console.log(
          "Artist: " +
            response.data[i].lineup[0] +
            "\nVenue: " +
            response.data[i].venue.name +
            "\nLocation: " +
            response.data[i].venue.city +
            ", " +
            response.data[i].venue.country +
            "\nDate: " +
            dateConvert
        );
        console.log("------------------------");
      }
    });
}

function song() {
  if (!query) {
    query = "the sign ace of base";
  }
  spotify.search(
    {
      type: "track",
      query: query,
      limit: 5
    },
    function(err, data) {
      if (err) {
        return console.log("Sorry: " + err);
      }

      for (var i = 0; i < data.tracks.items.length; i++) {
        console.log("Your search for '" + query + "' returned the following:");
        console.log(
          "Artist: " +
            data.tracks.items[i].album.artists[0].name +
            "\nSong Name: " +
            data.tracks.items[i].name +
            "\nPreview link: " +
            data.tracks.items[i].external_urls.spotify +
            "\nFrom the Album: " +
            data.tracks.items[i].album.name
        );
        console.log("------------------------");
      }
    }
  );
}

// cond(do-what-it-says)
// create a function dowhatitsays()

// dowhatitsays()
// fs.readFile
// data.split(', ')[1]
// spotify(data.split(', ')[1])
