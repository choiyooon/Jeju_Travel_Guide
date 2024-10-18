import React, { useEffect } from 'react';
import axios from 'axios';

const DataFetcher = ({ onDataLoaded, apiEndpoint }) => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                // API 호출로 데이터를 가져옴
                const response = await axios.get(apiEndpoint);
                onDataLoaded(response.data);  // 데이터를 상위 컴포넌트로 전달
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchData();
    }, []); // 빈 배열을 사용하여 한 번만 실행되도록 설정

    return null;  // 이 컴포넌트는 화면에 아무것도 렌더링하지 않음
};

export default DataFetcher;
