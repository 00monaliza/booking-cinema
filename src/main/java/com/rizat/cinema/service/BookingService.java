package com.rizat.cinema.service;

import com.rizat.cinema.model.Booking;
import com.rizat.cinema.model.Session;
import com.rizat.cinema.model.User;
import com.rizat.cinema.repository.BookingRepository;
import com.rizat.cinema.repository.SessionRepository;
import com.rizat.cinema.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final SessionRepository sessionRepository;
    private final UserRepository userRepository;

    @Autowired
    public BookingService(BookingRepository bookingRepository, SessionRepository sessionRepository, UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.sessionRepository = sessionRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Booking createBooking(Long sessionId, Long userId, int seatNumber) {
        Optional<Session> session = sessionRepository.findById(sessionId);
        if (session.isEmpty()) {
            throw new IllegalArgumentException("Session not found");
        }
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }
        if (bookingRepository.existsBySessionIdAndSeatNumber(sessionId, seatNumber)) {
            throw new IllegalStateException("Seat is already booked");
        }
        if (session.get().getAvailableSeats() <= 0) {
            throw new IllegalStateException("No available seats");
        }
        if (seatNumber < 1 || seatNumber > session.get().getTotalSeats()) {
            throw new IllegalArgumentException("Invalid seat number");
        }

        Booking booking = new Booking();
        booking.setSession(session.get());
        booking.setUser(user.get());
        booking.setSeatNumber(seatNumber);

        session.get().setAvailableSeats(session.get().getAvailableSeats() - 1);
        sessionRepository.save(session.get());

        return bookingRepository.save(booking);
    }

    public List<Booking> getUserBookings(Long userId) {
        return bookingRepository.findByUserId(userId);
    }
}