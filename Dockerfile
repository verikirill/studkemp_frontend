# Классический запуск React + Vite приложения через Node.js

FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./

# Устанавливаем зависимости включая serve для статики
RUN npm ci --silent && npm install -g serve

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Открываем порт 3000
EXPOSE 3000

# Запускаем приложение через serve
CMD ["serve", "-s", "dist", "-l", "3000"]
