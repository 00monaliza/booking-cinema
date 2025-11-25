package com.rizat.cinema.controller;

import com.rizat.cinema.model.Booking;
import com.rizat.cinema.repository.UserRepository;
import com.rizat.cinema.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/api/v1/bookings")
public class BookingRestController {
    private final BookingService bookingService;
    private final UserRepository userRepository;

    public BookingRestController(BookingService bookingService, UserRepository userRepository) {
        this.bookingService = bookingService;
        this.userRepository = userRepository;
    }

    @GetMapping("/session/{sessionId}")
    public ResponseEntity<List<Booking>> getBookingsBySessionId(@PathVariable Long sessionId) {
        Objects.requireNonNull(sessionId, "Session ID cannot be null");
        List<Booking> bookings = bookingService.findBySession(sessionId);
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getUserBookings() {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String username = auth.getName();
            
            Long userId = userRepository.findByUsername(username)
                    .map(u -> u.getId())
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));
            
            List<Booking> bookings = bookingService.findByUser(userId);
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> createBooking(@RequestBody Map<String, Object> request) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String username = auth.getName();

            Long userId = userRepository.findByUsername(username)
                    .map(u -> u.getId())
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));

            Long sessionId = Long.parseLong(request.get("sessionId").toString());
            List<?> seatNumbersObj = (List<?>) request.get("seatNumbers");
            List<Integer> seatNumbers = seatNumbersObj.stream()
                    .map(s -> Integer.parseInt(s.toString()))
                    .toList();

            Booking createdBooking = bookingService.createBooking(userId, sessionId, seatNumbers);
            return ResponseEntity.ok(createdBooking);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Booking failed: " + e.getMessage()));
        }
    }
}
