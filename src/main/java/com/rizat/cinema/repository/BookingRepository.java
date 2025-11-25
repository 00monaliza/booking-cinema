package com.rizat.cinema.repository;

import com.rizat.cinema.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findBySessionId(Long sessionId);
    List<Booking> findByUserId(Long userId);
}
