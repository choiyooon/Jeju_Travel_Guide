import React, { useEffect } from 'react';
import './Map.css'; // Import the CSS file

const Map = ({ searchPlaces, zoomToPlace }) => {

    useEffect(() => {
        // 네이버 지도 API 스크립트를 동적으로 로드
        const script = document.createElement('script');
        script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=oa9n7zbz2f`;
        script.async = true;

        script.onload = () => {
            if (window.naver && window.naver.maps) {
                console.log("Naver maps object is ready.");
                const map = renderMap(searchPlaces);  // searchPlaces가 빈 배열이면 마커가 표시되지 않음

                // 선택된 장소가 있으면 그 장소로 지도의 중심을 이동하고 줌 레벨을 변경
                if (zoomToPlace) {
                    const { latitude, longitude } = zoomToPlace;
                    const selectedPlaceCenter = new window.naver.maps.LatLng(latitude, longitude);
                    map.setCenter(selectedPlaceCenter); // 선택된 장소로 지도의 중심 이동
                    map.setZoom(15); // 줌 레벨 설정
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
    }, [searchPlaces, zoomToPlace]); // zoomToPlace를 의존성으로 추가하여 장소 선택 시 줌 적용

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

        // 검색된 장소에 마커 생성
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
