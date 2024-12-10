import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ExploreCategory from "../../components/category/explore_category";
import { getCategoryItems } from "../../Utilities/Axios/apiService";
import { Header } from "../../components/common/header/header";
import { Footer } from "../../components/common/footer/footer";

const CategoryPage = () => {
  const [categoryItems, setCategoryItems] = useState(null);

  const { slug } = useParams();

  useEffect(() => {
    (async function getAllcategories() {
      let categoryData = await getCategoryItems(slug);
      setCategoryItems(categoryData.data.matchedCategory.menu_item_id);
    })();
  }, []);

  return (
    <div>
      <Header />
      <ExploreCategory list={categoryItems} categoryName={slug.toUpperCase()} />
      <Footer />
    </div>
  );
};

export default CategoryPage;
