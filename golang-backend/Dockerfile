FROM golang:latest
RUN go install github.com/cosmtrek/air@latest
WORKDIR /app
COPY . .
COPY .env /app/
ENTRYPOINT ["air"]
