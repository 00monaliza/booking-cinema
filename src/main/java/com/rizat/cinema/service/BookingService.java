package com.rizat.cinema.service;

import com.rizat.cinema.model.Booking;
import com.rizat.cinema.model.Session;
import com.rizat.cinema.repository.BookingRepository;
import com.rizat.cinema.repository.SessionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;
    private final SessionRepository sessionRepository;

    public BookingService(BookingRepository bookingRepository, SessionRepository sessionRepository) {
        this.bookingRepository = bookingRepository;
        this.sessionRepository = sessionRepository;
    }

    @Transactional
    public synchronized Booking createBooking(Booking bookingRequest) {
        Long sessionId = bookingRequest.getSession().getId();
        Session session = sessionRepository.findById(Objects.requireNonNull(sessionId, "Session ID cannot be null")).orElseThrow(() -> new IllegalArgumentException("Session not found"));

        // check seat not already booked
        boolean seatTaken = bookingRepository.findBySessionId(sessionId).stream()
                .anyMatch(b -> b.getSeatNumber() == bookingRequest.getSeatNumber());
        if (seatTaken) throw new IllegalArgumentException("Seat already booked");

        if (session.getAvailableSeats() <= 0) throw new IllegalArgumentException("No seats available");

        session.setAvailableSeats(session.getAvailableSeats() - 1);
        sessionRepository.save(session);

        bookingRequest.setSession(session);
        return bookingRepository.save(bookingRequest);
    }

    public List<Booking> findBySession(Long sessionId) {
        return bookingRepository.findBySessionId(sessionId);
    }
}
