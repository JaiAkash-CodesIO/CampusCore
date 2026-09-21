package com.studentmanagement.service;

import com.studentmanagement.dto.LoginRequest;
import com.studentmanagement.dto.LoginResponse;
import com.studentmanagement.entity.Student;
import com.studentmanagement.repository.StudentRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(
            StudentRepository studentRepository,
            PasswordEncoder passwordEncoder) {

        this.studentRepository = studentRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public LoginResponse login(LoginRequest loginRequest) {

        Optional<Student> studentOptional =
                studentRepository.findByEmail(loginRequest.getEmail());

        if (studentOptional.isEmpty()) {

            return new LoginResponse(
                    false,
                    "Invalid email or password",
                    null
            );
        }

        Student student = studentOptional.get();

        boolean passwordMatches =
                passwordEncoder.matches(
                        loginRequest.getPassword(),
                        student.getPassword()
                );

        if (!passwordMatches) {

            return new LoginResponse(
                    false,
                    "Invalid email or password",
                    null
            );
        }

        return new LoginResponse(
                true,
                "Login successful",
                student.getId()
        );
    }
}