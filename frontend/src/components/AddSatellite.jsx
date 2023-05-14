import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { satAdded } from "../app/coordinates/coordinatesSlice";

const AddSatellite = () => {
  const [sat, setsat] = useState("");
  const dispatch = useDispatch();

  const onSatchanged = (e) => setsat(e.target.value);

  const submit = () => {
    if (sat) {
      dispatch(
        satAdded({
          id: sat,
          name: "BOOOOO",
        })
      );

      setsat("");
    }
  };

  return (
    <section>
      <h2>Add A new Satellite to track</h2>
      <form>
        <label>Satellite number</label>
        <input
          type="text"
          id="SatNo"
          name="SatNo"
          value={sat}
          onChange={onSatchanged}
        />

        <button type="button" onClick={submit}>
          Whooooosh
        </button>
      </form>
    </section>
  );
};

export default AddSatellite;
