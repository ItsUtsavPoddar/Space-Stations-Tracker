import React from "react";
import { MapContainer, TileLayer, useMap, Popup, Marker } from "react-leaflet";
import { useState, useEffect } from "react";

import "leaflet/dist/leaflet.css";
import { NightRegion } from "react-leaflet-night-region";
import Calculation from "./Calculation";

const LeafMap = () => {
  // const [satellites, setsatellites] = useState([]);
  return (
    <div>
      <MapContainer
        center={[21, 78]}
        zoom={2}
        scrollWheelZoom={true}
        worldCopyJump={true}
        maxBounds={[
          [-90, -180],
          [90, 180],
        ]}
        minZoom={2}
        style={{
          marginTop: 50,
          height: 600,
          width: "70%",
          borderRadius: 10,
          display: "inline-block",
          margin: "auto",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />

        <NightRegion
          fillColor="#00345c"
          color="#001a2e"
          refreshInterval={500} // custom refresh rate in milliseconds, default set to 5000ms
        />
        <Calculation />
      </MapContainer>
    </div>
  );
};

export default LeafMap;
