import React, { useState } from "react";
import { getInfo } from "../api/api";
import { actifs } from "../data/actif";
import Button from "../components/Button";
import Combox from "../components/cmp/Combox";
import Dataframe from "../components/cmp/Dataframe";
import "../components/styles/info.css";
const listButtonText = [
  "Intraday",
  "Meilleure limite",
  "Données seance",
  "Donnee seance precedente",
  "Dernieres tansaction",
  "Info societe",
  "Plus forte hausse",
  "Plus forte baisse",
  "Actionnaires",
  "Ratio",
  "Chiffres cles",
  "Seance precedente",
]

export default function Info() {
  const [data, setdata] = useState(null);
  const [actif, setactif] = useState("");
  const [option, setoption] = useState("");

  return (
    <div className="info">
      <Combox
        name="Selectionner votre actif "
        onChange={(val) => {
          setactif(val);
        }}
        data={actifs}
      />
      <div className="imp">
        <Combox
          name="Selectionner votre option"
          onChange={(val) => {
            setoption(val);
          }}
          data={listButtonText}
        />
      </div>
      <Button
        name="importer"
        onClick={() => {
          getInfo(actif, option).then((res) => {
            setdata(res);
          });
        }}
      />
      <Dataframe data={data} />
    </div>
  );
}
