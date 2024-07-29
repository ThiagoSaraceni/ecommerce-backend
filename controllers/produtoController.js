const Produto = require("../models/product");

const produtoController = {
  criarProduto: async (req, res) => {
    console.log("requisicao recebida com sucesso");

    const { nome, descricao, preco, url_img, categoria } = req.body;
    try {
      const novoProduto = await Produto.create({
        nome,
        descricao,
        preco,
        url_img,
        categoria,
      });
      res.status(201).json(novoProduto);
    } catch (error) {
      console.error("Erro ao criar produto: ", error);
      res.status(500).json({ error: "Erro ao criar produto" });
    }
  },
};

module.exports = produtoController;
