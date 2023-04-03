FROM node:alpine
WORKDIR /app
COPY ./ ./
RUN npm i
RUN npm install -g json-server
CMD json-server -H 0.0.0.0 -p 2999 info.json & npm run start