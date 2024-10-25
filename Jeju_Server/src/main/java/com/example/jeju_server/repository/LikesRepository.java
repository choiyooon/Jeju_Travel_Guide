package com.example.jeju_server.repository;

import com.example.jeju_server.domain.entity.LikesEntity;
import com.example.jeju_server.domain.entity.UserEntity;
import com.example.jeju_server.domain.enums.PlaceType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikesRepository extends JpaRepository<LikesEntity, Integer> {

    Optional<LikesEntity> findByUserAndPlaceIdAndPlaceType(UserEntity user, Integer placeId, PlaceType placeType);

    boolean existsByUserAndPlaceIdAndPlaceTypeAndIsActive(UserEntity user, Integer placeId, PlaceType placeType, boolean isActive);
}