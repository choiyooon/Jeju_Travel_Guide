package com.example.jeju_server.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AccommodationDTO {
    private Integer id;
    private String nameKo;
    private String nameJp;
    private Double latitude;
    private Double longitude;
    private String address;
    private String image;
    private String kakaoMap;
    private List<String> keywordKo;
    private List<String> keywordJp;
    private Integer likes;
    private String explanationKo;
    private String explanationJp;
}