// Базовый URL API
const API_BASE_URL = '/api';

// Утилиты для работы с токеном
const Auth = {
    setToken(token) {
        localStorage.setItem('jwt_token', token);
    },

    getToken() {
        return localStorage.getItem('jwt_token');
    },

    removeToken() {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('user_info');
    },

    setUserInfo(user) {
        localStorage.setItem('user_info', JSON.stringify(user));
    },

    getUserInfo() {
        const userStr = localStorage.getItem('user_info');
        return userStr ? JSON.parse(userStr) : null;
    },

    isAuthenticated() {
        return !!this.getToken();
    },

    isAdmin() {
        const user = this.getUserInfo();
        return user && user.role === 'ADMIN';
    },

    logout() {
        this.removeToken();
        window.location.href = '/';
    }
};

// Функция для выполнения API запросов
async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = Auth.getToken();

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    if (token && !endpoint.includes('/login') && !endpoint.includes('/register')) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(url, {
            ...options,
            headers
        });

        // Если 401, то разлогиниваемся
        if (response.status === 401) {
            Auth.logout();
            return null;
        }

        // Для DELETE запросов может не быть тела ответа
        if (options.method === 'DELETE' && response.ok) {
            return { success: true };
        }

        const data = await response.text();

        // Если ответ пустой, возвращаем успех для успешных запросов
        if (!data && response.ok) {
            return { success: true };
        }

        // Если ответ не JSON (например, токен при логине)
        if (!response.headers.get('content-type')?.includes('application/json')) {
            return response.ok ? data : null;
        }

        return response.ok ? JSON.parse(data) : null;
    } catch (error) {
        console.error('API Error:', error);
        return null;
    }
}

// Обновление UI в зависимости от статуса авторизации
function updateAuthUI() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const adminBtn = document.getElementById('adminBtn');
    const userInfo = document.getElementById('userInfo');

    if (!loginBtn) return; // Если мы не на странице с навигацией

    if (Auth.isAuthenticated()) {
        const user = Auth.getUserInfo();

        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';

        if (userInfo) {
            userInfo.textContent = `Привет, ${user.username}!`;
        }

        if (Auth.isAdmin() && adminBtn) {
            adminBtn.style.display = 'inline-block';
        }
    } else {
        loginBtn.style.display = 'inline-block';
        registerBtn.style.display = 'inline-block';
        logoutBtn.style.display = 'none';

        if (adminBtn) {
            adminBtn.style.display = 'none';
        }

        if (userInfo) {
            userInfo.textContent = '';
        }
    }
}

// Обработчик выхода
document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            Auth.logout();
        });
    }
});

// Показать сообщение об ошибке
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');

        setTimeout(() => {
            errorElement.classList.remove('show');
        }, 5000);
    }
}

// Показать сообщение об успехе
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;

    const container = document.querySelector('.container');
    if (container) {
        container.insertBefore(successDiv, container.firstChild);

        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }
}

// Форматирование даты и времени
function formatDateTime(dateTimeStr) {
    const date = new Date(dateTimeStr);
    return date.toLocaleString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}
