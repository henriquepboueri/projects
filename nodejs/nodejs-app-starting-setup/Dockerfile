FROM node

WORKDIR /app

COPY package.json /app

# will only run if package.json is modified (hence copied)
RUN npm install

COPY . /app
# COPY . ./

#optional, but recommended  
EXPOSE 80

# executa quando o container é executado
CMD ["node", "server.js"]

