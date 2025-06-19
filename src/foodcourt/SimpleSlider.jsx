import React from "react";
import Slider from "react-slick";

export default function SimpleSlider() {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // 🚫 Removes left and right navigation buttons
    appendDots: (dots) => (
      <div style={{ padding: "10px 0" }}>
        <ul style={{ margin: 0, display: "flex", justifyContent: "center", gap: "10px" }}>
          {dots}
        </ul>
      </div>
    ),
    customPaging: () => (
      <div
        style={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          backgroundColor: "#ffc107",
          opacity: 0.5,
          transition: "opacity 0.3s",
          cursor: "pointer",
        }}
      />
    ),
  };

  const images = [
    "https://img.freepik.com/free-vector/twitch-banner-template-traditional-italian-food-restaurant_23-2150228281.jpg",
    "https://img.freepik.com/free-vector/flat-design-mexican-food-twitch-banner_23-2149093178.jpg",
    "https://img.freepik.com/free-vector/flat-supermarket-twitch-banner_23-2149372554.jpg",
  ];

  return (
    <div style={{ width: "100vw", overflow: "hidden" }}>
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              style={{
                width: "100vw",
                height: "400px",
                objectFit: "cover",
                display: "block",
                transition: "transform 0.5s ease",
              }}
              loading="lazy"
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
