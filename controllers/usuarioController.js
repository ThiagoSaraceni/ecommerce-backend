const Usuario = require("../models/costumer");
const bcrypt = require("bcrypt");

const UsuarioController = {
  registerUser: async (req, res) => {
    const { nome, sobrenome, email, senha } = req.body;

    try {
      const novoUsuario = await Usuario.create({
        nome,
        sobrenome,
        email,
        senha,
      });
      res.status(201).json(novoUsuario);
    } catch (error) {
      console.error("Erro ao criar cliente: ", error);
      res.status(500).json({ error: "Erro ao criar cliente" });
    }
  },

  loginUser: async (req, res) => {
    const { email, senha } = req.body;

    try {
      const usuario = await Usuario.findOne({ where: { email } });

      if (!usuario) {
        return res.status(404).json({ error: "Cliente não encontrado" });
      }

      //compara se senha do req.body é igual senha do usuario encontrado
      const isMatch = await bcrypt.compare(senha, usuario.senha);
      if (!isMatch) {
        return res.status(401).json({ error: "Senha incorreta" });
      }

      res.status(200).json({ message: "Login bem sucedido", usuario });
    } catch (error) {
      console.error("erro no login", error);
      res.status(500).json({ error: "Erro no login" });
    }
  },
};

module.exports = UsuarioController;
