require("dotenv").config();
const express = require("express");
const {
  sequelize,
  Produto,
  Cliente,
  Pedido,
  PedidoProduto,
} = require("./models/index");
const app = express();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`server listen on port ${PORT}`));

sequelize
  .sync({ force: true })
  .then(() => console.log("Database & tables created"))
  .catch((err) => {
    console.error("Error syncing database:", err);
    process.exit(1); // Encerra o processo em caso de erro
  });
