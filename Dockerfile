# Многостадийная сборка для React + Vite приложения

# Стадия сборки
FROM node:18-alpine AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci --silent

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Стадия продакшена
FROM nginx:alpine AS production

# Копируем собранное приложение в nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем кастомную конфигурацию nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт 80
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
