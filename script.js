
/*fetchtss =  function (){
    fetch("https://tle.ivanstanojevic.me/api/tle/48274")            // fetching the data from celesTrak (TLE API) 
    .then((response) => response.json())                            // pulling json file from the response
    .then((data) => this.displaytss(data.line1 , data.line2));      //Line 1 and Line 2 is from TLE format
  
  };

   var y; // VARIABLE TO STORE SET-TIMEOUT FUNCTION
   
   var tssOpen = false; // BOOLEAN VARIABLE TO TOGGLE ISS MARKERS

displaytss = function (line1 , line2){    
    
        var cords = this.cords(line1, line2);
        tsslong = cords[0];
        tsslat = cords[1];

        console.log(tsslong.toFixed(4),tsslat.toFixed(4));

        locatetss(tsslat,tsslong); //map.js function

        document.getElementById("TSS").innerHTML="Longitude: "+tsslong.toFixed(4)+"   Latitude: "+tsslat.toFixed(4); // printing on the HTML 

        // doing recursion with same TLE data because TLE doesnt have to get updated every sec.
        
        setTimeout( this.displaytss, 1000 ,line1 , line2);  
};*/



cords = function (line1 , line2){
  
  
  const satrec = satellite.twoline2satrec(line1,line2 );    // Initializing the satellite record with the TLE (line 1 and line 2)
  var date = new Date();

  //date = new Date (date.getTime() + 800000); // <-- TEST CODE (DO NOT UNCOMMENT THE CODE IF YOU DONT KNOW WHAT YOU ARE DOING)

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
  const long = satellite.degreesLong(positionGd.longitude);
  const lat = satellite.degreesLong(positionGd.latitude);
  
      return [long,lat];
  
};

path = function(line1 , line2){

      var pathcords1 = [];
      var pathcords2 =[];
      const satrec = satellite.twoline2satrec(line1,line2 );
      var date = new Date();
      var i = 0;

      console.log(date);
      for (; i<6000 ; i++) { 

      var positionAndVelocity = satellite.propagate(satrec, date);
      const gmst = satellite.gstime(date);
      const positionGd = satellite.eciToGeodetic(positionAndVelocity.position, gmst);

      const long = satellite.degreesLong(positionGd.longitude);
      const lat = satellite.degreesLong(positionGd.latitude);
        if (long < 179){

      pathcords1.push([lat,long]);
        }
        else if (long > 179.75){

          break;
        }
      date = new Date(date.getTime() + 1000);
    }

    for (var j = 0; j<6000-i ; j++) { 

      var positionAndVelocity = satellite.propagate(satrec, date);
      const gmst = satellite.gstime(date);
      const positionGd = satellite.eciToGeodetic(positionAndVelocity.position, gmst);

      const long = satellite.degreesLong(positionGd.longitude);
      const lat = satellite.degreesLong(positionGd.latitude);

        if (long >= -180 && long <= 179 ){
          pathcords2.push([lat,long]);
        }
      
      date = new Date(date.getTime() + 1000);
    }
    
    console.log(pathcords1,pathcords2,i,j,date);
    return([pathcords1,pathcords2]);
}





ultiss = function (check){
  
  
   var a,b; 


  fetchiss = function (){
      fetch("https://tle.ivanstanojevic.me/api/tle/25544")           // fetching the data from celesTrak (TLE API) 
          .then((response) => response.json())                       // pulling json file from the response 
          .then((data) => tledata(data.line1 , data.line2))          //Line 1 and Line 2 is from TLE format
  };

  tledata = function (line1 , line2){

          displayiss(line1,line2);
          var pathcord = path (line1,line2);
          pathiss(pathcord);

  }


  displayiss = function (line1 , line2){    
      
      var cords = this.cords(line1, line2);
      isslong = cords[0];
      isslat = cords[1];

      console.log(isslong.toFixed(4),isslat.toFixed(4));

      locateiss(isslat,isslong); //map.js function

      document.getElementById("ISS").innerHTML="Longitude: "+isslong.toFixed(4)+"   Latitude: "+isslat.toFixed(4); // printing on the HTML 

      // doing recursion with same TLE data because TLE doesnt have to get updated every sec.
      // this.l1 = line1; this.l2 = line2;
      y = setTimeout( this.displayiss, 1000 ,line1 , line2); 
  }
      
//FOR ISS
  //Instantiates a circle object given a geographical point, and an options object which contains the circle radius, etc
 
  var satcircleiss = L.circle([0, 0], {
    weight:1,
    opacity:0.4,
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.2,
    radius:  2200e3
    }).addTo(map);

// Instantiates a Marker object given a geographical point and optionally an options object. 
// Here it contains icon option

  var satmarkeriss =  L.marker([0, 0],{icon: iconiss}).addTo(map)

  // gets the cords from Script.js for marker and circle for ISS
  locateiss = function (lat,long) {

      satmarkeriss.setLatLng([lat,long]);
      satcircleiss.setLatLng([lat,long]);

  };

  pathiss = function (pathcords){

      a = L.polyline( pathcords[0], {color: "red"}).addTo(map);
      b = L.polyline(pathcords[1] , {color: "red"}).addTo(map);

      
  }

  deanimate = () => {
   
    clearTimeout(y);
    /*map.removeLayer(a);
    map.removeLayer(b);
    map.removeLayer(satmarkeriss);
    map.remove(satcircleiss);*/
    console.log ("ASd")
  }
  if(check){
    fetchiss();
  }
  else {
    deanimate();
  }

};

var issOpen = false; // BOOLEAN VARIABLE TO TOGGLE ISS MARKERS
window.onload = function(){
var isscheckbox = document.getElementById("isscheckbox");
console.log(isscheckbox);
isscheckbox.addEventListener("click" , function(){

  if (issOpen){
      issStop();
  }
  else {
    issStart();
  } 
});}

function issStart (){
  ultiss(true);
  issOpen = true;
}

function issStop() {
  ultiss(false);
  issOpen= false;
}