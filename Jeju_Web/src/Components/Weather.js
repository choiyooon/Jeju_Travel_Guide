import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Weather.css'; // Meteocons 스타일 추가

import clearDayIcon from '../Resources/Svgs/clear-day.svg';
import clearNightIcon from '../Resources/Svgs/clear-night.svg';
import cloudyIcon from '../Resources/Svgs/cloudy.svg';
import raindrop from '../Resources/Svgs/raindrop.svg';
import humidityIcon from '../Resources/Svgs/humidity.svg';
import overcastIcon from '../Resources/Svgs/overcast.svg';
import overcastDayIcon from '../Resources/Svgs/overcast-day.svg';
import overcastNightIcon from '../Resources/Svgs/overcast-night.svg';
import partlyCloudyNightIcon from '../Resources/Svgs/partly-cloudy-night.svg';
import partlyCloudyDayIcon from '../Resources/Svgs/partly-cloudy-day.svg';
import thermometerIcon from '../Resources/Svgs/thermometer.svg';
import wind0Icon from '../Resources/Svgs/wind-beaufort-0.svg';
import wind1Icon from '../Resources/Svgs/wind-beaufort-1.svg';
import wind2Icon from '../Resources/Svgs/wind-beaufort-2.svg';
import wind3Icon from '../Resources/Svgs/wind-beaufort-3.svg';
import wind4Icon from '../Resources/Svgs/wind-beaufort-4.svg';
import wind5Icon from '../Resources/Svgs/wind-beaufort-5.svg';
import wind6Icon from '../Resources/Svgs/wind-beaufort-6.svg';
import wind7Icon from '../Resources/Svgs/wind-beaufort-7.svg';
import wind8Icon from '../Resources/Svgs/wind-beaufort-8.svg';
import wind9Icon from '../Resources/Svgs/wind-beaufort-9.svg';
import wind10Icon from '../Resources/Svgs/wind-beaufort-10.svg';
import wind11Icon from '../Resources/Svgs/wind-beaufort-11.svg';
import wind12Icon from '../Resources/Svgs/wind-beaufort-12.svg';
import sleetIcon from '../Resources/Svgs/sleet.svg';
import rainIcon from '../Resources/Svgs/rain.svg';
import snowIcon from '../Resources/Svgs/snow.svg';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [windData, setWindData] = useState(null);
    const [tempData, setTempData] = useState(null); // 기온 데이터 저장
    const [popData, setPopData] = useState(null); // 강수 확률 저장
    const [precipitationData, setPrecipitationData] = useState(null); // 강수 형태 저장

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const nx = '52';
                const ny = '38';

                const response = await axios.get('http://localhost:8080/api/weather', {
                    params: {nx, ny}
                });

                console.log('API Response:', response.data); // 응답 구조 확인용
                const items = response.data.response.body.items.item;

                // SKY 항목과 WSD(풍속) 필터링
                const skyData = items.find(item => item.category === 'SKY');
                const windData = items.find(item => item.category === 'WSD');
                const tempData = items.find(item => item.category === 'TMP'); // 기온
                const popData = items.find(item => item.category === 'POP'); // 강수 확률
                const precipitationData = items.find(item => item.category === 'PTY'); // 강수 형태

                setWeatherData(skyData);
                setWindData(windData);
                setTempData(tempData);
                setPopData(popData);
                setPrecipitationData(precipitationData);

            } catch (error) {
                console.error('Error fetching weather data', error);
            }
        };

        fetchWeather();
    }, []);

    // 현재 시간이 낮인지 밤인지 판별하는 함수
    const isDaytime = () => {
        const now = new Date();
        const hours = now.getHours();
        return hours >= 6 && hours < 18; // 6 AM - 6 PM은 낮
    };

    // 하늘 상태와 강수 형태를 모두 반영한 아이콘 반환
    const getWeatherIcon = (skyValue, ptyValue) => {
        if (ptyValue !== '0') {
            return getPrecipitationIcon(ptyValue); // 강수 형태가 있으면 우선적으로 강수 형태 아이콘 반환
        }
        // 강수 형태가 없으면 하늘 상태(SKY)에 따른 아이콘 반환
        const day = isDaytime(); // 낮/밤 판단
        switch (skyValue) {
            case '1': // 맑음
                return day ? clearDayIcon : clearNightIcon;
            case '2': // 구름 조금
                return day ? partlyCloudyDayIcon : partlyCloudyNightIcon;
            case '3': // 구름 많음
                return day ? overcastDayIcon : overcastNightIcon;
            case '4': // 흐림
                return overcastIcon;
            default:
                return cloudyIcon; // 기본 아이콘
        }
    };

    // 강수 형태에 따른 아이콘 선택 (PTY)
    const getPrecipitationIcon = (ptyValue) => {
        if (ptyValue === '1') return rainIcon; // 비
        if (ptyValue === '2') return sleetIcon; // 비/눈
        if (ptyValue === '3') return snowIcon; // 눈
        return null; // 0: 강수 없음일 때 아이콘 없음
    };

    // 풍속에 따른 아이콘 선택 (Beaufort scale)
    const getWindIcon = (windValue) => {
        if (windValue < 0.3) return wind0Icon; // 0: 고요
        if (windValue < 1.6) return wind1Icon; // 1: 실바람
        if (windValue < 3.4) return wind2Icon; // 2: 남실바람
        if (windValue < 5.5) return wind3Icon; // 3: 산들바람
        if (windValue < 8.0) return wind4Icon; // 4: 건들바람
        if (windValue < 10.8) return wind5Icon; // 5: 흔들바람
        if (windValue < 13.9) return wind6Icon; // 6: 된바람
        if (windValue < 17.2) return wind7Icon; // 7: 센바람
        if (windValue < 20.8) return wind8Icon; // 8: 강한 바람
        if (windValue < 24.5) return wind9Icon; // 9: 매우 강한 바람
        if (windValue < 28.5) return wind10Icon; // 10: 돌풍
        if (windValue < 32.7) return wind11Icon; // 11: 심한 돌풍
        return wind12Icon; // 12: 태풍
    };

    return (
        <div className="weather-container">
            {weatherData && windData && tempData && popData && precipitationData ? (
                <div className="weather-items">
                    {/* 날씨 아이콘 */}
                    <div className="weather-item">
                        <img src={getWeatherIcon(weatherData.fcstValue, precipitationData.fcstValue)}
                             alt="Weather Condition"/>
                        <span>
        {(() => {
            if (precipitationData.fcstValue === '1') {
                return '비';
            } else if (precipitationData.fcstValue === '2') {
                return '비/눈';
            } else if (precipitationData.fcstValue === '3') {
                return '눈';
            } else {
                // 강수 형태가 없으면 하늘 상태에 따른 텍스트 출력
                switch (weatherData.fcstValue) {
                    case '1':
                        return '맑음';
                    case '2':
                        return '구름 적음';
                    case '3':
                        return '구름 많음';
                    case '4':
                        return '흐림';
                    default:
                        return '';
                }
            }
        })()}
    </span>
                    </div>

                    {/* 풍속 아이콘 */}
                    <div className="weather-item">
                        <img src={getWindIcon(windData.fcstValue)} alt="Wind Condition"/>
                        <span>{windData.fcstValue} m/s</span> {/* 풍속 */}
                    </div>

                    {/* 기온 아이콘 */}
                    <div className="weather-item">
                        <img src={thermometerIcon} alt="Temperature"/>
                        <span>{tempData.fcstValue}°C</span> {/* 현재 기온 */}
                    </div>

                    {/* 강수 확률 아이콘 */}
                    <div className="weather-item">
                        <img src={humidityIcon} alt="Precipitation Probability"/>
                        <span>{popData.fcstValue}%</span> {/* 강수 확률 */}
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Weather;
