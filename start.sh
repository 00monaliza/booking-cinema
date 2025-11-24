#!/bin/bash

# Cinema Booking Application Startup Script
# Запускает фронт (React) и бэк (Spring Boot) одновременно

set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"

echo "🎬 Cinema Booking Application Startup"
echo "======================================"

# Проверяем наличие Java
if ! command -v java &> /dev/null; then
    echo "❌ Java не установлена"
    exit 1
fi

# Проверяем наличие Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не установлена"
    exit 1
fi

echo ""
echo "📦 Проверяем Spring Boot jar..."
if [ ! -f "target/booking-cinema-0.0.1-SNAPSHOT.jar" ]; then
    echo "🔨 Собираем проект..."
    mvn clean package -DskipTests -q
    echo "✓ Проект собран"
fi

echo ""
echo "🎨 Запускаем фронтенд (React)..."
cd frontend
npm run dev > /tmp/frontend.log 2>&1 &
FRONTEND_PID=$!
echo "✓ Фронтенд запущен (PID: $FRONTEND_PID) на http://localhost:5173"

cd ..

echo ""
echo "🚀 Запускаем бэкенд (Spring Boot)..."
java -jar target/booking-cinema-0.0.1-SNAPSHOT.jar &
BACKEND_PID=$!
echo "✓ Бэкенд запущен (PID: $BACKEND_PID) на http://localhost:8080"

echo ""
echo "======================================"
echo "✅ Приложение готово!"
echo ""
echo "📱 Фронтенд (разработка):  http://localhost:5173"
echo "🌐 Бэкенд + Фронт (prod):  http://localhost:8080"
echo ""
echo "Для остановки нажмите Ctrl+C"
echo "======================================"
echo ""

# Функция для очистки при выходе
cleanup() {
    echo ""
    echo "⏹️  Останавливаем приложение..."
    kill $FRONTEND_PID 2>/dev/null || true
    kill $BACKEND_PID 2>/dev/null || true
    echo "✓ Приложение остановлено"
}

trap cleanup EXIT

# Ждем сигнала завершения
wait
