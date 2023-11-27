const express = require('express');
const app = express();

const movieRouter = require('./src/routes/movieRoutes');

const path = require("path")

const viewEngine = require('./21521');

app.engine('html', viewEngine);
// Cấu hình để phục vụ các file tĩnh từ thư mục public
app.use(express.static('./public'));


app.set('view engine', "html");
// Phân tích cú pháp dữ liệu application/json
app.use(express.json());

// Phân tích cú pháp dữ liệu application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname,'src', 'views'));

app.get("/", (req, res) => {
    res.redirect("/movies")
  })

app.use("/movies", movieRouter);

app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).redirect("/500.html")
  })
  
  app.use((req, res) => {
    res.status(404).redirect("/404.html")
  })
// Khởi động server
module.exports = app;
