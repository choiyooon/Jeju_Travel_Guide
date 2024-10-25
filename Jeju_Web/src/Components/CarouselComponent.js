import React, {useState} from "react";
import Carousel from "react-material-ui-carousel";
import {motion, AnimatePresence} from 'framer-motion';
import './CarouselComponent.css'; // CSS 파일 가져오기

const CarouselComponent = ({items}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentMap, setCurrentMap] = useState('');

    const openModal = (mapUrl) => {
        setCurrentMap(mapUrl);
        setModalIsOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setModalIsOpen(false);
        document.body.style.overflow = 'auto';
    };

    const chunkedItems = [];
    for (let i = 0; i < items.length; i += 5) {
        chunkedItems.push(items.slice(i, i + 5));
    }

    return (
        <>
            <Carousel indicators={false}>
                {chunkedItems.map((chunk, index) => (
                    <div key={index}>
                        <div className="carousel_container">
                            {chunk.map((item, i) => (
                                <div key={i} className="carousel_div" onClick={() => openModal(item.kakaoMap)}>
                                    <img className="carousel_img" src={item.image} alt={item.name}/>
                                    <h4 className="carousel_name">{item.name}</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </Carousel>

            <AnimatePresence>

                {modalIsOpen && (
                    <motion.div
                        className="top10-modal-overlay"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        onClick={closeModal}
                    >

                        <motion.div
                            className="top10-modal-content" // 클래스 이름 유지
                            initial={{scale: 0}}
                            animate={{scale: 1}}
                            exit={{scale: 0}}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="top10-modal-close-btn" onClick={closeModal}>×</button>
                            <div>
                                <iframe
                                    src={currentMap}
                                    width="100%"
                                    height="100%"
                                    className="kakao-map-iframe"
                                    allowFullScreen
                                    title="KakaoMap"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default CarouselComponent;
