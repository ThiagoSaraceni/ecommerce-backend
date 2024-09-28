const { sequelize } = require("../models");
const Pedido = require("../models/order");
const PedidoProduto = require("../models/orderProduct");

const pedidoController = {
  addOnCart: async (req, res) => {
    const { clienteId, produtoId, quantidade } = req.body;
    try {
      let pedido = await Pedido.findOne({
        where: {
          clienteId,
          status: "aberto",
        },
      });

      if (!pedido) {
        pedido = await Pedido.create({
          clienteId,
          status: "aberto",
        });
      }

      // Verificar se o produto já está no pedido
      let pedidoProduto = await PedidoProduto.findOne({
        where: {
          pedidoId: pedido.id,
          produtoId,
        },
      });

      if (pedidoProduto) {
        // Se o produto já estiver no pedido, atualiza a quantidade
        pedidoProduto.quantidade = quantidade;
        await pedidoProduto.save();
      } else {
        // Se não estiver, cria um novo registro de PedidoProduto
        await PedidoProduto.create({
          pedidoId: pedido.id,
          produtoId: produtoId,
          quantidade,
        });
      }

      return res
        .status(200)
        .json({ message: "Produto adicionado ao carrinho.", pedidoProduto });
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
      return res
        .status(500)
        .json({ message: "Erro ao adicionar ao carrinho." });
    }
  },

  findQuantityProducts: async (req, res) => {
    const clienteId = req.params.clienteId;
    try {
      // Primeiro, encontrar o pedido "aberto" do cliente
      const pedido = await Pedido.findOne({
        where: {
          clienteId,
          status: "aberto",
        },
      });

      // Verifica se há um pedido em aberto
      if (!pedido) {
        return res
          .status(404)
          .json({ message: "Nenhum pedido em aberto encontrado", count: 0 });
      }

      // Contar a quantidade de produtos no pedido encontrado
      const { count } = await PedidoProduto.findAndCountAll({
        where: {
          pedidoId: pedido.id,
        },
      });

      return res.status(200).json({
        message: `Quantidade de produtos no carrinho: ${count}`,
        count: `${count}`,
      });
    } catch (error) {
      console.error(
        "Erro ao buscar quantidade de produtos no carrinho:",
        error
      );
      return res
        .status(500)
        .json({ message: "Erro ao buscar quantidade de produtos" });
    }
  },

  getProductsOnCart: async (req, res) => {
    try {
      const { pedidoId } = req.params;
      console.log({ pedidoId });

      const sqlQuery = `SELECT
                      pp.id,
                      nome,
                      descricao,
                      preco,
                      url_img,
                      categoria,
                      quantidade
                    FROM 
                      Produtos p 
                    inner join PedidoProdutos pp ON p.id = pp.produtoId
                      where pedidoId = ${pedidoId}`;

      const query = await sequelize.query(sqlQuery, {
        type: sequelize.QueryTypes.SELECT,
      });

      res.status(200).json({
        data: query,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar produtos no carrinho" });
    }
  },

  deleteProductOnCart: async (req, res) => {
    const { produtoId, clienteId } = req.query;

    try {
      const pedido = await Pedido.findOne({
        where: {
          clienteId,
          status: "aberto",
        },
      });

      const { id: pedidoId } = pedido;

      await PedidoProduto.destroy({
        where: {
          pedidoId,
          id: produtoId,
        },
      });
      console.log("produto deletado");
      res.status(204).send();
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = pedidoController;
