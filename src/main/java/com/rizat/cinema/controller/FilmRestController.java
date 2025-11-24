package com.rizat.cinema.controller;

import com.rizat.cinema.model.Film;
import com.rizat.cinema.service.FilmService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/v1/films")
public class FilmRestController {
    private final FilmService filmService;

    public FilmRestController(FilmService filmService) {
        this.filmService = filmService;
    }

    @GetMapping
    public ResponseEntity<List<Film>> getAllFilms(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String genre,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "20") int size,
            @RequestParam(required = false, defaultValue = "id") String sortBy) {

        // If filters are provided, return non-paginated results for simplicity
        if (title != null && !title.isEmpty()) {
            return ResponseEntity.ok(filmService.findByTitleContaining(title));
        }
        if (genre != null && !genre.isEmpty()) {
            return ResponseEntity.ok(filmService.findByGenre(genre));
        }

        // Return paginated results when no filters (converted to List for consistency)
        if (page < 0) page = 0;
        if (size <= 0 || size > 100) size = 20;

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).ascending());
        Page<Film> filmsPage = filmService.listAll(pageable);

        return ResponseEntity.ok(filmsPage.getContent());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Film> getFilmById(@PathVariable Long id) {
        Objects.requireNonNull(id, "Film ID cannot be null");
        Film film = filmService.findById(id);
        if (film == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(film);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Film> createFilm(@RequestBody Film film) {
        Objects.requireNonNull(film, "Film cannot be null");
        return ResponseEntity.ok(filmService.save(film));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Film> updateFilm(@PathVariable Long id, @RequestBody Film filmDetails) {
        Objects.requireNonNull(id, "Film ID cannot be null");
        Objects.requireNonNull(filmDetails, "Film details cannot be null");
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
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteFilm(@PathVariable Long id) {
        Objects.requireNonNull(id, "Film ID cannot be null");
        Film film = filmService.findById(id);
        if (film == null) {
            return ResponseEntity.notFound().build();
        }
        filmService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
