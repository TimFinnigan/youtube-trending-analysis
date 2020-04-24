// Fetch data using YouTube API
const fetch = require("node-fetch");
const fs = require("fs");
const config = require("../config.js");

const youtubeKey = config.YOUTUBE_API_KEY;

let url =
  "https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=US&key=";

url += youtubeKey;

fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    fs.writeFile(
      "youtube-categories-data.json",
      JSON.stringify(data),
      function (err) {
        if (err) throw err;
      }
    );
    console.log("Saved JSON file");
  });
