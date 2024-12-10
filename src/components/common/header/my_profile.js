import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import Face6TwoToneIcon from "@mui/icons-material/Face6TwoTone";
import FiberPinOutlinedIcon from "@mui/icons-material/FiberPinOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LocalPhoneTwoToneIcon from "@mui/icons-material/LocalPhoneTwoTone";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllStates, getSelectedStateData } from "../../../data/fetch_state";
import logo from "../../../images/logo.png";
import { login } from "../../../reducers/user_slice";
import { getProfile, updateProfile } from "../../../Utilities/Axios/apiService";
import { setUserData } from "../../../Utilities/Helper/function";
import "./my_profile.css";

const handleKeyPress = (event) => {
  const regex = /^[0-9\b]+$/; // regular expression to allow only numeric values
  if (!regex.test(event.key)) {
    event.preventDefault();
  }
};

const MyProfile = () => {
  const disptach = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [readOnly, SetReadOnly] = useState(true);
  const [style, setStyle] = useState("hidden");
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const handleStateChange = async (event) => {
    setSelectedState(event.target.value);
    let cities = await getSelectedStateData(event.target.value);
    setCityList(cities);
  };
  const handleCityChange = async (event) => {
    setSelectedCity(event.target.value);
  };

  useEffect(() => {
    (async function getUserData() {
      try {
        let response = await getProfile();
        setUser(response.data.user);
        let states = await getAllStates();
        setStateList(states);
        let cities = await getSelectedStateData(response.data.user.state);
        setCityList(cities);
      } catch (e) {
        console.log(e, "error in the profile");
      }
    })();
  }, []);
  let allStates;
  if (stateList) {
    allStates = stateList.map((stateData, index) => {
      return (
        <MenuItem key={index} value={stateData.name}>
          {" "}
          {stateData.name}
        </MenuItem>
      );
    });
  }

  let allCities;
  if (cityList) {
    allCities = cityList.map((cityData, index) => {
      return (
        <MenuItem key={index} value={cityData.name}>
          {" "}
          {cityData.name}
        </MenuItem>
      );
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      let updataData = await updateProfile({
        fname: data.get("fname"),
        lname: data.get("lname"),
        email: data.get("email"),
        phone: data.get("phone"),
        address: data.get("address"),
        state: selectedState ?? user.state,
        city: selectedCity ?? user.city,
        zip: data.get("zipcode"),
      });
      setUserData(updataData.data.user);
      disptach(login({ user_data: updataData.data.user }));
      SetReadOnly(true);
      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.log("Failure", error.response.data.message);
    }
  };
  return user.fname ? (
    <>
      {" "}
      <div className="my-profile-wrapper">
        <div className="my-profile-logo">
          <img
            onClick={() => navigate("/")}
            src={logo}
            alt="logo"
            className="my-profile-logo-img cur-pointer"
          />
        </div>
        <div className="collection-title">My Profile</div>
        <div
          className="profile-container"
          onMouseEnter={(e) => {
            setStyle("visible");
          }}
          onMouseLeave={(e) => {
            setStyle("hidden");
          }}
        >
          <EditTwoToneIcon
            onClick={() => SetReadOnly(false)}
            sx={{
              position: "absolute",
              cursor: "pointer",
              top: "0",
              right: "0",
              m: 2,
              visibility: style,
            }}
          />
          <div className="profile-avatar">
            <Avatar
              alt="User Image"
              sx={{ height: "100%", width: "100%", marginTop: "0.5rem" }}
              src="data:image/jpeg;base64,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"
            />
          </div>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              mt: 1,
            }}
          >
            <div className="profile-full-name">
              <TextField
                sx={{ mr: "10px", ml: "10px" }}
                margin="normal"
                required
                fullWidth
                defaultValue={user.fname}
                id="fname"
                label="First Name"
                name="fname"
                autoComplete="name"
                autoFocus
                InputProps={{
                  readOnly: readOnly,
                  startAdornment: (
                    <InputAdornment position="start">
                      <Face6TwoToneIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                sx={{ mr: "10px", ml: "10px" }}
                margin="normal"
                required
                fullWidth
                defaultValue={user.lname || " "}
                id="lname"
                label="Last Name"
                name="lname"
                autoComplete="name"
                autoFocus
                InputProps={{
                  readOnly: readOnly,
                  startAdornment: (
                    <InputAdornment position="start">
                      <Face6TwoToneIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="profile-full-name">
              <TextField
                sx={{ mr: "10px", ml: "10px" }}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                defaultValue={user.email || " "}
                autoFocus
                InputProps={{
                  readOnly: readOnly,
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleTwoToneIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                sx={{ mr: "10px", ml: "10px" }}
                margin="normal"
                required
                fullWidth
                id="zipcode"
                label="ZipCode"
                name="zipcode"
                autoComplete="zipcode"
                onKeyPress={handleKeyPress}
                defaultValue={user.zip || " "}
                autoFocus
                inputProps={{ maxLength: 6 }}
                InputProps={{
                  readOnly: readOnly,
                  inputMode: "number",
                  pattern: "[0-9]*",
                  maxLength: 6,
                  startAdornment: (
                    <InputAdornment position="start">
                      <FiberPinOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="profile-full-name">
              <TextField
                sx={{ mr: "10px", ml: "10px" }}
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Mobile Number"
                name="phone"
                autoComplete="phone"
                defaultValue={user.phone || " "}
                onKeyPress={handleKeyPress}
                autoFocus
                inputProps={{ maxLength: 10 }}
                InputProps={{
                  readOnly: readOnly,

                  inputMode: "number",
                  pattern: "[0-9]*",
                  maxLength: 10,
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocalPhoneTwoToneIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <FormControl required fullWidth sx={{ m: 1, pt: 1 }}>
                <InputLabel id="demo-simple-select-label">States</InputLabel>
                <Select
                  readOnly={readOnly}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedState ?? user.state ?? ""}
                  onChange={handleStateChange}
                  label="State"
                >
                  {allStates ? allStates : "Loading.."}
                </Select>
              </FormControl>
            </div>
            <div className="profile-full-name">
              <FormControl required fullWidth sx={{ m: 1, pt: 1 }}>
                <InputLabel id="demo-simple-select-label">City</InputLabel>
                <Select
                  readOnly={readOnly}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedCity ?? user.city ?? ""}
                  onChange={handleCityChange}
                  label="City"
                >
                  {allCities ? allCities : "Loading.."}
                </Select>
              </FormControl>
              <TextField
                sx={{ mr: "10px", ml: "10px" }}
                margin="normal"
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                autoComplete="address"
                defaultValue={user.address || ""}
                autoFocus
                InputProps={{
                  readOnly: readOnly,
                  startAdornment: (
                    <InputAdornment position="start">
                      <HomeOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="profile-full-name">
              <Button
                onClick={() => SetReadOnly(true)}
                type="button"
                fullWidth
                variant="contained"
                sx={{
                  m: 4,
                  visibility: readOnly === true ? "hidden" : "visible",
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  m: 4,
                  visibility: readOnly === true ? "hidden" : "visible",
                }}
              >
                Update Account
              </Button>
            </div>
          </Box>
        </div>
      </div>
    </>
  ) : (
    <div></div>
  );
};

export default MyProfile;
