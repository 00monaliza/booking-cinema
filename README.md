# 🎬 Cinema Booking Application

Современное веб-приложение для онлайн бронирования билетов в кинотеатр. Полнофункциональная система с публичным доступом к афише фильмов и аутентификацией для сохранения истории бронирований.

## 📋 Содержание

- [Особенности](#особенности)
- [Требования](#требования)
- [Установка](#установка)
- [Запуск](#запуск)
- [Архитектура](#архитектура)
- [API](#api)
- [Структура базы данных](#структура-базы-данных)
- [Аутентификация](#аутентификация)
- [Развертывание](#развертывание)

## ✨ Особенности

### Для пользователей
- 🎥 **Публичная афиша** - просмотр всех фильмов и сеансов без авторизации
- 🎫 **Бронирование билетов** - удобный интерфейс выбора мест
- 📱 **Отзывчивый дизайн** - оптимально работает на всех устройствах
- 🔐 **Система аккаунтов** - регистрация и вход для сохранения истории
- 📅 **История бронирований** - просмотр прошлых и будущих бронирований
- ❌ **Отмена билетов** - возможность отменить бронирование

### Для администраторов
- 👥 **Управление фильмами** - добавление, редактирование, удаление фильмов
- 🎞️ **Управление сеансами** - создание расписания сеансов
- 📊 **Просмотр всех бронирований** - отслеживание продаж

## 🛠 Требования

- **Java 21 LTS** или выше
- **Maven 3.8.1** или выше
- **Git** для клонирования репозитория

## 📦 Установка

### 1. Клонирование репозитория

```bash
git clone https://github.com/00monaliza/booking-cinema.git
cd booking-cinema
```

### 2. Проверка версии Java

```bash
java -version
# Должно быть: openjdk 21 или выше
```

### 3. Построение проекта

```bash
mvn clean package -DskipTests
```

## 🚀 Запуск

### ⚡ Быстрый запуск (оба компонента одновременно)

**macOS / Linux:**
```bash
./start.sh
```

**Windows:**
```cmd
start.bat
```

Это запустит:
- ✅ **Фронтенд** на http://localhost:5173 (React Dev Server с горячей перезагрузкой)
- ✅ **Бэкенд** на http://localhost:8080 (Spring Boot с embedded фронтом)

---

### 🔧 Альтернативные способы запуска

#### Только бэкенд (с встроенным фронтом)
```bash
java -jar target/booking-cinema-0.0.1-SNAPSHOT.jar
```
Откройте: **http://localhost:8080**

#### Только фронтенд (разработка с горячей перезагрузкой)
```bash
cd frontend
npm run dev
```
Откройте: **http://localhost:5173**
(API запросы будут автоматически проксированы на бэкенд)

#### Через Maven
```bash
mvn spring-boot:run
```

---

### 👤 Данные для входа

Создайте новый аккаунт с паролем типа `Password123`:
- **Минимум 8 символов**
- **Заглавная буква** (A-Z)
- **Строчные буквы** (a-z)
- **Цифра** (0-9)

## 🏗 Архитектура

### Слои приложения

```
┌─────────────────────────────────────┐
│      Frontend (HTML/CSS/JS)         │
├─────────────────────────────────────┤
│   Spring MVC Controllers            │
│   (FilmRestController, etc)         │
├─────────────────────────────────────┤
│   Service Layer                     │
│   (FilmService, BookingService)     │
├─────────────────────────────────────┤
│   Spring Data JPA Repository        │
│   (FilmRepository, etc)             │
├─────────────────────────────────────┤
│   Database (H2 In-Memory)           │
└─────────────────────────────────────┘
```

### Ключевые компоненты

#### 🔐 Безопасность
- **Spring Security** - аутентификация и авторизация
- **JWT (JSON Web Tokens)** - токены для аутентификации
- **Role-Based Access Control (RBAC)** - управление доступом на основе ролей

#### 📱 Frontend
- **Bootstrap 5.3.3** - адаптивный дизайн
- **Vanilla JavaScript** - без фреймворков
- **Современный CSS** - анимации и переходы
- **LocalStorage** - сохранение токена и данных пользователя

#### 💾 База данных
- **H2** - встроенная реляционная БД (разработка)
- **Spring Data JPA** - ORM маппинг
- **Инициализация** - `data.sql` при старте

## 📡 API

### Публичные эндпоинты (без авторизации)

#### Фильмы
```
GET /api/v1/films                    - Список всех фильмов
GET /api/v1/films?title=Интерстеллар - Поиск по названию
GET /api/v1/films?genre=Фантастика   - Фильтр по жанру
GET /api/v1/films/{id}               - Данные конкретного фильма
```

#### Сеансы
```
GET /api/v1/sessions                 - Все сеансы
GET /api/v1/sessions/{id}            - Конкретный сеанс
GET /api/v1/sessions/film/{filmId}   - Сеансы для фильма
```

#### Аутентификация
```
POST /api/users/register             - Регистрация
POST /api/users/login                - Вход
```

### Защищенные эндпоинты (требует JWT токен)

#### Бронирования
```
GET /api/v1/bookings                 - Мои бронирования
POST /api/v1/bookings                - Создать бронирование
DELETE /api/v1/bookings/{id}         - Отменить бронирование
```

#### Администратору (роль ADMIN)
```
POST /api/v1/films                   - Создать фильм
PUT /api/v1/films/{id}               - Обновить фильм
DELETE /api/v1/films/{id}            - Удалить фильм
POST /api/v1/sessions                - Создать сеанс
PUT /api/v1/sessions/{id}            - Обновить сеанс
DELETE /api/v1/sessions/{id}         - Удалить сеанс
```

## 🗄️ Структура базы данных

### Таблица `film`
```sql
CREATE TABLE film (
    id BIGINT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,      -- Название фильма
    genre VARCHAR(100),               -- Жанр
    duration INT NOT NULL,            -- Длительность в минутах
    rating DOUBLE                     -- Рейтинг (0-10)
);
```

### Таблица `session`
```sql
CREATE TABLE session (
    id BIGINT PRIMARY KEY,
    film_id BIGINT FOREIGN KEY,       -- Ссылка на фильм
    start_time TIMESTAMP NOT NULL,    -- Время начала сеанса
    hall VARCHAR(20) NOT NULL,        -- Номер зала
    total_seats INT NOT NULL,         -- Всего мест
    available_seats INT NOT NULL      -- Свободных мест
);
```

### Таблица `booking`
```sql
CREATE TABLE booking (
    id BIGINT PRIMARY KEY,
    user_id BIGINT FOREIGN KEY,       -- Пользователь
    session_id BIGINT FOREIGN KEY,    -- Сеанс
    seats VARCHAR(255) NOT NULL,      -- Забронированные места
    booking_date TIMESTAMP,           -- Дата бронирования
    status VARCHAR(20)                -- Статус (CONFIRMED/CANCELLED)
);
```

### Таблица `users`
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,   -- Хэшированный пароль (BCrypt)
    role VARCHAR(20)                  -- Роль (USER/ADMIN)
);
```

## 🔐 Аутентификация

### JWT Токен

Токен содержит:
- **Срок действия**: 24 часа
- **Секретный ключ**: из переменной окружения или конфигурации
- **Данные**: username, роль, время создания

### Как получить токен

```javascript
// Регистрация
const registerResponse = await fetch('/api/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
        username: 'new_user', 
        password: 'password123' 
    })
});

// Вход
const loginResponse = await fetch('/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
        username: 'user', 
        password: 'password' 
    })
});

const data = await loginResponse.json();
const token = data.token;

// Использование токена
fetch('/api/v1/bookings', {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});
```

## 📊 Пример данных

При запуске приложение автоматически загружает:
- **12 фильмов** с рейтингами (8.3 - 9.2)
- **12+ сеансов** в разных залах
- **Тестовые пользователи** для демонстрации

## 🎯 Примеры использования API

### Получить все фильмы
```bash
curl -X GET http://localhost:8080/api/v1/films
```

Ответ:
```json
[
  {
    "id": 1,
    "title": "Интерстеллар",
    "genre": "Научная фантастика",
    "duration": 169,
    "rating": 8.6
  },
  ...
]
```

### Зарегистрироваться
```bash
curl -X POST http://localhost:8080/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"newuser","password":"pass123"}'
```

### Получить мои бронирования
```bash
curl -X GET http://localhost:8080/api/v1/bookings \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🔧 Конфигурация

### Файл application.properties

```properties
# Server
server.port=8080
server.servlet.context-path=/

# Database
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect

# H2 Console
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# JWT
jwt.secret=your-secret-key-change-in-production
jwt.expiration=86400000  # 24 hours in ms
```

## 📁 Структура проекта

```
src/main/
├── java/com/rizat/cinema/
│   ├── CinemaBookingApplication.java  # Главный класс
│   ├── controller/
│   │   ├── FilmRestController.java    # REST API для фильмов
│   │   ├── SessionRestController.java # REST API для сеансов
│   │   ├── BookingRestController.java # REST API для бронирований
│   │   └── AuthController.java        # REST API для аутентификации
│   ├── model/
│   │   ├── Film.java
│   │   ├── Session.java
│   │   ├── Booking.java
│   │   └── User.java
│   ├── repository/
│   │   ├── FilmRepository.java
│   │   ├── SessionRepository.java
│   │   ├── BookingRepository.java
│   │   └── UserRepository.java
│   ├── service/
│   │   ├── FilmService.java
│   │   ├── BookingService.java
│   │   └── JwtService.java
│   ├── security/
│   │   ├── SecurityConfig.java       # Конфигурация безопасности
│   │   └── JwtAuthenticationFilter.java
│   └── exception/
│       └── GlobalExceptionHandler.java
├── resources/
│   ├── static/
│   │   ├── booking.html              # Страница бронирования
│   │   ├── bookings.html             # История бронирований
│   │   ├── login.html                # Вход
│   │   ├── register.html             # Регистрация
│   │   ├── admin.html                # Админ панель
│   │   ├── css/
│   │   │   └── style.css             # Общие стили
│   │   └── js/
│   │       └── (скрипты в HTML)
│   ├── templates/
│   │   └── index.html                # Главная страница
│   ├── application.properties        # Конфигурация
│   └── data.sql                      # Инициализация БД
└── test/
    └── java/                         # Тесты

pom.xml                               # Зависимости Maven
```

## 🚀 Развертывание

### На боевом сервере (Production)

1. **Сменить JWT секретный ключ**
   ```bash
   # Генерировать новый ключ
   openssl rand -base64 32
   ```

2. **Настроить переменные окружения**
   ```bash
   export JWT_SECRET=your-generated-secret-key
   export DB_URL=jdbc:mysql://host:3306/cinema_booking
   export DB_USER=db_user
   export DB_PASSWORD=db_password
   ```

3. **Использовать постоянную БД** (PostgreSQL/MySQL)
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/cinema
   spring.jpa.hibernate.ddl-auto=validate
   ```

4. **Запустить с SSL/TLS**
   ```bash
   java -jar booking-cinema.jar \
     --server.ssl.key-store=keystore.p12 \
     --server.ssl.key-store-password=password
   ```

## 🧪 Тестирование

### Тестовые учетные данные

При запуске приложение создает тестовые пользователи:

```
User (обычный пользователь):
- Username: user
- Password: password123
- Role: USER

Admin (администратор):
- Username: admin
- Password: admin123
- Role: ADMIN
```

## 📚 Используемые технологии

### Backend
- **Spring Boot 3.3.4** - основной фреймворк
- **Spring Security** - безопасность
- **Spring Data JPA** - работа с БД
- **Spring Web MVC** - REST API
- **JJWT 0.12.3** - JWT токены
- **H2 Database** - встроенная БД
- **Logback** - логирование

### Frontend
- **Bootstrap 5.3.3** - CSS фреймворк
- **Vanilla JavaScript** - скрипты
- **HTML5** - разметка
- **CSS3** - стилизация

## 📝 Лицензия

Проект распространяется под лицензией MIT.

---

**Примечание**: Это приложение разработано как демонстрационный проект. Для использования в production требуется дополнительная настройка безопасности, логирования и мониторинга.# Create new film
curl -X POST http://localhost:8080/api/v1/films \
  -H "Content-Type: application/json" \
  -d '{"title":"New Film","genre":"Action","duration":120}'

# Update film
curl -X PUT http://localhost:8080/api/v1/films/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Title","genre":"Drama","duration":150}'

# Delete film
curl -X DELETE http://localhost:8080/api/v1/films/1
```

### Sessions
```bash
# Get all sessions
curl http://localhost:8080/api/v1/sessions

# Get sessions by film ID
curl http://localhost:8080/api/v1/sessions/film/1

# Get session by ID
curl http://localhost:8080/api/v1/sessions/1
```

### Bookings
```bash
# Get bookings for session
curl http://localhost:8080/api/v1/bookings/session/1

# Create booking
curl -X POST http://localhost:8080/api/v1/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "session": {"id": 1},
    "seatNumber": 5,
    "customerName": "John Doe"
  }'
```

## 📁 Project Structure

```
src/main/java/com/rizat/cinema/
├── CinemaBookingApplication.java      # Main Spring Boot application
├── controller/
│   ├── HomeController.java            # Web UI controller
│   ├── FilmRestController.java        # Films API
│   ├── SessionRestController.java     # Sessions API
│   └── BookingRestController.java     # Bookings API
├── model/
│   ├── Film.java                      # Film entity
│   ├── Session.java                   # Session entity
│   └── Booking.java                   # Booking entity
├── repository/
│   ├── FilmRepository.java            # Film persistence
│   ├── SessionRepository.java         # Session persistence
│   └── BookingRepository.java         # Booking persistence
└── service/
    ├── FilmService.java               # Film business logic
    └── BookingService.java            # Booking business logic

src/main/resources/
├── templates/
│   └── index.html                     # Main web page
├── static/css/
│   └── style.css                      # Custom cinema theme
├── data.sql                           # Sample data
└── application.properties             # App configuration
```

## 🎨 UI Features

- **Hero Section** - Eye-catching landing area with call-to-action
- **Film Cards** - Responsive grid with film information
- **Quick Stats** - Key metrics display
- **Booking Workflow** - Step-by-step booking process
- **Modern Navigation** - Sticky navbar with smooth animations
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Dark Theme** - Cinema-inspired color scheme (red & dark gray)

## 🔧 Technology Stack

- **Java** 21 LTS
- **Spring Boot** 3.3.4
- **Spring Data JPA** - Database access
- **Hibernate** 6.5.x - ORM
- **Bootstrap** 5.3.3 - Frontend framework
- **H2 Database** - Embedded database
- **Maven** - Build tool
- **Logback** - Logging framework

## 📝 Configuration

### application.properties
```properties
spring.application.name=Cinema Booking System
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.defer-datasource-initialization=true
spring.h2.console.enabled=true
logging.system=logback
logging.level.root=INFO
logging.level.com.rizat.cinema=DEBUG
```

## 🐛 Known Issues & Resolutions

- **Logging Conflicts** - Excluded `log4j-to-slf4j` to prevent shutdown hook errors
- **Null Safety** - Added `Objects.requireNonNull()` checks in services and controllers
- **Webjars** - Bootstrap served via CDN for better performance

## 🧪 Testing

Run tests with:
```bash
mvn test
```

## 📦 Database

- **Default**: H2 in-memory database
- **Auto-init**: Sample films and sessions loaded from `data.sql`
- **H2 Console**: Available at `http://localhost:8080/h2-console`

## 🌐 API Response Examples

### Get Films Response
```json
[
  {
    "id": 1,
    "title": "Action Master",
    "genre": "Action",
    "duration": 120
  },
  {
    "id": 2,
    "title": "Drama Queen",
    "genre": "Drama",
    "duration": 150
  }
]
```

### Get Sessions Response
```json
[
  {
    "id": 1,
    "film": {"id": 1, "title": "Action Master", ...},
    "startTime": "2024-11-24T14:00:00",
    "hall": "Hall A",
    "totalSeats": 100,
    "availableSeats": 85
  }
]
```

## 🚢 Deployment

Build production JAR:
```bash
mvn clean package -DskipTests

# Run with JVM optimizations
java -XX:+UseG1GC -XX:MaxGCPauseMillis=200 -jar target/booking-cinema-0.0.1-SNAPSHOT.jar
```

## 📄 License

MIT License - feel free to use this project for learning and commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## 📧 Contact

For questions or issues, please open a GitHub issue or contact the maintainers.

---

**Built with ❤️ using Spring Boot & Java 21**
