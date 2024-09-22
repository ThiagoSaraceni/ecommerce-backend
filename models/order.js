const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Pedido = sequelize.define("Pedido", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  clienteId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Clientes",
      key: "id",
    },
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "aberto",
  },
  data_pedido: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Pedido;
