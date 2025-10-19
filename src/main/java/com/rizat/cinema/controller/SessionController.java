package com.rizat.cinema.controller;

import com.rizat.cinema.model.Session;
import com.rizat.cinema.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/sessions")
public class SessionController {

    private final SessionService sessionService;

    @Autowired
    public SessionController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @GetMapping
    public List<Session> getAllSessions() {
        return sessionService.getAllSessions();
    }

    @GetMapping("/film/{filmId}")
    public List<Session> getSessionsByFilm(@PathVariable Long filmId) {
        return sessionService.getSessionsByFilmIdAndTime(filmId, LocalDateTime.now());
    }

    @PostMapping
    public Session createSession(@RequestBody Session session) {
        return sessionService.createSession(session);
    }
}