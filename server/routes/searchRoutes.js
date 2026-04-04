import  {searchProducts}  from "../controllers/searchController.js";
import express from "express";

const router = express.Router();

router.get("/search-products", searchProducts);

export default router;