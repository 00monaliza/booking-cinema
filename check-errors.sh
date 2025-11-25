#!/bin/bash

echo "=== Проверка Java файлов на ошибки ==="

# Проверка наличия основных классов
echo ""
echo "1. Проверка DTO классов..."
ls -la src/main/java/com/rizat/cinema/dto/*.java 2>&1 | grep -v "total"

echo ""
echo "2. Проверка Exception классов..."
ls -la src/main/java/com/rizat/cinema/exception/*.java 2>&1 | grep -v "total"

echo ""
echo "3. Проверка Util классов..."
ls -la src/main/java/com/rizat/cinema/util/*.java 2>&1 | grep -v "total"

echo ""
echo "4. Проверка Config классов..."
ls -la src/main/java/com/rizat/cinema/config/*.java 2>&1 | grep -v "total"

echo ""
echo "5. Проверка скомпилированных классов..."
if [ -d "target/classes" ]; then
    echo "✓ target/classes существует"
    echo "Количество .class файлов: $(find target/classes -name "*.class" | wc -l)"
else
    echo "✗ target/classes не найден - нужна компиляция"
fi

echo ""
echo "=== Готово ==="
