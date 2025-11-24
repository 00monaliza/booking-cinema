-- Sample Films
INSERT INTO film (title, genre, duration) VALUES ('Action Master', 'Action', 120);
INSERT INTO film (title, genre, duration) VALUES ('Drama Queen', 'Drama', 150);
INSERT INTO film (title, genre, duration) VALUES ('Comedy Gold', 'Comedy', 95);
INSERT INTO film (title, genre, duration) VALUES ('Sci-Fi Wonder', 'Sci-Fi', 165);
INSERT INTO film (title, genre, duration) VALUES ('Horror Night', 'Horror', 110);

-- Sample Sessions
INSERT INTO session (film_id, start_time, hall, total_seats, available_seats) 
VALUES (1, '2024-11-24 14:00:00', 'Hall A', 100, 85);
INSERT INTO session (film_id, start_time, hall, total_seats, available_seats) 
VALUES (1, '2024-11-24 16:30:00', 'Hall A', 100, 92);
INSERT INTO session (film_id, start_time, hall, total_seats, available_seats) 
VALUES (1, '2024-11-24 19:00:00', 'Hall B', 80, 45);

INSERT INTO session (film_id, start_time, hall, total_seats, available_seats) 
VALUES (2, '2024-11-24 15:00:00', 'Hall C', 100, 78);
INSERT INTO session (film_id, start_time, hall, total_seats, available_seats) 
VALUES (2, '2024-11-24 17:45:00', 'Hall C', 100, 88);

INSERT INTO session (film_id, start_time, hall, total_seats, available_seats) 
VALUES (3, '2024-11-24 11:00:00', 'Hall A', 80, 65);
INSERT INTO session (film_id, start_time, hall, total_seats, available_seats) 
VALUES (3, '2024-11-24 13:30:00', 'Hall D', 100, 42);

INSERT INTO session (film_id, start_time, hall, total_seats, available_seats) 
VALUES (4, '2024-11-24 20:00:00', 'Hall B', 100, 100);

INSERT INTO session (film_id, start_time, hall, total_seats, available_seats) 
VALUES (5, '2024-11-24 22:00:00', 'Hall D', 60, 12);
