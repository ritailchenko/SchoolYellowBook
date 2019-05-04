// var path = require("path");
var sessionChecker = require('./middleware');
var hbsContent = {userName: '', loggedin: false}; 
var User = require('../models');
// Routes
// =============================================================
module.exports = function(app) {

//   route for Home-Page
    app.get('/', sessionChecker, (req, res) => {
        res.redirect('/login');
    });

    // route for user signup
    app.route('/signup')
        //.get(sessionChecker, (req, res) => {
        .get((req, res) => {
            res.render('signup', hbsContent);
        })
        .post((req, res) => {
            User.create({
                username: req.body.username,
                //email: req.body.email,
                password: req.body.password
            })
            .then(user => {
                req.session.user = user.dataValues;
                res.redirect('/dashboard');
            })
            .catch(error => {
                res.redirect('/login');
            });
        });




    // route for user Login
    app.route('/login')
        .get((req, res) => {
            res.render('login', hbsContent);
        })
        .post((req, res) => {
            var username = req.body.username,
                password = req.body.password;

            User.findOne({ where: { username: username } }).then(function (user) {
                if (!user) {
                    res.redirect('/login');
                } else if (!user.validPassword(password)) {
                    res.redirect('/login');
                } else {
                    req.session.user = user.dataValues;
                    res.redirect('/dashboard');
                }
            });
        });


    // route for user's dashboard
    app.get('/dashboard', (req, res) => {
        if (req.session.user && req.cookies.user_sid) {
            hbsContent.loggedin = true; 
            hbsContent.userName = req.session.user.username; 
            hbsContent.title = "You are successfully loged in"; 
            res.render('index', hbsContent);
        } else {
            res.redirect('/login');
        }
    });


    // route for user logout
    app.get('/logout', (req, res) => {
        if (req.session.user && req.cookies.user_sid) {
            hbsContent.loggedin = false; 
            hbsContent.title = "You are logged out!"; 
            res.clearCookie('user_sid');
            res.redirect('/');
        } else {
            res.redirect('/login');
        }
    });


    // route for handling 404 requests(unavailable routes)
    app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
    });

};