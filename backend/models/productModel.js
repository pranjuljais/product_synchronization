import mongoose from "mongoose";

const productSechma = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true, unique: true },
    base_price: { type: String },
    quantity: { type: Number },
    description: { type: String },
  },
  { timestamps: true },
);

const productModel =
  mongoose.models.product || mongoose.model("product", productSechma);

export default productModel;
