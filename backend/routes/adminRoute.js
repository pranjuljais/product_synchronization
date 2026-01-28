import express from "express";
import authAdmin from "../middleware/authAdmin.js";
import {
  adminLogin,
  adminRegister,
  getProfile,
  updateBankDetails,
  updateBusinessDetails,
  updateTnc,
} from "../controller/adminController.js";

const adminRouter = express.Router();

adminRouter.post("/register", adminRegister);
adminRouter.post("/login", adminLogin);
adminRouter.get("/", authAdmin, getProfile);
adminRouter.patch("/bank", authAdmin, updateBankDetails);
adminRouter.patch("/business", authAdmin, updateBusinessDetails);
adminRouter.patch("/tnc", authAdmin, updateTnc);

export default adminRouter;
