 FROM node:18-alpine
#FROM node:18-bullseye

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 80

CMD ["node", "server/server.js"]
