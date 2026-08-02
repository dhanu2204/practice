package com.aws.auth_service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Users user){
        String savedUser = authService.registerUser(user);
        if(savedUser.equals("User already exists")){
            return ResponseEntity.badRequest().body(savedUser);
        }
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Users user){
        String savedUser = authService.loginUser(user);
        if(savedUser.equals("User not found")){
            return ResponseEntity.badRequest().body(savedUser);
        }
        return ResponseEntity.ok(savedUser);
    }
    
}
