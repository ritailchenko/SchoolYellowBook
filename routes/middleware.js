// var path = require('path'); 
// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    
    if (req.session.user && req.cookies.user_sid) {
        // console.log('rendering welcome')
        res.render('welcome');
        
        // res.sendFile(path.join(__dirname, "../public/welcome.html"));
        // res.sendFile(path.join(__dirname, "../views/welcome.hbs"));

    } else {
        next();
    }    
  };

module.exports = sessionChecker;