package com.example.lostandfound.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String userType; // student, staff, admin
    private String fullName;
    private String contactNumber;
    @Column(unique = true)
    private String email;
    private String password;
    private String department;
}
