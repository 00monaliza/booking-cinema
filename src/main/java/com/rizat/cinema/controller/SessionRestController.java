package com.rizat.cinema.controller;

import com.rizat.cinema.model.Session;
import com.rizat.cinema.repository.SessionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/sessions")
@CrossOrigin(origins = "*", maxAge = 3600)
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
        return sessionRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/film/{filmId}")
    public ResponseEntity<List<Session>> getSessionsByFilmId(@PathVariable Long filmId) {
        List<Session> sessions = sessionRepository.findByFilmId(filmId);
        return ResponseEntity.ok(sessions);
    }

    @PostMapping
    public ResponseEntity<Session> createSession(@RequestBody Session session) {
        return ResponseEntity.ok(sessionRepository.save(session));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Session> updateSession(@PathVariable Long id, @RequestBody Session sessionDetails) {
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
    public ResponseEntity<Void> deleteSession(@PathVariable Long id) {
        if (sessionRepository.existsById(id)) {
            sessionRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
