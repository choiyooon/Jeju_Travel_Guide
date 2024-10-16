package com.example.jeju_server.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long id; // 유저의 고유 ID (optional, 사용자 생성 시에는 null일 수 있음)
    private String email; // 유저 이메일
    private String password; // 유저 비밀번호
    private String name; // 유저 이름
    private String roleName; // 유저 역할
    private boolean enabled; // 유저 활성화 여부
}