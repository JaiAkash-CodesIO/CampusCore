package com.studentmanagement.controller;

import com.studentmanagement.dto.StudentResponse;
import com.studentmanagement.entity.Student;
import com.studentmanagement.service.StudentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerStudent(
            @RequestBody Student student) {

        try {

            Student savedStudent =
                    studentService.registerStudent(student);

            StudentResponse response =
                    StudentResponse.fromStudent(savedStudent);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(response);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<StudentResponse>> getAllStudents() {

        List<StudentResponse> students =
                studentService.getAllStudents()
                        .stream()
                        .map(StudentResponse::fromStudent)
                        .toList();

        return ResponseEntity.ok(students);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getStudentById(
            @PathVariable Long id) {

        Optional<Student> student =
                studentService.getStudentById(id);

        if (student.isPresent()) {

            StudentResponse response =
                    StudentResponse.fromStudent(student.get());

            return ResponseEntity.ok(response);
        }

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body("Student not found");
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<?> getStudentByEmail(
            @PathVariable String email) {

        Optional<Student> student =
                studentService.getStudentByEmail(email);

        if (student.isPresent()) {

            StudentResponse response =
                    StudentResponse.fromStudent(student.get());

            return ResponseEntity.ok(response);
        }

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body("Student not found");
    }
}