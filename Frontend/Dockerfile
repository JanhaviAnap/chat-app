# Step 1: Build the application
FROM node:18

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev","--","--host"]
