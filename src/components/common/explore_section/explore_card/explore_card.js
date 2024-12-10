import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../../../reducers/add_to_cart_slice";
import {
  addToCartService,
  getCartService,
} from "../../../../Utilities/Axios/apiService";
import { getUserData } from "../../../../Utilities/Helper/function";
import "./explore_card.css";

const ExploreCard = ({ dishes }) => {
  const [userData, setUserDataLocal] = useState("");
  useEffect(() => {
    (async function fetchLocalDataFromStorage() {
      const local = await getUserData();
      setUserDataLocal(local);
    })();
  }, []);
  const dispatch = useDispatch();
  const [style, setStyle] = useState({ visibility: "hidden" });
  const name = dishes?.name ?? "";
  const coverImg = dishes?.images?.url;
  const deliveryTime = `${dishes?.delivey_time} mins` ?? "";
  const rating = dishes?.ratings ?? "";
  const approxPrice = `₹${dishes?.price} for one` ?? "";
  const discount = `${dishes?.discount}% OFF` ?? [];
  const handleAddtoCart = async () => {
    if (userData) {
      try {
        let addToCart = await addToCartService({
          user_id: userData._id,
          cart_product: dishes._id,
          quantity: 1,
          price: dishes.price,
        });
      } catch (error) {
        toast.error(error);
      }

      try {
        let cartData = await getCartService(userData._id);
        dispatch(addToCart({ cartItems: cartData.data.matchedCart }));
      } catch (error) {
        console.log(error);
      }
      toast.info("Added to Cart");
    } else {
      toast.error("Please Login First");
    }
  };
  return (
    <div
      className="explore-card cur-pointer"
      onMouseEnter={(e) => {
        setStyle({ visibility: "visible" });
      }}
      onMouseLeave={(e) => {
        setStyle({ visibility: "hidden" });
      }}
    >
      <div className="explore-card-cover">
        <img src={coverImg} alt={name} className="explore-card-image" />
        <div className="delivery-time">{deliveryTime}</div>
        {discount && <div className="discount absolute-center">{discount}</div>}
      </div>
      <div className="res-row">
        <div className="res-name">{name}</div>
        {rating && (
          <div className="res-rating absolute-center">
            {rating}
            <i className="fi fi-rr-star absolute-center" />
          </div>
        )}
      </div>
      <div className="res-row">
        {approxPrice && <div className="res-price">{approxPrice}</div>}
        <Stack direction="row" spacing={2}>
          <Button
            onClick={handleAddtoCart}
            style={style}
            className="add-to-cart"
            variant="contained"
            endIcon={<AddIcon />}
          >
            ADD
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default ExploreCard;
