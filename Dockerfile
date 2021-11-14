FROM node:14-alpine3.12

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 3000 1337

CMD [ "npm", "start" ]