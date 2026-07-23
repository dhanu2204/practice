package com.practice.auth_service.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

@Service
public class JwtService {
    @Value("${jwt.secret}")
    private String secretKey;

    public String generateToken(String email) {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        return JWT.create().withSubject(email).withIssuedAt(new Date()).withExpiresAt(new Date(System.currentTimeMillis()+(1000*60*60))).sign(algorithm);
    }
}
