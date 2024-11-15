package com.invoicelogin.auth;

import com.invoicelogin.exceptions.InvoiceErrorMessageHandler;
import com.invoicelogin.exceptions.InvoiceErrorMessageKey;
import com.invoicelogin.exceptions.InvoiceException;
import com.invoicelogin.util.Constants;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Component
public class JwtTokenUtil {
    // Hex Key: 22ba0f64f69a9f1f10bbbc7d5949486aa0199f44c6d071201d7df7b5c5bae5da
    // Plain text key: LAC RITE SELL TOLD LAMB GREG ED SKIN JAG LORD HATE PUB JACK RAVE RODE GOAL BET GREW IKE TRIM TONE GILL LIEN TONE
    // Reverse: 22ba0f64f69a9f1f10bbbc7d5949486aa0199f44c6d071201d7df7b5c5bae5da
    private static final String SECRET_KEY = "22ba0f64f69a9f1f10bbbc7d5949486aa0199f44c6d071201d7df7b5c5bae5da"; // Or load from a secure place
    private static Key key;

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private static Long expiration;

    @PostConstruct
    private void init() {
        key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    public static String generateToken(String username, List<String> roles) {
       String token = Jwts.builder()
               .setSubject(username)
               .setIssuedAt(new Date())
               .claim(Constants.ROLES, roles)
               .setExpiration(new Date(System.currentTimeMillis() + 3600000))
               .signWith(key)
               .compact();
       return token;
    }

    private static String doGenerateToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(key)
                .compact();
    }

    public static Claims decodeToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public static Claims validateToken(String token) throws InvoiceException {
        try {
            return decodeToken(token);
        } catch (JwtException e) {
            log.error("Invalid JWT token: {}", e.getMessage());
            throw new InvoiceException(InvoiceErrorMessageHandler.getMessage(InvoiceErrorMessageKey.INVALID_TOKEN),
                    HttpStatus.UNAUTHORIZED);
        }
    }
}
