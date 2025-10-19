package com.rizat.cinema.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "films")
@Data // Генерирует геттеры, сеттеры, toString, equals, hashCode
public class Film {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String genre;

    @Column(nullable = false)
    private int duration; // Длительность в минутах
}