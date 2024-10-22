package com.example.jeju_server.domain.dto;

import com.example.jeju_server.domain.enums.PlaceType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.security.Timestamp;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LikesDTO {
    private Integer id;
    private Integer userId;
    private Integer placeId;
    private PlaceType placeType;  // 장소 유형 (activity, attraction 등)
    private Timestamp createdAt;  // 좋아요가 눌린 시간
    private Timestamp updatedAt;  // 마지막 업데이트 시간
    private Boolean isActive; // 좋아요 활성화 상태

}