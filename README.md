## for user
```sh
git clone https://github.com/LeiHanCN/nodejs-readability.git
cd nodejs-readability
npm run one-step
```
打开浏览器，访问 http://localhost:3333/parseurl?url=https://xxxx
此外，支持多url抓取，用「,」英文逗号隔开，eg: http://localhost:3333/parseurl?url=https://xxxx,https://yyy

## for developer
```sh
npm i
npm run start
```

## nodejs 网页主体内容抓取
* 使用phantomjs可以抓取js动态生成的网页，安利 <a target="_blank" href="https://github.com/amir20/phantomjs-node">https://github.com/amir20/phantomjs-node</a>
* 采用mozilla的主体抓取算法 <a target="_blank" href="https://github.com/mozilla/readability">https://github.com/mozilla/readability</a>

