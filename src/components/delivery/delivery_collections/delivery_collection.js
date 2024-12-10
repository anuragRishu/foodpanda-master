import { React, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Slider from "react-slick";
import { getCategories } from "../../../Utilities/Axios/apiService";
import NextArrow from "../../common/carousel/next_arrow";
import PreviousArrow from "../../common/carousel/prev_arrow";
import "./delivery_collection.css";
import DeliveryItems from "./delivery_items/delivery_items";
const settings = {
  infinite: true,
  centerMode: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  nextArrow: <NextArrow />,
  prevArrow: <PreviousArrow />,
};
const DeliveryCollections = () => {
  const [categories, setCategoryData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    (async function getAllCategories() {
      let categoryList = await getCategories();
      setCategoryData(categoryList.data.category)
    })();
  }, [dispatch]);
  return (
    <div className="delivery-collection">
      <div className="max-width">
        <div className="collection-title">Eat What Makes You Happy</div>
        <Slider {...settings}>
          {categories.map((item) => {
            return <DeliveryItems item={item} />;
          })}
        </Slider>
      </div>
    </div>
  );
};

export default DeliveryCollections;
