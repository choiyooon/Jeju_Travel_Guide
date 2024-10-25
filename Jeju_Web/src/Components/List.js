import React, { useState, useEffect } from 'react';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import './List.css';
import axios from 'axios'; // axios import

function List({ places, setPlace, placeType, onPlaceSelect }) {
    const [checked, setChecked] = useState([]);  // 좋아요 체크 여부 배열
    const [icon, setIcon] = useState("");
    const [detailsVisible, setDetailsVisible] = useState(Array(places.length).fill(false));

    useEffect(() => {
        // 카테고리에 따라 아이콘 설정
        const icons = {
            activity: "🪂",
            attraction: "🏔️",
            restaurant: "🍚",
            accommodation: "🏠"
        };
        setIcon(icons[placeType] || "");

        fetchLikes();

        // 모든 리스트 아이템의 상세 정보 닫기
        document.querySelectorAll('.List-Item-Image-div').forEach(el => el.style.display = 'none');
    }, [places, placeType]);

    const fetchLikes = async () => {
        try {
            const token = sessionStorage.getItem('token'); // 토큰 가져오기
            const placeIds = places.map((place) => place.id).join(','); // 장소 ID 리스트를 쉼표로 구분
            const response = await axios.get('http://localhost:8080/api/auth/like/status', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    placeId: placeIds, // 쉼표로 구분된 장소 ID
                    placeType: placeType // 장소 유형
                }
            });

            const likesStatus = response.data.likesStatus; // 서버에서 좋아요 상태 배열 가져오기
            setChecked(likesStatus); // 좋아요 상태를 체크 상태로 설정
        } catch (error) {
            console.error("Failed to fetch likes from the server.", error);
        }
    };

    const toggleLike = async (i) => {
        let updatedChecked = [...checked];
        const placeId = places[i].id;  // 장소 ID
        const token = sessionStorage.getItem('token'); // 토큰 가져오기

        // 좋아요 상태 반전
        updatedChecked[i] = !updatedChecked[i];
        setChecked(updatedChecked); // UI에 즉시 반영

        try {
            if (updatedChecked[i]) {
                // 하트를 누를 경우 (좋아요 추가)
                await axios.post('http://localhost:8080/api/auth/like', {
                    placeId: placeId,
                    placeType: placeType
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            } else {
                // 하트를 다시 누를 경우 (좋아요 삭제)
                await axios.delete('http://localhost:8080/api/auth/like', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    data: {  // data 속성 추가
                        placeId: placeId,
                        placeType: placeType
                    }
                });
            }

            // 좋아요 수 직접 업데이트 (서버의 응답에 따른 업데이트)
            let updatedListItem = [...places];
            updatedListItem[i].likes += updatedChecked[i] ? 1 : -1; // 상태 반영
            setPlace(updatedListItem); // 업데이트된 리스트를 설정

        } catch (error) {
            // 상태를 다시 원래대로 되돌림 (오류 발생 시)
            updatedChecked[i] = !updatedChecked[i];
            setChecked(updatedChecked);
            console.error("Error updating like status:", error);
        }
    };

    const toggleDetail = (i) => {
        const updatedDetails = [...detailsVisible];
        updatedDetails[i] = !updatedDetails[i];
        setDetailsVisible(updatedDetails);
    };

    return (
        <div className='List-Container'>
            {places.map((item, i) => (
                <div key={i} className='List-Item-div'>
                    <p className='List-Item' onClick={() => {
                        setPlace([item]); // 기존의 setPlace를 유지하고
                        onPlaceSelect(item); // 선택된 장소 정보를 onPlaceSelect로 전달
                    }}>
                        {icon} [{item.name}]<br/><br/>{item.explanation}
                        <span style={{ float: "right" }}>
                            {checked[i] ? (
                                <HeartFilled onClick={() => toggleLike(i)} />
                            ) : (
                                <HeartOutlined onClick={() => toggleLike(i)} />
                            )}
                            &nbsp;{item.likes}
                        </span>
                    </p>
                    <img className='arrow_image' src='./images/down-arrow.png' style={{ width: "20px", height: "20px" }}
                         onClick={() => toggleDetail(i)} alt="Toggle" />
                    {detailsVisible[i] && (
                        <div className='List-Item-Image-div'>
                            <img className='List-Item-Image' src={item.image} alt={item.name} />
                            <p>[ {item.name} ]</p>
                            <p>📍 {item.address}</p>
                            🌐 <a href={item.kakaoMap} target="_blank" rel="noopener noreferrer">{item.kakaoMap}</a>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default List;
