package com.example.jeju_server.repository;

import com.example.jeju_server.domain.entity.AttractionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AttractionRepository extends JpaRepository<AttractionEntity, Long> {

}
