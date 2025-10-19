package com.rizat.cinema.repository;

import com.rizat.cinema.model.Film;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FilmRepository extends JpaRepository<Film, Long> {
}