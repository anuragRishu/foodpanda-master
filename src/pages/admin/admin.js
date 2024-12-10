import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React, { useEffect, useState } from "react";
import "./admin.css";
import AdminHeader from "./header/header_admin";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import { getCategories, getMenuItems } from "../../Utilities/Axios/apiService";
import { getCategory } from "../../reducers/categori_slice";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import AlertDialogSlide from "../../components/common/dialog/dialog";

const AdminDashboard = () => {
  const [categories, setCategoryData] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [item, setItem] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    (async function getAllData() {
      let categoryList = await getCategories();
      let menuList = await getMenuItems();
      setCategoryData(categoryList.data.category);
      setMenuItems(menuList.data.items);
      dispatch(getCategory({ categoryList: categoryList.data.category }));
    })();
    console.log("categories");
  }, [showDialog]);
  const handleButtonClick = (item) => {
    console.log(item);
    setItem(item);
    setShowDialog(true);
  };
  const handleEdit = (item) => {
    navigate("/admin-edit", { state: { item } });
  };
  return (
    <>
      {showDialog && (
        <AlertDialogSlide
          item={item}
          onClose={() => setShowDialog(false)}
          title={item.title}
        />
      )}
      <div style={{ overflowX: "hidden", maxWidth: "100%" }}>
        <AdminHeader />
        <div className="dashboard-body">
          <div className="dashboard-container">
            <div className="title">Dashboard</div>
          </div>
          <div className="stats-body">
            <div className="stats-container green">
              <div className="card-head">
                <div className="meta-data">
                  <span>total users</span>
                  256
                </div>
                <AccountCircleIcon className="account-circle green" />
              </div>
            </div>
            <div className="stats-container purple">
              <div className="card-head">
                <div className="meta-data">
                  <span>total categories</span>
                  {categories.length}
                </div>
                <AccountCircleIcon className="account-circle purple" />
              </div>
            </div>
            <div className="stats-container blue">
              <div className="card-head">
                <div className="meta-data">
                  <span>total dishes</span>
                  {menuItems.length}
                </div>
                <AccountCircleIcon className="account-circle blue" />
              </div>
            </div>
            <div className="stats-container yellow">
              <div className="card-head">
                <div className="meta-data">
                  <span>total orders</span>
                  256
                </div>
                <AccountCircleIcon className="account-circle yellow" />
              </div>
            </div>
            <div className="stats-container green">
              <div className="card-head">
                <div className="meta-data">
                  <span>total online transaction</span>
                  256
                </div>
                <AccountCircleIcon className="account-circle green" />
              </div>
            </div>
            <div className="stats-container green">
              <div className="card-head">
                <div className="meta-data">
                  <span>total items in cart</span>
                  256
                </div>
                <AccountCircleIcon className="account-circle green" />
              </div>
            </div>
          </div>
          <div className="category-container">
            <div
              className="sub-header"
              style={{ justifyContent: "space-between", display: "flex" }}
            >
              <div className="collection-title"> Categories</div>
              <AddIcon
                className="cur-pointer"
                onClick={() => {
                  item.title = "Add New Category?";
                  handleButtonClick(item);
                }}
                sx={{ mr: 2 }}
              />
            </div>
            <MDBTable hover align="middle" width="100%">
              <MDBTableHead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Menu Item Count</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {categories.map((item) => {
                  return (
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={
                              item.images
                                ? item.images.url
                                : "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?cs=srgb&dl=pexels-ella-olsson-1640772.jpg&fm=jpg"
                            }
                            alt={item.category_name}
                            style={{ width: "45px", height: "45px" }}
                            className="rounded-circle"
                          />
                          <div className="ms-3">
                            <p className="fw-bold mb-1">{item.category_name}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="fw-normal mb-1">
                          {item.menu_item_id.length} Items
                        </p>
                      </td>
                      <td>
                        <MDBBadge color="success" pill>
                          Active
                        </MDBBadge>
                      </td>
                      <td>
                        <MDBBtn
                          color="link"
                          rounded
                          size="sm"
                          onClick={() => handleEdit(item)}
                        >
                          View
                        </MDBBtn>
                      </td>
                    </tr>
                  );
                })}
              </MDBTableBody>
            </MDBTable>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
