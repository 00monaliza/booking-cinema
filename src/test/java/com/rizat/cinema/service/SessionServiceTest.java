package com.rizat.cinema.service;

import com.rizat.cinema.model.Film;
import com.rizat.cinema.model.Session;
import com.rizat.cinema.repository.FilmRepository;
import com.rizat.cinema.repository.SessionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class SessionServiceTest {

    @Mock
    private SessionRepository sessionRepository;

    @Mock
    private FilmRepository filmRepository;

    @InjectMocks
    private SessionService sessionService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateSession_Success() {
        Film film = new Film();
        film.setId(1L);
        film.setTitle("Inception");

        Session session = new Session();
        session.setFilm(film);
        session.setStartTime(LocalDateTime.now().plusHours(1));
        session.setHall("Hall 1");
        session.setTotalSeats(100);
        session.setAvailableSeats(100);

        when(filmRepository.findById(1L)).thenReturn(Optional.of(film));
        when(sessionRepository.save(session)).thenReturn(session);

        Session result = sessionService.createSession(session);

        assertNotNull(result);
        assertEquals("Hall 1", result.getHall());
        assertEquals(100, result.getAvailableSeats());
        verify(filmRepository, times(1)).findById(1L);
        verify(sessionRepository, times(1)).save(session);
    }

    @Test
    void testCreateSession_FilmNotFound_ThrowsException() {
        Session session = new Session();
        Film film = new Film();
        film.setId(1L);
        session.setFilm(film);
        session.setStartTime(LocalDateTime.now().plusHours(1));
        session.setTotalSeats(100);

        when(filmRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            sessionService.createSession(session);
        });

        assertEquals("Film not found", exception.getMessage());
        verify(filmRepository, times(1)).findById(1L);
        verify(sessionRepository, never()).save(session);
    }

    @Test
    void testGetAllSessions() {
        Session session1 = new Session();
        session1.setHall("Hall 1");
        Session session2 = new Session();
        session2.setHall("Hall 2");

        List<Session> sessions = Arrays.asList(session1, session2);
        when(sessionRepository.findAll()).thenReturn(sessions);

        List<Session> result = sessionService.getAllSessions();

        assertEquals(2, result.size());
        assertEquals("Hall 1", result.get(0).getHall());
        assertEquals("Hall 2", result.get(1).getHall());
        verify(sessionRepository, times(1)).findAll();
    }
}