package com.varol.WellPass_Mananagement_System.implementation.auth;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.varol.WellPass_Mananagement_System.exception.custom.InvalidCredentialsException;
import com.varol.WellPass_Mananagement_System.exception.custom.ResourceNotFoundException;
import com.varol.WellPass_Mananagement_System.repository.user.UserRepository;
import com.varol.WellPass_Mananagement_System.security.JwtUtil;
import com.varol.WellPass_Mananagement_System.service.auth.JwtService;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JwtServiceImpl implements JwtService {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    @Override
    public String generateAccessToken(Long userId, String email, String role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userId);
        claims.put("role", role);

        UserDetails userDetails = User.builder()
                .username(email)
                .password("")
                .authorities(new SimpleGrantedAuthority("ROLE_" + role))
                .build();

        return jwtUtil.generateToken(userDetails, claims);
    }

    @Override
    public String generateRefreshToken(Long userId) {
        com.varol.WellPass_Mananagement_System.model.user.User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return jwtUtil.generateRefreshToken(userId, user.getEmail());
    }

    @Override
    public String refreshAccessToken(String refreshToken) {
        if (!jwtUtil.isRefreshToken(refreshToken)) {
            throw new InvalidCredentialsException("Invalid refresh token");
        }

        Long userId = getUserIdFromToken(refreshToken);
        String email = getEmailFromToken(refreshToken);

        com.varol.WellPass_Mananagement_System.model.user.User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return generateAccessToken(userId, email, user.getRole().name());
    }

    @Override
    public Claims validateToken(String token) {
        return jwtUtil.extractAllClaims(token);
    }

    @Override
    public Long getUserIdFromToken(String token) {
        Claims claims = validateToken(token);
        return claims.get("userId", Long.class);
    }

    @Override
    public String getEmailFromToken(String token) {
        return jwtUtil.extractUsername(token);
    }

    @Override
    public String getRoleFromToken(String token) {
        Claims claims = validateToken(token);
        return claims.get("role", String.class);
    }

    @Override
    public boolean isTokenExpired(String token) {
        return jwtUtil.extractExpiration(token).before(new java.util.Date());
    }
}