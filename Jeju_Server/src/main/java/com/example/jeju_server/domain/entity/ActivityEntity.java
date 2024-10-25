package com.example.jeju_server.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@AllArgsConstructor
@Entity
@Table(name = "activity")
public class ActivityEntity extends PlaceEntity {

}