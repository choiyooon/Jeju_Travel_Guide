package com.example.jeju_server.controller;

import com.example.jeju_server.domain.dto.AttractionDTO;
import com.example.jeju_server.domain.dto.RestaurantDTO;
import com.example.jeju_server.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
@RequiredArgsConstructor
public class RestaurantController {
    private final RestaurantService restaurantService;

    // 모든 식당 정보 가져오기
    @GetMapping
    public ResponseEntity<List<RestaurantDTO>> getAllAttractions() {
        List<RestaurantDTO> restaurants = restaurantService.getAllRestaurants();
        return ResponseEntity.ok(restaurants);
    }

}
