package com.rizat.cinema.service;

import com.rizat.cinema.model.Film;
import com.rizat.cinema.model.Session;
import com.rizat.cinema.repository.FilmRepository;
import com.rizat.cinema.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class SessionService {

    private final SessionRepository sessionRepository;
    private final FilmRepository filmRepository;

    @Autowired
    public SessionService(SessionRepository sessionRepository, FilmRepository filmRepository) {
        this.sessionRepository = sessionRepository;
        this.filmRepository = filmRepository;
    }

    public Session createSession(Session session) {
        Optional<Film> film = filmRepository.findById(session.getFilm().getId());
        if (film.isEmpty()) {
            throw new IllegalArgumentException("Film not found");
        }
        if (session.getStartTime().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Session start time must be in the future");
        }
        if (session.getTotalSeats() <= 0) {
            throw new IllegalArgumentException("Total seats must be positive");
        }
        session.setAvailableSeats(session.getTotalSeats());
        return sessionRepository.save(session);
    }

    public List<Session> getAllSessions() {
        return sessionRepository.findAll();
    }

    public List<Session> getSessionsByFilmIdAndTime(Long filmId, LocalDateTime startTime) {
        return sessionRepository.findByFilmIdAndStartTimeAfter(filmId, startTime);
    }
}