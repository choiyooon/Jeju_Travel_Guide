import React, {useState, useEffect, useRef} from "react";
import Swal from "sweetalert2"; // 알림창 모듈
import axios from "axios";
import {useTranslation} from 'react-i18next';
import koreaFlag from "../Resources/Images/korea_flag.png";
import japanFlag from "../Resources/Images/japan_flag.png";
import mainLogo from "../Resources/Images/main-logo.png"; // 로고 이미지 추가

import Weather from "./Weather";
import "./Navbar.css";

const Navbar = ({isKorean, toggleLanguage}) => {
    const {t} = useTranslation(); // i18n 훅 사용
    const idInput = useRef();
    const passWInput = useRef();

    const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
    const [signupModalIsOpen, setSignupModalIsOpen] = useState(false);

    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [idValid, setIdValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);

    const [signupId, setSignupId] = useState("");
    const [signupPw, setSignupPw] = useState("");
    const [signupName, setSignupName] = useState("");

    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 이곳에서 관리

    const onChangeId = (e) => {
        setId(e.target.value);
        const regex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        setIdValid(regex.test(e.target.value));
    };

    const onChangePassword = (e) => {
        setPw(e.target.value);
        const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-Z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
        setPwValid(regex.test(e.target.value));
    };

    const loginBtn = () => {
        if (isLoggedIn) {
            localStorage.removeItem("token");
            setIsLoggedIn(false);
            Swal.fire({icon: "info", text: t("loggedOut"), confirmButtonText: t("confirm")});
        } else {
            setLoginModalIsOpen(true);
        }
    };

    const btnSubmit = async () => {
        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", {
                email: id,
                password: pw
            });

            Swal.fire({icon: "success", text: t("loginSuccess"), confirmButtonText: t("confirm")});
            localStorage.setItem("token", response.data.token);
            setIsLoggedIn(true); // 로그인 성공 시 상태 업데이트
            setLoginModalIsOpen(false);
        } catch (error) {
            Swal.fire({
                icon: "error",
                text: t("loginFailed") + ": " + error.response.data.message,
                confirmButtonText: t("confirm")
            });
        }
    };

    const signupBtnSubmit = async () => {
        try {
            await axios.post("http://localhost:8080/api/auth/signup", {
                email: signupId,
                password: signupPw,
                name: signupName
            });

            Swal.fire({icon: "success", text: t("signupSuccess"), confirmButtonText: t("confirm")});
            setSignupModalIsOpen(false);
        } catch (error) {
            Swal.fire({
                icon: "error",
                text: t("signupFailed") + ": " + error.response.data.message,
                confirmButtonText: t("confirm")
            });
        }
    };


    useEffect(() => {
        if (idValid && pwValid) {
            setNotAllow(false);
            return;
        }
        setNotAllow(true);
    }, [idValid, pwValid]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    useEffect(() => {
        if (!loginModalIsOpen) {
            setId("");
            setPw("");
            setIdValid(false);
            setPwValid(false);
        }
        if (!signupModalIsOpen) {
            setSignupId("");
            setSignupPw("");
            setSignupName("");
        }
    }, [loginModalIsOpen, signupModalIsOpen]);

    return (
        <>
            <div className="fixed-navbar">
                {/*국제화 토글*/}
                <div className="toggle-container" onClick={toggleLanguage}>
                    <div className={`toggle-track ${isKorean ? "active" : "inactive"}`}>
                        <div className={`toggle-thumb ${isKorean ? "thumb-active" : "thumb-inactive"}`}>
                            <img
                                src={isKorean ? koreaFlag : japanFlag}
                                alt={isKorean ? "Korean" : "Japanese"}
                                className="flag-icon"
                            />
                        </div>
                        <span
                            className={`toggle-text left-text ${isKorean ? "active-text" : "inactive-text"}`}>한국어</span>
                        <span
                            className={`toggle-text right-text ${isKorean ? "inactive-text" : "active-text"}`}>日本語</span>
                    </div>
                </div>
                {/*로그인 버튼*/}
                <button className="loginBtn" onClick={loginBtn}>
                    {isLoggedIn ? t("logout") : t("login")}
                </button>
                {/*회원가입 버튼*/}
                {!isLoggedIn && (
                    <button className="signupBtn" onClick={() => setSignupModalIsOpen(true)}>{t("signup")}</button>
                )}

                {/* 날씨 컴포넌트 추가 */}
                <div className="weather-container">
                    <Weather />
                </div>
                {/* 로그인 모달 */}
                <div className="container" style={{display: loginModalIsOpen ? "block" : "none"}}>
                    <div className="login-modal">
                        <h1 className="login-modal-logo">{t("login")}</h1>
                        <div className="login-txt">{t("email")}</div>
                        <div className="inputWrap">
                            <input className="input" ref={idInput} type="text" placeholder={t("email")} value={id}
                                   onChange={onChangeId}/>
                        </div>
                        {!idValid && id.length > 0 && <div>{t("invalidEmail")}</div>}

                        <div className="login-txt">{t("password")}</div>
                        <div className="inputWrap">
                            <input className="input" ref={passWInput} type="password" placeholder={t("password")}
                                   value={pw}
                                   onChange={onChangePassword}/>
                        </div>
                        {!pwValid && pw.length > 0 && <div>{t("invalidPassword")}</div>}

                        <div className="button-container">
                            <button className="login-btn" type="submit" disabled={notAllow}
                                    onClick={btnSubmit}>{t("login")}</button>
                            <button className="login-back-btn" type="button"
                                    onClick={() => setLoginModalIsOpen(false)}>{t("close")}</button>
                        </div>
                    </div>
                </div>

                {/* 회원가입 모달 */}
                <div className="container" style={{display: signupModalIsOpen ? "block" : "none"}}>
                    <div className="signup-modal">
                        <h1 className="signup-modal-logo">{t("signup")}</h1>
                        <div className="signup-txt">{t("email")}</div>
                        <div className="inputWrap">
                            <input className="input" type="text" placeholder={t("email")} value={signupId}
                                   onChange={(e) => setSignupId(e.target.value)}/>
                        </div>
                        <div className="signup-txt">{t("password")}</div>
                        <div className="inputWrap">
                            <input className="input" type="password" placeholder={t("password")} value={signupPw}
                                   onChange={(e) => setSignupPw(e.target.value)}/>
                        </div>
                        <div className="signup-txt">{t("name")}</div>
                        <div className="inputWrap">
                            <input className="input" type="text" placeholder={t("name")} value={signupName}
                                   onChange={(e) => setSignupName(e.target.value)}/>
                        </div>
                        <div className="button-container">
                            <button className="signup-btn" type="submit"
                                    onClick={signupBtnSubmit}>{t("signup")}</button>
                            <button className="signup-back-btn" type="button"
                                    onClick={() => setSignupModalIsOpen(false)}>{t("close")}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
