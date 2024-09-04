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
});

module.exports = Pedido;
