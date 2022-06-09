import { TextField } from "@mui/material";
import React, { useState } from "react";
import { actifs } from "../data/actif";
import Button from "../components/Button";
import "../components/styles/info.css";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useNavigate } from "react-router-dom";

export default function OPCVMActions() {
  const [indices, setindices] = React.useState("");
  const [indice1, setindice1] = React.useState("");
  const [indice2, setindice2] = React.useState("");
  const [indice3, setindice3] = React.useState("");
  const [dateDebutVal, setdateDebutVal] = useState("2022-05-17");
  const [dateDebut, setdateDebut] = useState(new Date());
  const [dateFinVal, setdateFinVal] = useState("2022-05-17");
  const [dateFin, setdateFin] = useState(new Date());
  const [data, setdata] = useState(null);
  let navigate = useNavigate();

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
          navigate("/NivCost");
        }}
        name="Niveau fixe"
      />
      <Button
        onClick={() => {
          // CovarianceMatrice(indices, dateDebutVal, dateFinVal).then((res) => {
          //   setdata(res);
          // });
          navigate("/NivVar");
        }}
        name="Niveau variable"
      />
      <Button
        onClick={() => {
          // CovarianceMatrice(indices, dateDebutVal, dateFinVal).then((res) => {
          //   setdata(res);
          // });
          navigate("/StratCoursCible");
        }}
        name="Monte Carlo"
      />

    </div>
  );
}
