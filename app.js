var express = require("express");
require('dotenv').config()
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
//var mongoose = require("mongoose");
var config = require('./config/config');
var route = require('./routes/routes');
const db = require("./model/index");
const verifySignUp= require("./middleware/verifySignUp");

const controller = require("./controllers/controllers");

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
require('./routes/routes')(app);
db.mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

//  Start the server
app.listen(config.LISTEN_PORT, function(){
    console.log('listening on port ' + config.LISTEN_PORT);
});

