import express from "express";
import authAdmin from "../middleware/authAdmin.js";
import {
  adminLogin,
  adminRegister,
  updateBankDetails,
  updateBusinessDetails,
  updateTnc,
} from "../controller/adminController.js";

const adminRouter = express.Router();

adminRouter.post("/register", adminRegister);
adminRouter.post("/login", adminLogin);
adminRouter.patch("/bank", authAdmin, updateBankDetails);
adminRouter.patch("/business", authAdmin, updateBusinessDetails);
adminRouter.patch("/tnc", authAdmin, updateTnc);

export default adminRouter;
