import { useState, useEffect } from "react";
import React from "react";
import { Marker, Popup } from "react-leaflet";
import axios from "axios";
import L from "leaflet";
var satellite = require("satellite.js");

const Calculation = () => {
  let Sat = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1209/1209255.png?w=360",
    iconSize: [25, 25],
    iconAnchor: [15, 15],
  });
  const [longi, setlong] = useState(0);
  const [lati, setlat] = useState(0);
  const [ar1, setarr1] = useState([]);
  var xyz;
  var abc;
  const fetchData = async () => {
    // return axios
    //   .get("https://celestrak.org/NORAD/elements/gp.php?CATNR=25544&FORMAT=2le")
    //   .then((response) => {
    //     response.headers["text/plain"];
    //     typeof response.data; // 'string'
    //     response.data;
    //     setarr1(response.split("2 25544"));
    //     console.log(ar1);
    //   }); //Line 1 and Line 2 is from TLE format

    try {
      const response = await axios.get(
        "https://celestrak.org/NORAD/elements/gp.php",
        {
          params: {
            CATNR: 25544,
            FORMAT: "2le",
          },
        }
      );
      xyz = response.data;
      xyz = xyz.toString();
      abc = xyz.split("2 25544");
      abc[0] = abc[0].replace(/(\r\n|\n|\r)/gm, "");
      abc[1] = abc[1].replace(/(\r\n|\n|\r)/gm, "");
      setarr1([...ar1, abc[0], abc[1]]);
      setInterval(fitLat(abc), 10000);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const cords = (line1, line2) => {
    const satrec = satellite.twoline2satrec(line1, line2); // Initializing the satellite record with the TLE (line 1 and line 2)
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
    const positionGd = satellite.eciToGeodetic(
      positionAndVelocity.position,
      gmst
    );

    // Converting the RADIANS to DEGREES (given the results were in radians)
    const long = (180 * positionGd.longitude) / Math.PI;
    const lat = (180 * positionGd.latitude) / Math.PI;
    return [long, lat];
  };

  const fitLat = (abc) => {
    console.log(abc);
    var y = abc[0];
    var z = "2 25544 " + abc[1];
    console.log(y);
    console.log(z);
    var foo = cords(y, z);
    console.log(foo);
    setlat(foo[0]);
    setlong(foo[1]);
  };

  return (
    <div>
      ${ar1}
      <Marker position={[longi, lati]} icon={Sat}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </div>
  );
};
export default Calculation;
