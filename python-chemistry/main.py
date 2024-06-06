
from fastapi import FastAPI, File, Response, UploadFile
from mendeleev import mendeleev
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from chempy import Substance
from mendeleev.fetch import fetch_table
import pandas as pd
from sqlalchemy.util import typing
import statsmodels.api as sm
import plotly.express as px
import plotly.io as pio
import plotly.graph_objects as go
import numpy as np

origins = [
    "https://api.ilyadev.com",
    "*"
]
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/get_formula_meta/{formula}")
def read_item(formula: str):
    chem_element = Substance.from_formula(formula)
    elementsDict = dict()
    if chem_element.composition == None:
        return
    for key, value in chem_element.composition.items():
        elementsDict[mendeleev.element(key).symbol] = {
            "element":{
                "atomic_weight":mendeleev.element(key).atomic_weight,
                "atomic_number":mendeleev.element(key).atomic_number
            },
            "quantity":value
        }
    print("hi hey ge")
    json_compatible_item_data = jsonable_encoder(elementsDict)
    return JSONResponse(content=json_compatible_item_data)


@app.get("/get_formula_meta_v2/{formula}")
def get_meta(formula: str):
    chem_element = Substance.from_formula(formula)
    elementsDict = list()
    if chem_element.composition == None:
        return
    for key, value in chem_element.composition.items():
        elementsDict.append({
            "sign": mendeleev.element(key).symbol,
            "quantity":value
        })
    print(elementsDict)
    json_compatible_item_data = jsonable_encoder(elementsDict)
    return JSONResponse(content=json_compatible_item_data)

@app.get("/elements/all")
def get_all():
    table = fetch_table("elements")
    elems = table[['symbol', 'atomic_number',
                   'atomic_weight', 'name']]
    elems = elems.rename(columns={"symbol":"sign" })
    return Response(elems.to_json(orient="records"), media_type="application/json")

@app.post("/analysis/{feature}")
def analyze(feature:str, dataset: UploadFile):
    df = csvToDf(dataset.file)
    dicti = analysis(feature, df)
    encoded = jsonable_encoder(dicti)
    return JSONResponse(content=encoded)

def csvToDf(buffer):
    df = pd.read_csv(buffer)
    return df

def analysis(param: str, df: pd.DataFrame):
    X = df.iloc[:, :-6]
    Y = df[param]

    X = sm.add_constant(X)

    # Создание модели и подгонка данных
    model = sm.OLS(Y, X).fit()

    # Получение результатов модели

    # Создание модели и подгонка данных
    model = sm.OLS(Y, X).fit()

    # Get the original column names from df, excluding the last 6
    df_excluded = (df[df.columns.difference(['plant_height', 'node_count',
                                               'chlorophyll_percent',
                                               'side_shoots_count',
                                               'reproduction_coefficient',
                                               'true_leaves_count'])])
    x_vars = df_excluded.columns
    print(x_vars, df.columns)
    graphs = []
    # Создание графика pairplot с линией тренда
    for id,col in enumerate(x_vars):

        fig = px.scatter(df, x=col, y=param, trendline="ols")
        if(id==0):
            graphs.append(fig.to_html(full_html=False,include_plotlyjs=False))
        else:
            graphs.append(fig.to_html(full_html=False,include_plotlyjs=False))

    corr_matrix = df.corr()

    fig = go.Figure()
    fig.add_trace(
        go.Heatmap(
            x = corr_matrix.columns,
            y = corr_matrix.index,
            z = np.array(corr_matrix),
            text=corr_matrix.values,
            texttemplate='%{text:.2f}'
        )
    )
    fig.show()

    return {
            "graphs": graphs,
            "summary": model.summary().as_html(),
            "heatmap": fig.to_html(full_html=False, include_plotlyjs=False)
    }


