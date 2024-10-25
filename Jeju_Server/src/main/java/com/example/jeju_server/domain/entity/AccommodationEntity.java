package com.example.jeju_server.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@AllArgsConstructor
@Entity
@Table(name = "accommodation")
public class AccommodationEntity extends PlaceEntity {

}