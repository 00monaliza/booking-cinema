// Проверка прав администратора
document.addEventListener('DOMContentLoaded', () => {
    if (!Auth.isAuthenticated() || !Auth.isAdmin()) {
        alert('Доступ запрещен. Только для администраторов.');
        window.location.href = '/';
        return;
    }

    loadAdminFilms();
    loadAdminSessions();
    loadFilmsForSelect();
});

// Переключение вкладок
function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-btn');

    tabs.forEach(tab => tab.classList.remove('active'));
    buttons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(`${tabName}Tab`).classList.add('active');
    event.target.classList.add('active');
}

// Загрузка списка фильмов для админки
async function loadAdminFilms() {
    const container = document.getElementById('adminFilmsList');
    if (!container) return;

    container.innerHTML = '<div class="loading">Загрузка...</div>';

    const films = await apiRequest('/films');

    if (films && films.length > 0) {
        container.innerHTML = '';
        films.forEach(film => {
            const filmItem = document.createElement('div');
            filmItem.className = 'admin-item';
            filmItem.innerHTML = `
                <div class="admin-item-info">
                    <h3>${film.title}</h3>
                    <p>Жанр: ${film.genre} | Длительность: ${film.duration} мин</p>
                </div>
                <div class="admin-item-actions">
                    <button class="btn btn-danger btn-sm" onclick="deleteFilm(${film.id})">Удалить</button>
                </div>
            `;
            container.appendChild(filmItem);
        });
    } else {
        container.innerHTML = '<p>Нет фильмов</p>';
    }
}

// Загрузка списка сеансов для админки
async function loadAdminSessions() {
    const container = document.getElementById('adminSessionsList');
    if (!container) return;

    container.innerHTML = '<div class="loading">Загрузка...</div>';

    const sessions = await apiRequest('/sessions');

    if (sessions && sessions.length > 0) {
        container.innerHTML = '';
        sessions.forEach(session => {
            const filmTitle = session.film ? session.film.title : 'Неизвестный фильм';
            const startTime = formatDateTime(session.startTime);

            const sessionItem = document.createElement('div');
            sessionItem.className = 'admin-item';
            sessionItem.innerHTML = `
                <div class="admin-item-info">
                    <h3>${filmTitle}</h3>
                    <p>Время: ${startTime} | Зал: ${session.hall}</p>
                    <p>Мест: ${session.availableSeats}/${session.totalSeats}</p>
                </div>
            `;
            container.appendChild(sessionItem);
        });
    } else {
        container.innerHTML = '<p>Нет сеансов</p>';
    }
}

// Загрузка фильмов для выпадающего списка
async function loadFilmsForSelect() {
    const select = document.getElementById('sessionFilm');
    if (!select) return;

    const films = await apiRequest('/films');

    if (films && films.length > 0) {
        films.forEach(film => {
            const option = document.createElement('option');
            option.value = film.id;
            option.textContent = film.title;
            select.appendChild(option);
        });
    }
}

// Добавление фильма
const addFilmForm = document.getElementById('addFilmForm');
if (addFilmForm) {
    addFilmForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const filmData = {
            title: document.getElementById('filmTitle').value,
            genre: document.getElementById('filmGenre').value,
            duration: parseInt(document.getElementById('filmDuration').value)
        };

        const result = await apiRequest('/films', {
            method: 'POST',
            body: JSON.stringify(filmData)
        });

        if (result) {
            showSuccess('Фильм успешно добавлен!');
            addFilmForm.reset();
            loadAdminFilms();
            loadFilmsForSelect(); // Обновляем список в select
        } else {
            alert('Ошибка при добавлении фильма');
        }
    });
}

// Удаление фильма
async function deleteFilm(filmId) {
    if (!confirm('Вы уверены, что хотите удалить этот фильм?')) {
        return;
    }

    const result = await apiRequest(`/films/${filmId}`, {
        method: 'DELETE'
    });

    if (result) {
        showSuccess('Фильм успешно удален!');
        loadAdminFilms();
        loadFilmsForSelect();
    } else {
        alert('Ошибка при удалении фильма');
    }
}

// Добавление сеанса
const addSessionForm = document.getElementById('addSessionForm');
if (addSessionForm) {
    addSessionForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const filmId = document.getElementById('sessionFilm').value;
        const startTime = document.getElementById('sessionTime').value;
        const hall = document.getElementById('sessionHall').value;
        const totalSeats = parseInt(document.getElementById('sessionSeats').value);

        if (!filmId) {
            alert('Выберите фильм');
            return;
        }

        const sessionData = {
            film: { id: parseInt(filmId) },
            startTime: startTime,
            hall: hall,
            totalSeats: totalSeats,
            availableSeats: totalSeats
        };

        const result = await apiRequest('/sessions', {
            method: 'POST',
            body: JSON.stringify(sessionData)
        });

        if (result) {
            showSuccess('Сеанс успешно добавлен!');
            addSessionForm.reset();
            loadAdminSessions();
        } else {
            alert('Ошибка при добавлении сеанса');
        }
    });
}
