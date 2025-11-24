package com.rizat.cinema.service;

import com.rizat.cinema.model.Film;
import com.rizat.cinema.repository.FilmRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class FilmService {
    private final FilmRepository filmRepository;

    public FilmService(FilmRepository filmRepository) {
        this.filmRepository = filmRepository;
    }

    public List<Film> listAll() { return filmRepository.findAll(); }
    public Film save(Film film) { return filmRepository.save(Objects.requireNonNull(film, "Film cannot be null")); }
    public Film findById(Long id) { return filmRepository.findById(Objects.requireNonNull(id, "ID cannot be null")).orElse(null); }
}
