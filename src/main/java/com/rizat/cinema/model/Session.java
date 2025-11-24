package com.rizat.cinema.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Session {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Film film;

    private LocalDateTime startTime;
    private String hall;
    private int totalSeats;
    private int availableSeats;

    public Session() {}

    public Session(Film film, LocalDateTime startTime, String hall, int totalSeats) {
        this.film = film;
        this.startTime = startTime;
        this.hall = hall;
        this.totalSeats = totalSeats;
        this.availableSeats = totalSeats;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Film getFilm() { return film; }
    public void setFilm(Film film) { this.film = film; }
    public LocalDateTime getStartTime() { return startTime; }
    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }
    public String getHall() { return hall; }
    public void setHall(String hall) { this.hall = hall; }
    public int getTotalSeats() { return totalSeats; }
    public void setTotalSeats(int totalSeats) { this.totalSeats = totalSeats; }
    public int getAvailableSeats() { return availableSeats; }
    public void setAvailableSeats(int availableSeats) { this.availableSeats = availableSeats; }
}
