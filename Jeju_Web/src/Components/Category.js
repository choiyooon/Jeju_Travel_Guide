import React from 'react';
import { useNavigate } from 'react-router-dom';

const Category = ({ name, src, onChangePage = f => f }) => {
    let navigate = useNavigate();
    const categoryClick = () => {
        // navigate를 통해 카테고리 정보를 URL 쿼리로 전달
        navigate(`/sub?category=${name}`);
    }

    return (
        <div id={name} className="category" onClick={categoryClick}>
            <img className="categoryImage" src={src} alt={name} />
        </div>
    );
}

export default Category;
