import { TextField } from "@mui/material";
import React, { useState } from "react";
import { actifs } from "../data/actif";
import Button from "../components/Button";
import "../components/styles/info.css";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { MobileDatePicker } from "@mui/lab";
import { Portefeuille_Constitution } from "../api/api";
import Dataframe from "../components/cmp/Dataframe";


export default function PortOpti3() {
  const [indices, setindices] = React.useState("");
  const [indice1, setindice1] = React.useState("");
  const [indice2, setindice2] = React.useState("");
  const [indice3, setindice3] = React.useState("");
  const [dateDebutVal, setdateDebutVal] = useState("2022-05-17");
  const [dateDebut, setdateDebut] = useState(new Date());
  const [dateFinVal, setdateFinVal] = useState("2022-05-17");
  const [dateFin, setdateFin] = useState(new Date());
  const [data, setdata] = useState(null);
  const handleChange = (event) => {
    setindice1(event.target.value);
  };
  const handleChange2 = (event) => {
    setindice2(event.target.value);
  };
  const handleChange3 = (event) => {
    setindice3(event.target.value);
  };

  const handleChangedateDebut = (newValue) => {
    setdateDebut(newValue);
    setdateDebutVal(
      `${newValue.getFullYear()}-${String(newValue.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(newValue.getDate() + 1).padStart(2, "0")}`
    );
  };
  const handleChangedateFin = (newValue) => {
    setdateFin(newValue);
    setdateFinVal(
      `${newValue.getFullYear()}-${String(newValue.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(newValue.getDate() + 1).padStart(2, "0")}`
    );
  };
  return (
    <div className="info">
      <TextField
        id="outlined-name"
        label="Prix de transaction"
        value={indice1}
        type="number"
        onChange={handleChange}
        className="date"
      />
      <TextField
        id="outlined-name"
        label="window"
        value={indice2}
        type="number"
        onChange={handleChange2}
        className="date"
      />
      <TextField
        id="outlined-name"
        label="Taux de risque"
        value={indice3}
        type="number"
        onChange={handleChange3}
        className="date"
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      </LocalizationProvider>
      <Button
        onClick={() => {
          Portefeuille_Constitution(indice1, indice2, indice3).then((res) => {
            setdata(res);
          });
        }}
        name="Backtest"
      />
      <Dataframe data={data} />
    </div>
  );
}
