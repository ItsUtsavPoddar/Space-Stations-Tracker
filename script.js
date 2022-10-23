var y;git commit - m "disabled fetch from TLE API (api has bug thus wrong data)"
var issOpen = true; // BOOLEAN VARIABLE TO TOGGLE ISS MARKERS

yuck1 = function () {
  var isscheckbox = document.getElementById("isscheckbox");

  console.log(isscheckbox);

  isscheckbox.addEventListener("click", function () {
    if (issOpen) {
      deanimate();
      issOpen = false;
    } else {
      fetchiss();
      issOpen = true;
    }
  });
};



deanimate = () => {
    clearTimeout(y);
    map.removeLayer(pathcordiss1);
    map.removeLayer(pathcordiss2);
    map.removeLayer(satmarkeriss);
    map.removeLayer(satcircleiss);
};


  fetchiss = function () {
   /* fetch("https://tle.ivanstanojevic.me/api/tle/25544") // fetching the data from celesTrak (TLE API)
      .then((response) => response.json()) // pulling json file from the response
      .then((data) => */
        tledata1(
          "1 25544U 98067A   22296.61411075  .00009673  00000+0  17934-3 0  9997",
          "2 25544  51.6435  60.3357 0005249   7.9656 359.4428 15.49658807365106"
        )
     // ); //Line 1 and Line 2 is from TLE format
  };

  tledata1 = function (line1, line2) {
    console.log(line1, line2);
    display(line1, line2);
    var pathcord = path(line1, line2);
    pathcordiss1.setLatLngs(pathcord[0]);
    pathcordiss2.setLatLngs(pathcord[1]);
    //pathiss(pathcord);
  };

  display = function (line1, line2) {

    map.addLayer(pathcordiss1);
    map.addLayer(pathcordiss2);
    map.addLayer(satmarkeriss);
    map.addLayer(satcircleiss);

    var cords = this.cords(line1, line2);
    isslong = cords[0];
    isslat = cords[1];

    //console.log(isslong.toFixed(4),isslat.toFixed(4));

    satmarkeriss.setLatLng([isslat, isslong]);
    satcircleiss.setLatLng([isslat, isslong]);
    //locateiss(isslat,isslong); //map.js function

    document.getElementById("ISS").innerHTML =
      "Longitude: " + isslong.toFixed(4) + "   Latitude: " + isslat.toFixed(4); // printing on the HTML

    // doing recursion with same TLE data because TLE doesnt have to get updated every sec.
    // this.l1 = line1; this.l2 = line2;
    y = setTimeout(this.display, 1000, line1, line2);
  };


var x;
var tssOpen = true; // BOOLEAN VARIABLE TO TOGGLE ISS MARKERS

yuck2 = function () {
  var tsscheckbox = document.getElementById("tsscheckbox");

  console.log(tsscheckbox);

  tsscheckbox.addEventListener("click", function () {
    if (tssOpen) {
      deanimate2();
      tssOpen = false;
    } else {
      fetchtss();
      tssOpen = true;
    }
  });
};
deanimate2 = () => {
    clearTimeout(x);
    map.removeLayer(pathcordtss1);
    map.removeLayer(pathcordtss2);
    map.removeLayer(satmarkertss);
    map.removeLayer(satcircletss);
};

  fetchtss = function () {
    /*fetch("https://tle.ivanstanojevic.me/api/tle/48274") // fetching the data from celesTrak (TLE API)
      .then((response) => response.json()) // pulling json file from the response
      .then((data) =>*/
        tledata2("1 48274U 21035A   22296.38419186  .00023451  00000+0  26700-3 0  9999",
        "2 48274  41.4738 157.7999 0003952 195.5225 333.5828 15.61707344 84810")
      
      //); //Line 1 and Line 2 is from TLE format
  };

  tledata2 = function (line1, line2) {
    console.log(line1, line2);
    displaytss(line1, line2);
    var pathcord = path(line1, line2);
    pathcordtss1.setLatLngs(pathcord[0]);
    pathcordtss2.setLatLngs(pathcord[1]);
    //pathiss(pathcord);
  };

  displaytss = function (line1, line2) {

    map.addLayer(pathcordtss1);
    map.addLayer(pathcordtss2);
    map.addLayer(satmarkertss);
    map.addLayer(satcircletss);

    var cords = this.cords(line1, line2);
    tsslong = cords[0];
    tsslat = cords[1];

    //console.log(isslong.toFixed(4),isslat.toFixed(4));

    satmarkertss.setLatLng([tsslat, tsslong]);
    satcircletss.setLatLng([tsslat, tsslong]);
    //locateiss(isslat,isslong); //map.js function

    document.getElementById("TSS").innerHTML =
      "Longitude: " + tsslong.toFixed(4) + " Latitude: " + tsslat.toFixed(4); // printing on the HTML

    // doing recursion with same TLE data because TLE doesnt have to get updated every sec.
    // this.l1 = line1; this.l2 = line2;
    this.x = setTimeout(this.displaytss, 1000, line1, line2);
  };



















































































/*

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
