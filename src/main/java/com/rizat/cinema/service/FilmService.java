package com.rizat.cinema.service;

import com.rizat.cinema.model.Film;
import com.rizat.cinema.repository.FilmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FilmService {

    private final FilmRepository filmRepository;

    @Autowired
    public FilmService(FilmRepository filmRepository) {
        this.filmRepository = filmRepository;
    }

    public Film createFilm(Film film) {
        if (film.getTitle() == null || film.getTitle().isEmpty()) {
            throw new IllegalArgumentException("Film title cannot be empty");
        }
        if (film.getGenre() == null || film.getGenre().isEmpty()) {
            throw new IllegalArgumentException("Film genre cannot be empty");
        }
        if (film.getDuration() <= 0) {
            throw new IllegalArgumentException("Film duration must be positive");
        }
        return filmRepository.save(film);
    }

    public List<Film> getAllFilms() {
        return filmRepository.findAll();
    }

    public Optional<Film> getFilmById(Long id) {
        return filmRepository.findById(id);
    }
}