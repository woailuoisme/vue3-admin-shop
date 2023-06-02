# stage1 as builder
FROM node:18-alpine as builder

WORKDIR /app

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the files
COPY . .

# Build the project
RUN npm run build


FROM nginx:1.25-alpine as production-build
COPY nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /var/www/html/*

# Copy from the stahg 1
COPY --from=builder /vue-ui/dist /var/www/html

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]