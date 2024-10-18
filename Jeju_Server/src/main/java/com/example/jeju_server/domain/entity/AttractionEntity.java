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
@Table(name = "attraction")
public class AttractionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nameKo;
    private String nameJp;

    private Double latitude;
    private Double longitude;
    private String address;
    private String image;
    private String kakaoMap;

    @Convert(converter = StringListConverter.class)
    @Column(name = "keyword_ko", columnDefinition = "TEXT")
    private List<String> keywordKo;

    @Convert(converter = StringListConverter.class)
    @Column(name = "keyword_jp", columnDefinition = "TEXT")
    private List<String> keywordJp;

    private int likes;

    @Column(name = "explanation_ko", columnDefinition = "TEXT")
    private String explanationKo;

    @Column(name = "explanation_jp", columnDefinition = "TEXT")
    private String explanationJp;
}