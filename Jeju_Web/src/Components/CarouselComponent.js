import React from "react";
import Carousel from "react-material-ui-carousel";

const CarouselComponent = ({ items }) => {
    return (
        <Carousel indicators={false}>
            {items.map((item, index) => (
                <div key={index}>
                    <div className="carousel_div" onClick={() => window.open(item.kakao_map)}>
                        <img className="carousel_img" src={item.image} alt={item.name}/>
                        <h4 className="carousel_name">{item.name}</h4>
                    </div>
                </div>
            ))}
        </Carousel>
    );
};

export default CarouselComponent;
