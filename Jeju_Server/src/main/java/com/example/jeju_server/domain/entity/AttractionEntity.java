package com.example.jeju_server.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@AllArgsConstructor
@Entity
@Table(name = "attraction")
public class AttractionEntity extends PlaceEntity {

}