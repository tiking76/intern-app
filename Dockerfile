FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npx","webpack"]
RUN chmod -R 777 ./
EXPOSE 3000
CMD ["npm", "start"]
