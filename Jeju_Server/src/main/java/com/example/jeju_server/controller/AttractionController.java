package com.example.jeju_server.controller;

import com.example.jeju_server.domain.dto.ActivityDTO;
import com.example.jeju_server.domain.dto.AttractionDTO;
import com.example.jeju_server.service.AttractionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/attractions")
@RequiredArgsConstructor
public class AttractionController {
    private final AttractionService attractionService;

    // 모든 명소 정보 가져오기
    @GetMapping
    public ResponseEntity<List<AttractionDTO>> getAllAttractions() {
        List<AttractionDTO> attractions = attractionService.getAllAttractions();
        return ResponseEntity.ok(attractions);
    }
}
