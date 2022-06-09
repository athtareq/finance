import React, { useState } from "react";
import Button from "../components/Button";
import Combox from "../components/cmp/Combox";
import "../components/styles/info.css";
import { actifs2 } from "../data/actif.js";
import { plot_actif_line } from "../api/api";

export default function Visualisation() {
  const [data, setdata] = useState(null);
  const [indice, setindice] = useState(null);
  return (
    <div className="info">
      <Combox
        onChange={(val) => {
          setindice(val);
        }}
        name="Choisir l'indice"
        data={actifs2}
      />
      <Button
        name="PLot"
        onClick={() => {
          plot_actif_line(indice).then((res) => {
            setdata(res);
          });
        }}
      />
      <img
        style={{
          height: 300,
        }}
        src={"data:image/png;base64," + data}
        alt=""
      />
    </div>
  );
}
