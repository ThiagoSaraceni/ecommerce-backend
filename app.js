require("dotenv").config();
const express = require("express");
const {
  sequelize,
  Produto,
  Cliente,
  Pedido,
  PedidoProduto,
} = require("./models/index");
const ecommerceRoutes = require("./routes/ecommerceRoutes");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`server listen on port ${PORT}`));
app.use("/api/", ecommerceRoutes);

sequelize
  .sync()
  .then(() => console.log("Database & tables created"))
  .catch((err) => {
    console.error("Error syncing database:", err);
    process.exit(1); // Encerra o processo em caso de erro
  });
