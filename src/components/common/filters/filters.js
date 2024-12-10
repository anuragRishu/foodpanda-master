import React from "react";
import "./filters.css";
import FilterItem from "./filter_item/filter_item";

const Filters = ({filterList}) => {
  return <div className="filters">
    {filterList && filterList.map((filter)=>{
        return <FilterItem filter = {filter} key={filter.id}/>
    })}
  </div>;
};

export default Filters;
