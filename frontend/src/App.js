import Map from "./components/LeafMap";
import "./App.css";
import { SatelliteList } from "./components/SatelliteList";
import React from "react";
import AddSatellite from "./components/AddSatellite";

function App() {
  return (
    <div className="App">
      <h1>Satellite Tracker</h1>
      <div
        style={{
          display: "inline-flex",
          width: "100%",
        }}
      >
        <div
          style={{
            width: "40%",
            paddingRight: "5%",
            paddingLeft: "2%",
          }}
        >
          <AddSatellite />
          <SatelliteList />
        </div>
        <div
          style={{
            width: "60%",
            alignContent: "flex-end",
          }}
        >
          <Map />
        </div>
      </div>
    </div>
  );
}

export default App;
