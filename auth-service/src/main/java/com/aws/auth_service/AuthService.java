package com.aws.auth_service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private AuthRepository authRepository;

    public String registerUser(Users user) {
        if(authRepository.findByEmail(user.getEmail()).isPresent()){
            return "User already exists";
        }
        authRepository.save(user);
        return "User registered successfully";
    }

    public String loginUser(Users user) {
        Optional<Users> optionalUser = authRepository.findByEmail(user.getEmail());
        if(!optionalUser.isPresent()){
            return "User not found";
        }
        Users savedUser = optionalUser.get();
        if(!savedUser.getPassword().equals(user.getPassword())){
            return "Invalid credentials";
        }
        return "User logged in successfully";
    }
}
