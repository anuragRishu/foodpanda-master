import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../reducers/add_to_cart_slice";
import {
  addToCartService,
  deleteFromCart,
  getCartService,
} from "../../Utilities/Axios/apiService";
import { getUserData } from "../../Utilities/Helper/function";
import "./cart.css";

export const Items = ({ _id, name, images, price, ingredients, quantity }) => {
  const dispatch = useDispatch();
  const [userData, setUserDataLocal] = useState("");

  useEffect(() => {
    (async function fetchLocalDataFromStorage() {
      const local = await getUserData();
      setUserDataLocal(local);
    })();
  }, []);

  //Delete Item From Cart
  async function handleDelete() {
    try {
      const result = await deleteFromCart({
        user_id: userData._id,
        cart_product: _id,
      });
      if (result) {
        toast.success("Deleted Successfully");
      }
    } catch (err) {
      console.log(err);
    }
    try {
      let cartData = await getCartService(userData._id);

      dispatch(addToCart({ cartItems: cartData.data.matchedCart }));
    } catch (error) {
      console.log(error);
    }
  }

  //Add Item Count
  async function handleAdd() {
    try {
      let data = await addToCartService({
        user_id: userData._id,
        cart_product: _id,
        quantity: quantity + 1,
        price: price,
      });
      try {
        let cartData = await getCartService(userData._id);

        dispatch(addToCart({ cartItems: cartData.data.matchedCart }));
      } catch (error) {
        console.log(error);
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Decrement Item Count

  async function handleMinus() {
    if (quantity > 1) {
      try {
        let data = await addToCartService({
          user_id: userData._id,
          cart_product: _id,
          quantity: quantity - 1,
          price: price,
        });
        try {
          let cartData = await getCartService(userData._id);

          dispatch(addToCart({ cartItems: cartData.data.matchedCart }));
        } catch (error) {
          console.log(error);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.error("Cannot Decrement Quantity");
    }
  }

  return (
    <>
      <div className="items-info">
        <div className="product-img">
          <img src={images.url} alt={name} />
        </div>
        <div>
          <div className="title">{name}</div>
          <div style={{ textAlign: "center" }}>₹{price}</div>
        </div>

        <div className="add-minus-quantity">
          <i
            className="fas fa-minus minus cur-pointer"
            onClick={handleMinus}
          ></i>
          <div style={{ marginLeft: "2rem", marginRight: "2rem" }}>
            {quantity}
          </div>
          <i className="fas fa-plus add cur-pointer" onClick={handleAdd}></i>
        </div>

        <div className="price">{price * quantity}</div>

        <div className="remove-item">
          <i
            className="fas fa-trash-alt remove cur-pointer"
            onClick={handleDelete}
          ></i>
        </div>
      </div>
      <hr />
    </>
  );
};
