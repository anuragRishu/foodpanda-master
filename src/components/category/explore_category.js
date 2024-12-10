import React from "react";
import ExploreCard from "../common/explore_section/explore_card/explore_card";
import "./explore_category.css";

const ExploreCategory = ({ list, categoryName }) => {
  return (
    <div className="max-width category-section">
      <div className="collection-title">{categoryName}</div>
      <div className="items-grid">
            {list && list.map((element)=>{
                return <ExploreCard dishes={element}></ExploreCard>
            })}
      </div>
    </div>
  );
};

export default ExploreCategory;
