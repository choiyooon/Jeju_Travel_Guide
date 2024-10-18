import React, {useState, useEffect, useRef} from "react";
//import Carousel from "react-material-ui-carousel";
import i18n from "./i18n";

import food_category from "../Resources/Images/food.png"
import activity_category from "../Resources/Images/activity.png"
import accomodation_category from "../Resources/Images/accomodation.png"
import attraction_category from "../Resources/Images/attraction.png"

import maintext1 from "../Resources/Images/background-image/main-text1.png"
import maintext2 from "../Resources/Images/background-image/main-text2.png"
import maintext3 from "../Resources/Images/background-image/main-text3.png"
import maintext4 from "../Resources/Images/background-image/main-text4.png"
import maintext5 from "../Resources/Images/background-image/main-text5.png"
import maintext2_jp from "../Resources/Images/background-image/main-text2-jp.png"
import maintext3_jp from "../Resources/Images/background-image/main-text3-jp.png"
import maintext4_jp from "../Resources/Images/background-image/main-text4-jp.png"

import mainBottomBackground from "../Resources/Images/background-image/main_bottom_background.png"
import top10 from "../Resources/Images/background-image/top10-background.png"
import top10_jp from "../Resources/Images/background-image/top10-background-jp.png"

import foodTop10 from "../Resources/Images/background-image/food-top10.png"
import foodTop10_jp from "../Resources/Images/background-image/food-top10-jp.png"
import activityTop10 from "../Resources/Images/background-image/activity-top10.png"
import activityTop10_jp from "../Resources/Images/background-image/activity-top10ーjp.png"
import accomodationTop10 from "../Resources/Images/background-image/accomodation-top10.png"
import accomodationTop10_jp from "../Resources/Images/background-image/accomodation-top10-jp.png"
import attractionTop10 from "../Resources/Images/background-image/attraction-top10.png"
import attractionTop10_jp from "../Resources/Images/background-image/attraction-top10-jp.png"




import "./Home.css";
import Navbar from "./Navbar";
import CarouselComponent from "../Components/CarouselComponent";


const Home = ({onChange = f => f}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);  //로그인 창 팝업 여부
    const [isKorean, setIsKorean] = useState(true); // true면 한국어, false면 일본어

    const toggleLanguage = () => {
        if (isKorean) {
            i18n.changeLanguage("ja");
        } else {
            i18n.changeLanguage("ko");
        }
        setIsKorean(!isKorean); // 클릭 시 한국어/일본어 상태 변경
    };


    return (
        <>

            <Navbar isKorean={isKorean} toggleLanguage={toggleLanguage}/>

            <div className="logo-div">
                {isKorean ? (
                    <p className="logo-editorPick">"올레"는 제주도의 걷기 코스로, "오다"라는 이중적 의미를 담았습니다.
                    </p>
                ) : (
                    <p className="logo-sub-japanese">「オルレ」は、発音が日本語の「来る」に似た、済州島のトレッキングコースです。
                    </p>
                )}
                <div className="logo-inline-div" style={{animation: modalIsOpen ? "none" : ""}}>
                    {isKorean ? (
                        <p className="logo-korean">제주! 올레?</p>
                    ) : (
                        <p className="logo-japanese">済州! オルレ?</p>
                    )}
                </div>
            </div>
            <div style={{display: "block", height: "100vw"}}></div>
            <div className="main-text-container">
                <img className="main-text1" src={maintext1}/>
                {isKorean ? (<>
                    <img className="main-text2" src={maintext2}/>
                    <img className="main-text3" src={maintext3}/>
                    <img className="main-text4" src={maintext4}/>
                </>) : (<>
                    <img className="main-text2-jp" src={maintext2_jp}/>
                    <img className="main-text3-jp" src={maintext3_jp}/>
                    <img className="main-text4-jp" src={maintext4_jp}/>
                </>)}

                <img className="main-text5" style={{animation: modalIsOpen ? "none" : ""}} src={maintext5}/>
            </div>
            <div className="categorySection" style={{marginTop: "50px", marginBottom: "100px"}}>

            </div>
            <div className="top10-container">
                {isKorean ? (
                    <img className="top10" src={top10}/>
                ) : (
                    <img className="top10" src={top10_jp}/>
                )}

            </div>
            <div>
                {isKorean ? (
                    <img className="foodTop10" src={foodTop10}/>
                ) : (
                    <img className="foodTop10_jp" src={foodTop10_jp}/>
                )}
            </div>
            <section>
                <CarouselComponent />
            </section>

            <div>
                {isKorean ? (
                    <img className="activityTop10" src={activityTop10}/>
                ) : (
                    <img className="activityTop10_jp" src={activityTop10_jp}/>
                )}
            </div>
            <section>

            </section>

            <div>
                {isKorean ? (
                    <img className="accomodationTop10" src={accomodationTop10}/>
                ) : (
                    <img className="accomodationTop10_jp" src={accomodationTop10_jp}/>
                )}
            </div>
            <section>

            </section>

            <div>
                {isKorean ? (
                    <img className="attractionTop10" src={attractionTop10}/>
                ) : (
                    <img className="attractionTop10_jp" src={attractionTop10_jp}/>
                )}
            </div>
            <section>

            </section>
            <img className="mainBottomBackground" src={mainBottomBackground}/>
        </>
    )
}

export default Home;