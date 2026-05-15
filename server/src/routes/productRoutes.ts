import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./../controller/productController";
import express from "express";

import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").get(protect, getProducts).post(protect, createProduct);
router.route("/:id").put(protect, updateProduct).delete(protect, deleteProduct);

export default router;
