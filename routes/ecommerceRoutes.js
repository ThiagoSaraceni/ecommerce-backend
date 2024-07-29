const express = require("express");
const produtoController = require("../controllers/produtoController");

const router = express.Router();

router.post("/produtos", produtoController.criarProduto);

module.exports = router;
