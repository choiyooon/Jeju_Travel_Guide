package com.example.jeju_server.service;

import com.example.jeju_server.domain.dto.AccommodationDTO;
import com.example.jeju_server.repository.AccommodationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AccommodationService {
    @Autowired
    private AccommodationRepository accommodationRepository;

    public List<AccommodationDTO> getAllAccommodations() {
        return accommodationRepository.findAllByOrderByLikesDesc()
                .stream()
                .map(entity -> AccommodationDTO.builder()
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
