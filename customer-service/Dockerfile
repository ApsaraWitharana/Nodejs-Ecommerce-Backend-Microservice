FROM node:20.11.0

LABEL authors="Sachini"

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["node", "server.js"]