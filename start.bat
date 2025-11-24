@echo off
REM Cinema Booking Application Startup Script for Windows
REM Запускает фронт (React) и бэк (Spring Boot) одновременно

setlocal enabledelayedexpansion

echo 🎬 Cinema Booking Application Startup
echo ======================================

REM Проверяем наличие Java
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Java не установлена
    exit /b 1
)

REM Проверяем наличие Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js не установлена
    exit /b 1
)

echo.
echo 📦 Проверяем Spring Boot jar...
if not exist "target\booking-cinema-0.0.1-SNAPSHOT.jar" (
    echo 🔨 Собираем проект...
    call mvn clean package -DskipTests -q
    echo ✓ Проект собран
)

echo.
echo 🎨 Запускаем фронтенд (React)...
cd frontend
start "" cmd /k npm run dev
cd ..
echo ✓ Фронтенд запущен на http://localhost:5173

echo.
echo 🚀 Запускаем бэкенд (Spring Boot)...
start "" cmd /k java -jar target\booking-cinema-0.0.1-SNAPSHOT.jar
echo ✓ Бэкенд запущен на http://localhost:8080

echo.
echo ======================================
echo ✅ Приложение готово!
echo.
echo 📱 Фронтенд (разработка):  http://localhost:5173
echo 🌐 Бэкенд + Фронт (prod):  http://localhost:8080
echo.
echo ======================================
pause
