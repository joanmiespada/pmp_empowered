FROM node:latest
# Create app directory
WORKDIR /usr/src/app

ENV NODE_ENV production

#RUN npm install -g yarn

COPY ./package.docker.json ./package.json

#RUN yarn install --ignore-engines
RUN npm install --production

COPY ./build/api.login.js ./
COPY ./build/api.login.js.map ./
COPY ./build/apicert.pem ./

#RUN ls -la

EXPOSE 80

CMD ["node", "./api.login.js"]
#RUN npm run serve-prod

# docker build -t joanmi/apis .
# docker run -p 49160:80 -d joanmi/apis
# docker exec -it e3e6848020dc  /bin/bash