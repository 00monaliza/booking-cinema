package com.rizat.cinema.controller;

import com.rizat.cinema.model.Session;
import com.rizat.cinema.service.SessionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
    public List<Session> getSessionsByFilmId(@PathVariable Long filmId) {
        return sessionService.getSessionsByFilmId(filmId);
    }

    @PostMapping
    public Session createSession(@Valid @RequestBody Session session) {
        return sessionService.createSession(session);
    }
}