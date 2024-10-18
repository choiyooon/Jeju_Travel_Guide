import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AccommodationData = ({ onAccommodationsLoaded }) => {
    const [accommodations, setAccommodations] = useState([]);

    useEffect(() => {
        const fetchAccommodations = async () => {
            try {
                // API 호출로 데이터를 가져옴
                const response = await axios.get("http://localhost:8080/api/accommodations");
                setAccommodations(response.data);  // 데이터를 상태에 저장
                onAccommodationsLoaded(response.data);  // 데이터를 상위 컴포넌트로 전달
            } catch (error) {
                console.error("Failed to fetch accommodations:", error);
            }
        };

        fetchAccommodations();
    }, []);

    return null;  // 이 컴포넌트는 화면에 아무것도 렌더링하지 않음
};

export default AccommodationData;
