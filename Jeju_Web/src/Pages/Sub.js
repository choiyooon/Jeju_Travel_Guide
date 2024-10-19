import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import main_logo from "../Resources/Images/main-logo.png";
import "./Sub.css";

const Sub = () => {
    let navigate = useNavigate();
    const location = useLocation();

    // URL 쿼리스트링에서 카테고리 값을 가져옴
    const queryParams = new URLSearchParams(location.search);
    const selectedCategory = queryParams.get('category');

    return (
        <>
            <header>
                <img onClick={() => navigate('/')} id="logo" src={main_logo} alt="어드레감디" />
            </header>
            <h1>선택한 카테고리: {selectedCategory}</h1>

        </>
    );
}

export default Sub;
