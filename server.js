const express = require("express");
const app = express();
const path = require("path");
//const bodyParser = require("body-parser");
const multer = require("multer");
const HTTP_PORT = process.env.PORT || 8080;

// multer requires a few options to be setup to store files with file extensions
// by default it won't store extensions for security reasons
const storage = multer.diskStorage({
  destination: "./public/photos/",
  filename: function (req, file, cb) {
    // we write the filename as the current date down to the millisecond
    // in a large web service this would possibly cause a problem if two people
    // uploaded an image at the exact same time. A better way would be to use GUID's for filenames.
    // this is a simple example.
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// tell multer to use the diskStorage function for naming files instead of the default.
const upload = multer({ storage: storage });

//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public/"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
  
});

app.post("/", upload.single("photo"), (req, res) => {
  res.send("Thank you for your submission");
});

// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

app.listen(HTTP_PORT, onHttpStart);