package com.example.jeju_server.controller;

import com.example.jeju_server.domain.entity.UserEntity;
import com.example.jeju_server.domain.enums.PlaceType;
import com.example.jeju_server.security.JwtTokenProvider;
import com.example.jeju_server.service.LikesService;
import com.example.jeju_server.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService; // 사용자 인증 로직을 처리할 서비스
    private final JwtTokenProvider jwtTokenProvider; // JWT 토큰 제공자 (JWT 방식을 사용할 경우)
    private final LikesService likesService;
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

    @RequestMapping(value = "/like", method = {RequestMethod.POST, RequestMethod.DELETE})
    public ResponseEntity<?> toggleLike(@RequestBody Map<String, Object> requestBody,
                                        @RequestHeader("Authorization") String token,
                                        HttpServletRequest request) {
        try {
            // 받은 토큰 검증
            if (!jwtTokenProvider.validateToken(token.substring(7))) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
            }

            // 토큰에서 사용자 이메일 추출
            String email = jwtTokenProvider.getEmail(token.substring(7));

            // placeId와 placeType을 추출
            Integer placeId = (Integer) requestBody.get("placeId");
            String placeTypeString = (String) requestBody.get("placeType");

            // Enum으로 변환
            PlaceType placeType;
            try {
                placeType = PlaceType.valueOf(placeTypeString.toUpperCase()); // 소문자 그대로 사용
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body("Invalid place type: " + placeTypeString);
            }
            // 사용자 정보 조회
            UserEntity user = userService.findByEmail(email);

            // 요청의 메서드에 따라 좋아요 추가 또는 취소
            String requestMethod = request.getMethod();
            if ("POST".equals(requestMethod)) {
                boolean isLiked = likesService.addLike(user, placeId, placeType);
                if (isLiked) {
                    userService.incrementPlaceLikes(placeId, placeType);
                    return ResponseEntity.ok().body("Like added successfully");
                } else {
                    return ResponseEntity.status(409).body("Like already exists");
                }
            } else if ("DELETE".equals(requestMethod)) {
                boolean isUnliked = likesService.unlike(user, placeId, placeType);
                if (isUnliked) {
                    userService.decrementPlaceLikes(placeId, placeType); // 좋아요 수 감소
                    return ResponseEntity.ok().body("Like removed successfully");
                } else {
                    return ResponseEntity.status(409).body("Like not found");
                }
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error processing like request: " + e.getMessage());
        }
        return ResponseEntity.badRequest().body("Invalid request");
    }



}
