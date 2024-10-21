import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Category.css';  // CSS 파일 추가
import MapModal from './MapModal'; // MapDiv 컴포넌트 가져오기

const Category = ({ categories, isKorean }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);  // 선택된 카테고리 상태

    const openModal = (category) => {
        setSelectedCategory(category);  // 카테고리 선택
        setModalIsOpen(true);
        document.body.style.overflow = 'hidden'; // 모달이 열리면 스크롤 비활성화
    };

    const closeModal = () => {
        setModalIsOpen(false);
        document.body.style.overflow = 'auto'; // 모달이 닫히면 스크롤 활성화
    };

    return (
        <div>
            {/* 카테고리를 동적으로 생성 */}
            {categories.map((category, index) => (
                <div key={index} id={category.name} className="category" onClick={() => openModal(category)}>
                    <img className="categoryImage" src={category.src} alt={category.name} />
                </div>
            ))}

            {/* 모달 애니메이션 적용 */}
            <AnimatePresence>
                {modalIsOpen && (
                    <motion.div
                        className="modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal} // 모달 바깥을 클릭하면 닫힘
                    >
                        <motion.div
                            className="modal-content"
                            initial={{scale: 0}}
                            animate={{scale: 1}}
                            exit={{scale: 0}}
                            onClick={(e) => e.stopPropagation()} // 모달 안쪽 클릭 시 닫히지 않음
                        >
                            <button className="modal-close-btn" onClick={closeModal}>×</button>
                            {/* MapDiv 컴포넌트 추가 */}
                            {selectedCategory && (
                                <MapModal
                                    categories={categories}  // 모든 카테고리 데이터 전달
                                    isKorean={isKorean}  // 한국어/일본어 상태 전달
                                    selectedCategory={selectedCategory}  // 선택된 카테고리 전달
                                />
                            )}

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Category;
