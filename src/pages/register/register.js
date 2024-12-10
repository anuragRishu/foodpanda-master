import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import Face6TwoToneIcon from "@mui/icons-material/Face6TwoTone";
import FiberPinOutlinedIcon from "@mui/icons-material/FiberPinOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LocalPhoneTwoToneIcon from "@mui/icons-material/LocalPhoneTwoTone";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PasswordTwoToneIcon from "@mui/icons-material/PasswordTwoTone";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { React, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllStates, getSelectedStateData } from "../../data/fetch_state";
import { addToCart } from "../../reducers/add_to_cart_slice";
import { getCities } from "../../reducers/city_slice";
import { getState } from "../../reducers/state_slice";
import { login } from "../../reducers/user_slice";
import {
  getCartService,
  registerUserService,
} from "../../Utilities/Axios/apiService";
import { setUserData } from "../../Utilities/Helper/function";
import "./register.css";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/" underline="hover">
        FoodPanda
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();
const handleKeyPress = (event) => {
  const regex = /^[0-9\b]+$/; // regular expression to allow only numeric values
  if (!regex.test(event.key)) {
    event.preventDefault();
  }
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const [stateList, setStateList] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  const dispatch = useDispatch();

  const handleStateChange = async (event) => {
    setSelectedState(event.target.value);
    let cities = await getSelectedStateData(event.target.value);
    setCityList(cities);
    dispatch(getCities({ cities: cities }));
  };
  const handleCityChange = async (event) => {
    setSelectedCity(event.target.value);
  };

  useEffect(() => {
    (async function getAllstatesData() {
      let states = await getAllStates();
      dispatch(getState({ list: states }));
      setStateList(states);
    })();
  }, [dispatch]);

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

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      let userData = await registerUserService({
        fname: data.get("fname"),
        lname: data.get("lname"),
        email: data.get("email"),
        password: data.get("password"),
        phone: data.get("phone"),
        state: selectedState,
        city: selectedCity,
        zip: data.get("zipcode"),
        address: data.get("address"),
      });
      setUserData(userData.data.user);
      dispatch(login({ user_data: userData.data.user }));
      toast.success("Registered Successful!");
      let cartData = await getCartService(userData.data.user._id);
      console.log(cartData, "cartData from register page");
      dispatch(addToCart({ cartItems: cartData.data.matchedCart }));
      if (userData.data.user) {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Registration Failed--", error.response.data.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://thetechpanda.com/wp-content/uploads/2014/01/foodpanda-food-image.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light" ? "#E26310" : t.palette.grey[900],
            backgroundSize: "90%,100%,cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#E26310" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <div className="first-last">
                <TextField
                  sx={{ mr: "10px" }}
                  margin="normal"
                  required
                  fullWidth
                  id="fname"
                  label="First Name"
                  name="fname"
                  autoComplete="fname"
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Face6TwoToneIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="lname"
                  label="Last Name"
                  name="lname"
                  autoComplete="lname"
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Face6TwoToneIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleTwoToneIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordTwoToneIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <div className="first-last">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="phone"
                  label="Mobile Number"
                  name="phone"
                  autoComplete="phone"
                  onKeyPress={handleKeyPress}
                  autoFocus
                  inputProps={{ maxLength: 10 }}
                  InputProps={{
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
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedState}
                    onChange={handleStateChange}
                    label="State"
                  >
                    {allStates ? allStates : "Loading.."}
                  </Select>
                </FormControl>
              </div>
              <div className="first-last">
                <FormControl
                  required
                  fullWidth
                  sx={{ mt: 1, mr: 1, mb: 1, pt: 1 }}
                >
                  <InputLabel id="demo-simple-select-label">City</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedCity}
                    onChange={handleCityChange}
                    label="City"
                  >
                    {allCities ? allCities : "Loading.."}
                  </Select>
                </FormControl>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="zipcode"
                  label="ZipCode"
                  name="zipcode"
                  autoComplete="zipcode"
                  onKeyPress={handleKeyPress}
                  autoFocus
                  inputProps={{ maxLength: 6 }}
                  InputProps={{
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
              <TextField
                margin="normal"
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                autoComplete="address"
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HomeOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create Account
              </Button>
              <Copyright sx={{ mt: 20 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default RegisterPage;
