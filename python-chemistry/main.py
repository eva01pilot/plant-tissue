from typing import Union

from fastapi import FastAPI, Response
from mendeleev import mendeleev
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from chempy import Substance
from mendeleev.fetch import fetch_table

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
    print(elementsDict)
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



