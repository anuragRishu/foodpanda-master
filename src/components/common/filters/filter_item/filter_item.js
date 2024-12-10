import React from "react";
import "./filter_item.css";

const FilterItem = ({ filter }) => {
  return <div className="filter-item cur-pointer">{filter.icon && filter.icon}
  <div className="filter-name">{filter.title}</div>
  
  </div>;
};

export default FilterItem;
