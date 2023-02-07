const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const HTTP_PORT = process.env.PORT || 8080;

// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public/"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "forms.html"));
});

app.listen(HTTP_PORT, onHttpStart);