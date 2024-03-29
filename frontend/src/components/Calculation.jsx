import { useState, useEffect } from "react";
import React from "react";
import { Marker, Popup, Polyline, Circle, CircleMarker } from "react-leaflet";
import axios from "axios";
import L from "leaflet";
import { satCoordsUpdated } from "../app/coordinates/coordinatesSlice";
import { useDispatch } from "react-redux";
var satellite = require("satellite.js");

const Calculation = (satnumber) => {
  let Sat = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1209/1209255.png?w=360",
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });

  const dispatch = useDispatch();
  const [longi, setlong] = useState(0);
  const [lati, setlat] = useState(0);
  const [height, setheight] = useState(0);
  const [path1, setpath1] = useState(0);
  const [path2, setpath2] = useState(0);
  var xyz;
  var abc;
  var name;

  useEffect(() => {
    fetchData().then(
      () => setInterval(fitLat, 2000),
      setInterval(fitpath, 5000)
    );
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://celestrak.org/NORAD/elements/gp.php",
        {
          params: {
            CATNR: satnumber.satnumber,
            FORMAT: "2le",
          },
        }
      );

      const respname = await axios.get(
        "https://celestrak.org/NORAD/elements/gp.php",
        {
          params: {
            CATNR: satnumber.satnumber,
            FORMAT: "tle",
          },
        }
      );
      name =
        // "ISS";
        respname.data;

      name = name.split("1 " + satnumber.satnumber);

      xyz =
        // "1 25544U 98067A   23131.59547726  .00014612  00000+0  26229-3 0  9992 2 25544  51.6400 149.8957 0006321 335.8261 168.3051 15.50121033396116";
        // "1 56179U 23054B   23149.85624328  .00006627  00000+0  29623-3 0  9994 2 56179  97.4043  44.9672 0010893 101.7937 258.4522 15.21601277  7375";
        response.data;

      xyz.toString();
      //console.log(xyz);
      abc = xyz.split("2 " + satnumber.satnumber);
      // abc = xyz.split("2 " + "56179");
      // console.log(abc[1].trim());
      fitLat();
      fitpath();
    } catch (error) {
      console.error(error);
    }
  };

  const cords = (line1, line2) => {
    // console.log(line1, line2);
    const satrec = satellite.twoline2satrec(line1, line2); // Initializing the satellite record with the TLE (line 1 and line 2)
    // console.log(satrec)
    var date = new Date();

    //date = new Date (date.getTime() + 800000); // <-- TEST CODE (DO NOT UNCOMMENT THE CODE IF YOU DONT KNOW WHAT YOU ARE DOING)

    // Getting the position of the satellite at the given date
    // The position_velocity result is a key-value pair of ECI coordinates.
    // https://celestrak.org/columns/v02n01/#:~:text=The%20ECI%20coordinate%20system%20(see,orthogonal%20(mutually%20perpendicular)%20axes.

    var positionAndVelocity = satellite.propagate(satrec, date);
    // console.log(positionAndVelocity);

    // grabbing GMST for the coordinate transforms.
    // https://en.wikipedia.org/wiki/Sidereal_time#Definition

    const gmst = satellite.gstime(date);
    // console.log(gmst);

    // converts Earth-centered inertial ECI coordinates, specified by position, to latitude, longitude, altitude (LLA) geodetic coordinates.
    const positionGd = satellite.eciToGeodetic(
      positionAndVelocity.position,
      gmst
    );
    // console.log(positionGd);

    // Converting the RADIANS to DEGREES (given the results were in radians)
    const long = (180 * positionGd.longitude) / Math.PI;
    const lat = (180 * positionGd.latitude) / Math.PI;
    const height = positionGd.height;
    console.log([long, lat]);
    return [long, lat, height];
  };

  const path = (line1, line2) => {
    var pathC1 = [];
    var pathC2 = [];
    const satrec = satellite.twoline2satrec(line1, line2);
    var date = new Date();
    var i = 0;

    //console.log(date);
    for (; i < 5500; i++) {
      var positionAndVelocity = satellite.propagate(satrec, date);
      const gmst = satellite.gstime(date);
      const positionGd = satellite.eciToGeodetic(
        positionAndVelocity.position,
        gmst
      );

      const long = satellite.degreesLong(positionGd.longitude);
      const lat = satellite.degreesLong(positionGd.latitude);
      if (long < 179.4) {
        pathC1.push([lat, long]);
      } else {
        break;
      }
      date = new Date(date.getTime() + 1000);
    }

    for (var j = 0; j < 5500 - i; j++) {
      var positionAndVelocity = satellite.propagate(satrec, date);
      const gmst = satellite.gstime(date);
      const positionGd = satellite.eciToGeodetic(
        positionAndVelocity.position,
        gmst
      );

      const long = satellite.degreesLong(positionGd.longitude);
      const lat = satellite.degreesLong(positionGd.latitude);

      if (long >= -180 && long <= 179) {
        pathC2.push([lat, long]);
      }

      date = new Date(date.getTime() + 1000);
    }

    // console.log(pathC1, pathC2, i, j, date);
    return [pathC1, pathC2];
  };

  const fitLat = () => {
    // console.log(ar1[0]);
    // console.log(ar1[1]);

    var foo = cords(abc[0], "2 " + satnumber.satnumber + "  " + abc[1].trim());
    // console.log(foo);
    setlat(foo[1]);
    setlong(foo[0]);
    setheight(foo[2]);
    dispatch(
      satCoordsUpdated({
        id: satnumber.satnumber,
        name: name[0].trim(),
        coords: [foo[0].toFixed(4), foo[1].toFixed(4)],
      })
    );
  };

  const fitpath = () => {
    // console.log(ar1[0]);
    // console.log(ar1[1]);
    // console.log(typeof satnumber.satnumber);
    var latlngs = path(
      abc[0],
      "2 " + satnumber.satnumber + "  " + abc[1].trim()
    );
    // console.log(foo);
    setpath1(latlngs[0]);
    setpath2(latlngs[1]);
    console.log(latlngs);
  };

  return (
    <div>
      {/* <h1>{ar1}</h1> */}
      <Marker
        position={[lati, longi]}
        icon={Sat}
        autoPanOnFocus={false}
        autoPan={false}
      >
        <Popup autoPan={false}>
          height: {height.toFixed(4)} Sat Num: {satnumber.satnumber}
        </Popup>
      </Marker>

      <Polyline
        positions={path1}
        pathOptions={{
          color: "blue",
          weight: 1.5,
        }}
        smoothFactor={2}
      ></Polyline>

      <Polyline
        positions={path2}
        pathOptions={{
          color: "blue",
          weight: 1.5,
        }}
        smoothFactor={2}
      ></Polyline>

      <Circle
        center={[lati, longi]}
        radius={2200e3}
        pathOptions={{
          weight: 1.5,
          opacity: 0.7,
          color: "red",
          fillColor: "#f03",
          fillOpacity: 0.2,
        }}
      ></Circle>
    </div>
  );
};
export default Calculation;
