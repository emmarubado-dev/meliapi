FROM node:21-alpine

#WORKDIR /usr/src/app
WORKDIR /app

COPY package.json ./
#COPY ./package.json ./package.json
#RUN npm install --force --global package.json
RUN yarn install && yarn cache clean

COPY . .

EXPOSE 8080

#CMD [ "yarn", "run", "start"]