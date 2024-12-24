FROM node:alpine

WORKDIR /app

COPY frontend/package*.json ./frontend/

WORKDIR /app/frontend
RUN npm install

WORKDIR /app

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--prefix", "frontend", "--", "--host"]