package com.example.e_commerce.util;

import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

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
	
	public String generateToken(Integer id,String username,String name,String surname,String email) {
		Map<String, Object> claims = new HashMap<String, Object>();
		claims.put("id", id);
		claims.put("name", name);
		claims.put("surname", surname);
		claims.put("email", email);
		claims.put("username", username);
		
		return Jwts.builder()
				.setClaims(claims)
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
	
	public Map<String, Object> extractClaims(String token){
		Claims claims = Jwts.parserBuilder()
				.setSigningKey(signinKey)
				.build()
				.parseClaimsJws(token)
				.getBody();
		
		Map<String, Object> claimMap = new HashMap<String, Object>();
		claimMap.put("id", claims.get("id"));
		claimMap.put("name", claims.get("name").toString());
		claimMap.put("surname", claims.get("surname").toString());
		claimMap.put("email", claims.get("email").toString());
		claimMap.put("username", claims.get("username").toString());
		
		return claimMap;
	}
}