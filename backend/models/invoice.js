import mongoose from "mongoose";

const invoiceSechma = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true, unique: true },
    base_price: { type: String },
    quantity: { type: Number },
    description: { type: String },
  },
  { timestamps: true },
);

const invoiceModel =
  mongoose.models.invoice || mongoose.model("invoice", invoiceSechma);

export default invoiceModel;
