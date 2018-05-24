FROM node:latest
# Create app directory
WORKDIR /usr/src/app

COPY ./build/api.login.js ./

COPY ./apicert.pem ./

EXPOSE 8080

CMD ["node", "./api.login.js"]
