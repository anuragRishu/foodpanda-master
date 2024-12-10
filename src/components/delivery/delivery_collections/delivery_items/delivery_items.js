import React from "react";
import { useNavigate } from "react-router-dom";
import "./delivery_items.css";
const DeliveryItems = ({ item }) => {
  const navigate = useNavigate();

  function handleCategory(slug) {
    navigate(`category/${slug}`);
  }
  return (
    <div onClick={() => handleCategory(item.slug)}>
      <div className="delivery-item-cover">
        <img
          src={item.images.url}
          className="delivery-item-image"
          alt={item.images.public_id}
        />
      </div>
      <div className="delivery-item-title">{item.category_name}</div>
    </div>
  );
};

export default DeliveryItems;
