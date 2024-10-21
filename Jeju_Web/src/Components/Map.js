import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Map.css'; // Import the CSS file

const Map = ({ searchPlaces }) => {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        // 네이버 지도 API 스크립트를 동적으로 로드
        const script = document.createElement('script');
        script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=oa9n7zbz2f`;
        script.async = true;

        script.onload = () => {
            // 스크립트가 로드된 후에 맵을 초기화
            if (window.naver && window.naver.maps) {  // window.naver 객체가 로드되었는지 확인
                console.log("Naver maps object is ready.");
                if (searchPlaces.length > 0) {
                    console.log("Rendering map with places:", searchPlaces);
                    renderMap(searchPlaces);  // 지도를 렌더링하는 함수 호출
                }
            } else {
                console.error('Naver Maps script failed to load.');
            }
        };

        document.head.appendChild(script);

        return () => {
            // 컴포넌트가 언마운트될 때 스크립트 제거
            document.head.removeChild(script);
        };
    }, [searchPlaces]);

    const renderMap = (places) => {
        if (!window.naver || !window.naver.maps) {
            console.error('Naver maps is not available.');
            return;
        }

        // 제주도 위치 좌표
        const mapOptions = {
            center: new window.naver.maps.LatLng(33.36241576632475, 126.5333088372503), // 제주도의 중심 좌표로 설정
            zoom: 10
        };

        const map = new window.naver.maps.Map('map', mapOptions);

        places.forEach(place => {
            const marker = new window.naver.maps.Marker({
                position: new window.naver.maps.LatLng(place.latitude, place.longitude),
                map: map
            });

            const infoWindow = new window.naver.maps.InfoWindow({
                content: `<div>${place.name}</div>`
            });

            window.naver.maps.Event.addListener(marker, 'click', function () {
                infoWindow.open(map, marker);
            });
        });
    };

    return <div id='map'></div>;

};

export default Map;
