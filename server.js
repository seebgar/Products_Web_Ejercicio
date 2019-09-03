const express = require("express")
const PORT = process.env.PORT || "8081";
var path = require('path');

const app = express();
const products_route = require("./routes/product");

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use("*", products_route);

app.listen(PORT, _ => console.log(`Listening on ${PORT}`))

/**
 * Sebastian Garcia 201630047
 */