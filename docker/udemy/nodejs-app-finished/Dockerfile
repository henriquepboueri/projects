FROM node:12

WORKDIR /app

# se mudar, o restante das instruções será executado
COPY package.json /app

#só será executado se alguma instrução anterior tiver um hash diferente do cache
RUN npm install

COPY . /app

EXPOSE 80

CMD ["node", "server.js"]