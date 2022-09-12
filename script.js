
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

        setTimeout( this.fetchCord, 1000);
   };
