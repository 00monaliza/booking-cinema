// Обработка формы входа
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const token = await apiRequest('/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password })
        });

        if (token) {
            Auth.setToken(token);

            // Получаем информацию о пользователе
            // Для упрощения, извлекаем из токена или делаем дополнительный запрос
            // Здесь мы просто сохраним username и предположим роль USER
            // В реальном приложении нужно декодировать JWT или сделать запрос к /api/users/me
            Auth.setUserInfo({ username, role: 'USER' });

            // Перенаправляем на главную
            window.location.href = '/';
        } else {
            showError('errorMessage', 'Неверный логин или пароль');
        }
    });
}

// Обработка формы регистрации
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Проверка совпадения паролей
        if (password !== confirmPassword) {
            showError('errorMessage', 'Пароли не совпадают');
            return;
        }

        const userData = {
            username,
            email,
            password
        };

        if (phone) {
            userData.phone = phone;
        }

        const user = await apiRequest('/users/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });

        if (user) {
            // После успешной регистрации автоматически логинимся
            const token = await apiRequest('/users/login', {
                method: 'POST',
                body: JSON.stringify({ username, password })
            });

            if (token) {
                Auth.setToken(token);
                Auth.setUserInfo({ username: user.username, role: user.role });
                window.location.href = '/';
            }
        } else {
            showError('errorMessage', 'Ошибка регистрации. Возможно, пользователь уже существует.');
        }
    });
}
