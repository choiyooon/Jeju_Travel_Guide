package com.example.jeju_server.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
public class UserEntity {
    @Id // 기본 키 매핑
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 자동 증가 설정 (MySQL에서는 AUTO_INCREMENT)
    private int id;

    @Column(nullable = false, unique = true) // 이메일은 고유 값이며 null 허용 안 함
    private String email;

    @Column(nullable = false) // 비밀번호는 null 허용 안 함
    private String password;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false) // 역할 이름도 null 허용 안 함
    private String roleName;

    @Column(nullable = false) // 활성화 여부
    private boolean enabled;
}
