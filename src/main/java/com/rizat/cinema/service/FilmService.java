package com.rizat.cinema.service;

import com.rizat.cinema.model.Film;
import com.rizat.cinema.repository.FilmRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class FilmService {
    private final FilmRepository filmRepository;

    public FilmService(FilmRepository filmRepository) {
        this.filmRepository = filmRepository;
    }

    public List<Film> listAll() {
        return filmRepository.findAll();
    }

    public Page<Film> listAll(@NonNull Pageable pageable) {
        return filmRepository.findAll(pageable);
    }

    public Film save(Film film) {
        return filmRepository.save(Objects.requireNonNull(film, "Film cannot be null"));
    }

    public Film findById(Long id) {
        return filmRepository.findById(Objects.requireNonNull(id, "ID cannot be null")).orElse(null);
    }

    public List<Film> findByTitleContaining(String title) {
        return filmRepository.findByTitleContainingIgnoreCase(Objects.requireNonNull(title, "Title cannot be null"));
    }

    public List<Film> findByGenre(String genre) {
        return filmRepository.findByGenreIgnoreCase(Objects.requireNonNull(genre, "Genre cannot be null"));
    }

    public void delete(Long id) {
        Objects.requireNonNull(id, "ID cannot be null");
        if (!filmRepository.existsById(id)) {
            throw new IllegalArgumentException("Film with ID " + id + " does not exist");
        }
        filmRepository.deleteById(id);
    }
}
