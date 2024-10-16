import React, {useState, useEffect, useRef} from "react";
//import Carousel from "react-material-ui-carousel";

import food_category from "../Resources/Images/food.png"
import activity_category from "../Resources/Images/activity.png"
import accomodation_category from "../Resources/Images/accomodation.png"
import attraction_category from "../Resources/Images/attraction.png"

import maintext1 from "../Resources/Images/background-image/main-text1.png"
import maintext2 from "../Resources/Images/background-image/main-text2.png"
import maintext3 from "../Resources/Images/background-image/main-text3.png"
import maintext4 from "../Resources/Images/background-image/main-text4.png"
import maintext5 from "../Resources/Images/background-image/main-text5.png"
import mainBottomBackground from "../Resources/Images/background-image/main_bottom_background.png"
import top10 from "../Resources/Images/background-image/top10-background.png"
import foodTop10 from "../Resources/Images/background-image/food-top10.png"
import activityTop10 from "../Resources/Images/background-image/activity-top10.png"
import accomodationTop10 from "../Resources/Images/background-image/accomodation-top10.png"
import attractionTop10 from "../Resources/Images/background-image/attraction-top10.png"



import "./Home.css";



const Home = ({onChange = f => f}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);  //로그인 창 팝업 여부
    const [isKorean, setIsKorean] = useState(true); // true면 한국어, false면 일본어









    return (
        <>
            <div className="logo-div"><p className="logo-editorPick">에디터가 Pick한 진짜 제주도!</p>
                <div className="logo-inline-div" style={{animation: modalIsOpen ? "none" : ""}}>
                    {isKorean ? (
                        <p className="logo-korean">어드레 감디</p>
                    ) : (
                        <p className="logo-japanese">ようこそ 済州へ</p>
                    )}
                </div>
            </div>
            <div style={{display: "block", height: "100vw"}}></div>
            <div className="main-text-container">
                <img className="main-text1" src={maintext1}/>
                <img className="main-text2" src={maintext2}/>
                <img className="main-text3" src={maintext3}/>
                <img className="main-text4" src={maintext4}/>
                <img className="main-text5" style={{animation: modalIsOpen ? "none" : ""}} src={maintext5}/>
            </div>
            <div className="categorySection" style={{marginTop: "50px", marginBottom: "100px"}}>

            </div>
            <div className="top10-container">
                <img className="top10" src={top10}/>
            </div>
            <div><img className="foodTop10" src={foodTop10}/></div>
            <section>

            </section>

            <div><img className="activityTop10" src={activityTop10}/></div>
            <section>

            </section>

            <div><img className="accomodationTop10" src={accomodationTop10}/></div>
            <section>

            </section>

            <div><img className="attractionTop10" src={attractionTop10}/></div>
            <section>

            </section>
            <img className="mainBottomBackground" src={mainBottomBackground}/>
        </>
    )
}

export default Home;