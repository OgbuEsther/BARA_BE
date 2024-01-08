import mongoose from "mongoose";

interface Iprod {
  title: string;
  details: string;
  price: number;
  quantity: number;
  productImage: string;
  status: boolean;
  category: string;
}

interface UserData extends Iprod, mongoose.Document {}

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    details: {
      type: String,
    },

    price: {
      type: Number,
    },
    quantity: {
      type: Number,
    },

    productImage: {
      type: String,
    },

    status: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model<UserData>("products", ProductSchema);
