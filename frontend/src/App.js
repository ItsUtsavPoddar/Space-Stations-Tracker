import Map from "./components/LeafMap";
import "./App.css";
import { SatelliteList } from "./components/SatelliteList";
import React from "react";
import AddSatellite from "./components/AddSatellite";

function App() {
  return (
    <div className="App">
      <h1>Space Station Tracker</h1>
      <div>
        <AddSatellite />
        <React.Fragment>
          <SatelliteList />
        </React.Fragment>
        <Map />
      </div>
    </div>
  );
}

export default App;
