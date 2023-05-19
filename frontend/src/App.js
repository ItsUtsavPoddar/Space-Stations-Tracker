import Map from "./components/LeafMap";
import "./App.css";
import { SatelliteList } from "./components/SatelliteList";
import React from "react";
import AddSatellite from "./components/AddSatellite";

function App() {
  return (
    <div className="App">
      <h1>Satellite Tracker</h1>
      <div class="container">
        <div class="div1">
          <AddSatellite />
          <SatelliteList />
        </div>
        <div class="div2">
          <Map />
        </div>
      </div>
    </div>
  );
}

export default App;
