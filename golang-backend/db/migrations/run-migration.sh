if [ $1 == "up" ]
then migrate -path ~/app/golang-backend/db/migrations/ -database "postgres://postgres:32143678@80.87.106.181:5432/plant-tissue-v2?sslmode=disable" -verbose up $2
fi

if [ $1 == "down" ]
then migrate -path . -database "postgres://postgres:32143678@80.87.106.181:5432/plant-tissue-v2?sslmode=disable" -verbose down $2
fi

if [ $1 == "force" ]
then migrate -path . -database "postgres://postgres:32143678@80.87.106.181:5432/plant-tissue-v2?sslmode=disable" force $2
fi


if [ $1 == "version" ]
then migrate -path . -database "postgres://postgres:32143678@80.87.106.181:5432/plant-tissue-v2?sslmode=disable" version
fi


if [ $1 == "create" ]
then migrate create -dir . -seq -ext sql $2
fi
