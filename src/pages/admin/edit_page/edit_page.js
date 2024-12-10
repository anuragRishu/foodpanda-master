import AddIcon from "@mui/icons-material/Add";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getCategoryItems } from "../../../Utilities/Axios/apiService";
import AlertDialogSlide from "../../../components/common/dialog/dialog";
import AdminHeader from "../header/header_admin";
import "./edit_page.css";

const EditPage = () => {
  const { state } = useLocation();
  const [categoryDetails, setCategoryItems] = useState();
  const [showDialog, setShowDialog] = useState(false);
  useEffect(() => {
    const getMenuItem = async () => {
      try {
        let response = await getCategoryItems(state.item.slug ?? "");
        setCategoryItems(response.data.matchedCategory);
      } catch (e) {
        console.log(e, "error in useEffect of editpage");
      }
    };

    if (showDialog === false) {
      getMenuItem();
    }
  }, [showDialog]);

  const [item, setItem] = useState(null);
  const handleButtonClick = (item) => {
    console.log(item);
    setItem(item);
    setShowDialog(true);
  };
  console.log(state.item, "item");
  console.log(categoryDetails);
  return (
    <>
      {showDialog && (
        <AlertDialogSlide
          item={item}
          onClose={() => setShowDialog(false)}
          title={item.title}
        />
      )}
      <div style={{ overflowX: "hidden" }}>
        <AdminHeader />
        <div className="edit-body">
          <div className="dashboard-container">
            <div
              className="sub-header"
              style={{ justifyContent: "space-between", display: "flex" }}
            >
              <div className="title">
                {categoryDetails && categoryDetails.category_name}
              </div>
              <div className="addBtn">
                <ModeEditOutlineOutlinedIcon
                  className="cur-pointer"
                  onClick={() => {
                    categoryDetails.title = "Update Category Name?";
                    handleButtonClick(categoryDetails);
                  }}
                  sx={{ mr: 2 }}
                />
                <AddIcon
                  className="cur-pointer"
                  onClick={() => {
                    categoryDetails.title = "Add New Item?";
                    handleButtonClick(categoryDetails);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="menu-items-table">
            <MDBTable hover align="middle">
              <MDBTableHead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Discount</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {categoryDetails && categoryDetails.menu_item_id.map((item) => {
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
                            alt={item.name}
                            style={{ width: "50px", height: "50px" }}
                            className="rounded-circle"
                          />
                          <div className="ms-3">
                            <p className="fw-bold mb-1">{item.name}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="fw-normal mb-1">₹{item.price}</p>
                      </td>
                      <td>{item.discount}%</td>
                      <td>
                        <div className="edit-rating">
                          <MDBBadge color="success" pill>
                            {item.ratings}
                            <StarBorderOutlinedIcon
                              sx={{
                                paddingBottom: "3px",
                                paddingLeft: "2px",
                                height: "20px",
                                width: "20px ",
                              }}
                            />
                          </MDBBadge>
                        </div>
                      </td>
                      <td>
                        <MDBBtn
                          color="link"
                          rounded
                          size="sm"
                          onClick={() => {
                            item.title = "Update Menu Items?";
                            handleButtonClick(item);
                          }}
                        >
                          Edit
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

export default EditPage;
