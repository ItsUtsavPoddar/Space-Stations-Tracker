import React from "react";
import { useSelector } from "react-redux";

export const SatelliteList = () => {
  const satellite = useSelector((state) => state.coordinates);

  const renderedSats = satellite.map((sat) => (
    <article key={sat.id}>
      <h3>{sat.name}</h3>
      <p>
        Long : {sat.coords[0]} &emsp; Lat : {sat.coords[1]}
      </p>
    </article>
  ));

  return <section>{renderedSats}</section>;
};
