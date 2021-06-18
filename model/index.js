const mongoose = require("mongoose");

const db = {};

db.mongoose = mongoose;

db.user = require("./model");

module.exports = db;