import { useState, useEffect } from "react";
import React from "react";
import { Marker, Popup } from "react-leaflet";
import axios from "axios";
var satellite = require("satellite.js");

const Calculation = () => {
  const [longi, setlong] = useState(0);
  const [lati, setlat] = useState(0);
  const [loc, setloc] = useState([]);
  const [ar1, setarr1] = useState([]);

  // const fetchData = () => {
  //   return fetch(
  //     "https://celestrak.org/NORAD/elements/gp.php?CATNR=25544&FORMAT=2le"
  //   ).then(async (response) => {
  //     let res = await response.text();
  //     setarr1(res.split("2 25544"));
  //     console.log(ar1);
  //   }); //Line 1 and Line 2 is from TLE format
  // };

  useEffect(() => {
    //fetchData();
    setInterval();
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

  setInterval(() => {
    var foo = cords(
      "1 25544U 98067A   23129.52382288  .00015688  00000+0  28157-3 0  9998",
      "2 25544  51.6404 160.1596 0006193 328.0352 127.9636 15.50062205395795"
    );
    console.log(foo);
    setlat(foo[0]);
    setlong(foo[1]);
    console.log(lati);
    console.log(longi);
  }, 6000);

  return (
    <div>
      <Marker position={[lati, longi]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </div>
  );
};
export default Calculation;
