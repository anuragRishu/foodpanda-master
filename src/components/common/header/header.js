import Logout from "@mui/icons-material/Logout";
import ManageHistoryRoundedIcon from "@mui/icons-material/ManageHistoryRounded";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../../images/logo.png";
import { logout } from "../../../reducers/user_slice";
import { getCartService } from "../../../Utilities/Axios/apiService";
import {
  clearLocalStorage,
  getUserData
} from "../../../Utilities/Helper/function";
import MyTextButton from "../button/buttons";
import "./header.css";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);
  const cartLength = useSelector((state) => [state.cart.cartItems]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleLogin() {
    navigate("/login");
  }
  function handleSignup() {
    navigate("/register");
  }
  const [userData, setUserDataLocal] = useState("");

  useEffect(() => {
    (async function fetchLocalDataFromStorage() {
      const local = await getUserData();
      setUserDataLocal(local);

      async function fetchCart(id) {
        const data = await getCartService(id);
        setCart(data.data.matchedCart);
      }
      await fetchCart(local._id);
    })();
  }, []);
  const isLoggedIn = userData ? true : false;
  return (
    <div className="max-width header">
      <img
        onClick={() => navigate("/")}
        src={logo}
        alt="Logo"
        className="header-logo cur-pointer"
      />
      <div className="header-right">
        <div className="header-location-search-container">
          <div className="location-wrapper">
            <div className="location-icon-div">
              <i className="fi fi-rs-marker absolute-center location-drop-icon"></i>
              <div>Hyderabad</div>
            </div>
            <i className="fi fi-rs-caret-down absolute-center"></i>
          </div>
          <div className="location-search-separator"></div>

          <div className="header-search-bar">
            <div>
              <i className="fi fi-rs-search absolute-center search-icon"></i>
            </div>

            <div>
              <input
                placeholder="Search for cuisine or a dish"
                className="search-input"
              />
            </div>
          </div>
        </div>

        <div className="profile-wrapper">
          {isLoggedIn ? (
            <React.Fragment>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Badge
                      color="secondary"
                      variant="dot"
                      invisible={
                        (cartLength && cartLength[0] && cartLength[0].cartItems
                          ? cartLength[0].cartItems.length //reducer wali
                          : cart.length) > 0 //api wali
                          ? false
                          : true
                      }
                    >
                      <Avatar
                        sx={{ width: 60, height: 60, bgcolor: "#FB2B55" }}
                      >
                        {userData.fname[0]}
                      </Avatar>
                    </Badge>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={() => navigate("/cart")}>
                  <Badge
                    badgeContent={
                      cartLength && cartLength[0] && cartLength[0].cartItems
                        ? cartLength[0].cartItems.length
                        : cart.length
                    }
                    color="secondary"
                    sx={{
                      "& .MuiBadge-badge": {
                        right: 18,
                        fontSize: 10,
                        height: 15,
                        width: 10,
                      },
                    }}
                  >
                    <ShoppingCartOutlinedIcon sx={{ mr: 2 }} />
                  </Badge>
                  My Cart
                </MenuItem>
                <MenuItem onClick={() => navigate("/profile")}>
                  <PersonOutlineOutlinedIcon sx={{ mr: 2 }} /> My Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ManageHistoryRoundedIcon sx={{ mr: 2 }} /> My Order
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={() => {
                    setUserDataLocal("");
                    dispatch(logout());
                    clearLocalStorage();
                  }}
                >
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </React.Fragment>
          ) : (
            <div className="not-logged-in absolute-center">
              <div className="log-in">
                <MyTextButton
                  className="sign-in-button"
                  onClick={handleLogin}
                  background={{ color: "#256fef" }}
                  style={{ color: "#ff5f1f" }}
                  label="Log In"
                />
              </div>
              <div className="sign-up">
                <MyTextButton
                  className="sign-up-button"
                  onClick={handleSignup}
                  style={{ color: "#ff5f1f" }}
                  label="Sign Up"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
