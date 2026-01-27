import express from "express";
import authAdmin from "../middleware/authAdmin.js";
import {
  adminLogin,
  adminRegister,
  updateProfile,
  removeAdmin,
  addProduct,
  removeProduct,
  editProduct,
} from "../controller/adminController.js";

const adminRouter = express.Router();

adminRouter.post("/register", adminRegister);
adminRouter.post("/login", adminLogin);
adminRouter.patch("/update/:id", authAdmin, updateProfile);
adminRouter.delete("/delete/:id", authAdmin, removeAdmin);
adminRouter.post("/add", authAdmin, addProduct);
adminRouter.delete("/remove/:id", authAdmin, removeProduct);
adminRouter.patch("/edit/:id", authAdmin, editProduct);

export default adminRouter;
