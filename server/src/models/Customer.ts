import mongoose, { Document, Schema } from "mongoose";

export interface ICustomer extends Document {
  user: mongoose.Types.ObjectId;
  name: string;
  phone: string;
  totalOrders: number;
  lastOrder: string;
  status: "Active" | "New" | "VIP";
}

const customerSchema = new Schema<ICustomer>(
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

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    totalOrders: {
      type: Number,
      default: 0,
    },

    lastOrder: {
      type: String,
      default: "No orders yet",
    },

    status: {
      type: String,
      enum: ["Active", "New", "VIP"],
      default: "New",
    },
  },
  {
    timestamps: true,
  },
);

const Customer = mongoose.model<ICustomer>("Customer", customerSchema);

export default Customer;
