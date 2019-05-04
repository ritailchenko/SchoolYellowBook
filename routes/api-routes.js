var db = require("../models");


require('dotenv').config();
//setup file and pkg requirements

var edKey = process.env.ED_KEY

//query string serializer
var qs = require('qs');
// var assert = require('assert');

// require('dotenv').config();
var axios = require('axios');

// Routes =============================================================
module.exports = function(app) {

 // GET route for getting all of the todos
 app.get("/api/findschool", function(req, res) {

  // searchSchool(res)

  searchSchoolObject(res)
  

});


};



var query = "https://api.data.gov/ed/collegescorecard/v1/schools?api_key=qhwLqB7uo9l9mn0UfvhvaK7h73Opx1KECd2zX2cx&_fields=school.name,school.state,id&school.state=ny&id=190150"

function searchSchool(res) {

  axios
  .get(query)
  .then(function(response) {
    // If the axios was successful...
    // Then log the body from the site!

    var schools = response.data.results;
         console.log("\n-------------------------------------------------");
          console.log(schools[0]["school.name"]);
          console.log("\n-------------------------------------------------");
//TESTING response

    // console.log(Object.keys(response.data));
    // console.log(Object.keys(response.data[0]));
  
res.json(schools[0]["school.name"]);

  })

}


//object version does not handle the "." in query key
//paramsSerializer crashed app
education = ["latest.academics.program.bachelors.education"]

baseUrl = "https://api.data.gov/ed/collegescorecard/v1/schools"

function searchSchoolObject(res) {

  axios
  .get(baseUrl, {
      params: {
            api_key: edKey,
            // id: "190150",
            fields: "school.name,school.state",
            _zip: 10001
            // education: 1
          }
          // paramsSerializer: function(params) {
              // return qs.stringify(params, {encode:false});
          



      

  })
  .then(function(response) {
    // If the axios was successful...
    // Then log the body from the site!
    // console.log(response);
//test env file
console.log("api key " + edKey)
// console.log(response)

    var schoolResult = response.data.results;
        
          console.log(schoolResult);

          for (var i = 0; i < schoolResult.length; i++) {
          console.log("\n-------------------------------------------------");
          console.log(schoolResult[i]["school.name"]);
          res.json(schoolResult);
        
          }
//TESTING response

    // console.log(Object.keys(response.data));
    // console.log(Object.keys(response.data[0]));
  
// res.json(schools[0]["school.name"]);
// res.json(schools[0]);


  })

}
