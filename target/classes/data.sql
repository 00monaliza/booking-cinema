-- Sample Users (passwords hashed with BCrypt strength 10)
-- admin password: Admin123 (meets validation: min 8 chars, uppercase, lowercase, digit)
-- user password: User1234 (meets validation: min 8 chars, uppercase, lowercase, digit)
-- These are BCrypt hashes - you can login with the passwords above
INSERT INTO users (username, email, phone, password, role)
VALUES ('admin', 'admin@cinema.com', '+79991234567', '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa', 'ADMIN');
INSERT INTO users (username, email, phone, password, role)
VALUES ('user', 'user@cinema.com', '+79989876543', '$2a$10$5E6X.K5n.Dp/Hc6W1K/zE.YNZt3KEXM8FkfOJ0dKqWKkZiOcQC3la', 'USER');

-- Sample Films with ratings
INSERT INTO film (title, genre, duration, rating) VALUES ('Интерстеллар', 'Научная фантастика', 169, 8.6);
INSERT INTO film (title, genre, duration, rating) VALUES ('Начало', 'Фантастика', 148, 8.8);
INSERT INTO film (title, genre, duration, rating) VALUES ('Зелёная миля', 'Драма', 189, 8.6);
INSERT INTO film (title, genre, duration, rating) VALUES ('Форрест Гамп', 'Драма', 142, 8.8);
INSERT INTO film (title, genre, duration, rating) VALUES ('Матрица', 'Фантастика', 136, 8.7);
INSERT INTO film (title, genre, duration, rating) VALUES ('Крёстный отец', 'Криминал', 175, 9.2);
INSERT INTO film (title, genre, duration, rating) VALUES ('Джокер', 'Триллер', 122, 8.4);
INSERT INTO film (title, genre, duration, rating) VALUES ('Аватар', 'Фантастика', 162, 7.8);
INSERT INTO film (title, genre, duration, rating) VALUES ('Леон', 'Боевик', 110, 8.5);
INSERT INTO film (title, genre, duration, rating) VALUES ('Спасение рядового Райана', 'Война', 169, 8.6);
INSERT INTO film (title, genre, duration, rating) VALUES ('Земля людей', 'Драма', 138, 8.3);
INSERT INTO film (title, genre, duration, rating) VALUES ('Лучше звоните Солу', 'Криминал', 60, 8.5);

-- Sample Sessions для фильмов
INSERT INTO session (film_id, start_time, hall, total_seats, available_seats)
VALUES (1, '2024-12-01 14:00:00', 'Зал A', 100, 85);
INSERT INTO session (film_id, start_time, hall, total_seats, available_seats)
VALUES (1, '2024-12-01 16:30:00', 'Зал A', 100, 92);
INSERT INTO session (film_id, start_time, hall, total_seats, available_seats)
VALUES (1, '2024-12-01 19:00:00', 'Зал B', 80, 45);

INSERT INTO session (film_id, start_time, hall, total_seats, available_seats)
VALUES (2, '2024-12-01 15:00:00', 'Зал C', 100, 78);
INSERT INTO session (film_id, start_time, hall, total_seats, available_seats)
VALUES (2, '2024-12-01 17:45:00', 'Зал C', 100, 88);

INSERT INTO session (film_id, start_time, hall, total_seats, available_seats)
VALUES (3, '2024-12-01 11:00:00', 'Зал A', 80, 65);
INSERT INTO session (film_id, start_time, hall, total_seats, available_seats)
VALUES (3, '2024-12-01 13:30:00', 'Зал D', 100, 42);

INSERT INTO session (film_id, start_time, hall, total_seats, available_seats)
VALUES (4, '2024-12-01 20:00:00', 'Зал B', 100, 95);

INSERT INTO session (film_id, start_time, hall, total_seats, available_seats)
VALUES (5, '2024-12-01 22:00:00', 'Зал D', 60, 12);

INSERT INTO session (film_id, start_time, hall, total_seats, available_seats)
VALUES (6, '2024-12-02 14:00:00', 'Зал A', 100, 100);

INSERT INTO session (film_id, start_time, hall, total_seats, available_seats)
VALUES (7, '2024-12-02 18:00:00', 'Зал B', 80, 60);

INSERT INTO session (film_id, start_time, hall, total_seats, available_seats)
VALUES (8, '2024-12-02 21:00:00', 'Зал C', 100, 75);

INSERT INTO session (film_id, start_time, hall, total_seats, available_seats)
VALUES (9, '2024-12-02 15:30:00', 'Зал D', 80, 70);

INSERT INTO session (film_id, start_time, hall, total_seats, available_seats)
VALUES (10, '2024-12-03 10:00:00', 'Зал A', 100, 88);

INSERT INTO session (film_id, start_time, hall, total_seats, available_seats)
VALUES (11, '2024-12-03 12:45:00', 'Зал B', 90, 82);

INSERT INTO session (film_id, start_time, hall, total_seats, available_seats)
VALUES (12, '2024-12-03 20:30:00', 'Зал C', 100, 95);
