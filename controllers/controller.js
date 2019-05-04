var express = require("express");

var router = express.Router();

// Import the model to use its database functions.
var model = require("../models/model.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  model.all(function(data) {
    var hbsObject = {
      //datbase call here  
      tableName: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

// Export routes for server.js to use.
module.exports = router;
