require("dotenv").config(); // loads environment variables from .env into process.env
var keys = require("./keys.js"); // link the keys.js
var axios = require("axios"); // requiring axios for OMDB and bands APIs
var Spotify = require("node-spotify-api"); // and spotify
var spotify = new Spotify(keys.spotify); // key
var omdb = keys.omdb; // key
var bandsit = keys.bandsit; // key
var moment = require("moment"); // requiring moment
moment().format(); // to format the date in concert
var fs = require("fs"); // requiring file-system to read .txt
var figlet = require("figlet"); // requiring figlet for the title

// entry using process.argv
var input = process.argv[2]; // input is the switch case value
var query = process.argv.slice(3).join(" "); // query added as a string

// function to deal with the commands using a switch statement to call each function
function command(input, query) {
  switch (input) {
    case "movie-this":
      movie(query);
      break;
    case "concert-this":
      concert(query);
      break;
    case "spotify-this-song":
      song(query);
      break;
    case "do-what-it-says":
      doWhat();
      break;
    default:
      console.log("Have another go");
      break;
  }
}
command(input, query); // call the command function

// function called with input 'movie-this'
function movie(query) {
  if (!query) {
    query = "mr nobody"; // if blank the query will default to mr nobody
  }
  axios
    .get(
      "http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=" + omdb.id
    )
    .then(function(response) {
      figlet(response.data.Title, function(err, data) {
        // using figlet to play with the text
        if (err) {
          console.log("Something went wrong, try again");
          console.dir(err);
          return;
        }
        var title = data;
        console.log("Your search for '" + query + "' returned the following:");
        console.log(
          title +
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
    });
}

// function called with input 'concert-this'
function concert(query) {
  if (!query) {
    query = "black keys"; // if blank the query will default to the Foo Fighters
  }
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        query +
        "/events?app_id=" +
        bandsit.id
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

// function called with 'spotify-this-song'
function song(query) {
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

// function called with 'do-what-it-says'
function doWhat() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    //reads the random.txt file
    if (err) {
      console.log("Something went wrong");
    }
    var query = data.split(", ")[1]; // splits the 2nd half of the text into query
    var input = data.split(", ")[0]; // splits the 1st half into input
    command(input, query); // uses these through the command function
  });
}
