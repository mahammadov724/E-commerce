package com.example.e_commerce.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import jakarta.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	@Autowired
	private AuthFilter authFilter;
	
	 @Bean
	    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	        return http
	            .csrf(csrf -> csrf.disable())
	            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
	            .authorizeHttpRequests(auth -> auth
	            	.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
	            	.requestMatchers(HttpMethod.POST, "/users/register").permitAll()
	            	.requestMatchers(HttpMethod.POST, "/users/login").permitAll()
	                .anyRequest().authenticated()
	            )
	            .exceptionHandling(exc -> exc
	            		.authenticationEntryPoint((request,response,authException) -> {
	            			response.sendError(HttpServletResponse.SC_UNAUTHORIZED); //401
	            		}))
	            .addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class)
	            .build();
	    }

	    @Bean
	    public PasswordEncoder passwordEncoder() {
	        return new BCryptPasswordEncoder();
	    }
}