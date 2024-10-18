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
public class RestaurantDTO {
    private Long id;
    private String name;
    private Double latitude;
    private Double longitude;
    private String address;
    private String image;
    private String kakaoMap;
    private List<String> keyword;
    private int likes;
    private String explanation;
}