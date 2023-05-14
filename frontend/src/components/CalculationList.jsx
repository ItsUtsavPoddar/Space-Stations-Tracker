import React from "react";
import { useSelector } from "react-redux";
import Calculation from "./Calculation";

const CalculationList = () => {
  const satellite = useSelector((state) => state.coordinates);
  const renderedSats = satellite.map((sat) => (
    <Calculation satnumber={sat.id}></Calculation>
  ));

  return renderedSats;
};

export default CalculationList;
