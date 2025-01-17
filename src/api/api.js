import axios from "axios";
const API = "http://127.0.0.1:5000";
export async function getInfo(actif, option) {
  try {
    const response = await axios.get(
      `${API}/info?actif=${actif}&option=${option}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getIndice(indice) {
  try {
    const response = await axios.get(`${API}/indice?indice=${indice}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getIndicatorDeLiquidity(
  actif_name,
  option,
  date_deb,
  date_fin
) {
  try {
    const response = await axios.get(
      `${API}/indicator_de_liquidity?actif_name=${actif_name}&option=${option}&date_deb=${date_deb}&date_fin=${date_fin}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function PlotIndicateurDrawdown(actif_name, tp) {
  try {
    const response = await axios.post(`${API}/plot_indicateur_drawdown`, {
      actif_name,
      tp,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function plot_actif_line(actif_name) {
  try {
    const response = await axios.post(`${API}/plot_actif_line`, {
      actif_name,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function RisqueActif(actif_name, date_debut, date_fin) {
  try {
    const response = await axios.post(`${API}/risque_actif`, {
      actif_name,
      date_debut,
      date_fin,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getRiskMinim(nb, vect) {
  try {
    const response = await axios.post(`${API}/riskMinim`, {
      nb,
      vect,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function PlotIndicateurMA(actif_name, longueur) {
  try {
    const response = await axios.post(`${API}/plot_indicateur_ma`, {
      actif_name,
      longueur,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function CombinaisonIndicateurs(
  actif_name,
  cible_indicateur,
  longueur_MA
) {
  try {
    const response = await axios.post(`${API}/combinaison_indicateurs`, {
      actif_name,
      cible_indicateur,
      longueur_MA,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function calcul_rendement_actifs(
  actif_name,
  tp2,
  date_debut,
  date_fin
) {
  try {
    const response = await axios.post(`${API}/calcul_rendement_actifs`, {
      actif_name,
      tp2,
      date_debut,
      date_fin,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function PlotHistogramme(actif_name) {
  try {
    const response = await axios.get(
      `${API}/plot_histogramme?actif_name=${actif_name}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function CovarianceMatrice(actif_name, date_debut, date_fin, val) {
  try {
    const response = await axios.post(`${API}/covariance_matrice`, {
      actif_name,
      date_debut,
      date_fin,
      val,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function Portefeuille_Risk_Minimum() {
  try {
    const response = await axios.post(`${API}/portefeuille_Risk_Minimum`, {});
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function Portefeuille_Risk_Minim_Esper(
  e0,  
) {
  try {
    const response = await axios.post(`${API}/portefeuille_Risk_Minim_Esper`, {
      e0,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function Return_Risque_Frontière_Effic(
  actif_name,
  cours_cible,
  e0,
  date_debut,
  date_fin
) {
  try {
    const response = await axios.post(`${API}/return_Risque_Frontière_Effic`, {
      actif_name,
      cours_cible,
      e0,
      date_debut,
      date_fin,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function Portefeuille_Esper_Minimum(
  actif_name,
  cours_cible,
  date_debut,
  date_fin
) {
  try {
    const response = await axios.post(`${API}/portefeuille_Esper_Minimum`, {
      actif_name,
      cours_cible,
      date_debut,
      date_fin,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function Plot_Front_Effic() {
  try {
    const response = await axios.post(`${API}/plot_Front_Effic`, {});
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getPortOpti2(nb1, nb2, nb3) {
  try {
    const response = await axios.post(`${API}/portOpti2`, {
      nb1,
      nb2,
      nb3,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function Portefeuille_Tangeant(  
  e0,
  rf,  
) {
  try {
    const response = await axios.post(`${API}/portefeuille_Tangeant`, {
      
      e0,
      rf,
      
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function Portefeuille_Minim_Risk_Limite(
  u,
  limit,

) {
  try {
    const response = await axios.post(`${API}/portefeuille_Minim_Risk_Limite`, {
      u,
      limit,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function Portefeuille_Minim_Risk_Limite_Esper(
  indices,
  indice,
  indice2,  
) {
  try {
    const response = await axios.post(
      `${API}/portefeuille_Minim_Risk_Limite_Esper`,
      {
        indices,
        indice,
        indice2,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function Portefeuille_Constitution(
  window,
  Nominal,
  Niveau
) {
  try {
    const response = await axios.post(`${API}/portefeuille_Constitution`, {
      window,
      Nominal,
      Niveau,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function Strat(
  actif_name,
  date_debut_data,
  date_fin_data,
  cours_cible,
  Nominal,
  Niveau,
  window
) {
  try {
    const response = await axios.post(`${API}/strat`, {
      actif_name,
      date_debut_data,
      date_fin_data,
      cours_cible,
      Nominal,
      Niveau,
      window,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function Portefeuille_Constitution_OPCVM(
  actif_name,
  date_backtest,
  periode_volume,
  cours_cible,
  Nominal,
  Niveau,
  rr
) {
  try {
    const response = await axios.post(
      `${API}/portefeuille_Constitution_OPCVM`,
      {
        actif_name,
        date_backtest,
        periode_volume,
        cours_cible,
        Nominal,
        Niveau,
        rr,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function portefeuille_Constitution_OPCVM_test(
  actif_name,
  date_backtest,
  periode_volume,
  cours_cible,
  Nominal,
  Niveau,
  rr
) {
  try {
    const response = await axios.post(
      `${API}/portefeuille_Constitution_OPCVM_test`,
      {
        actif_name,
        date_backtest,
        periode_volume,
        cours_cible,
        Nominal,
        Niveau,
        rr,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function niveau_fixe_v(
  dateDebut,
  periode,
  Nominal,
  Niveau,
  taux
) {
  try {
    const response = await axios.post(`${API}/niveau_fixe_v`, {
      dateDebut,
      periode,
      Nominal,
      Niveau,
      taux,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function niveau_fixe_b(
  dateFin,dateDebut,periode,Nominal,Niveau,taux,
) {
  try {
    const response = await axios.post(`${API}/niveau_fixe_b`, {
      dateFin,dateDebut,periode,Nominal,Niveau,taux,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function niveau_var_v(
  dateDebut,periode,Nominal,Niveau,taux,
) {
  try {
    const response = await axios.post(`${API}/niveau_var_v`, {
      dateDebut,periode,Nominal,Niveau,taux,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function niveau_var_b(
  dateFin,dateDebut,periode,Nominal,Niveau,taux,
) {
  try {
    const response = await axios.post(`${API}/niveau_var_b`, {
      dateFin,dateDebut,periode,Nominal,Niveau,taux,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function montecarlo(dateFin,dateDebut,periode,Nominal,Niveau,taux,imin,imax) {
  try {
    const response = await axios.post(`${API}/montecarlo`, {
      dateFin,dateDebut,periode,Nominal,Niveau,taux,imin,imax
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}



export async function OPCVM_CHOIX(
  Nominal,
  actif_name,
  periode,
  date_backtest,
  cours_cible,
  taux
) {
  try {
    const response = await axios.post(`${API}/oPCVM_CHOIX`, {
      Nominal,
      actif_name,
      periode,
      date_backtest,
      cours_cible,
      taux,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function Monte_Carlo(
  Nominal,
  actif_name,
  periode,
  date_backtest,
  date_finale,
  cours_cible,
  taux,
  a,
  b,
  MSI
) {
  try {
    const response = await axios.post(`${API}/monte_Carlo`, {
      Nominal,
      actif_name,
      periode,
      date_backtest,
      date_finale,
      cours_cible,
      taux,
      a,
      b,
      MSI,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function OPCVM_FINALE(
  actif_name,
  date_backtest,
  date_fin_data,
  periode,
  cours_cible,
  taux,
  MSI
) {
  try {
    const response = await axios.post(`${API}/oPCVM_FINALE`, {
      actif_name,
      date_backtest,
      date_fin_data,
      periode,
      cours_cible,
      taux,
      MSI,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
