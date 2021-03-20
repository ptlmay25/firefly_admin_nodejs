FROM node:10-alpine

WORKDIR /usr/backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "app.js"]
