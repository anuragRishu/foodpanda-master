import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { Divider } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import React, { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import cash from "../../images/cash.png";
import logo from "../../images/logo.png";
import online from "../../images/online.png";
import { addToCart } from "../../reducers/add_to_cart_slice";
import {
  checkout,
  getCartService,
  getKey,
  payOnline
} from "../../Utilities/Axios/apiService";
import { getUserData } from "../../Utilities/Helper/function";
import "./cart.css";
import { Items } from "./Items";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Cart_Card2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.user.user_data);
  console.log(user, "user");
  const cartProduct = useSelector((state) => [state.cart.cartItems]);
  const [cart, setCart] = useState([]);
  const [totalSum, setTotalSum] = useState([]);
  const [userData, setUserData] = useState();

  useEffect(() => {
    (async function fetchLocalDataFromStorage() {
      const local = await getUserData();
      setUserData(local);
      async function fetchCart(id) {
        const data = await getCartService(id);
        setCart(data.data.matchedCart);

        const amountList = (
          cartProduct && cartProduct[0].cartItems
            ? cartProduct[0].cartItems
            : data.data.matchedCart
        ).map((item) => {
          return item.quantity * item.cart_product.price;
        });

        function calculateSum(list) {
          return list.reduce((next, curr) => next + curr, 0);
        }
        let sum = calculateSum(amountList);
        setTotalSum(sum);
      }
      await fetchCart(local._id);
    })();
  }, [cartProduct[0].cartItems]);

  async function handleCod() {
    try {
      let response = await checkout({
        shippingInfo: {
          address: userData.address,
          city: userData.city,
          state: userData.state,
          pinCode: userData.zip,
          phoneNo: userData.phone,
        },
        orderItems: (cartProduct && cartProduct[0].cartItems
          ? cartProduct[0].cartItems
          : cart
        ).map((items) => {
          const updatedProduct = {
            ...items.cart_product,
            quantity: items.quantity,
          };
          return updatedProduct;
        }),
        totalPrice: totalSum,
      });
      let cartData = await getCartService(userData._id);
      dispatch(addToCart({ cartItems: cartData.data.matchedCart }));
      toast.success("Order Placed Successfully");
      navigate("/");
    } catch (err) {
      console.log(err, "error h bro");
    }
  }

  async function handleOnline() {
    try {
      const {
        data: { key },
      } = await getKey();

      const {
        data: { orderDetails },
      } = await payOnline({ amount: totalSum });
      console.log(orderDetails,"Order");
      console.log(orderDetails.id,"id");
      const options = {
        key: key, // Enter the Key ID generated from the Dashboard
        amount: orderDetails.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "FoodPanda",
        description: "Test Transaction",
        image: logo,
        order_id: orderDetails.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: "http://localhost:3000/api/payment-verification",
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#121212",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.log(error, "online error");
    }
  }

  return (
    <>
      <section className="main-cart-section">
        <div className="header-cart">
          <img
            onClick={() => navigate("/")}
            src={logo}
            alt="Logo"
            className="header-logo-cart cur-pointer"
          />
        </div>

        <div className="sub-header">
          <div>
            <div className="cart-description collection-title">Food Cart</div>
            <div className="total-items">
              You have{" "}
              <span className="total-items-count">
                {cartProduct && cartProduct[0] && cartProduct[0].cartItems
                  ? cartProduct[0].cartItems.length
                  : cart.length}
              </span>{" "}
              items in Food Cart
            </div>
          </div>
          <div>
            <div className="card-total collection-title">
              Cart Total : <span>{totalSum}</span>
            </div>
            <div className="inclusive">(inclusive of all taxes)</div>
          </div>
        </div>
        <Divider />
        <div>
          <div className="cart-items">
            <div className="cart-items-container">
              <Scrollbars>
                {(cartProduct && cartProduct[0] && cartProduct[0].cartItems
                  ? cartProduct[0].cartItems
                  : cart
                ).map((curItem) => {
                  return (
                    <Items
                      key={curItem._id}
                      {...curItem.cart_product}
                      quantity={curItem.quantity}
                    />
                  );
                })}
              </Scrollbars>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "5rem",
              marginBottom: "2rem",
              fontSize: "2.8rem",
              alignItems: "center",
            }}
          >
            <div
              className="continue-shopping cur-pointer"
              onClick={() => navigate("/")}
            >
              <ArrowBackIosOutlinedIcon
                sx={{ height: "40px", width: "35px" }}
              />
              Continue Shopping
            </div>
            <div className="cur-pointer checkout" onClick={() => setOpen(true)}>
              Checkout
              <ArrowForwardIosOutlinedIcon
                sx={{
                  marginRight: "1rem",
                  marginLeft: "1rem",
                  height: "40px",
                  width: "35px",
                }}
              />
            </div>
          </div>
        </div>
      </section>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ fontSize: "28px" }}>
          Your Total Amount :{" "}
          {totalSum !== [] ? Number(totalSum).toFixed(2) : ""}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {"Payment Options :"}
          </DialogContentText>
        </DialogContent>
        <DialogActions className="dialog">
          <div className="payment-options">
            <div className="payment-container" onClick={handleOnline}>
              <div className="payment-image">
                <img className="payment-image-img" src={online} alt="online" />
              </div>
              <div>UPI/Credit/Debit</div>
            </div>
            <div className="cod">
              <div className="payment-container" onClick={handleCod}>
                <div className="payment-image">
                  <img className="payment-image-img" src={cash} alt="cash" />
                </div>
                <div>Cash On Delivery</div>
              </div>
            </div>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default Cart_Card2;
