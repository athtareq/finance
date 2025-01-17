from flask import Flask, request
import BVCscrap as load
import numpy as np
import pandas as pd
from sqlalchemy import JSON
from flask_jsonpify import jsonpify
from flask_cors import CORS
import matplotlib.pyplot as plt
import plotly.express as px
import statistics as cs
from pandas.plotting import scatter_matrix
from numpy.linalg import inv
import io
import base64
import json 

from functions import getCombinaisaon, getCovMat, getDrawDown, getFrontEffic, getIndicatorDeLiquidity, getIndice, getInfo, getMonteCarlo, getNivFixeB, getNivFixeV, getNivVar, getNivVarB, getPlotIndicateurMa, getPortMarch, getPortOpti1, getPortOpti2, getPortRiskEsp, getPortefeuilleRiskMinimum, getRendement, getRendementHist, getRiskMinim, getRisqueActif, getVisualisation


load.getIntraday('CIH')
load.notation()


app = Flask(__name__)

CORS(app)

cors = CORS(app, resource={
    r"/*": {
        "origins": "*"
    }
})


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route('/info')
def info():
    actif = request.args.get('actif')
    option = request.args.get('option')
    print(option)
    if option == 'Plus forte hausse' or option == 'Plus forte baisse':
        return json.dumps(getInfo(actif, option)) 
    elif option in ["Intraday","Donnee seance precedente","Dernieres tansaction","Ratio"]:
        return getInfo(actif, option).to_json()
    else:   
        return json.dumps(getInfo(actif, option).tolist())    

@app.route('/indice')
def indice():
    indice = request.args.get('indice')
    print(indice)
    result = getIndice(indice)
    print('type: ',type(result))
    if indice=="Resume des indices" or indice == "Ponderations":
        return result.to_json()
    else : 
        return json.dumps(result)


@app.route('/indicator_de_liquidity', methods=['POST', 'GET'])
def indicator_de_liquidity():
    actif_name = request.args.get('actif_name')
    option = request.args.get('option')
    pt = request.args.get('pt')
    date_deb = request.args.get('date_deb')
    date_fin = request.args.get('date_fin')
    result=getIndicatorDeLiquidity(actif_name, option, date_deb[0:10], date_fin[0:10])
    data2 = {option: [result]   } 
    df2 = pd.DataFrame(data2)  
    return  df2.to_json()

@app.route('/plot_actif_line', methods=['POST', 'GET'])
def plot_actif_line():
    data = request.get_json()
    actif_name = data.get('actif_name')
    plt1 = getVisualisation(actif_name)
    my_stringIObytes = io.BytesIO()
    plt1.figure.savefig(my_stringIObytes, format='jpg')
    my_stringIObytes.seek(0)
    my_base64_jpgData = base64.b64encode(my_stringIObytes.read())
    # hada dial button li f Visualisation.js
    return my_base64_jpgData


@app.route('/plot_indicateur_ma', methods=['POST', 'GET'])
def plot_indicateur_ma():
    data = request.get_json()
    longueur = data.get('longueur')
    actif_name = data.get('actif_name')
    plt1 = getPlotIndicateurMa(actif_name, longueur)
    my_stringIObytes = io.BytesIO()
    plt1.figure.savefig(my_stringIObytes, format='jpg')
    my_stringIObytes.seek(0)
    my_base64_jpgData = base64.b64encode(my_stringIObytes.read())
    return my_base64_jpgData


@app.route('/plot_indicateur_drawdown', methods=['POST', 'GET'])
def plot_indicateur_drawdown():
    data = request.get_json()
    tp = data.get('tp')
    actif_name = data.get('actif_name')
    plt1 = getDrawDown(actif_name, tp)
    my_stringIObytes = io.BytesIO()
    plt1.figure.savefig(my_stringIObytes, format='jpg')
    my_stringIObytes.seek(0)
    my_base64_jpgData = base64.b64encode(my_stringIObytes.read())
    return my_base64_jpgData


@app.route('/combinaison_indicateurs', methods=['POST', 'GET'])
def combinaison_indicateurs():
    data = request.get_json()
    actif_name = data.get('actif_name')  # actif_name liste hna
    cible_indicateur = data.get('cible_indicateur')
    longueur_MA = data.get('longueur_MA')
    plt1 = getCombinaisaon(actif_name, cible_indicateur, longueur_MA)
    my_stringIObytes = io.BytesIO()
    plt1.figure.savefig(my_stringIObytes, format='jpg')
    my_stringIObytes.seek(0)
    my_base64_jpgData = base64.b64encode(my_stringIObytes.read())
    return my_base64_jpgData


@app.route('/calcul_rendement_actifs', methods=['POST', 'GET'])
def calcul_rendement_actifs():
    data = request.get_json()
    actif_name = data.get('actif')  # actif_name liste hna
    # dir dik TP2 wahd dropdown list fiha ya 'Cumulatif' ya 'Quotidien'
    tp2 = data.get('tp2')
    date_debut = data.get('date_debut')
    date_fin = data.get('date_fin')
    actif_name=['Attijari','BOA','Snep']
    plt1 = getRendement(actif_name, '2020-10-10', '2022-01-01','Quotidien')
    return plt1.to_json()
    # my_stringIObytes = io.BytesIO()
    # plt1.figure.savefig(my_stringIObytes, format='jpg')
    # my_stringIObytes.seek(0)
    # my_base64_jpgData = base64.b64encode(my_stringIObytes.read())
    # return my_base64_jpgData.to_json()


@app.route('/plot_histogramme', methods=['POST', 'GET'])
def plot_histogramme():
    actif_name = request.args.get('actif_name')
    plt1 = getRendementHist(actif_name)
    my_stringIObytes = io.BytesIO()
    plt1.figure.savefig(my_stringIObytes, format='jpg')
    print(plt1)

    my_stringIObytes.seek(0)
    my_base64_jpgData = base64.b64encode(my_stringIObytes.read())
    return my_base64_jpgData


@app.route('/risque_actif', methods=['POST', 'GET'])
def risque_actif():
    data = request.get_json()
    actif_name = data.get('actif_name')
    date_debut = data.get('date_debut')
    date_fin = data.get('date_fin')
    plt1 = getRisqueActif(actif_name, date_debut, date_fin)
    # my_stringIObytes = io.BytesIO()
    # plt1.figure.savefig(my_stringIObytes, format='jpg')
    # my_stringIObytes.seek(0)
    # my_base64_jpgData = base64.b64encode(my_stringIObytes.read())
    return plt1


@app.route('/covariance_matrice', methods=['POST', 'GET'])
def covariance_matrice():
    data = request.get_json()
    actif_name = data.get('actif_name')  # liste
    date_debut = data.get('date_debut')
    date_fin = data.get('date_fin')
    val = data.get('val')
    # val: wahd dropdown list smitha Plot fiha Oui ola Non
    plt1 = getCovMat(actif_name, date_debut, date_fin,
                     val)  # val: see comment above
    # fl cas dial val==Non rah katrj3 dataframe
    # fl cas dial val==Oui rah katrj3 plot
    # capice ?
    if val == 'Oui':
        # my_stringIObytes = io.BytesIO()
        # plt1.figure.savefig(my_stringIObytes, format='jpg')
        # my_stringIObytes.seek(0)
        return json.dumps(plt1.tolist())
    else: return plt1.to_json()



@app.route('/portefeuille_Risk_Minimum', methods=['POST', 'GET'])
def portefeuille_Risk_Minimum():
    plt1 = getPortefeuilleRiskMinimum()
    return plt1.to_json()


@app.route('/portefeuille_Risk_Minim_Esper', methods=['POST', 'GET'])
def portefeuille_Risk_Minim_Esper():
    data = request.get_json()
    e0 = data.get('e0')
    plt1 = getPortRiskEsp(e0)
    return plt1.to_json()


@app.route('/return_Risque_Frontière_Effic', methods=['POST', 'GET'])
def return_Risque_Frontière_Effic():
    data = request.get_json()
    actif_name = data.get('actif_name')
    cours_cible = data.get('cours_cible')
    e0 = data.get('e0')
    date_debut = data.get('date_debut')
    date_fin = data.get('date_fin')
    plt1 = getFrontEffic()  # hada plot
    print(plt1)
    # my_stringIObytes = io.BytesIO()
    # plt1.figure.savefig(my_stringIObytes, format='jpg')
    # my_stringIObytes.seek(0)
    # my_base64_jpgData = base64.b64encode(my_stringIObytes.read())
    return plt1


@app.route('/portefeuille_Esper_Minimum', methods=['POST', 'GET'])
def portefeuille_Esper_Minimum():
    data = request.get_json()
    actif_name = data.get('actif_name')
    cours_cible = data.get('cours_cible')
    date_debut = data.get('date_debut')
    date_fin = data.get('date_fin')
    plt1 = getPortOpti1(
        actif_name, cours_cible,   date_debut, date_fin)
    print(plt1)
    # my_stringIObytes = io.BytesIO()
    # plt1.figure.savefig(my_stringIObytes, format='jpg')
    # my_stringIObytes.seek(0)
    # my_base64_jpgData = base64.b64encode(my_stringIObytes.read())
    return plt1


@app.route('/plot_Front_Effic', methods=['POST', 'GET'])
def plot_Front_Effic():
    data = request.get_json()

    plt1 = getFrontEffic(
    )
    print(plt1)
    # my_stringIObytes = io.BytesIO()
    # plt1.figure.savefig(my_stringIObytes, format='jpg')
    # my_stringIObytes.seek(0)
    # my_base64_jpgData = base64.b64encode(my_stringIObytes.read())
    return plt1


@app.route('/portefeuille_Tangeant', methods=['POST', 'GET'])
def portefeuille_Tangeant():
    data = request.get_json()
    actif_name = data.get('actif_name')
    cours_cible = data.get('cours_cible')
    e0 = data.get('e0')
    rf = data.get('rf')
    date_debut = data.get('date_debut')
    date_fin = data.get('date_fin')
    plt1 = getPortMarch(e0, rf)
    # my_stringIObytes = io.BytesIO()
    # plt1.figure.savefig(my_stringIObytes, format='jpg')
    # my_stringIObytes.seek(0)
    # my_base64_jpgData = base64.b64encode(my_stringIObytes.read())
    return plt1.to_json()


@app.route('/portefeuille_Minim_Risk_Limite', methods=['POST', 'GET'])
def portefeuille_Minim_Risk_Limite():
    data = request.get_json()
    limit = data.get('limit')
    u = data.get('u')
    plt1 = getRiskMinim(limit, u)  # nm nombre ou u vecteur fih des 0 1
    print(plt1)
    # my_stringIObytes = io.BytesIO()
    # plt1.figure.savefig(my_stringIObytes, format='jpg')
    # my_stringIObytes.seek(0)
    # my_base64_jpgData = base64.b64encode(my_stringIObytes.read())
    return plt1.to_json()


@app.route('/portefeuille_Minim_Risk_Limite_Esper', methods=['POST', 'GET'])
def portefeuille_Minim_Risk_Limite_Esper():
    data = request.get_json()
    indice = data.get('indice')
    indice2 = data.get('indice2')    
    indices = data.get('indices')
    

    plt1 = getPortOpti1(indice, indice2, indices)
    print(plt1)
    # my_stringIObytes = io.BytesIO()
    # plt1.figure.savefig(my_stringIObytes, format='jpg')
    # my_stringIObytes.seek(0)
    # my_base64_jpgData = base64.b64encode(my_stringIObytes.read())
    return plt1.to_json()


@app.route('/portefeuille_Constitution', methods=['POST', 'GET'])
def portefeuille_Constitution():
    data = request.get_json()
    actif_name = data.get('actif_name')
    cours_cible = data.get('cours_cible')
    window = data.get('window')
    Nominal = data.get('Nominal')
    Niveau = data.get('Niveau')
    plt1 = getPortOpti2(window, Nominal, Niveau)
    print(plt1)
    # my_stringIObytes = io.BytesIO()
    # plt1.figure.savefig(my_stringIObytes, format='jpg')
    # my_stringIObytes.seek(0)
    # my_base64_jpgData = base64.b64encode(my_stringIObytes.read())
    return plt1.to_json()


@app.route('/riskMinim', methods=['POST', 'GET'])
def riskMinim():
    data = request.get_json()
    nb = data.get('nb')
    vect = data.get('vect')
    plt1 = getRiskMinim(nb, vect)
    # my_stringIObytes = io.BytesIO()
    # plt1.figure.savefig(my_stringIObytes, format='jpg')
    # my_stringIObytes.seek(0)
    # my_base64_jpgData = base64.b64encode(my_stringIObytes.read())
    return plt1


@app.route('/portOpti2', methods=['POST', 'GET'])
def portOpti2():
    data = request.get_json()
    nb1 = data.get('nb1')
    nb2 = data.get('nb2')
    nb3 = data.get('nb3')
    plt1 = getPortOpti2(nb1,nb2, nb3)
    # my_stringIObytes = io.BytesIO()
    # plt1.figure.savefig(my_stringIObytes, format='jpg')
    # my_stringIObytes.seek(0)
    # my_base64_jpgData = base64.b64encode(my_stringIObytes.read())
    return plt1


@app.route('/niveau_fixe_v', methods=['POST', 'GET'])
def niveau_fixe_v():
    # hadi dial onclick dl button Valdier f niveau_fixe
    data = request.get_json()
    dateDebut = data.get('dateDebut')
    periode = data.get('periode')
    nominal = data.get('Nominal')
    taux = data.get('taux')
    nominal = data.get('Nominal')
    niveau = data.get('Niveau')
    print('date debut',dateDebut)
    print('periode',periode)
    print('nominal',nominal)
    print('taux',taux)
    print('niveau',niveau)
    periode=int(periode)
    nominal=int(nominal)
    niveau=float(niveau)
    taux=float(taux)
    plt1 = getNivFixeV(dateDebut[0:10], periode, nominal, niveau, taux)
    return plt1.to_json()


@app.route('/niveau_fixe_b', methods=['POST', 'GET'])
def niveau_fixe_b():
    # hadi dial onclick dl button Backtest f niveau_fixe
    data = request.get_json()
    datef = data.get('dateFin')
    dateback = data.get('dateDebut')
    periode = data.get('periode')
    taux = data.get('taux')
    nominal = data.get('Nominal')
    niveau = data.get('Niveau')
    print('date debut',dateback)
    print('date fin',datef)
    print('periode',periode)
    print('nominal',nominal)
    print('taux',taux)
    print('niveau',niveau)
    periode=int(periode)
    nominal=int(nominal)
    niveau=float(niveau)
    taux=float(taux)
    plt1 = getNivFixeB(datef[0:10], dateback[0:10], periode, nominal, niveau, taux)

    print(plt1)
    # my_stringIObytes = io.BytesIO()
    # plt1.figure.savefig(my_stringIObytes, format='jpg')
    # my_stringIObytes.seek(0)
    # my_base64_jpgData = base64.b64encode(my_stringIObytes.read())
    return plt1.to_json()


@app.route('/niveau_var_v', methods=['POST', 'GET'])
def niveau_var_v():
    # hadi dial onclick dl button Valdier f niveau_var
    data = request.get_json()
    dateback = data.get('dateDebut')
    periode = data.get('periode')
    taux = data.get('taux')
    nominal = data.get('Nominal')
    niveau=np.array([1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
    for i in (range(len(niveau))):
        print(niveau[i])
    print('date debut',dateback)
    print('periode',periode)
    print('nominal',nominal)
    print('taux',taux)
    print('niveau',niveau)
    periode=int(periode)
    nominal=int(nominal)
    taux=float(taux)
    # had niveau ykon liste mn dropdown multichoix (ansift lik audio hsn)
    
    plt1 = getNivVar(dateback[0:10], periode, nominal, niveau, taux)

    print(plt1)
    # my_stringIObytes = io.BytesIO()
    # plt1.figure.savefig(my_stringIObytes, format='jpg')
    # my_stringIObytes.seek(0)
    # my_base64_jpgData = base64.b64encode(my_stringIObytes.read())
    return plt1.to_json()


@app.route('/niveau_var_b', methods=['POST', 'GET'])
def niveau_var_b():
    # hadi dial onclick dl button backtest f niveau_var
    data = request.get_json()
    datef = data.get('datef')
    dateback = data.get('dateback')
    periode = data.get('periode')
    taux = data.get('taux')
    nominal = data.get('Nominal')
    niveau = data.get('Niveau')
    plt1 = getNivVarB(datef[0:10], dateback, periode, nominal, niveau, taux)

    print(plt1)
    # my_stringIObytes = io.BytesIO()
    # plt1.figure.savefig(my_stringIObytes, format='jpg')
    # my_stringIObytes.seek(0)
    # my_base64_jpgData = base64.b64encode(my_stringIObytes.read())
    return plt1.to_json()


@app.route('/montecarlo', methods=['POST', 'GET'])
def montecarlo():
    # hadi dial onclick dl button backtest f niveau_var
    data = request.get_json()
    dateFin = data.get('dateFin')
    dateDebut = data.get('dateDebut')
    periode = data.get('periode')
    taux = data.get('taux')
    nominal = data.get('Nominal')
    niveau = data.get('Niveau')  # hna niveau ghir input wa7d: float
    imin = data.get('imin')
    # hado les intervalles min o max li kaydkhl l user fl interface
    imax = data.get('imax')
    print('date debut',dateDebut)
    print('date fin',dateFin)
    print('periode',periode)
    print('nominal',nominal)
    print('taux',taux)
    print('niveau',niveau)
    print('imin',imin)
    print('imax',imax)

    periode=int(periode)
    nominal=int(nominal)
    niveau=float(niveau)
    taux=float(taux)
    imin=float(imin)
    imax=float(imax)

    plt1 = getMonteCarlo(dateFin[0:10], dateDebut[0:10], periode,
                         nominal, niveau, taux, imin, imax)

    # my_stringIObytes = io.BytesIO()
    # plt1.figure.savefig(my_stringIObytes, format='jpg')
    # my_stringIObytes.seek(0)
    # my_base64_jpgData = base64.b64encode(my_stringIObytes.read())
    return plt1.to_json()
