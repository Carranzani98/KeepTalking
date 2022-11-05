FROM node:alpine AS builder

WORKDIR /app/frontend

COPY . .

RUN npm install

EXPOSE 3000
CMD npm start
