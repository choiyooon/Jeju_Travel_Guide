package com.example.jeju_server.domain.entity;

import com.example.jeju_server.domain.StringListConverter;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;


@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "activity")
public class ActivityEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Double latitude;
    private Double longitude;
    private String address;
    private String image;
    private String kakaoMap;

    @Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "TEXT") // JSON을 TEXT로 저장
    private List<String> keyword;

    private int likes;

    @Column(columnDefinition = "TEXT")
    private String explanation;

    // Getters and Setters
}