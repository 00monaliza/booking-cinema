package com.rizat.cinema.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Entity
@Table(name = "bookings")
@Data
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Session cannot be null")
    @ManyToOne
    @JoinColumn(name = "session_id", nullable = false)
    private Session session;

    @NotNull(message = "User cannot be null")
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotNull(message = "Seat number cannot be null")
    @Positive(message = "Seat number must be positive")
    @Column(nullable = false)
    private int seatNumber;
}