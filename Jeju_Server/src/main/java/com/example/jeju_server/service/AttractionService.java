package com.example.jeju_server.service;

import com.example.jeju_server.domain.dto.AttractionDTO;
import com.example.jeju_server.repository.AttractionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AttractionService {
    @Autowired
    private AttractionRepository attractionRepository;

    // 모든 명소 정보 가져오기
    public List<AttractionDTO> getAllAttractions() {
        return attractionRepository.findAllByOrderByLikesDesc()
                .stream()
                .map(entity -> AttractionDTO.builder() // Use AttractionDTO instead of ActivityDTO
                        .id(entity.getId())
                        .nameKo(entity.getNameKo())
                        .nameJp(entity.getNameJp())
                        .latitude(entity.getLatitude())
                        .longitude(entity.getLongitude())
                        .address(entity.getAddress())
                        .image(entity.getImage())
                        .kakaoMap(entity.getKakaoMap())
                        .keywordKo(entity.getKeywordKo())
                        .keywordJp(entity.getKeywordJp())
                        .likes(entity.getLikes())
                        .explanationKo(entity.getExplanationKo())
                        .explanationJp(entity.getExplanationJp())
                        .build())
                .collect(Collectors.toList());
    }
}
