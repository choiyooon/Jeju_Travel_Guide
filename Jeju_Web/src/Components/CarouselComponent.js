import React from "react";
import Carousel from "react-material-ui-carousel";

const CarouselComponent = ({ items }) => {

    const chunkedItems = [];
    for (let i = 0; i < items.length; i += 5) {
        chunkedItems.push(items.slice(i, i + 5));
    }

    return (
        <Carousel indicators={false}>
            {chunkedItems.map((chunk, index) => (
                <div key={index}>
                    <div className="carousel_chunk">
                        {chunk.map((item, i) => (
                            <div key={i} className="carousel_div" onClick={() => window.open(item.kakao_map)}>
                                <img className="carousel_img" src={item.image} alt={item.name} />
                                <h4 className="carousel_name">{item.name}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </Carousel>
    );
};

export default CarouselComponent;
