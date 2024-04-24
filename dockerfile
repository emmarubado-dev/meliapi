<<<<<<< HEAD
FROM node:21-alpine

#WORKDIR /usr/src/app
WORKDIR /app

COPY package.json ./
#COPY ./package.json ./package.json
#RUN npm install --force --global package.json
RUN yarn install && yarn cache clean

COPY . .

EXPOSE 8080

=======
FROM node:21-alpine

#WORKDIR /usr/src/app
WORKDIR /app

COPY package.json ./
#COPY ./package.json ./package.json
#RUN npm install --force --global package.json
RUN yarn install && yarn cache clean

COPY . .

EXPOSE 8080

>>>>>>> 29788ee1b40246b45e1fbd51d270df9a8cf8fcf2
#CMD [ "yarn", "run", "start"]