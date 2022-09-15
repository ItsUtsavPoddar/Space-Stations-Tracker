
  fetchiss = function (){
    fetch("https://tle.ivanstanojevic.me/api/tle/25544")           // fetching the data from celesTrak (TLE API) 
        .then((response) => response.json())                       // pulling json file from the response 
        .then((data) => this.displayiss(data.line1 , data.line2)); //Line 1 and Line 2 is from TLE format
   };

  fetchtss =  function (){
    fetch("https://tle.ivanstanojevic.me/api/tle/48274")            // fetching the data from celesTrak (TLE API) 
    .then((response) => response.json())                            // pulling json file from the response
    .then((data) => this.displaytss(data.line1 , data.line2));      //Line 1 and Line 2 is from TLE format
  
  };

  displayiss = function (line1 , line2){    
    
    const satrec = satellite.twoline2satrec(line1,line2 );    // Initializing the satellite record with the TLE (line 1 and line 2)
    var date = new Date();

    // Getting the position of the satellite at the given date 
    // The position_velocity result is a key-value pair of ECI coordinates.
    // https://celestrak.org/columns/v02n01/#:~:text=The%20ECI%20coordinate%20system%20(see,orthogonal%20(mutually%20perpendicular)%20axes.

    var positionAndVelocity = satellite.propagate(satrec, date); 
    
    // grabbing GMST for the coordinate transforms.
    // https://en.wikipedia.org/wiki/Sidereal_time#Definition

    const gmst = satellite.gstime(date);

    // converts Earth-centered inertial ECI coordinates, specified by position, to latitude, longitude, altitude (LLA) geodetic coordinates.
    const positionGd = satellite.eciToGeodetic(positionAndVelocity.position, gmst);

    // Converting the RADIANS to DEGREES (given the results were in radians)
    const isslong = satellite.degreesLong(positionGd.longitude);
    const isslat = satellite.degreesLong(positionGd.latitude);

    console.log(isslong.toFixed(4),isslat.toFixed(4));

    locateiss(isslat,isslong); //map.js function

    document.getElementById("ISS").innerHTML="Longitude: "+isslong.toFixed(4)+"   Latitude: "+isslat.toFixed(4); // printing on the HTML 

    // doing recursion with same TLE data because TLE doesnt have to get updated every sec.

    setTimeout( this.displayiss, 1000 ,line1 , line2);  
};


  displaytss = function (line1 , line2){    
    
    const satrec = satellite.twoline2satrec(line1,line2 );    // Initializing the satellite record with the TLE (line 1 and line 2)
    var date = new Date();

    // Getting the position of the satellite at the given date 
    // The position_velocity result is a key-value pair of ECI coordinates.
    // https://celestrak.org/columns/v02n01/#:~:text=The%20ECI%20coordinate%20system%20(see,orthogonal%20(mutually%20perpendicular)%20axes.

    var positionAndVelocity = satellite.propagate(satrec, date); 
    
    // grabbing GMST for the coordinate transforms.
    // https://en.wikipedia.org/wiki/Sidereal_time#Definition

    const gmst = satellite.gstime(date);

    // converts Earth-centered inertial ECI coordinates, specified by position, to latitude, longitude, altitude (LLA) geodetic coordinates.
    const positionGd = satellite.eciToGeodetic(positionAndVelocity.position, gmst);

    // Converting the RADIANS to DEGREES (given the results were in radians)
    const tsslong = satellite.degreesLong(positionGd.longitude);
    const tsslat = satellite.degreesLong(positionGd.latitude);

    console.log(tsslong.toFixed(4),tsslat.toFixed(4));

    locatetss(tsslat,tsslong); //map.js function

    document.getElementById("TSS").innerHTML="Longitude: "+tsslong.toFixed(4)+"   Latitude: "+tsslat.toFixed(4); // printing on the HTML 

    // doing recursion with same TLE data because TLE doesnt have to get updated every sec.
    
    setTimeout( this.displaytss, 1000 ,line1 , line2);  
};

