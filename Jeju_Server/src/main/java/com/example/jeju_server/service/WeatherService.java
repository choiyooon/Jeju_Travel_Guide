package com.example.jeju_server.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@Slf4j
@Service
public class WeatherService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${weather.api.key}")
    private String serviceKey;

    public String getWeatherData(String nx, String ny) throws URISyntaxException {
        String[] dateTime = getBaseDateTime();
        String baseDate = dateTime[0];
        String baseTime = dateTime[1];

        String url;
        try {
            url = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst"
                    + "?serviceKey=" + URLEncoder.encode(serviceKey, StandardCharsets.UTF_8.toString())
                    + "&numOfRows=10&pageNo=1&dataType=JSON"
                    + "&base_date=" + URLEncoder.encode(baseDate, StandardCharsets.UTF_8.toString())
                    + "&base_time=" + URLEncoder.encode(baseTime, StandardCharsets.UTF_8.toString())
                    + "&nx=" + nx
                    + "&ny=" + ny;
        } catch (UnsupportedEncodingException e) {
            log.error("Encoding not supported: {}", e.getMessage());
            throw new RuntimeException("Encoding not supported", e); // 예외 처리
        }

        URI uri = new URI(url);
        try {
            ResponseEntity<String> response = restTemplate.getForEntity(uri, String.class);
            return response.getBody();  // JSON 데이터를 반환
        } catch (HttpClientErrorException e) {
            log.error("Client Error: {}", e.getStatusCode());
            log.error("Response Body: {}", e.getResponseBodyAsString());
            throw e;  // 또는 다른 처리를 할 수 있음
        } catch (HttpServerErrorException e) {
            log.error("Server Error: {}", e.getStatusCode());
            log.error("Response Body: {}", e.getResponseBodyAsString());
            throw e;  // 또는 다른 처리를 할 수 있음
        } catch (Exception e) {
            log.error("Unexpected Error: {}", e.getMessage());
            throw e;
        }
    }

    private String[] getBaseDateTime() {
        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        String baseDate;
        String baseTime;

        // 현재 시간이 새벽 2시 이전인지 확인
        if (now.isBefore(LocalTime.of(2, 0))) {
            // 전날 23시의 데이터 사용
            baseDate = today.minusDays(1).format(dateFormatter);
            baseTime = "2300"; // 23시
        } else {
            // 현재 날짜와 시간에 맞게 데이터 사용
            baseDate = today.format(dateFormatter);
            if (now.getHour() >= 23) {
                baseTime = "2300";
            } else if (now.getHour() >= 20) {
                baseTime = "2000";
            } else if (now.getHour() >= 17) {
                baseTime = "1700";
            } else if (now.getHour() >= 14) {
                baseTime = "1400";
            } else if (now.getHour() >= 11) {
                baseTime = "1100";
            } else if (now.getHour() >= 8) {
                baseTime = "0800";
            } else if (now.getHour() >= 5) {
                baseTime = "0500";
            } else {
                baseTime = "0200"; // 새벽 2시
            }
        }

        return new String[]{baseDate, baseTime};
    }
}
