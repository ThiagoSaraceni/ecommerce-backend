const sequelize = require("../config/database");
const Cliente = require("./costumer");
const Produto = require("./product");
const Pedido = require("./order");
const PedidoProduto = require("./orderProduct");

Cliente.hasMany(Pedido, { foreignKey: "clienteId" });
Pedido.belongsTo(Cliente, { foreignKey: "clienteId" });

Pedido.belongsToMany(Produto, {
  through: PedidoProduto,
  foreignKey: "pedidoId",
});
Produto.belongsToMany(Pedido, {
  through: PedidoProduto,
  foreignKey: "produtoId",
});

module.exports = {
  sequelize,
  Cliente,
  Produto,
  Pedido,
  PedidoProduto,
};
