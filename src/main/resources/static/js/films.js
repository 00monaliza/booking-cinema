// Загрузка фильмов
async function loadFilms() {
    const container = document.getElementById('filmsContainer');
    if (!container) return;

    container.innerHTML = '<div class="loading">Загрузка фильмов...</div>';

    const films = await apiRequest('/films');

    if (films && films.length > 0) {
        container.innerHTML = '';
        films.forEach(film => {
            const filmCard = document.createElement('div');
            filmCard.className = 'film-card';
            filmCard.innerHTML = `
                <h3 class="film-title">${film.title}</h3>
                <p class="film-info"><strong>Жанр:</strong> ${film.genre}</p>
                <p class="film-info"><strong>Длительность:</strong> ${film.duration} мин</p>
            `;
            container.appendChild(filmCard);
        });
    } else {
        container.innerHTML = '<p>Нет доступных фильмов</p>';
    }
}

// Загрузка сеансов
async function loadSessions() {
    const container = document.getElementById('sessionsContainer');
    if (!container) return;

    container.innerHTML = '<div class="loading">Загрузка сеансов...</div>';

    const sessions = await apiRequest('/sessions');

    if (sessions && sessions.length > 0) {
        container.innerHTML = '';
        sessions.forEach(session => {
            const sessionCard = document.createElement('div');
            sessionCard.className = 'session-card';

            const filmTitle = session.film ? session.film.title : 'Неизвестный фильм';
            const startTime = formatDateTime(session.startTime);

            sessionCard.innerHTML = `
                <div class="session-info">
                    <h3>${filmTitle}</h3>
                    <p class="session-details"><strong>Время:</strong> ${startTime}</p>
                    <p class="session-details"><strong>Зал:</strong> ${session.hall}</p>
                    <p class="session-details"><strong>Свободных мест:</strong> ${session.availableSeats} из ${session.totalSeats}</p>
                </div>
                <div class="session-actions">
                    ${Auth.isAuthenticated() ?
                        `<button class="btn btn-primary" onclick="openBookingModal(${session.id}, '${filmTitle}', '${startTime}', ${session.availableSeats})">
                            Забронировать
                        </button>` :
                        `<button class="btn btn-secondary" onclick="location.href='/login.html'">
                            Войдите для бронирования
                        </button>`
                    }
                </div>
            `;
            container.appendChild(sessionCard);
        });
    } else {
        container.innerHTML = '<p>Нет доступных сеансов</p>';
    }
}

// Открыть модальное окно бронирования
function openBookingModal(sessionId, filmTitle, startTime, availableSeats) {
    if (availableSeats <= 0) {
        alert('К сожалению, все места на этот сеанс уже заняты');
        return;
    }

    const modal = document.getElementById('bookingModal');
    const bookingInfo = document.getElementById('bookingInfo');

    bookingInfo.innerHTML = `
        <p><strong>Фильм:</strong> ${filmTitle}</p>
        <p><strong>Время:</strong> ${startTime}</p>
        <p><strong>Доступно мест:</strong> ${availableSeats}</p>
    `;

    const form = document.getElementById('bookingForm');
    const seatInput = document.getElementById('seatNumber');
    seatInput.max = availableSeats;

    // Удаляем старый обработчик
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);

    // Добавляем новый обработчик
    newForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await createBooking(sessionId, parseInt(seatInput.value));
    });

    modal.style.display = 'block';
}

// Создать бронирование
async function createBooking(sessionId, seatNumber) {
    const user = Auth.getUserInfo();
    if (!user) {
        alert('Необходимо войти в систему');
        return;
    }

    // Получаем ID пользователя (в реальном приложении это должно быть в токене)
    // Для упрощения используем фиктивный ID
    const bookingData = {
        session: { id: sessionId },
        user: { id: 1 }, // TODO: получать реальный ID из токена
        seatNumber: seatNumber
    };

    const result = await apiRequest('/bookings', {
        method: 'POST',
        body: JSON.stringify(bookingData)
    });

    if (result) {
        showSuccess('Бронирование успешно создано!');
        closeBookingModal();
        loadSessions(); // Перезагружаем список сеансов
    } else {
        alert('Ошибка при создании бронирования. Возможно, место уже занято.');
    }
}

// Закрыть модальное окно
function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    modal.style.display = 'none';
}

// Обработчики для модального окна
document.addEventListener('DOMContentLoaded', () => {
    // Загружаем данные при загрузке страницы
    loadFilms();
    loadSessions();

    // Закрытие модального окна
    const modal = document.getElementById('bookingModal');
    if (modal) {
        const closeBtn = modal.querySelector('.close');
        if (closeBtn) {
            closeBtn.onclick = closeBookingModal;
        }

        window.onclick = (event) => {
            if (event.target === modal) {
                closeBookingModal();
            }
        };
    }
});
