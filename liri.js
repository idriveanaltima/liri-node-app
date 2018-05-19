var env = require("dotenv").config();
var keys = require("./keys.js")
var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);
var twitter = new Twitter(keys.twitter);

var input = process.argv;
var movie = ""
var song = ""

// need to use the random text file  
// need to update formatting on results
// need to do what it says



if(input[2] === "my-tweets") {
  twitter.get('statuses/user_timeline', {screen_name: 'CBS'},function(error, tweets, response) {
    if(error) throw error
    for(var i =0;i < tweets.length;i++) {
    console.log(tweets[i].created_at + " " + tweets[i].text);
    }
  });
} else if (input[2] === "spotify-this-song") {
  if (!input[3]) {
    spotify
    .search({ type: 'track', query: 'I Want it That Way', limit: 5 })
  .then(function(response) {
    console.log(JSON.stringify(response));
  })
  .catch(function(err) {
    console.log(err);
  });

  } else {
  for(var i =3;i < input.length;i++) {
    song += input[i] + "+";
    }
spotify
  .search({ type: 'track', query: song, limit: 5 })
  .then(function(response) {
    console.log(JSON.stringify(response));
  })
  .catch(function(err) {
    console.log(err);
  });
};
} else if (input[2] === "movie-this") {
  if (!input[3]) {
    request("http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&apikey=trilogy", function (error, response, body) {

      if (!error && response.statusCode === 200) {

        console.log(
          `Title of the movie: ${JSON.parse(body).Title}
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
    for(var i =3;i < input.length;i++) {
    movie += input[i] + "+";
    }
    request(`http://www.omdbapi.com/?t=${movie}&y=&plot=short&apikey=trilogy`, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        console.log(
          `Title of the movie: ${JSON.parse(body).Title}
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
} else if (input[2] === "do-what-it-says") {

};