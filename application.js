const express = require('express');
const path = require('path');
const pagesRouter = require('./apis/pages');
const apisRouter = require('./apis/api');
const PORT = 3000;
const app = express();

// 掛載 ejs
app.set("view engine", "ejs");
// 使用 boostrap
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist")));
// 使用靜態資源
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.listen(3000, () => {
  console.log(`Server is start on port ${PORT}`);
})