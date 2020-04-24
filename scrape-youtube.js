const puppeteer = require("puppeteer");
var fs = require("fs");

(async () => {
  try {
    var browser = await puppeteer.launch({ headless: false });
    var page = await browser.newPage();
    await page.goto(`https://www.youtube.com/feed/trending`);
    await page.waitForSelector("div#metadata-line");

    var trending = await page.evaluate(() => {
      var titleNodeList = document.querySelectorAll(`div#metadata-line`);
      var titleLinkArray = [];
      for (var i = 0; i < titleNodeList.length; i++) {
        if (!titleNodeList[i]) continue;
        titleLinkArray[i] = {
          title: titleNodeList[i].innerText.trim(),
        };
      }
      return titleLinkArray;
    });
    console.log(trending);
    await browser.close();
    console.log("Browser Closed");
    fs.writeFile("youtube.json", JSON.stringify(trending), function (err) {
      if (err) throw err;
      console.log("Saved JSON file");
    });
  } catch (err) {
    console.log(err);
    await browser.close();
    console.log("Browser Closed");
  }
})();
