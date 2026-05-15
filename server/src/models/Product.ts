import mongoose, { Schema } from "mongoose";

export interface IProduct extends Document {
  user: mongoose.Types.ObjectId;
  name: string;
  category: string;
  price: number;
  status: "Available" | "Low Stock" | "Unavailable";
}

const productSchema = new Schema<IProduct>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Available", "Low Stock", "Unavailable"],
      default: "Available",
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
