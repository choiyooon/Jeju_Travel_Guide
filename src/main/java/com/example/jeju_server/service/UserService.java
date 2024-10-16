package com.example.jeju_server.service;

import com.example.jeju_server.domain.entity.UserEntity;
import com.example.jeju_server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserEntity authenticate(String email, String password) {
        // 이메일을 사용하여 사용자 검색
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("이메일 또는 비밀번호가 잘못되었습니다."));

        // 비밀번호가 맞는지 확인
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("이메일 또는 비밀번호가 잘못되었습니다.");
        }

        return user;
    }

    // 회원가입 로직
    public UserEntity registerUser(String email, String password, String name) throws Exception {
        // 이메일 중복 체크
        if (userRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("이미 존재하는 이메일입니다."); // 커스텀 예외 대신 IllegalArgumentException 사용
        }

        // 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(password);

        // 새로운 사용자 엔티티 생성 및 저장
        UserEntity newUser = new UserEntity();
        newUser.setEmail(email);
        newUser.setPassword(encodedPassword);
        newUser.setName(name);
        newUser.setRoleName("USER"); // 기본 역할 설정

        return userRepository.save(newUser); // 저장 후 반환
    }
}
