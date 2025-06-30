# Dockerfile para gateway NestJS

FROM node:20-alpine

# Crear carpeta de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias (production)
RUN npm install --production

# Copiar el resto del código fuente
COPY . .

# Construir el proyecto (compila TS a JS)
RUN npm run build

# Exponer el puerto que usa la app
EXPOSE 3000

# Ejecutar la aplicación en modo producción
CMD ["node", "dist/main"]
