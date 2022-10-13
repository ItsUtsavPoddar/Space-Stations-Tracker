
{  //ULTIMATE CODE OF ISS

var y;
ultiss = function (check){

  
  if(check){
    fetchiss();
  }
  else {
    deanimate();
  }


};



var issOpen = false; // BOOLEAN VARIABLE TO TOGGLE ISS MARKERS


yuck1 = function(){
var isscheckbox = document.getElementById("isscheckbox");
console.log(isscheckbox);
isscheckbox.addEventListener("click" , function(){

  if (issOpen){
     ultiss(false);
  issOpen= false;

  }
  else {
    ultiss(true);
  issOpen = true;
  } 
});}
window.onload = yuck1();


}



  fetchiss = function (){
    fetch("https://tle.ivanstanojevic.me/api/tle/25544")        // fetching the data from celesTrak (TLE API) 
        .then((response) =>  response.json())                   // pulling json file from the response 
        .then((data) => tledata(data.line1 , data.line2))       //Line 1 and Line 2 is from TLE format
  };



  tledata = function (line1 , line2){

    
    map.addLayer(pathcordiss1);
    map.addLayer(pathcordiss2);
    map.addLayer(satmarkeriss);
    map.addLayer(satcircleiss);
    console.log (line1 , line2)
    displayiss(line1,line2);
    var pathcord = path (line1,line2);
    pathiss(pathcord);
  }


  displayiss = function (line1 , line2){    
      
    var cords = this.cords(line1, line2);
    isslong = cords[0];
    isslat = cords[1];

    //console.log(isslong.toFixed(4),isslat.toFixed(4));

    locateiss(isslat,isslong); //map.js function

    document.getElementById("ISS").innerHTML="Longitude: "+isslong.toFixed(4)+"   Latitude: "+isslat.toFixed(4); // printing on the HTML 

    // doing recursion with same TLE data because TLE doesnt have to get updated every sec.
    // this.l1 = line1; this.l2 = line2;
    this.y = setTimeout( this.displayiss, 1000 ,line1 , line2); 
}

    deanimate = () => {
      
      clearTimeout(y);
      map.removeLayer(pathcordiss1);
      map.removeLayer(pathcordiss2);
      map.removeLayer(satmarkeriss);
      map.removeLayer(satcircleiss);

    }











    /*

{   //ULTIMATR CODE OF TSS
  ulttss = function (check){

    var x;
    map.addLayer(pathcordtss1);
    map.addLayer(pathcordtss2);
    map.addLayer(satmarkertss);
    map.addLayer(satcircletss);

  fetchtss = function (){
      fetch("https://tle.ivanstanojevic.me/api/tle/48274")           // fetching the data from celesTrak (TLE API) 
          .then((response) => response.json())                       // pulling json file from the response 
          .then((data) => tledata(data.line1 , data.line2))          //Line 1 and Line 2 is from TLE format
  };

  tledata = function (line1 , line2){

          displaytss(line1,line2);
          var pathcord = path (line1,line2);
          pathtss(pathcord);

  }


  displaytss = function (line1 , line2){    
      
      var cords = this.cords(line1, line2);
      tsslong = cords[0];
      tsslat = cords[1];

      console.log(tsslong.toFixed(4),tsslat.toFixed(4));

      locatetss(tsslat,tsslong); //map.js function

      document.getElementById("TSS").innerHTML="Longitude: "+tsslong.toFixed(4)+"   Latitude: "+tsslat.toFixed(4); // printing on the HTML 

      // doing recursion with same TLE data because TLE doesnt have to get updated every sec.
      // this.l1 = line1; this.l2 = line2;
      this.x = setTimeout( this.displaytss, 1000 ,line1 , line2); 
  }
      

  // gets the cords from Script.js for marker and circle for ISS
  locatetss = function (lat,long) {

      satmarkertss.setLatLng([lat,long]);
      satcircletss.setLatLng([lat,long]);

  };

  pathtss = function (pathcord){

      pathcordtss1.setLatLngs( pathcord[0]);
      pathcordtss2.setLatLngs( pathcord[1]);

  }

  deanimate = () => {
  
    clearTimeout(this.x);
    map.removeLayer(pathcordtss1);
    map.removeLayer(pathcordtss2);
    map.removeLayer(satmarkertss);
    map.removeLayer(satcircletss);
  }
  if(check){
    fetchtss();
  }
  else {
    deanimate();
  }

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
    const long = (180*positionGd.longitude)/Math.PI;
    const lat = (180*positionGd.latitude)/Math.PI;
    
        return [long,lat];
    
  };

  path = function(line1 , line2){

    var pathC1 = [];
    var pathC2 =[];
    const satrec = satellite.twoline2satrec(line1,line2 );
    var date = new Date();
    var i = 0;

    console.log(date);
    for (; i<5500 ; i++) { 

    var positionAndVelocity = satellite.propagate(satrec, date);
    const gmst = satellite.gstime(date);
    const positionGd = satellite.eciToGeodetic(positionAndVelocity.position, gmst);

    const long = satellite.degreesLong(positionGd.longitude);
    const lat = satellite.degreesLong(positionGd.latitude);
      if (long < 179.8){

        pathC1.push([lat,long]);
      }
      else if (long > 179.75){

        break;
      }
    date = new Date(date.getTime() + 1000);
  }

  for (var j = 0; j<5500-i ; j++) { 

    var positionAndVelocity = satellite.propagate(satrec, date);
    const gmst = satellite.gstime(date);
    const positionGd = satellite.eciToGeodetic(positionAndVelocity.position, gmst);

    const long = satellite.degreesLong(positionGd.longitude);
    const lat = satellite.degreesLong(positionGd.latitude);

      if (long >= -180 && long <= 179 ){
        pathC2.push([lat,long]);
      }
    
    date = new Date(date.getTime() + 1000);
  }
  
  console.log(pathC1,pathC2,i,j,date);
  return([pathC1,pathC2]);
}


};




var tssOpen = false; // BOOLEAN VARIABLE TO TOGGLE ISS MARKERS



yuck2 = function(){
var tsscheckbox = document.getElementById("tsscheckbox");
console.log(tsscheckbox);
tsscheckbox.addEventListener("click" , function(){

  if (tssOpen){
     ulttss(false);
  tssOpen= false;

  }
  else {
    ulttss(true);
  tssOpen = true;
  } 
});}
window.onload = yuck2();
}



 // OBSERVER FUNCTION
    me = function(){
    // Set the Observer at 122.03 West by 36.96 North, in RADIANS
  var observerGd = {
    longitude: satellite.degreesToRadians( 85.85544),
    latitude: satellite.degreesToRadians( 20.333553),
    height: 60.370
  };


  // Sample TLE
  var tleline1 = '1 25544U 98067A   22268.20462258  .00008995  00000+0  16386-3 0  9996',
  tleline2 = '2 25544  51.6424 201.0629 0002375 289.1736 216.0075 15.50267607360691';    


  const satrec = satellite.twoline2satrec(tleline1,tleline2 );    // Initializing the satellite record with the TLE (line 1 and line 2)
  var date = new Date();

  //date = new Date (date.getTime() + 800000); // <-- TEST CODE (DO NOT UNCOMMENT THE CODE IF YOU DONT KNOW WHAT YOU ARE DOING)

  // Getting the position of the satellite at the given date 
  // The position_velocity result is a key-value pair of ECI coordinates.
  // https://celestrak.org/columns/v02n01/#:~:text=The%20ECI%20coordinate%20system%20(see,orthogonal%20(mutually%20perpendicular)%20axes.
  
  var positionAndVelocity = satellite.propagate(satrec, date); 
  
  // grabbing GMST for the coordinate transforms.
  // https://en.wikipedia.org/wiki/Sidereal_time#Definition
  
  const gmst = satellite.gstime(date);



  const positionEcf = satellite.eciToEcf(positionAndVelocity.position, gmst);

  lookAngles =  satellite.ecfToLookAngles (observerGd,positionEcf);

  var azimuth   = (lookAngles.azimuth * 180)/Math.PI,
    elevation = (lookAngles.elevation * 180) /Math.PI,
    rangeSat  = lookAngles.rangeSat;

    console.log(azimuth , elevation, rangeSat);
}

*/