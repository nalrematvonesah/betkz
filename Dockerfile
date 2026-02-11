FROM node:18-alpine
WORKDIR /app

COPY backend/package*.json ./backend/
RUN cd backend && npm install

COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

COPY frontend ./frontend
RUN cd frontend && npm run build

COPY backend ./backend
RUN mkdir -p backend/public && cp -r frontend/dist/* backend/public/

EXPOSE 5000
CMD ["node", "backend/src/server.js"]
