import React from "react";
import Slider from "react-slick";

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    autoplay:true,
    autoplaySpeed:2000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <div>
        <img style={{width:"100%"}} src="https://img.freepik.com/free-vector/twitch-banner-template-traditional-italian-food-restaurant_23-2150228281.jpg?t=st=1743668078~exp=1743671678~hmac=f5cc235e30059ee253c06545d2818880e26b1203f4110411caf650e4da9a0fcc&w=1380" alt="" />
      </div>
      <div>
        <img style={{width:"100%"}} src="https://img.freepik.com/free-vector/flat-design-mexican-food-twitch-banner_23-2149093178.jpg?t=st=1743668322~exp=1743671922~hmac=cb7ff0bd07f92bb333eea9aed68210154e7e160feffb1128cd3e66a815384e09&w=1380" alt="" />
      </div>
      <div>
        <img style={{width:"100%"}} src="https://img.freepik.com/free-vector/flat-supermarket-twitch-banner_23-2149372554.jpg?t=st=1743668158~exp=1743671758~hmac=299db9be190793811a72f4d1e39bf4c0f312a90be671621a5259252d1daf8708&w=1380" alt="" />
      </div>
    </Slider>
  );
}