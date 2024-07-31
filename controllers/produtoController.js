const Produto = require("../models/product");

const produtoController = {
  createProduct: async (req, res) => {
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

  getProducts: async (req, res) => {
    console.log("requisicao recebida com sucesso!");

    try {
      const products = await Produto.findAll();
      res.status(200).json(products);
    } catch (error) {
      console.error("Erro ao buscar produtos ", error);
      res.status(500).json({ error: "Erro ao buscar produtos" });
    }
  },

  getProductById: async (req, res) => {
    const id = req.params.id;
    console.log(`Requisicao recebida para o produto com ID: ${id}`);

    try {
      const products = await Produto.findByPk(id);

      if (!products) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }

      res.status(200).json(products);
    } catch (error) {
      console.error("Erro ao buscar produto: ", error);
      res.status(500).json({ error: "Erro ao buscar produto" });
    }
  },

  updateProductById: async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, preco, url_img, categoria } = req.body;
    console.log(`Requisicao recebida para o produto com ID: ${id}`);

    try {
      const product = await Produto.findByPk(id);

      //return para nao ir a linha debaixo
      if (!product) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }

      await product.update({
        nome,
        descricao,
        preco,
        url_img,
        categoria,
      });

      res.status(200).json(product);
    } catch (error) {
      console.error("Erro ao atualizar produto: ", error);
      res.status(500).json({ error: "Erro ao atualizar produto" });
    }
  },

  deleteProductById: async (req, res) => {
    const { id } = req.params;
    console.log(`Requisicao recebida para deletar o produto com ID: ${id}`);
    try {
      const product = await Produto.findByPk(id);

      if (!product) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }
      await product.destroy();
      res.status(204).send();
    } catch (error) {
      console.error("Erro ao deletar produto: ", error);
      res.status(500).json({ error: "Erro ao deletar produto" });
    }
  },
};

module.exports = produtoController;
