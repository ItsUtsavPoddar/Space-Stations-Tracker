
   fetchiss = function (){
    fetch("https://tle.ivanstanojevic.me/api/tle/25544")
        .then((response) => response.json())
        .then((data) => this.displayiss(data.line1 , data.line2));
   };

   fetchtss =  function (){
    fetch("https://tle.ivanstanojevic.me/api/tle/48274")
    .then((response) => response.json())
    .then((data2) => this.displaytss(data2.line1 , data2.line2));
  
  };

  displayiss = function (line1 , line2){
    // Initialize the satellite record with this TLE
    const satrec = satellite.twoline2satrec(line1,line2 );
    // Get the position of the satellite at the given date
    const date = new Date();
    const positionAndVelocity = satellite.propagate(satrec, date);
    const gmst = satellite.gstime(date);
    const position = satellite.eciToGeodetic(positionAndVelocity.position, gmst);

    const tsslong = radians_to_degrees(position.longitude);
    const tsslat = radians_to_degrees(position.latitude);


console.log(tsslong,tsslat);
document.getElementById("ISS").innerHTML="Longitude: "+tsslong+"   Latitude: "+tsslat;

setTimeout( this.displayiss, 1000 ,line1 , line2);

};

   
    displaytss = function (line1 , line2){
    // Initialize the satellite record with this TLE
    const satrec = satellite.twoline2satrec(line1,line2 );
    // Get the position of the satellite at the given date
    const date = new Date();
    const positionAndVelocity = satellite.propagate(satrec, date);
    const gmst = satellite.gstime(date);
    const position = satellite.eciToGeodetic(positionAndVelocity.position, gmst);

    const tsslong = radians_to_degrees(position.longitude);
    const tsslat = radians_to_degrees(position.latitude);


console.log(tsslong,tsslat);
document.getElementById("TSS").innerHTML="Longitude: "+tsslong+"   Latitude: "+tsslat;

setTimeout( this.displaytss, 1000 ,line1 , line2);

};

//console.log(position.height);
   
// RADIANS TO DEGREES 
function radians_to_degrees(radians)
{
  var pi = Math.PI;
  const u = radians * (180/pi);
  return u.toFixed(4);
}
// RADIANS TO DEGREES 
      