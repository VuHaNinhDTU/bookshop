const express = require("express");
const router = express.Router();
const ProductController = require("../controller/ProductController");

// Route tạo sản phẩm
router.post("/create", ProductController.createProduct);
router.put("/update/:id", ProductController.updateProduct);
router.delete("/delete-product/:id", ProductController.deleteProduct);
router.get("/getAll-Product", ProductController.getAllProduct);
router.get("/getDetail-Product/:id", ProductController.getDetailProduct);


module.exports = router;
