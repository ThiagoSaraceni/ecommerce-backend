const express = require("express");
const produtoController = require("../controllers/produtoController");
const UsuarioController = require("../controllers/usuarioController");
const PedidoController = require("../controllers/pedidoController");

const router = express.Router();

router.post("/produtos", produtoController.createProduct);
router.get("/produtos", produtoController.getProducts);
router.get("/produtos/:id", produtoController.getProductById);
router.put("/produtos/:id", produtoController.updateProductById);
router.delete("/produto/:id", produtoController.deleteProductById);

router.post("/cliente", UsuarioController.registerUser);
router.post("/login", UsuarioController.loginUser);
router.get("/users", UsuarioController.listUser);

router.get("/quantity/:clienteId", PedidoController.findQuantityProducts);
router.post("/add", PedidoController.addOnCart);
router.get("/incart/:clienteId", PedidoController.getProductsOnCart);
router.delete("/delete", PedidoController.deleteProductOnCart);

module.exports = router;
