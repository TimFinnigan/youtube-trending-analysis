// Fetch data using YouTube API
const fetch = require("node-fetch");
const fs = require("fs");
const config = require("../config.js");

const youtubeKey = config.YOUTUBE_API_KEY;

let url =
  "https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=";

url += youtubeKey;
url += "&maxResults=50";

fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // console.log(data);

    fs.writeFile("youtube-api-data.json", JSON.stringify(data), function (err) {
      if (err) throw err;
      console.log("Saved JSON file");
    });

    let obj = {};
    for (let i = 0; i < data["items"].length; i++) {
      const vid = data["items"][i];
      obj[i + 1] = {
        chanel: vid.snippet.channelTitle,
        title: vid.snippet.title,
        description: vid.snippet.description,
        duration: vid.contentDetails.duration,
        publishedAt: vid.snippet.publishedAt,
        category: vid.snippet.categoryId,
        statistics: vid.statistics,
      };
    }

    fs.writeFile("processed-youtube-data.json", JSON.stringify(obj), function (
      err
    ) {
      if (err) throw err;
      console.log("Saved JSON file");
    });
  });
