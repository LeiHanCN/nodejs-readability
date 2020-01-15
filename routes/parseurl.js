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
  const status = await page.open(url);
  let documentJson;

  if (status === 'success') {
    await delay(3);//等待js异步加载3秒
    let html = await page.property('content');//整个网页的html
    let { document } = (new JSDOM(html)).window;
    documentJson = new Readability(document).parse();
  } else {
    documentJson = { error: 'url参数错误' }
  }

  await instance.exit();
  return documentJson
};

router.get('/', (req, res, next) => {
  (async function () {
    let urls = req.query.url.split(',');
    const ret = []
    for (let url of urls) {
      ret.push(await asyncPrint(url))
    }
    res.send(ret);
  }())
});

module.exports = router;