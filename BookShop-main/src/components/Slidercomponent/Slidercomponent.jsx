import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderComponent = ({ arrImage }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <Slider {...settings}>
            {arrImage.map((image, index) => (
                <div key={index}>
                    <img src={image} alt={`slider-${index}`} style={{ height: "350px", width: "100%", objectFit: "cover" }} />
                </div>
            ))}
        </Slider>
    );
};

export default SliderComponent;
