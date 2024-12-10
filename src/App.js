import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import MyProfile from "./components/common/header/my_profile";
import AdminDashboard from "./pages/admin/admin";
import EditPage from "./pages/admin/edit_page/edit_page";
import CartPage from "./pages/cart/cart";
import CategoryPage from "./pages/explore_category/explore_category";
import HomePage from "./pages/home/home_page";
import LoginPage from "./pages/login/login";
import RegisterPage from "./pages/register/register";
import { getUserData } from "./Utilities/Helper/function";

const App = () => {
  const [userRole, setUserData] = useState("");

  useEffect(() => {
    async function getData() {
      const local = await getUserData();
      setUserData(local);
    }
    getData();
  }, []);

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="category/:slug" element={<CategoryPage />} />
        <Route path="/profile" element={<MyProfile />} />
        {userRole && userRole.role === "admin" ? (
          <>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin-edit" element={<EditPage />} />
          </>
        ) : null}
      </Routes>
    </Router>
  );
};

export default App;
