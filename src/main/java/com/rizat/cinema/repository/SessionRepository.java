package com.rizat.cinema.repository;

import com.rizat.cinema.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface SessionRepository extends JpaRepository<Session, Long> {
    List<Session> findByFilmIdAndStartTimeAfter(Long filmId, LocalDateTime startTime);
}