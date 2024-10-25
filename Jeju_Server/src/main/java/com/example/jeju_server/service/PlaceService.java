package com.example.jeju_server.service;

import com.example.jeju_server.domain.entity.*;
import com.example.jeju_server.domain.enums.PlaceType;
import com.example.jeju_server.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlaceService {

    @Autowired
    private ActivityRepository activityRepository;
    @Autowired
    private AttractionRepository attractionRepository;
    @Autowired
    private RestaurantRepository restaurantRepository;
    @Autowired
    private AccommodationRepository accommodationRepository;

    // 좋아요 수 증가 메서드
    public void incrementLikes(Integer placeId, PlaceType placeType) {
        PlaceEntity placeEntity = findPlaceByIdAndType(placeId, placeType);
        placeEntity.setLikes(placeEntity.getLikes() + 1);
        savePlace(placeEntity, placeType);
    }

    // 좋아요 수 감소 메서드
    public void decrementLikes(Integer placeId, PlaceType placeType) {
        PlaceEntity placeEntity = findPlaceByIdAndType(placeId, placeType);
        placeEntity.setLikes(placeEntity.getLikes() - 1);
        savePlace(placeEntity, placeType);
    }

    // 장소 ID와 타입으로 해당 장소 찾기
    private PlaceEntity findPlaceByIdAndType(Integer placeId, PlaceType placeType) {
        switch (placeType) {
            case ACTIVITY:
                return activityRepository.findById(placeId)
                        .orElseThrow(() -> new RuntimeException("Activity not found"));
            case ATTRACTION:
                return attractionRepository.findById(placeId)
                        .orElseThrow(() -> new RuntimeException("Attraction not found"));
            case RESTAURANT:
                return restaurantRepository.findById(placeId)
                        .orElseThrow(() -> new RuntimeException("Restaurant not found"));
            case ACCOMMODATION:
                return accommodationRepository.findById(placeId)
                        .orElseThrow(() -> new RuntimeException("Accommodation not found"));
            default:
                throw new IllegalArgumentException("Invalid place type: " + placeType);
        }
    }

    // 공통적으로 장소 저장
    private void savePlace(PlaceEntity placeEntity, PlaceType placeType) {
        switch (placeType) {
            case ACTIVITY:
                activityRepository.save((ActivityEntity) placeEntity);
                break;
            case ATTRACTION:
                attractionRepository.save((AttractionEntity) placeEntity);
                break;
            case RESTAURANT:
                restaurantRepository.save((RestaurantEntity) placeEntity);
                break;
            case ACCOMMODATION:
                accommodationRepository.save((AccommodationEntity) placeEntity);
                break;
        }
    }
}
