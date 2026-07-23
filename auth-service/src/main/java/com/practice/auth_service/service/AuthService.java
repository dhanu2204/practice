package com.practice.auth_service.service;

import java.util.Optional;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.practice.auth_service.model.Users;
import com.practice.auth_service.repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    public String registerUser(Users user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "User Already exists";
        } else {
            String hashedpassword = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
            user.setPassword(hashedpassword);
            userRepository.save(user);
            return "User Registered Sucessfully";
        }
    }

    public String loginUser(String email, String password) {
        Optional<Users> existsUser = userRepository.findByEmail(email);
        if (existsUser.isEmpty()) {
            return "User Not Exists";
        }
        if (!BCrypt.checkpw(password, existsUser.get().getPassword())) {
            return "Invalid Password";
        } else {
            return jwtService.generateToken(email);
        }
    }
}
