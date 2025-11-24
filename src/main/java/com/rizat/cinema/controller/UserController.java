package com.rizat.cinema.controller;

import com.rizat.cinema.config.JwtUtil;
import com.rizat.cinema.dto.LoginResponse;
import com.rizat.cinema.dto.UserLoginRequest;
import com.rizat.cinema.dto.UserRegistrationRequest;
import com.rizat.cinema.dto.UserResponse;
import com.rizat.cinema.model.User;
import com.rizat.cinema.repository.UserRepository;
import com.rizat.cinema.util.ValidationUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRegistrationRequest request) {
        Objects.requireNonNull(request, "User registration request cannot be null");

        // Валидация обязательных полей
        ValidationUtil.requireNonEmpty(request.getUsername(), "Username");
        ValidationUtil.requireNonEmpty(request.getPassword(), "Password");

        // Email теперь опциональный
        if (request.getEmail() != null && !request.getEmail().isEmpty()) {
            if (!ValidationUtil.isValidEmail(request.getEmail())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("error", "Invalid email format. Please provide a valid email address"));
            }
            if (userRepository.existsByEmail(request.getEmail())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("error", "Email already exists"));
            }
        }

        // Валидация пароля
        if (!ValidationUtil.isValidPassword(request.getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", ValidationUtil.getPasswordRequirements()));
        }

        // Проверка на существование пользователя
        if (userRepository.existsByUsername(request.getUsername())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Username already exists"));
        }

        // Создание нового пользователя
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole() != null ? request.getRole() : User.UserRole.USER);

        User savedUser = userRepository.save(user);

        // Генерация JWT токена
        String token = jwtUtil.generateToken(savedUser.getUsername(), savedUser.getRole().toString());

        // Возврат ответа с токеном
        LoginResponse response = new LoginResponse(token, savedUser.getUsername(), savedUser.getRole().toString());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginRequest request) {
        Objects.requireNonNull(request, "Login request cannot be null");

        ValidationUtil.requireNonEmpty(request.getUsername(), "Username");
        ValidationUtil.requireNonEmpty(request.getPassword(), "Password");

        var user = userRepository.findByUsername(request.getUsername());

        if (user.isEmpty() || !passwordEncoder.matches(request.getPassword(), user.get().getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid credentials"));
        }

        // Генерация JWT токена
        String token = jwtUtil.generateToken(user.get().getUsername(), user.get().getRole().toString());

        LoginResponse response = new LoginResponse(token, user.get().getUsername(), user.get().getRole().toString());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String token) {
        Objects.requireNonNull(token, "Authorization header cannot be null");

        if (!token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid token format"));
        }

        String jwt = token.substring(7);
        String username = jwtUtil.extractUsername(jwt);
        var user = userRepository.findByUsername(username);

        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "User not found"));
        }

        UserResponse response = new UserResponse(user.get());
        return ResponseEntity.ok(response);
    }
}
