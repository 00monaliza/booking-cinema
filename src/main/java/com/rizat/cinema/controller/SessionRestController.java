package com.rizat.cinema.controller;

import com.rizat.cinema.model.Session;
import com.rizat.cinema.repository.SessionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/v1/sessions")
public class SessionRestController {
    private final SessionRepository sessionRepository;

    public SessionRestController(SessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    @GetMapping
    public ResponseEntity<List<Session>> getAllSessions() {
        return ResponseEntity.ok(sessionRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Session> getSessionById(@PathVariable Long id) {
        Objects.requireNonNull(id, "Session ID cannot be null");
        return sessionRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/film/{filmId}")
    public ResponseEntity<List<Session>> getSessionsByFilmId(@PathVariable Long filmId) {
        Objects.requireNonNull(filmId, "Film ID cannot be null");
        List<Session> sessions = sessionRepository.findByFilmId(filmId);
        return ResponseEntity.ok(sessions);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Session> createSession(@RequestBody Session session) {
        Objects.requireNonNull(session, "Session cannot be null");
        return ResponseEntity.ok(sessionRepository.save(session));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Session> updateSession(@PathVariable Long id, @RequestBody Session sessionDetails) {
        Objects.requireNonNull(id, "Session ID cannot be null");
        Objects.requireNonNull(sessionDetails, "Session details cannot be null");
        return sessionRepository.findById(id)
                .map(session -> {
                    session.setStartTime(sessionDetails.getStartTime());
                    session.setHall(sessionDetails.getHall());
                    session.setTotalSeats(sessionDetails.getTotalSeats());
                    session.setAvailableSeats(sessionDetails.getAvailableSeats());
                    return ResponseEntity.ok(sessionRepository.save(session));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteSession(@PathVariable Long id) {
        Objects.requireNonNull(id, "Session ID cannot be null");
        if (sessionRepository.existsById(id)) {
            sessionRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
