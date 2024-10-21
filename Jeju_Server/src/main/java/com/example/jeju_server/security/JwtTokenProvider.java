package com.example.jeju_server.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.Base64;
import java.util.Date;


@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.token-validity-in-seconds}")
    private long tokenValidityInSeconds;

    private long tokenValidityMilliseconds; // 동적으로 설정하기 위해 필드를 분리

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
        tokenValidityMilliseconds = tokenValidityInSeconds * 1000; // 초를 밀리초로 변환
    }

    // JWT 토큰 생성
    public String createToken(String email, String role) {
        Claims claims = Jwts.claims().setSubject(email); // JWT payload에 저장될 정보
        claims.put("role", role); // 사용자 권한 정보

        Date now = new Date();
        Date validity = new Date(now.getTime() + tokenValidityMilliseconds);

        return Jwts.builder()
                .setClaims(claims) // 클레임 정보 설정
                .setIssuedAt(now) // 토큰 발행 시간
                .setExpiration(validity) // 토큰 만료 시간
                .signWith(SignatureAlgorithm.HS256, secretKey) // 사용할 암호화 알고리즘과 secretKey 설정
                .compact();
    }

    // 토큰에서 사용자 정보(email) 추출
    public String getEmail(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject(); // subject에서 사용자 ID(email)을 가져옴
    }

    // 토큰 유효성 및 만료일자 확인
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(secretKey) // 서명 검증에 사용할 비밀키 설정
                    .build()
                    .parseClaimsJws(token); // 토큰 서명 및 유효성 검증
            return true; // 유효한 토큰이면 true 반환
        } catch (Exception e) {
            return false; // 유효하지 않은 토큰이면 false 반환
        }
    }

    // Request의 Header에서 token 값 추출 ("Authorization" : "Bearer token")
    public String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
