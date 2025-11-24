package com.rizat.cinema.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * Utility class to generate BCrypt password hashes for test users
 * Run this class to generate hashes for data.sql
 */
public class PasswordHashGenerator {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        String adminPassword = "Admin123";
        String userPassword = "User1234";

        String adminHash = encoder.encode(adminPassword);
        String userHash = encoder.encode(userPassword);

        System.out.println("=== BCrypt Password Hashes ===");
        System.out.println();
        System.out.println("Admin password: " + adminPassword);
        System.out.println("Admin hash: " + adminHash);
        System.out.println();
        System.out.println("User password: " + userPassword);
        System.out.println("User hash: " + userHash);
        System.out.println();
        System.out.println("=== Copy these to data.sql ===");
        System.out.println("INSERT INTO users (username, email, phone, password, role)");
        System.out.println("VALUES ('admin', 'admin@cinema.com', '+79991234567', '" + adminHash + "', 'ADMIN');");
        System.out.println("INSERT INTO users (username, email, phone, password, role)");
        System.out.println("VALUES ('user', 'user@cinema.com', '+79989876543', '" + userHash + "', 'USER');");
    }
}
