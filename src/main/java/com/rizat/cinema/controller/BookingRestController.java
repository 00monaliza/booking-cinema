package com.rizat.cinema.controller;

import com.rizat.cinema.model.Booking;
import com.rizat.cinema.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/v1/bookings")
@CrossOrigin(origins = "*", maxAge = 3600)
public class BookingRestController {
    private final BookingService bookingService;

    public BookingRestController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/session/{sessionId}")
    public ResponseEntity<List<Booking>> getBookingsBySessionId(@PathVariable Long sessionId) {
        Objects.requireNonNull(sessionId, "Session ID cannot be null");
        List<Booking> bookings = bookingService.findBySession(sessionId);
        return ResponseEntity.ok(bookings);
    }

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody Booking booking) {
        try {
            Booking createdBooking = bookingService.createBooking(booking);
            return ResponseEntity.ok(createdBooking);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
