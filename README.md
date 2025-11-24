# 🎬 Cinema Booking System

A modern, fully-featured cinema ticket booking application built with **Spring Boot 3.3.4** and **Java 21**.

## 🌟 Features

- ✅ **Modern UI** - Responsive Bootstrap 5 design with cinema-themed styling
- ✅ **REST API** - Complete RESTful endpoints for films, sessions, and bookings
- ✅ **Database** - JPA/Hibernate with H2 in-memory database
- ✅ **Sample Data** - Pre-loaded films and showtimes
- ✅ **Java 21** - Latest LTS version with improved performance
- ✅ **Clean Architecture** - Service layer, repositories, and controllers
- ✅ **CORS Support** - Cross-origin API access enabled
- ✅ **Logging** - SLF4J + Logback with clean configuration

## 🚀 Quick Start

### Prerequisites
- Java 21 or higher
- Maven 3.6+

### Build & Run

```bash
# Clone the repository
git clone https://github.com/00monaliza/booking-cinema.git
cd booking-cinema

# Build the project
mvn clean package

# Run the application
java -jar target/booking-cinema-0.0.1-SNAPSHOT.jar

# Or use Maven
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

## 📖 API Documentation

### Films
```bash
# Get all films
curl http://localhost:8080/api/v1/films

# Get film by ID
curl http://localhost:8080/api/v1/films/1

# Create new film
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
