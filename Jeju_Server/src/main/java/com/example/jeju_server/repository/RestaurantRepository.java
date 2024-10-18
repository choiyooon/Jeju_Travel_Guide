package com.example.jeju_server.repository;

import com.example.jeju_server.domain.entity.RestaurantEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RestaurantRepository extends JpaRepository<RestaurantEntity,Integer> {
    // 좋아요 수 기준으로 내림차순 정렬하여 가져오는 메서드
    List<RestaurantEntity> findAllByOrderByLikesDesc();
}
