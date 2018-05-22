var env = require("dotenv").config();
var keys = require("./keys.js")
var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var fs = require("fs");


var spotify = new Spotify(keys.spotify);
var twitter = new Twitter(keys.twitter);

var nodeArgs = process.argv;
var movie = "";
var song = "";

if (nodeArgs[2] === "my-tweets") {
  twitter.get('statuses/user_timeline', {
    screen_name: 'CBS'
  }, function (error, tweets, response) {
    if (error) throw error
    for (var i = 0; i < tweets.length; i++) {
      console.log(tweets[i].created_at + " " + tweets[i].text);
    }
  });
} else if (nodeArgs[2] === "spotify-this-song") {
  if (!nodeArgs[3]) {
    spotify
      .search({
        type: 'track',
        query: "artist:Ace+of+Base%20track:The+Sign",
        limit: 1
      })  
      .then(function (response) {
        var count = 0
        if (count < 5) {
          console.log("Artists: " + response.tracks.items[count].artists[count].name)
          console.log("Song Name: " + response.tracks.items[count].name)
          console.log("Preview: " + response.tracks.items[count].preview_url)
          console.log("Album: " + response.tracks.items[count].album.name)
          count++
        };
      })
      .catch(function (err) {
        console.log(err);
      });

  } else {
    for (var i = 3; i < nodeArgs.length; i++) {
      song += nodeArgs[i] + "+";
    }
    spotify
      .search({
        type: 'track',
        query: song,
        limit: 1
      })
      .then(function (response) {
        var count = 0
        if (count < 5) {
          console.log("Artists: " + response.tracks.items[count].artists[count].name)
          console.log("Song Name: " + response.tracks.items[count].name)
          console.log("Preview: " + response.tracks.items[count].preview_url)
          console.log("Album: " + response.tracks.items[count].album.name)
          count++
        };
      })
      .catch(function (err) {
        console.log(err);
      });
  };
} else if (nodeArgs[2] === "movie-this") {
  if (!nodeArgs[3]) {
    request(`http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&apikey=${keys.omdb.id}`, function (error, response, body) {

      if (!error && response.statusCode === 200) {

        console.log(
          `
          Title of the movie: ${JSON.parse(body).Title}
          Year the movie came out: ${JSON.parse(body).Year}
          IMDB rating is: ${JSON.parse(body).imdbRating}
          Rotten Tomatoes Rating: ${JSON.parse(body).Ratings[1].Value}
          Country where the movie was produced: ${JSON.parse(body).Country}
          Language of the movie: ${JSON.parse(body).Language}
          Plot of the movie: ${JSON.parse(body).Plot}
          Actors in the movie: ${JSON.parse(body).Actors}`);
      }
    });

  } else {
    for (var i = 3; i < nodeArgs.length; i++) {
      movie += nodeArgs[i] + "+";
    }
    request(`http://www.omdbapi.com/?t=${movie}&y=&plot=short&apikey=${keys.omdb.id}`, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        console.log(
          `
          Title of the movie: ${JSON.parse(body).Title}
          Year the movie came out: ${JSON.parse(body).Year}
          IMDB rating is: ${JSON.parse(body).imdbRating}
          Rotten Tomatoes Rating: ${JSON.parse(body).Ratings[1].Value}
          Country where the movie was produced: ${JSON.parse(body).Country}
          Language of the movie: ${JSON.parse(body).Language}
          Plot of the movie: ${JSON.parse(body).Plot}
          Actors in the movie: ${JSON.parse(body).Actors}`);
      };
    });
  };
} else if (nodeArgs[2] === "do-what-it-says") {

  fs.readFile("random.txt", "utf8", function(error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
  
    // We will then print the contents of data
    console.log(data + "this is the data for text file");

    var doWhat = data.split(",")
    console.log(doWhat[1])
  
    spotify
    .search({
      type: 'track',
      query: doWhat[1],
      limit: 1
    })
    .then(function (response) {
      var count = 0

      // console.log(response.tracks)
      if (count < 5) {
        console.log("Artists: " + response.tracks.items[count].artists[count].name)
        console.log("Song Name: " + response.tracks.items[count].name)
        console.log("Preview: " + response.tracks.items[count].preview_url)
        console.log("Album: " + response.tracks.items[count].album.name)
        count++
      };
    })
    .catch(function (err) {
      console.log(err);
    });
  });
};

