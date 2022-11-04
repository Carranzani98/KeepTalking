FROM node:alpine AS builder

WORKDIR /app/frontend

COPY . .

RUN npm install && \
    npm run build

FROM nginx:alpine

COPY --from=builder /app/frontend/dist/* /usr/share/nginx/html/

COPY --from=builder /app/frontend/config/default.conf /etc/nginx/conf.d/default.conf