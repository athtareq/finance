import React, { useState } from "react";
import { calcul_rendement_actifs } from "../api/api";
import Button from "../components/Button";
import MultipleSelectChip from "../components/cmp/MultipleSelectChip";
import "../components/styles/info.css";
import { actifs } from "../data/actif";
import { MobileDatePicker } from "@mui/lab";
import { TextField } from "@mui/material";
import { actifs2 } from "../data/actif";
import "../components/styles/info.css";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Dataframe from "../components/cmp/Dataframe";

export default function Rendement() {
  const [data, setdata] = useState(null);
  const [dateDebutVal, setdateDebutVal] = useState("2022-05-17");
  const [dateDebut, setdateDebut] = useState(new Date());
  const [dateFinVal, setdateFinVal] = useState("2022-05-17");
  const [dateFin, setdateFin] = useState(new Date());
  const [indices, setindices] = useState(null);
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
      <MultipleSelectChip
        names={actifs2}
        setIndices={(val) => setindices(val)}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDatePicker
          label="Date de debut"
          inputFormat="yyyy/MM/dd"
          value={dateDebut}
          onChange={handleChangedateDebut}
          renderInput={(params) => <TextField className="date" {...params} />}
        />
        <MobileDatePicker
          label="Date de fin"
          inputFormat="yyyy/MM/dd"
          value={dateFin}
          onChange={handleChangedateFin}
          renderInput={(params) => <TextField className="date" {...params} />}
        />
      </LocalizationProvider>
      <Button
        name="importer"
        onClick={() => {
          calcul_rendement_actifs(actifs,'Cumulatif',dateDebut,dateFin).then((res) => {
            setdata(res);
          });
        }}
      />
      <Dataframe data={data} />
    </div>
  );
}
