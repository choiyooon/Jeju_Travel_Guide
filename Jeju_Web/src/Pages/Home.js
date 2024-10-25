import React, {useState, useEffect, useRef} from "react";
import i18n from "./i18n";


import star from "../Resources/Images/background-image/star.png"
import click from "../Resources/Images/background-image/click.png"

import mainBottomBackground from "../Resources/Images/background-image/main_bottom_background.png"
import top10 from "../Resources/Images/background-image/top10-background.png"
import top10_jp from "../Resources/Images/background-image/top10-background-jp.png"

import restaurantTop10 from "../Resources/Images/background-image/top10-restaurant.png"
import activityTop10 from "../Resources/Images/background-image/top10-activity.png"
import accommodationTop10 from "../Resources/Images/background-image/top10-accommodation.png"
import attractionTop10 from "../Resources/Images/background-image/top10-attraction.png"

import "./Home.css";
import Navbar from "../Components/Navbar";
import CarouselComponent from "../Components/CarouselComponent";
import DataFetcher from '../Components/DataFetcher';
import Category from "../Components/Category";

const Home = ({onChange = f => f}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);  //로그인 창 팝업 여부
    const [isKorean, setIsKorean] = useState(true); // true면 한국어, false면 일본어
    const [accommodationsKo, setAccommodationsKo] = useState([]); // 한국어 숙소 데이터
    const [accommodationsJp, setAccommodationsJp] = useState([]); // 일본어 숙소 데이터
    const [activitiesKo, setActivitiesKo] = useState([]); // 한국어 숙소 데이터
    const [activitiesJp, setActivitiesJp] = useState([]); // 일본어 숙소 데이터
    const [attractionsKo, setAttractionsKo] = useState([]); // 일본어 숙소 데이터
    const [attractionsJp, setAttractionsJp] = useState([]); // 일본어 숙소 데이터
    const [restaurantsKo, setRestaurantsKo] = useState([]); // 일본어 숙소 데이터
    const [restaurantsJp, setRestaurantsJp] = useState([]); // 일본어 숙소 데이터


    const toggleLanguage = () => {
        i18n.changeLanguage(isKorean ? "ja" : "ko");
        setIsKorean(!isKorean);
    };

    // 한국어와 일본어 데이터를 합치는 함수
    const categories = [
        {
            id: 'restaurant',
            nameKo: '맛집',
            nameJp: 'レストラン',
            koData: restaurantsKo,
            jpData: restaurantsJp,
            icon: '🍚'
        },
        {
            id: 'activity',
            nameKo: '액티비티',
            nameJp: 'アクティビティ',
            koData: activitiesKo,
            jpData: activitiesJp,
            icon: '🪂'
        },
        {
            id: 'accommodation',
            nameKo: '숙소',
            nameJp: '宿泊',
            koData: accommodationsKo,
            jpData: accommodationsJp,
            icon: '🏠'
        },
        {
            id: 'attraction',
            nameKo: '관광지',
            nameJp: '観光地',
            koData: attractionsKo,
            jpData: attractionsJp,
            icon: '🏔'
        },
    ];

    // 한국어와 일본어 데이터를 분리하여 저장하는 함수
    const handleDataLoaded = (data, setKo, setJp) => {
        setKo(data.map(item => ({
            id: item.id,
            name: item.nameKo,
            keyword: item.keywordKo,
            explanation: item.explanationKo,
            address: item.address,
            image: item.image,
            kakaoMap: item.kakaoMap,
            likes: item.likes,
            latitude: item.latitude,
            longitude: item.longitude,
        })));
        setJp(data.map(item => ({
            id: item.id,
            name: item.nameJp,
            keyword: item.keywordJp,
            explanation: item.explanationJp,
            address: item.address,
            image: item.image,
            kakaoMap: item.kakaoMap,
            likes: item.likes,
            latitude: item.latitude,
            longitude: item.longitude,
        })));
    };

    // 현재 언어에 따른 데이터를 반환
    const getLocalizedData = (isKorean, koData, jpData) => {
        return isKorean ? koData : jpData;
    };

    return (
        <>
            {/*숙소 데이터를 가져오기 위해 사용하는 부분*/}
            <DataFetcher
                onDataLoaded={(data) => handleDataLoaded(data, setAccommodationsKo, setAccommodationsJp)}
                apiEndpoint="http://localhost:8080/api/accommodations"
            />

            {/*액티비티 데이터를 가져오기 위해 사용하는 부분*/}
            <DataFetcher
                onDataLoaded={(data) => handleDataLoaded(data, setActivitiesKo, setActivitiesJp)}
                apiEndpoint="http://localhost:8080/api/activities"
            />
            {/*명소 데이터를 가져오기 위해 사용하는 부분*/}
            <DataFetcher
                onDataLoaded={(data) => handleDataLoaded(data, setAttractionsKo, setAttractionsJp)}
                apiEndpoint="http://localhost:8080/api/attractions"
            />
            {/*음식 데이터를 가져오기 위해 사용하는 부분*/}
            <DataFetcher
                onDataLoaded={(data) => handleDataLoaded(data, setRestaurantsKo, setRestaurantsJp)}
                apiEndpoint="http://localhost:8080/api/restaurants"
            />

            <Navbar isKorean={isKorean} toggleLanguage={toggleLanguage}/>

            <div className="logo-div">
                {isKorean ? (
                    <p className="sub-title-korean">"올레"는 제주도의 걷기 코스로, "오다"라는 이중적 의미를 담았습니다.
                    </p>
                ) : (
                    <p className="sub-title-japanese">「オルレ」は、発音が日本語の「来る」に似た、済州島のトレッキングコースです。
                    </p>
                )}
                <div className="logo-inline-div" style={{animation: modalIsOpen ? "none" : ""}}>
                    {isKorean ? (
                        <p className="title-korean">제주! 올레?</p>
                    ) : (
                        <p className="title-japanese">済州! オルレ?</p>
                    )}
                </div>
            </div>
            <div style={{display: "block", height: "100vw"}}></div>
            <div className="main-text-container">
                <div className="main-text1">젲젷젶줓젴줗</div>
                {isKorean ? (
                    <div className="main-text-ko-container">
                        <div className="main-text2-ko">카테고리 별로,</div>
                        <div className="main-text3-ko">내 취향 별로,</div>
                        <div className="main-text3-ko">내 마음 속 <img className="star-img" src={star} alt="Star Icon"/>️로</div>
                    </div>
                ) : (
                    <div className="main-text-jp-container">
                        <div className="main-text2-jp">楽しいこと、ほしい</div>
                        <div className="main-text3-jp-line">
                            <span className="main-text3-jp-hanza">美味</span>
                            <span className="main-text3-jp">しいもの、ほしい</span>
                        </div>
                        <div className="main-text3-jp-line">
                            <span className="main-text3-jp-hanza">済州の</span>
                            <img className="star-img" src={star} alt="Star Icon"/>
                            <span className="main-text3-jp">が、ほしい</span>
                        </div>
                    </div>
                )}
                <div className="main-text4">Click ! <img className="star-img" src={click}/></div>
            </div>
            <div className="categorySection" style={{marginTop: "50px", marginBottom: "100px"}}>
                <Category categories={categories} isKorean={isKorean}/>


            </div>
            <div className="top10-img-container">
                {isKorean ? (
                    <img className="top10" src={top10}/>
                ) : (
                    <img className="top10" src={top10_jp}/>
                )}

            </div>
            <div>
                <div className="top10-container">
                    {isKorean ? (
                        <div className="top10-text-ko">음식</div>
                    ) : (
                        <div>
                            <span className="top10-text-jp-hanza">食</span>
                            <span className="top10-text-jp">べ</span>
                            <span className="top10-text-jp-hanza">物</span>
                        </div>)}
                    <img className="top10-restaurant-image" src={restaurantTop10} alt={restaurantTop10}/>
                </div>
            </div>
            <section>
                {getLocalizedData(isKorean, restaurantsKo, restaurantsJp).length > 0 && (
                    <CarouselComponent items={getLocalizedData(isKorean, restaurantsKo, restaurantsJp)}/>
                )}
            </section>

            <div>
                <div className="top10-container">
                    {isKorean ? (
                        <div className="top10-text-ko">액티비티</div>
                    ) : (
                        <div className="top10-text-jp">アクティビティ</div>
                    )}
                    <img className="top10-activity-image" src={activityTop10} alt={activityTop10}/>
                </div>
            </div>
            <section>
                {getLocalizedData(isKorean, activitiesKo, activitiesJp).length > 0 && (
                    <CarouselComponent items={getLocalizedData(isKorean, activitiesKo, activitiesJp)}/>
                )}
            </section>

            <div>
                <div className="top10-container">
                    {isKorean ? (
                        <div className="top10-text-ko">숙소</div>
                    ) : (
                        <div className="top10-text-jp-hanza">宿泊施設</div>
                    )}
                    <img className="top10-accommodation-image" src={accommodationTop10} alt={accommodationTop10}/>
                </div>
            </div>
            <section>
                {getLocalizedData(isKorean, accommodationsKo, accommodationsJp).length > 0 && (
                    <CarouselComponent items={getLocalizedData(isKorean, accommodationsKo, accommodationsJp)}/>
                )}
            </section>

            <div>
                <div className="top10-container">
                    {isKorean ? (
                        <div className="top10-text-ko">관광지</div>
                    ) : (
                        <div className="top10-text-jp-hanza">観光地</div>
                    )}
                    <img className="top10-attraction-image" src={attractionTop10} alt={attractionTop10}/>
                </div>
            </div>
            <section>
                {getLocalizedData(isKorean, attractionsKo, attractionsJp).length > 0 && (
                    <CarouselComponent items={getLocalizedData(isKorean, attractionsKo, attractionsJp)}/>
                )}
            </section>
            <img className="mainBottomBackground" src={mainBottomBackground}/>
        </>
    )
}

export default Home;