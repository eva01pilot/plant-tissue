import subprocess
import sys
import os
os.system('pip install chemformula mendeleev')
from chemformula import ChemFormula
from mendeleev import mendeleev

def main():
    formula = sys.argv[1]
    print(formula)
    element = ChemFormula(formula)
    elementsDict = dict()
    for key, value in element.element.items():
        elementsDict[key] = {
            "element":mendeleev.element(key),
            "quantity":value
        }
    return elementsDict


main()
sys.stdout.flush()
