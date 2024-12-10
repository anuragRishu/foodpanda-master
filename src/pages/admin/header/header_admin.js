import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React, { useEffect, useState } from "react";
import logo from "../../../images/fp.png";
import "./header_admin.css";
import MenuIcon from "@mui/icons-material/Menu";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import {
  clearLocalStorage,
  getUserData,
} from "../../../Utilities/Helper/function";
import ManageHistoryRoundedIcon from "@mui/icons-material/ManageHistoryRounded";
import { useDispatch } from "react-redux";
import { logout } from "../../../reducers/user_slice";
import Logout from "@mui/icons-material/Logout";

const AdminHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userData, setUserDataLocal] = useState("");
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [state, setState] = useState({
    top: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const list = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer("left", false)}
      onKeyDown={toggleDrawer("left", false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  useEffect(() => {
    (async function fetchLocalDataFromStorage() {
      const local = await getUserData();
      setUserDataLocal(local);
    })();
  }, []);

  return (
    <div>
      <div className={state.left ? "admin-header shifted" : "admin-header"}>
        <img className="admin-header-logo" src={logo} />
        <div className="menu-icon">
          <MenuIcon
            className="cur-pointer icon-only"
            onClick={toggleDrawer("left", true)}
          />
        </div>
        <div className="header-location-search-container-admin">
          <div className="location-wrapper-admin">
            <div className="location-icon-div-admin">
              <i className="fi fi-rs-marker absolute-center location-drop-icon-admin"></i>
              <div>Admin</div>
            </div>
            <i className="fi fi-rs-caret-down absolute-center"></i>
          </div>
          <div className="location-search-separator-admin"></div>

          <div className="header-search-bar-admin">
            <div>
              <i className="fi fi-rs-search absolute-center search-icon"></i>
            </div>

            <div>
              <input
                placeholder="Search for anything..."
                className="search-input-admin"
              />
            </div>
          </div>
        </div>
        <div
          className="profile-wrapper"
          style={{ position: "absolute", right: "0" }}
        >
          {
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
                    <Badge color="secondary" variant="dot">
                      <Avatar
                        sx={{ width: 60, height: 60, bgcolor: "#FB2B55" }}
                      >
                        {userData.fname}
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
                <MenuItem onClick={() => console.log("Hello")}>
                  <Badge
                    badgeContent={10}
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
                <MenuItem onClick={() => console.log("hel2")}>
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
          }
        </div>
      </div>
      <div>
        <Drawer
          sx={{ backdropFilter: "blur(1px)" }}
          anchor="left"
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
          style={{ zIndex: 0 }}
        >
          {list}
        </Drawer>
      </div>
    </div>
  );
};

export default AdminHeader;
