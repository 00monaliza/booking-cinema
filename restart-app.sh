#!/bin/bash
echo "🔄 Копирование обновленных HTML файлов..."
cp src/main/resources/static/*.html target/classes/static/
echo "✅ Файлы скопированы"
echo ""
echo "🚀 Запуск приложения..."
echo "После запуска откройте: http://localhost:8080/"
echo "Нажмите Ctrl+Shift+R в браузере для обновления!"
echo ""
java -jar target/booking-cinema-0.0.1-SNAPSHOT.jar
