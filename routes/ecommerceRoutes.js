const express = require("express");
const produtoController = require("../controllers/produtoController");

const router = express.Router();

router.post("/produtos", produtoController.createProduct);
router.get("/produtos", produtoController.getProducts);
router.get("/produtos/:id", produtoController.getProductById);
router.put("/produtos/:id", produtoController.updateProductById);
router.delete("/produto/:id", produtoController.deleteProductById);

module.exports = router;
