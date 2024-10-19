package com.example.jeju_server.controller;


import com.example.jeju_server.service.WeatherService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WeatherController {

    private final WeatherService weatherService;

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping("/api/weather")
    public String getWeather(@RequestParam String nx,
                             @RequestParam String ny) {

        try {
            return weatherService.getWeatherData(nx, ny);
        } catch (Exception e) {
            e.printStackTrace();
            return "Error fetching weather data";
        }
    }
}
