package com.rizat.cinema.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "sessions")
@Data
public class Session {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Film cannot be null")
    @ManyToOne
    @JoinColumn(name = "film_id", nullable = false)
    private Film film;

    @NotNull(message = "Start time cannot be null")
    @Future(message = "Start time must be in the future")
    @Column(nullable = false)
    private LocalDateTime startTime;

    @NotBlank(message = "Hall cannot be empty")
    @Column(nullable = false)
    private String hall;

    @NotNull(message = "Total seats cannot be null")
    @Positive(message = "Total seats must be positive")
    @Column(nullable = false)
    private int totalSeats;

    @NotNull(message = "Available seats cannot be null")
    @Positive(message = "Available seats must be positive")
    @Column(nullable = false)
    private int availableSeats;
}