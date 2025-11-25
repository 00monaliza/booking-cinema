package com.rizat.cinema.service;

import com.rizat.cinema.model.Booking;
import com.rizat.cinema.model.Session;
import com.rizat.cinema.model.User;
import com.rizat.cinema.repository.BookingRepository;
import com.rizat.cinema.repository.SessionRepository;
import com.rizat.cinema.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;
    private final SessionRepository sessionRepository;
    private final UserRepository userRepository;

    public BookingService(BookingRepository bookingRepository, SessionRepository sessionRepository, UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.sessionRepository = sessionRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public synchronized Booking createBooking(Long userId, Long sessionId, List<Integer> seatNumbers) {
        if (seatNumbers == null || seatNumbers.isEmpty()) {
            throw new IllegalArgumentException("At least one seat must be selected");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("Session not found"));

        // Get all booked seats for this session
        Set<Integer> bookedSeats = bookingRepository.findBySessionId(sessionId).stream()
                .flatMap(b -> b.getSeatNumbers().stream())
                .collect(Collectors.toSet());

        // Check if any requested seat is already booked
        for (Integer seatNum : seatNumbers) {
            if (bookedSeats.contains(seatNum)) {
                throw new IllegalArgumentException("Seat " + seatNum + " is already booked");
            }
        }

        if (session.getAvailableSeats() < seatNumbers.size()) {
            throw new IllegalArgumentException("Not enough available seats");
        }

        // Create booking
        Booking booking = new Booking(user, session, seatNumbers);
        bookingRepository.save(booking);

        // Update available seats
        session.setAvailableSeats(session.getAvailableSeats() - seatNumbers.size());
        sessionRepository.save(session);

        return booking;
    }

    public List<Booking> findBySession(Long sessionId) {
        return bookingRepository.findBySessionId(sessionId);
    }

    public List<Booking> findByUser(Long userId) {
        return bookingRepository.findByUserId(userId);
    }
}
