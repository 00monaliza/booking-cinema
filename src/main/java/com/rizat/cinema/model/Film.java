package com.rizat.cinema.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Entity
@Table(name = "films")
@Data
public class Film {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title cannot be empty")
    @Column(nullable = false)
    private String title;

    @NotBlank(message = "Genre cannot be empty")
    @Column(nullable = false)
    private String genre;

    @NotNull(message = "Duration cannot be null")
    @Positive(message = "Duration must be positive")
    @Column(nullable = false)
    private int duration;
}