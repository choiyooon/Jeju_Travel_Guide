import React, { useEffect, useState } from 'react';
import './Map.css'; // Import the CSS file

const Map = ({ searchPlaces }) => {

    useEffect(() => {
        // 네이버 지도 API 스크립트를 동적으로 로드
        const script = document.createElement('script');
        script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=oa9n7zbz2f`;
        script.async = true;

        script.onload = () => {
            if (window.naver && window.naver.maps) {
                console.log("Naver maps object is ready.");
                const map = renderMap(searchPlaces);  // searchPlaces가 빈 배열이면 마커가 표시되지 않음

                // 지도 객체가 렌더링된 후에 중심 좌표를 강제로 재설정
                const jejuCenter = new window.naver.maps.LatLng(33.36241576632475, 126.5333088372503);
                map.setCenter(jejuCenter);  // 지도의 중심을 제주도로 다시 설정
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
            return null; // 맵이 없을 경우 null을 반환
        }

        // 제주도 위치 좌표
        const mapOptions = {
            center: new window.naver.maps.LatLng(33.36241576632475, 126.5333088372503), // 제주도의 중심 좌표로 설정
            zoom: 10
        };

        const map = new window.naver.maps.Map('map', mapOptions);

        // 검색된 장소가 없으면 마커를 생성하지 않음
        if (places.length === 0) {
            console.log("No places to render on the map.");
            return map; // 빈 배열이어도 맵 객체를 반환
        }

        places.forEach(place => {
            const marker = new window.naver.maps.Marker({
                position: new window.naver.maps.LatLng(place.latitude, place.longitude),
                map: map
            });

            const infoWindow = new window.naver.maps.InfoWindow({
                content: `
                <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333; padding: 5px;">
                    <strong>${place.name}</strong>
                </div>
            `
            });

            window.naver.maps.Event.addListener(marker, 'click', function () {
                infoWindow.open(map, marker);
            });
        });

        return map; // 맵 객체를 반환
    };

    return <div id='map'></div>;

};

export default Map;
