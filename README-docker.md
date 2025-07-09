# Docker Compose для StudKemp Frontend (классический запуск)

Проект настроен для классического запуска через Node.js без nginx.

## 🚀 Быстрый старт

### Продакшен режим
```bash
# Остановка текущих контейнеров
docker-compose down

# Сборка и запуск в продакшен режиме
docker-compose up --build

# Или в фоновом режиме
docker-compose up -d --build
```

Приложение будет доступно по адресу: **http://localhost:3000**

### Режим разработки
```bash
# Запуск в режиме разработки с hot reload
docker-compose --profile dev up --build

# Или в фоновом режиме
docker-compose --profile dev up -d --build
```

Приложение будет доступно по адресу: **http://localhost:5173**

## 📋 Доступные команды

### Основные команды
```bash
# Остановка текущих контейнеров
docker-compose down

# Сборка образов
docker-compose build --no-cache

# Запуск сервисов
docker-compose up

# Остановка сервисов
docker-compose down

# Остановка с удалением томов
docker-compose down -v

# Просмотр логов
docker-compose logs

# Просмотр логов конкретного сервиса
docker-compose logs frontend
```

### Профили запуска
```bash
# Продакшен (по умолчанию)
docker-compose up

# Разработка с hot reload
docker-compose --profile dev up
```

## 🏗️ Структура проекта

```
├── Dockerfile              # Основной Dockerfile (Node.js + serve)
├── Dockerfile.dev          # Dockerfile для разработки
├── docker-compose.yml      # Docker Compose конфигурация
├── .dockerignore           # Исключения для Docker
└── README-docker.md        # Эта инструкция
```

## 🔧 Конфигурация

### Технологии
- **Продакшен**: Node.js + serve (статические файлы)
- **Разработка**: Node.js + Vite dev server

### Порты
- **Продакшен**: 3000 → 3000
- **Разработка**: 5173 → 5173

### Сети
Все сервисы работают в изолированной сети `studkemp-network`.

### Переменные окружения
- `NODE_ENV=production` (продакшен)
- `NODE_ENV=development` (разработка)

## 🐛 Отладка

### Проверка контейнеров
```bash
# Список запущенных контейнеров
docker ps

# Вход в контейнер
docker exec -it studkemp-frontend sh

# Просмотр логов
docker logs studkemp-frontend

# Проверка портов
netstat -an | findstr :3000
```

### Тестирование
```bash
# Проверка доступности
curl http://localhost:3000

# Или в PowerShell
Invoke-WebRequest http://localhost:3000
```

### Очистка
```bash
# Удаление всех контейнеров и образов проекта
docker-compose down --rmi all --volumes --remove-orphans

# Очистка Docker системы
docker system prune -a
```

## 🚧 Расширение

### Добавление backend сервиса
В `docker-compose.yml` можно добавить backend:

```yaml
backend:
  image: your-backend-image
  ports:
    - "8000:8000"
  networks:
    - studkemp-network
  environment:
    - NODE_ENV=production
```

### Добавление базы данных
```yaml
database:
  image: postgres:15-alpine
  environment:
    POSTGRES_DB: studkemp
    POSTGRES_USER: user
    POSTGRES_PASSWORD: password
  volumes:
    - postgres_data:/var/lib/postgresql/data
  networks:
    - studkemp-network
```

## 📝 Что изменилось

✅ **Убран nginx** - теперь классический запуск через Node.js  
✅ **Упрощена архитектура** - один образ для продакшена  
✅ **Использется serve** - надежный статический сервер для SPA  
✅ **Порт 3000** - стандартный порт для Node.js приложений  
✅ **Меньше зависимостей** - проще в обслуживании  

## 🔄 Миграция

Если у вас уже были запущены контейнеры с nginx:

```bash
# Остановка старых контейнеров
docker-compose down

# Удаление старых образов
docker-compose down --rmi all

# Сборка и запуск новых
docker-compose up --build
``` 