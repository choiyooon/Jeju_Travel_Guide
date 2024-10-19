import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 번역 리소스를 코드 내에서 정의
const resources = {
    ko: {
        translation: {
            login: "로그인",
            signup: "회원가입",
            email: "이메일",
            password: "비밀번호",
            name: "이름",
            loginSuccess: "로그인 성공",
            loginFailed: "로그인 실패",
            signupSuccess: "회원가입 성공",
            signupFailed: "회원가입 실패",
            close: "닫기",
            invalidEmail: "올바른 이메일을 입력해주세요.",
            invalidPassword: "영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.",
            logout: "로그아웃",
            confirm: "확인",
            loggedOut:  "로그아웃되었습니다",
            clear: "맑음",
            partlyCloudy: "구름 적음",
            mostlyCloudy: "구름 많음",
            overcast: "흐림",
            rain: "비",
            sleet: "비/눈",
            snow: "눈"
        }
    },
    ja: {
        translation: {
            login: "ログイン",
            signup: "サインアップ",
            email: "メール",
            password: "パスワード",
            name: "名前",
            loginSuccess: "ログイン成功",
            loginFailed: "ログイン失敗",
            signupSuccess: "サインアップ成功",
            signupFailed: "サインアップ失敗",
            close: "閉じる",
            invalidEmail: "正しいメールアドレスを入力してください。",
            invalidPassword: "英字、数字、記号を含む8文字以上で入力してください。",
            logout: "ログアウト",
            confirm: "確認",
            loggedOut: "ログアウトしました",
            clear: "晴れ",
            partlyCloudy: "少し曇り",
            mostlyCloudy: "曇り",
            overcast: "曇天",
            rain: "雨",
            sleet: "みぞれ",
            snow: "雪"
        }
    }
};

// i18n 초기화
i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'ko', // 기본 언어
        fallbackLng: 'ko', // 선택한 언어가 없을 때 사용할 언어
        interpolation: {
            escapeValue: false // 리액트에서 안전하게 처리를 위한 설정
        }
    });

export default i18n;
