var express = require("express"); // Proper spacing
var app = express(); // Proper spacing

app.use(express.static(__dirname + "/public")); // Static folder setup
app.use(express.json()); // Parsing JSON
app.use(express.urlencoded({ extended: false })); // Parsing URL-encoded data

var port = process.env.port || 3000; // Proper spacing
app.listen(port, () => {
  console.log("App listening to: " + port); // Proper console logging
});
