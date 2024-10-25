package com.example.jeju_server.domain.entity;

import com.example.jeju_server.domain.StringListConverter;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@SuperBuilder
@NoArgsConstructor  // 기본 생성자 추가
@Data  // 공통 필드에 대한 getter/setter, equals, hashCode 등을 자동 생성
@MappedSuperclass  // 이 클래스는 상위 클래스가 되고, 테이블은 생성되지 않음
public abstract class PlaceEntity {

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