const puppeteer = require("puppeteer");
var fs = require("fs");

(async () => {
  try {
    var browser = await puppeteer.launch({ headless: false });
    var page = await browser.newPage();
    await page.goto(`https://www.youtube.com/feed/trending`);
    await page.waitForSelector("div#meta");

    var trending = await page.evaluate(() => {
      var titleNodeList = document.querySelectorAll(`div#meta`);
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
    fs.writeFile("youtube.json", JSON.stringify(trending), function (err) {
      if (err) throw err;
      console.log("Saved!");
    });
    console.log(success("Browser Closed"));
  } catch (err) {
    console.log(error(err));
    await browser.close();
    console.log(error("Browser Closed"));
  }
})();
