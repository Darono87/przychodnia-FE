FROM node:14.15 as build

WORKDIR /app

COPY package*.json .
RUN yarn install

COPY . .
RUN yarn build

FROM nginx
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html
