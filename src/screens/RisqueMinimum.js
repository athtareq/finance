import { TextField } from "@mui/material";
import React, { useState } from "react";
import { actifs } from "../data/actif";
import Button from "../components/Button";
import "../components/styles/info.css";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { MobileDatePicker } from "@mui/lab";
import { Portefeuille_Minim_Risk_Limite} from "../api/api";
import MultiCheckbox from "../components/cmp/MultiCheckbox";
import Dataframe from "../components/cmp/Dataframe";

const dataCheckbox = [
  0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
];

export default function RisqueMinimum() {
  const [indices, setindices] = React.useState("");
  const [indice, setprice] = React.useState([]);
  const [dateDebutVal, setdateDebutVal] = useState("2022-05-17");
  const [dateDebut, setdateDebut] = useState(new Date());
  const [dateFinVal, setdateFinVal] = useState("2022-05-17");
  const [dateFin, setdateFin] = useState(new Date());
  const [data, setdata] = useState(null);
  const handleChange = (event) => {
    setprice(event.target.value);
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
        value={indice}
        type="number"
        onChange={handleChange}
        className="date"
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      </LocalizationProvider>
      <MultiCheckbox
        dataCheckbox={dataCheckbox}
        onSelect={(val) => setindices(val)}
      />
      <Button
        onClick={() => {
          Portefeuille_Minim_Risk_Limite(indices, indice).then((res) => {
            setdata(res);
          });
        }}
        name="importer"
      />
      <Dataframe data={data} />
    </div>
  );
}
