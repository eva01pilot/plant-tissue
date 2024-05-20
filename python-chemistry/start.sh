source ./.venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port=4000 --host=0.0.0.0
