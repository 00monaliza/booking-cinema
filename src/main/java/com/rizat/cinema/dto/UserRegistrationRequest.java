package com.rizat.cinema.dto;

import com.rizat.cinema.model.User;

public class UserRegistrationRequest {
    private String username;
    private String email;
    private String phone;
    private String password;
    private User.UserRole role;

    // Constructors
    public UserRegistrationRequest() {}

    public UserRegistrationRequest(String username, String email, String phone, String password) {
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.role = User.UserRole.USER;
    }

    // Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public User.UserRole getRole() {
        return role;
    }

    public void setRole(User.UserRole role) {
        this.role = role;
    }
}
