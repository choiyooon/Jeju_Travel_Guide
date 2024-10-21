import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Map from "../Components/Map";
//import List from "../Components/List/List";
import searchIcon from "../Resources/Images/background-image/searchIcon.png";
import Swal from "sweetalert2"; // 알림창 모듈
import { useTranslation } from 'react-i18next';
import './MapModal.css';  // CSS 파일 추가


const MapModal = ({ categories, isKorean, selectedCategory }) => {
    const [inputText, setInputText] = useState("");  // 검색창에 검색하는 내용
    const [place, setPlace] = useState([]); // 장소 데이터
    const [category, setCategory] = useState([]); // 현재 카테고리의 데이터
    const [selected, setSelected] = useState(selectedCategory.name);  // 선택된 카테고리로 기본 설정

    const { t } = useTranslation(); // i18n 훅을 이용해 번역 함수 사용


    // 카테고리옵션 바뀔 때 마다 장소 데이터 설정
    useEffect(() => {
        const initialCategory = categories.find(cat => cat.name === selectedCategory.name);
        const initialData = isKorean ? initialCategory.koData : initialCategory.jpData;
        setCategory(initialData);
        setPlace(initialData); // 초기화 시 선택된 카테고리의 데이터를 설정
    }, [categories, isKorean, selectedCategory]);

    useEffect(() => {
        const updatedCategory = categories.find(cat => cat.name === selected);
        const updatedData = isKorean ? updatedCategory.koData : updatedCategory.jpData;
        setCategory(updatedData);
        setPlace(updatedData);
    }, [selected, isKorean, categories]);

    const onChange = (e) => {
        setInputText(e.target.value);
    };

    const changeCategory = (e) => {
        const selectedCat = e.target.value;
        setSelected(selectedCat);
    };


    // 검색기능 구현
    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputText !== "") {
            const filteredData = category.filter((place) => place.name.includes(inputText));
            if (filteredData.length > 0) {
                setPlace(filteredData);
                console.log("Filtered place data:", filteredData); // 검색된 장소 데이터 출력

            } else {
                Swal.fire({
                    icon: 'error',
                    text: '검색 결과가 없습니다.',
                    confirmButtonText: "확인"
                });
                setPlace([]);
            }
        } else {
            setPlace(category);
        }
    };
    // 초기화 버튼
    const handleReset = (e) => {
        e.preventDefault();
        setPlace([]);
        setInputText("");
    };
    // 모두보기 버튼
    const handleShowAll = (e) => {
        e.preventDefault();
        setPlace(category)
    }


    return (
        <>
            <form className="inputForm" onSubmit={handleSubmit} onReset={handleReset}>
                <div className="searchDiv">
                    <select onChange={changeCategory} id="categorySelect" value={selected} >
                        <option value="activity">{t('activity')}</option>
                        <option value="food">{t('food')}</option>
                        <option value="accomodation">{t('lodging')}</option>
                        <option value="attraction">{t('attraction')}</option>
                    </select>
                    <div className="searchInputDiv">
                        <input
                            id="searchInput" type="text" size="50"
                            placeholder=" Search Place..."
                            onChange={onChange}
                            value={inputText}
                        />
                        <img id="searchIcon" onClick={handleSubmit} src={searchIcon}/>
                    </div>
                    <div className="buttonDiv">
                        <button type="submit" style={{display:"none"}}>enterKey시 검색할 수 있는 형식상 submit 버튼</button>
                        <button id="initializeBtn" type="reset">{t('initialize')}</button>
                        <button id ="showAllBtn" onClick={handleShowAll}>{t('showAll')}</button>

                        <Link to="/sub/addplace">
                            <button id="addBtn" type="add" disabled={(localStorage.getItem("loginFlag") === "ON") ? false : true} style={{ display: (localStorage.getItem("loginFlag") === "ON") ? "" : "none" }}
                            >추가</button></Link>
                    </div>
                </div>
            </form>
            <div className="mapListDiv">
                <Map searchPlaces={place} />
                {/*<List places={category} setPlace={setPlace} />*/}
            </div>
        </>
    );
};
// Map 컴포넌트에 조건에 충족하는 장소 데이터 넘겨줌
// List 컴포넌트에 카테고리에 맞는 장소 데이터와 장소 데이터 설정 함수 넘겨줌
export default MapModal;