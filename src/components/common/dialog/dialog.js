import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { toast } from "react-toastify";
import {
  addMenuItem,
  createCategory,
  updateCategory,
  updateMenuItems,
} from "../../../Utilities/Axios/apiService";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
    props.onClose(); //callback function and it will set the parent call to false
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    switch (props.title) {
      case "Update Category Name?":
        try {
          let updatedCategory = await updateCategory(props.item._id, {
            category_name: data.get("category"),
          });
          if (updatedCategory) {
            toast.success("Updated Successfully");
            props.onClose();
          }
        } catch (error) {
          console.log("Dialog Error in edit category");
        }
        break;
      case "Update Menu Items?":
        try {
          let updatedMenu = await updateMenuItems({
            _id: props.item._id,
            name: data.get("item"),
            delivery_time: data.get("delivery"),
            price: data.get("amount"),
            discount: data.get("discount"),
          });
          if (updatedMenu) {
            toast.success("Updated Successfully");
            props.onClose();
          }
        } catch (error) {
          console.log(
            "Dialog Error in edit menuitem",
            error.response.data.message
          );
        }
        break;
      case "Add New Item?":
        try {
          let newMenuItem = await addMenuItem({
            id: props.item._id,
            name: data.get("item"),
            delivey_time: data.get("delivery"),
            price: data.get("amount"),
            discount: data.get("discount"),
          });
          if (newMenuItem) {
            toast.success("Added Successfully");
            props.onClose();
          }
          console.log(newMenuItem, "newMenuItem");
        } catch (error) {
          console.log(
            "Dialog Error In Adding Menu Item",
            error.response.data.message
          );
        }
        break;
      case "Add New Category?":
        try {
          let newCategory = await createCategory({
            category_name: data.get("category"),
          });
          if (newCategory) {
            toast.success("Added Successfully");
            props.onClose();
          }
          console.log(newCategory, "newCategory");
        } catch (error) {
          console.log("Dialog Error In Adding New Category");
        }
      default:
        console.log("heelo");
    }
  };
  console.log(props.item);
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box
          onSubmit={handleSubmit}
          component="form"
          sx={{
            m: 1,
          }}
          noValidate
          autoComplete="off"
        >
          <DialogTitle>{props.title}</DialogTitle>
          <DialogContent>
            {props.title === "Update Category Name?" ? (
              <TextField
                sx={{ mr: "10px", ml: "5px" }}
                margin="normal"
                id="category"
                name="category"
                defaultValue={props.item.category_name}
                label="Category Name"
                variant="standard"
              />
            ) : props.title === "Add New Category?" ? (
              <TextField
                sx={{ mr: "10px", ml: "5px" }}
                margin="normal"
                id="category"
                name="category"
                defaultValue={props.item.category_name}
                label="Category Name"
                variant="standard"
              />
            ) : (
              <>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  <TextField
                    sx={{ mr: "10px", ml: "5px" }}
                    margin="normal"
                    id="item"
                    name="item"
                    defaultValue={props.item.name}
                    label="Item Name"
                    variant="standard"
                  />
                  <TextField
                    margin="normal"
                    id="amount"
                    defaultValue={props.item.price}
                    name="amount"
                    label="Amount"
                    variant="standard"
                  />
                </div>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  <TextField
                    sx={{ mr: "10px", ml: "5px" }}
                    margin="normal"
                    id="discount"
                    name="discount"
                    defaultValue={props.item.discount}
                    label="Discount"
                    variant="standard"
                  />
                  <TextField
                    margin="normal"
                    id="delivery-time"
                    name="delivery"
                    defaultValue={`${props.item.delivey_time ?? ""}`}
                    label="Delivery Time(mins)"
                    variant="standard"
                  />
                </div>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              {props.title === "Add New Item?" ? "ADD" : "Update"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}
