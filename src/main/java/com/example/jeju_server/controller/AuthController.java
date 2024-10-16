package com.example.jeju_server.controller;

import com.example.jeju_server.domain.entity.UserEntity;
import com.example.jeju_server.security.JwtTokenProvider;
import com.example.jeju_server.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService; // 사용자 인증 로직을 처리할 서비스
    private final JwtTokenProvider jwtTokenProvider; // JWT 토큰 제공자 (JWT 방식을 사용할 경우)

    // 로그인 요청에 사용할 DTO 클래스
    public static class LoginRequest {
        public String email;
        public String password;
    }
    // 회원가입 요청에 사용할 DTO 클래스
    public static class SignupRequest {
        public String email;
        public String password;
        public String name;
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            // 사용자 인증 (UserService에서 이메일과 비밀번호로 인증 처리)
            UserEntity user = userService.authenticate(request.email, request.password);

            // 인증 성공 시 JWT 생성
            String token = jwtTokenProvider.createToken(user.getEmail(), user.getRoleName());

            // 인증된 사용자 정보와 함께 JWT를 반환
            return ResponseEntity.ok().body(token);
        } catch (Exception e) {
            // 인증 실패 시 401 Unauthorized 반환
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        try {
            // UserService에서 회원가입 로직 처리
            UserEntity newUser = userService.registerUser(request.email, request.password, request.name);

            // 회원가입 성공 시 인증된 사용자 정보 반환
            return ResponseEntity.ok().body("회원가입 성공: " + newUser.getEmail());
        } catch (Exception e) {
            // 회원가입 실패 시 오류 메시지 반환
            return ResponseEntity.status(400).body("회원가입 실패: " + e.getMessage());
        }
    }
}
