FROM node:alpine

WORKDIR /app

# Dependências do frontend
RUN mkdir -p /app/frontend
COPY frontend/package*.json /app/frontend/
WORKDIR /app/frontend
RUN npm install

# Dependências do backend
RUN mkdir -p /app/backend
COPY backend/package*.json /app/backend/
WORKDIR /app/backend
RUN npm install

# Instalar solhint globalmente
RUN npm install -g solhint

WORKDIR /app
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--prefix", "frontend", "--", "--host"]