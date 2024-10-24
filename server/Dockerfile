FROM node:18.20.2-alpine

WORKDIR /usr/src/movies-app/server

COPY package*.json .

RUN npm config set strict-ssl false

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]