const express = require('express');
const router = express.Router();
const jsdom = require("jsdom");
const Readability = require('../lib/Readability')
const { JSDOM } = jsdom;
const phantom = require('phantom');

function delay(second) {
  return new Promise((resolve) => {
    setTimeout(resolve, second * 1000);
  });
};
async function asyncPrint(url) {
  const instance = await phantom.create();
  const page = await instance.createPage();
  const status = await page.open('https://www.zeitverschiebung.net/cn/all-time-zones.html');
  let ret;

  if (status === 'success') {
    await delay(3);//等待js异步加载3秒
    let html = await page.property('content');//整个网页的html
    let { document } = (new JSDOM(html)).window;
    const timezoneList = Object.values(document.querySelectorAll("div.table-responsive > table > tbody > tr > td:nth-child(1)")).map(item => item.textContent);
    const cityList = Object.values(document.querySelectorAll("div.table-responsive > table > tbody > tr > td:nth-child(2)")).map(item => item.textContent)

    ret = cityList.reduce((ret, city, index) => {
      ret.push({
        city,
        tz: timezoneList[index]
      })
      return ret
    }, [])

  } else {
    ret = { error: 'url参数错误' }
  }

  await instance.exit();
  return ret
};

router.get('/', (req, res, next) => {
  (async function () {
    let url = req.query.url
    res.send(await asyncPrint(url));
  }())
});

module.exports = router;