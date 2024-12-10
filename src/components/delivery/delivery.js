import { React, useEffect, useState } from "react";
import { getMenuItems } from "../../Utilities/Axios/apiService";
import ExploreSection from "../common/explore_section/explore";
import Filters from "../common/filters/filters";
import "./delivery.css";
import DeliveryCollections from "./delivery_collections/delivery_collection";

const deliveryFilters = [
  {
    id: 1,
    icon: <i className="fi fi-rr-settings-sliders absolute-center"></i>,
    title: "Filters",
  },
  {
    id: 2,
    title: "Rating: 4.0+",
  },
  {
    id:3,
    title:"Delivery Time",
    icon:<i className="fi fi-rr-biking absolute-center"></i>
  },
  {
    id:4,
    title:"Pure Veg"
  }
];

export const Delivery = () => {
  const[menuItems,setMenuItems]=useState([]);
  useEffect(()=>{
    (async function getMenuList(){
      let menuList = await getMenuItems();
      setMenuItems((menuList.data.items).slice(0,24))
    })();
  },[]);
  return (
    <div>
      <div className="max-width">
        <Filters filterList = {deliveryFilters}/>
      </div>
      <DeliveryCollections/>
      <ExploreSection list={menuItems} collectionName = 'Top Dishes'/>
    </div>
  );
};
