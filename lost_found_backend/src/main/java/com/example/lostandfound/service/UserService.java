package com.example.lostandfound.service;

import com.example.lostandfound.dto.LoginRequest;
import com.example.lostandfound.dto.SignupRequest;
import com.example.lostandfound.model.User;
import com.example.lostandfound.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List; // add this import

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public String signup(SignupRequest request) {
        if (userRepository.findByEmail(request.getEmail()) != null)
            return "User already exists.";
        User user = new User();
        user.setFullName(request.getFullName());
        user.setContactNumber(request.getContactNumber());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setUserType(request.getUserType());
        user.setDepartment(request.getDepartment());
        userRepository.save(user);
        return "Signup successful.";
    }

    public String login(LoginRequest loginReq) {
        User user = userRepository.findByEmail(loginReq.getEmail());
        if (user == null)
            return "User not found.";
        if (!user.getPassword().equals(loginReq.getPassword()))
            return "Invalid password.";
        if (!user.getUserType().equals(loginReq.getUserType()))
            return "User type mismatch.";
        return "Login successful.";
    }

    // below existing methods
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
