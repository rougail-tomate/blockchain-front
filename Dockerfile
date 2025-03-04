FROM node:18-alpine
 
COPY . /app

WORKDIR /app
 
RUN npm install -g pnpm
 
RUN pnpm install
 
EXPOSE 3000
 
CMD ["pnpm", "dev"]