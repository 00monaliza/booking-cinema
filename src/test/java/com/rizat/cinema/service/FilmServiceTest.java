package com.rizat.cinema.service;

import com.rizat.cinema.model.Film;
import com.rizat.cinema.repository.FilmRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class FilmServiceTest {

    @Mock
    private FilmRepository filmRepository;

    @InjectMocks
    private FilmService filmService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateFilm_Success() {
        Film film = new Film();
        film.setTitle("Inception");
        film.setGenre("Sci-Fi");
        film.setDuration(148);

        when(filmRepository.save(film)).thenReturn(film);

        Film result = filmService.createFilm(film);

        assertNotNull(result);
        assertEquals("Inception", result.getTitle());
        verify(filmRepository, times(1)).save(film);
    }

    @Test
    void testCreateFilm_EmptyTitle_ThrowsException() {
        Film film = new Film();
        film.setTitle("");
        film.setGenre("Sci-Fi");
        film.setDuration(148);

        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            filmService.createFilm(film);
        });

        assertEquals("Film title cannot be empty", exception.getMessage());
        verify(filmRepository, never()).save(film);
    }

    @Test
    void testGetAllFilms() {
        Film film1 = new Film();
        film1.setTitle("Inception");
        Film film2 = new Film();
        film2.setTitle("The Matrix");

        List<Film> films = Arrays.asList(film1, film2);
        when(filmRepository.findAll()).thenReturn(films);

        List<Film> result = filmService.getAllFilms();

        assertEquals(2, result.size());
        assertEquals("Inception", result.get(0).getTitle());
        assertEquals("The Matrix", result.get(1).getTitle());
        verify(filmRepository, times(1)).findAll();
    }

    @Test
    void testGetFilmById_Success() {
        Film film = new Film();
        film.setId(1L);
        film.setTitle("Inception");

        when(filmRepository.findById(1L)).thenReturn(Optional.of(film));

        Optional<Film> result = filmService.getFilmById(1L);

        assertTrue(result.isPresent());
        assertEquals("Inception", result.get().getTitle());
        verify(filmRepository, times(1)).findById(1L);
    }

    @Test
    void testGetFilmById_NotFound() {
        when(filmRepository.findById(1L)).thenReturn(Optional.empty());

        Optional<Film> result = filmService.getFilmById(1L);

        assertFalse(result.isPresent());
        verify(filmRepository, times(1)).findById(1L);
    }
}