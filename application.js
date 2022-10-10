const express = require('express');
const path = require('path');
const pageRouter = require('./apis/pages');
const apiRouter = require('./apis/api');
const PORT = 3000;
const app = express();


// 掛載 ejs
app.set("view engine", "ejs");

// 使用 boostrap
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist")));
// 使用靜態資源
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true})); // 取代 body-parser
app.use(express.json());

// 路由設定
app.use("/", pageRouter); // 前端頁面設定
app.use("/api", apiRouter);// api設定

app.listen(3000, () => {
  console.log(`Server is start on port ${PORT}`);
})