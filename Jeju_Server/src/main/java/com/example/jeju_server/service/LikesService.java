package com.example.jeju_server.service;

import com.example.jeju_server.domain.entity.LikesEntity;
import com.example.jeju_server.domain.entity.UserEntity;
import com.example.jeju_server.domain.enums.PlaceType;
import com.example.jeju_server.repository.LikesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class LikesService {

    @Autowired
    private LikesRepository likesRepository;

    public boolean unlike(UserEntity user, Integer placeId, PlaceType placeType) {
        // likes 테이블에서 해당 사용자가 해당 장소에 좋아요를 눌렀는지 확인
        LikesEntity existingLike = likesRepository.findByUserAndPlaceIdAndPlaceType(user, placeId, placeType).orElse(null);

        // 좋아요가 이미 존재할 경우
        if (existingLike != null) {
            existingLike.setIsActive(false);  // 비활성화 처리
            existingLike.setUpdatedAt(LocalDateTime.now()); // 업데이트 날짜를 현재 시간으로 변경
            likesRepository.save(existingLike); // 변경사항 저장
            return true; // 좋아요 취소 성공
        }

        return false; // 좋아요가 존재하지 않는 경우
    }

    public boolean addLike(UserEntity user, Integer placeId, PlaceType placeType) {
        // likes 테이블에서 이미 해당 사용자가 해당 장소에 좋아요를 눌렀는지 확인
        LikesEntity existingLike = likesRepository.findByUserAndPlaceIdAndPlaceType(user, placeId, placeType).orElse(null);

        if (existingLike != null) {
            if (!existingLike.getIsActive()) { // 좋아요가 비활성화된 경우
                existingLike.setIsActive(true); // isActive를 true로 변경
                existingLike.setUpdatedAt(LocalDateTime.now()); // 업데이트 날짜를 현재 시간으로 변경
                likesRepository.save(existingLike); // 변경사항 저장
                return true; // 비활성화된 좋아요를 다시 활성화
            }
            return false;  // 이미 좋아요가 존재하는 경우
        }

        // 새로운 좋아요 기록 추가
        LikesEntity newLike = LikesEntity.builder()
                .user(user)
                .placeId(placeId)
                .placeType(placeType)
                .createdAt(LocalDateTime.now())
                .updatedAt(null)  // updatedAt은 null
                .isActive(true)
                .build();
        likesRepository.save(newLike);
        return true; // 새로운 좋아요 추가 성공
    }

}
