import React, { useState } from "react";

const AddSatellite = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);

  return (
    <section>
      <h2>Add A new Satellite to track</h2>
      <form>
        <label>Satellite number</label>
        <input
          type="text"
          id="SatNo"
          name="SatNo"
          value={title}
          onChange={onTitleChanged}
        />

        <button type="button">Whooooosh</button>
      </form>
    </section>
  );
};

export default AddSatellite;
