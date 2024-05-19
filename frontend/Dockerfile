FROM node:22-alpine3.18 as base

WORKDIR /var/www/ilyadev.com/plant-tissue/frontend

RUN apk update && apk upgrade
RUN apk add git

COPY ./package*.json /var/www/ilyadev.com/plant-tissue/frontend


RUN npm install && npm cache clean --force

COPY . .

ENV PATH ./node_modules/.bin/:$PATH


EXPOSE 8000/tcp
EXPOSE 24678

FROM base AS dev
CMD npm run dev

FROM base AS prod
RUN npx nuxi generate
