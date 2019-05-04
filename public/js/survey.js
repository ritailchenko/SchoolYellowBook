$(document).ready(function() {

    //create empty string vars to hold input values from change functions
    //REMOVE VAR = from inside fn to keep scope global
    var inputState = ""; 
    var inputCostLow = "";
    var inputCostHigh = "";
    var inputSatScore = "";
    var inputActScore = "";
    var inputZip = "";
    var inputBach = "";    
    var inputAsso = "";
    var inputOneYear = "";   
    var inputTwoYear = "";  
    var inputThreeYear = "";

    $("#costLow").change(function (event) {
      inputCostLow = $(this).val();
      console.log("inputCostLow is " + inputCostLow);
    });

    $("#costHigh").change(function (event) {
      inputCostHigh = $(this).val(); 
      console.log("inputCostHigh is " + inputCostHigh);
    });

    $("#satscore").change(function (event) {
      inputSatScore = $(this).val(); 
      console.log("inputSatScore is " + inputSatScore);
    });

    $("#actscore").change(function (event) {
      inputActScore = $(this).val(); 
      console.log("inputActScore is " + inputActScore);
    });
  
    $("#stateSelect").change(function (event) {
        inputState = $(this).val(); 
        console.log("inputState is " + inputState);
    });

    $("#zipcode").change(function (event) {
        inputZip = $(this).val(); 
        console.log("inputZip is " + inputZip);
    });

    //Added majors as dropdown

    $("#majorSelect").change(function (event) {
        inputMajor = $(this).val(); 
        console.log("inputMajor is " + inputMajor);
      });

    $("#bachelor").change(function (event) {
      inputBach = $(this).val(); 
      console.log("inputBach is " + inputBach);
    });
  
    $("#associate").change(function (event) {
      inputAsso = $(this).val(); 
      console.log("inputAsso is " + inputAsso);
    });

    $("#oneyear").change(function (event) {
      inputOneYear = $(this).val(); 
      console.log("inputOneYear is " + inputOneYear);
    });

    $("#twoyear").change(function (event) {
      inputTwoYear = $(this).val(); 
      console.log("inputTwoYear is " + inputTwoYear);
    });

    $("#threeyear").change(function (event) {
      inputThreeYear = $(this).val(); 
      console.log("inputThreeYear is " + inputThreeYear);
    });


    function surveyFormSubmit(){
      event.preventDefault();

//Empty previous searches
      $("#searchResult").empty();

    //   console.log("zipquery inside fn " + inputZip);
    //     if (!inputState && !inputCostLow && !inputCostHigh && !inputSatScore && !inputActScore && !inputZip && !inputBach && !inputAsso && !inputOneYear && !inputTwoYear && !inputThreeYear)  {
    //       return;
    //     }
        // console.log(inputActScore);
      

    //TURN BACK ON
       var stateQuery = "&school.state_fips=" + inputState;
       var costQuery = "&latest.cost.attendance.academic_year__range=" + inputCostLow + ".." + inputCostHigh;
       var actQuery = "&latest.admissions.act_scores.midpoint.cumulative__range=" + (parseInt(inputActScore)-2) + ".." + (parseInt(inputActScore)+2);
       var satQuery = "&latest.admissions.sat_scores.average.overall__range=" + (parseInt(inputSatScore)-125) + ".." + (parseInt(inputSatScore)+100);
      // var zipQuery = "&_zip=" + inputZip + "&_distance=10mi";
      var majorQuery = inputMajor;
        
       //partial query string
      // var query = stateQuery + costQuery + actQuery + satQuery + zipQuery;
      var query = stateQuery + costQuery + actQuery + satQuery + majorQuery;   
     


    //   if(inputState = !"none") {
    //     console.log("inputState is: " + inputState)
    //     // return query;                                                
    //   }
    //   else{
          
    //       console.log("ignore state");
    //   };
      


    //   if((inputCostLow = !"") && (inputCostHigh = !"")) {
    //     query = query + costQuery;
    //     // return query;     
    //   };
    //   if(inputActScore = !"") {
    //     query = query + actQuery;  
    //     // return query;               
    //   };


    //   if(inputSatScore = "NA") {

    //     console.log("ignore sat")
        
    //    // query = query + actQuery;  
    //     // return query;               
    //   }
    //   else {
    //     console.log("inputSatScore is" + inputSatScore)
    //     console.log(satQuery)
    //   };


    //   if(inputZip = !"") {
    //     query = query + zipQuery;
    //     // return query; 
    //   };
    
   
    
    console.log("partial query string is: " + query); 

   // getSchools();
    
   var baseUrl = "https://api.data.gov/ed/collegescorecard/v1/schools?"
   var apiKey = "api_key=qhwLqB7uo9l9mn0UfvhvaK7h73Opx1KECd2zX2cx"
   var fields = "&_fields=school.name,school.school_url"

//TEST with Columbia U single return
//query = "&id=190150"
  
   var queryURLfull = baseUrl + apiKey + fields + query;
   

   console.log(queryURLfull);
   $.ajax({
     url: queryURLfull,
     method: "GET"
   }).then(function(response) {

     // Printing the entire object to console
    // console.log(response.results[0]);


        schoolResult = response.results;
        
//           console.log(schoolResult);

          for (var i = 0; i < schoolResult.length; i++) {
          console.log("\n-------------------------------------------------");
          console.log(schoolResult[i]["school.name"]);
          console.log(schoolResult[i]["school.school_url"]);
          //response.json(schoolResult);
  
            schoolName = $("<h2>").text(schoolResult[i]["school.name"])
          schoolURL = $("<a>").attr("href", schoolResult[i]["school.school_url"]).text("website");
     $("#searchResult").append(schoolName, schoolURL);

            
          }



    });



   //   // Constructing HTML containing the artist information
   //   var artistName = $("<h1>").text(response.name);
   //   var artistURL = $("<a>").attr("href", response.url).append(artistName);
   //   var artistImage = $("<img>").attr("src", response.thumb_url);
   //   var trackerCount = $("<h2>").text(response.tracker_count + " fans tracking this artist");
   //   var upcomingEvents = $("<h2>").text(response.upcoming_event_count + " upcoming events");
   //   var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");

   //   // Empty the contents of the artist-div, append the new artist content
   //   $("#artist-div").empty();
   //   $("#artist-div").append(artistURL, artistImage, trackerCount, upcomingEvents, goToArtist);


        return;
    }
    //END survey form submit


    $( ".submit-btn" ).click(function() {
        surveyFormSubmit();
      });






















  //END JS  
  });
  