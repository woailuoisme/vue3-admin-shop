# stage1 as builder
FROM node:18-alpine as builder

FROM nginx:1.25-alpine
COPY nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /var/www/html/*

# Copy from the stahg 1
COPY ./dist /var/www/html/

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]