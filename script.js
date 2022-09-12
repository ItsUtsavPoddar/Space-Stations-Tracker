
   fetchCord = function (){
    fetch("http://api.open-notify.org/iss-now")
    .then((response)=> response.json())
    .then((data)=> this.displayCord(data))
    //.then( setTimeout( this.fetchCord, 1000))
   };

   displayCord= function (data) {

        const longitude  = data.iss_position.longitude;
        const latitude  = data.iss_position.latitude;
        console.log(longitude,latitude);

        document.getElementById("1").innerHTML="Longitude: "+longitude+"   Latitude: "+latitude;

        setTimeout( this.fetchCord, 3000);
        setTimeout( fetchtss(), 3000);
   };

    fetchtss =  function (){
        fetch("https://tle.ivanstanojevic.me/api/tle/48274")
        .then((response) => response.json())
        .then((data2) => this.displayCord1(data2.line1 , data2.line2))
      
      
      };
      displayCord1 = function (line1 , line2){
     
    // Initialize the satellite record with this TLE
    const satrec = satellite.twoline2satrec(line1,line2 );
    // Get the position of the satellite at the given date
    const date = new Date();
    const positionAndVelocity = satellite.propagate(satrec, date);
    const gmst = satellite.gstime(date);
    const position = satellite.eciToGeodetic(positionAndVelocity.position, gmst);

console.log(radians_to_degrees(position.longitude),radians_to_degrees(position.latitude));

//console.log(position.height);
   
// RADIANS TO DEGREES 
function radians_to_degrees(radians)
{
  var pi = Math.PI;
  return radians * (180/pi);
}
// RADIANS TO DEGREES 
      };