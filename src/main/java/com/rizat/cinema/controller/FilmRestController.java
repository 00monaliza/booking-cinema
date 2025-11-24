package com.rizat.cinema.controller;

import com.rizat.cinema.model.Film;
import com.rizat.cinema.service.FilmService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/films")
@CrossOrigin(origins = "*", maxAge = 3600)
public class FilmRestController {
    private final FilmService filmService;

    public FilmRestController(FilmService filmService) {
        this.filmService = filmService;
    }

    @GetMapping
    public ResponseEntity<List<Film>> getAllFilms() {
        return ResponseEntity.ok(filmService.listAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Film> getFilmById(@PathVariable Long id) {
        Film film = filmService.findById(id);
        if (film == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(film);
    }

    @PostMapping
    public ResponseEntity<Film> createFilm(@RequestBody Film film) {
        return ResponseEntity.ok(filmService.save(film));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Film> updateFilm(@PathVariable Long id, @RequestBody Film filmDetails) {
        Film film = filmService.findById(id);
        if (film == null) {
            return ResponseEntity.notFound().build();
        }
        film.setTitle(filmDetails.getTitle());
        film.setGenre(filmDetails.getGenre());
        film.setDuration(filmDetails.getDuration());
        return ResponseEntity.ok(filmService.save(film));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFilm(@PathVariable Long id) {
        Film film = filmService.findById(id);
        if (film == null) {
            return ResponseEntity.notFound().build();
        }
        // Note: In real implementation, add delete method to FilmService
        return ResponseEntity.noContent().build();
    }
}
