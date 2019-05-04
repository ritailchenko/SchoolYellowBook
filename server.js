// Rita's changes
var express = require("express");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var hbs = require('express-handlebars'); 
var path = require('path'); 

// Requiring our models for syncing
// var db = require("./models");

// Static directory
app.use(express.static("public"));


// set morgan to log info about our requests for development use.
app.use(morgan('dev'));

// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }));

// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

// handle bars config
app.engine('hbs', hbs({extname: 'hbs',defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'})); 
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'hbs'); 



// Routes
// =============================================================
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);
require("./routes/auth-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
// db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });
// });
