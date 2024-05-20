FROM python:3.9 as base
WORKDIR /app

COPY . .
RUN pip install -r requirements.txt

EXPOSE 4000/tcp

CMD [ "uvicorn", "main:app", "--port=4000", "--host=0.0.0.0" ]
