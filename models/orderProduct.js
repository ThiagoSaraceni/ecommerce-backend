const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const PedidoProduto = sequelize.define("PedidoProduto", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  pedidoId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Pedidos",
      key: "id",
    },
    allowNull: false,
  },
  produtoId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Produtos",
      key: "id",
    },
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

module.exports = PedidoProduto;
