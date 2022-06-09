import { TextField } from "@mui/material";
import React, { useState } from "react";
import Button from "../components/Button";
import "../components/styles/info.css";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { MobileDatePicker } from "@mui/lab";
import { niveau_var_v,niveau_var_b } from "../api/api";
import Dataframe from "../components/cmp/Dataframe";


export default function NivVar() {
  const [indices, setindices] = React.useState("");
  const [nominal, setprice] = React.useState("");
  const [niveau, setprice2] = React.useState("");
  const [periode, setprice3] = React.useState("");
  const [taux, setprice4] = React.useState("");
  const [dateDebutVal, setdateDebutVal] = useState("2022-05-17");
  const [dateDebut, setdateDebut] = useState(new Date());
  const [dateFinVal, setdateFinVal] = useState("2022-05-17");
  const [dateFin, setdateFin] = useState(new Date());
  const [data, setdata] = useState(null);
  const [rf, setprices] = React.useState("0")
  const handleChange = (event) => {
    setprice(event.target.value);
  };
  const handleChange2 = (event) => {
    setprice2(event.target.value);
  };
  const handleChange3 = (event) => {
    setprice3(event.target.value);
  };
  const handleChange4 = (event) => {
    setprice4(event.target.value);
  };
  const handleChanges = (event) => {
    setprices(event.target.value);
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
        label="Nominal"
        value={nominal}
        type="number"
        onChange={handleChange}
        className="date"
      />
      <TextField
        id="outlined"
        label="Niveau"
        value={niveau}
        type="number"
        onChange={handleChange2}
        className="date"
      />
      <TextField
        id="outlined"
        label="Periode"
        value={periode}
        type="number"
        onChange={handleChange3}
        className="date"
      />
      <TextField
        id="outlined"
        label="Taux sans risque"
        value={taux}
        type="number"
        onChange={handleChange4}
        className="date"
      />

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDatePicker
          label="Date backtest"
          inputFormat="yyyy/MM/dd"
          value={dateDebut}
          onChange={handleChangedateDebut}
          renderInput={(params) => <TextField className="date1" {...params} />}
        />
        <MobileDatePicker
          label="Date fin"
          inputFormat="yyyy/MM/dd"
          value={dateFin}
          onChange={handleChangedateFin}
          renderInput={(params) => <TextField className="date1" {...params} />}
        />
      </LocalizationProvider>
      <Button
        onClick={() => {
          niveau_var_v(dateDebut,periode,nominal,niveau,taux).then((res) => {
            setdata(res);
          });
        }}
        name="importer"
        />
        <Button
        onClick={() => {
          niveau_var_b(dateDebut,dateFin,periode,nominal,niveau,taux).then((res) => {
            setdata(res);
          });
        }}
        name="Backtest"
        />
      <Dataframe data={data} />
    </div>
  );
}
