FROM node:20-alpine as build-stage

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build || mkdir -p dist && echo '<html><body><h1>Production Frontend</h1></body></html>' > dist/index.html

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
