# Docker Compose для StudKemp Frontend

Этот проект настроен для работы с Docker Compose в различных режимах.

## 🚀 Быстрый старт

### Продакшен режим
```bash
# Сборка и запуск в продакшен режиме
docker-compose up --build

# Или в фоновом режиме
docker-compose up -d --build
```

Приложение будет доступно по адресу: http://localhost:3000

### Режим разработки
```bash
# Запуск в режиме разработки с hot reload
docker-compose --profile dev up --build

# Или в фоновом режиме
docker-compose --profile dev up -d --build
```

Приложение будет доступно по адресу: http://localhost:5173

## 📋 Доступные команды

### Основные команды
```bash
# Сборка образов
docker-compose build

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
# Только продакшен сервисы
docker-compose up

# Разработка
docker-compose --profile dev up

# С дополнительным nginx (если нужен)
docker-compose --profile production up
```

## 🏗️ Структура проекта

```
├── Dockerfile              # Основной Dockerfile (продакшен)
├── Dockerfile.dev          # Dockerfile для разработки
├── docker-compose.yml      # Docker Compose конфигурация
├── nginx.conf              # Конфигурация Nginx для SPA
├── .dockerignore           # Исключения для Docker
└── README-docker.md        # Эта инструкция
```

## 🔧 Конфигурация

### Порты
- **Продакшен**: 3000 → 80 (внутри контейнера)
- **Разработка**: 5173 → 5173
- **Nginx** (опционально): 80 → 80

### Сети
Все сервисы работают в изолированной сети `studkemp-network`.

### Томы
- `frontend_node_modules` - для кэширования node_modules

## 🐛 Отладка

### Проверка контейнеров
```bash
# Список запущенных контейнеров
docker ps

# Вход в контейнер
docker exec -it studkemp-frontend sh

# Просмотр логов
docker logs studkemp-frontend
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
В `docker-compose.yml` можно легко добавить backend:

```yaml
backend:
  image: your-backend-image
  ports:
    - "8000:8000"
  networks:
    - studkemp-network
```

Затем в `nginx.conf` раскомментировать секцию proxy для API.

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

## 📝 Примечания

- Используется многостадийная сборка для оптимизации размера образа
- Nginx настроен для правильной работы SPA (React Router)
- Включены заголовки безопасности
- Статические файлы кэшируются на 1 год
- HTML файлы не кэшируются для обновлений 