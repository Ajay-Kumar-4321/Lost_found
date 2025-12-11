package com.example.lostandfound.dto;

import lombok.Data;

@Data
public class SignupRequest {
    private String userType;
    private String fullName;
    private String contactNumber;
    private String email;
    private String password;
    private String department;
}
