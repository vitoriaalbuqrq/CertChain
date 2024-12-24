# Use a imagem base do Node.js
FROM node:alpine

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos package.json e package-lock.json
COPY CertChain/frontend/package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação
COPY CertChain/frontend .

# Exponha a porta que o Vite usa (geralmente 5173)
EXPOSE 5173

# Comando para iniciar o servidor de desenvolvimento
CMD ["npm", "run", "dev", "--", "--host"]