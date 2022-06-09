import { TextField } from "@mui/material";
import React, { useState } from "react";
import Button from "../components/Button";
import "../components/styles/info.css";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { MobileDatePicker } from "@mui/lab";
import { Portefeuille_Risk_Minimum } from "../api/api";
import Dataframe from "../components/cmp/Dataframe";


export default function PortMark() {
  const [indices, setindices] = React.useState("");
  const [indice, setindice] = React.useState("");
  const [dateDebutVal, setdateDebutVal] = useState("2022-05-17");
  const [dateDebut, setdateDebut] = useState(new Date());
  const [dateFinVal, setdateFinVal] = useState("2022-05-17");
  const [dateFin, setdateFin] = useState(new Date());
  const [data, setdata] = useState(null);
  const [e0, setprice] = React.useState("0")
  const [rf, setprices] = React.useState("0")
  const handleChange = (event) => {
    setprice(event.target.value);
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
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      </LocalizationProvider>
      <Button
        onClick={() => {
          Portefeuille_Risk_Minimum().then((res) => {
            setdata(res);
          });
        }}
        name="importer"
        />
      <Dataframe data={data} />
    </div>
  );
}
