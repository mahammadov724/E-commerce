package com.example.e_commerce.util;

import java.security.Key;
import java.util.Base64;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
	
	private Key signinKey;

	public JwtUtil(@Value("${jwt.secret}") String secretKey) {
	 byte[] decode = Base64.getDecoder().decode(secretKey);
	 this.signinKey = Keys.hmacShaKeyFor(decode);
	}
	
	public String generateToken(String username) {
		return Jwts.builder()
				.setSubject(username)
				.setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + 86400000))
				.signWith(signinKey)
				.compact();
	}
	
	public String extractUsername(String token) {
		Claims claims = Jwts.parserBuilder()
				.setSigningKey(signinKey)
				.build()
				.parseClaimsJws(token)
				.getBody();
		return claims.getSubject();
	}
}