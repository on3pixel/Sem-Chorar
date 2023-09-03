FROM node:18.16.1
WORKDIR /usr/src/app
COPY package*.json ./
COPY index.js ./
RUN npm install
ENV TZ America/Sao_Paulo
CMD [ "node", "index.js" ]
