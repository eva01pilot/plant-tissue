from typing import Union

from fastapi import FastAPI
from mendeleev import mendeleev
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from chempy import Substance

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




