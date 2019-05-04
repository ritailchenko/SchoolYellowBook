// // *********************************************************************************
// // html-routes.js - this file offers a set of routes for sending users to the various html pages
// // *********************************************************************************

// // Dependencies
// // =============================================================
var path = require("path");

// var sessionChecker = require('./middleware');

// Routes
// =============================================================
module.exports = function(app) {


  // contact route loads contact.html
  app.get("/contact", function(req, res) {
    // res.sendFile(path.join(__dirname, "../public/contact.html"));
    res.render('contact');
  });

  // students route loads students.html
  app.get("/students", function(req, res) {
    res.render('students');
  });

  app.get("/educator", function(req, res) {
    // res.sendFile(path.join(__dirname, "../public/educator.html"));
    res.render('educator');
  });
};