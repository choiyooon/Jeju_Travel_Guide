package com.example.jeju_server.security;

import com.example.jeju_server.domain.entity.UserEntity;
import com.example.jeju_server.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthenticatedUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        log.info("로그인 시도 : {}", id);

        UserEntity userEntity = userRepository.findById(id)
                .orElseThrow(() -> {
                    return new UsernameNotFoundException(id + " : 없는 ID입니다.");
                });

        log.debug("조회정보 : {}", userEntity);

        // 인증정보 생성
        AuthenticatedUser user = AuthenticatedUser.builder()
                .email(userEntity.getEmail())
                .password(userEntity.getPassword())
                .name(userEntity.getName())
                .enabled(userEntity.isEnabled())
                .roleName(userEntity.getRoleName())
                .build();

        return user;
    }
}
