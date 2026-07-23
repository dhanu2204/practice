package com.practice.home_service.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

@RestController
@RequestMapping("/api/home")
@CrossOrigin(origins="*")
public class HomeController {

    @Value("${jwt.secret}")
    private String secretKey;

    @GetMapping
    public ResponseEntity<String> getHomePage(@RequestHeader("Authorization") String tokenHeader)
    {
        try{
            String token= tokenHeader.replace("Bearer ", "");
            Algorithm algorithm = Algorithm.HMAC256(secretKey);
            DecodedJWT jwt= JWT.require(algorithm).build().verify(token);
            String email = jwt.getSubject();
            return ResponseEntity.ok("Welcome "+email);
        }
        catch(Exception e){
            return ResponseEntity.status(401).body("Invalid Token");
        }
    }
}
