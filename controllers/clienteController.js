const { Cliente } = require('../models');

class ClienteController 
{
  // CREATE
  static async criarCliente(req, res) 
  {
    try 
    {
      const { nome, email, telefone, endereco } = req.body;

      const novoUsuario = await Cliente.create({ nome, email, telefone, endereco });

      return res.status(201).json(novoUsuario);
    } 
    catch (error) 
    {
      return res.status(500).json({ error: error.message });
    }
  }

  // READ ALL
  static async listarClientes(req, res) {
    try {
      const usuarios = await Cliente.findAll();
      return res.status(200).json(usuarios);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // READ ONE
  static async buscarClientePorId(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Cliente.findByPk(id);
      
      if (!usuario) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }
      
      return res.status(200).json(usuario);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // UPDATE
  static async atualizarCliente(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await Cliente.update(req.body, {
        where: { id }
      });
      
      if (!updated) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }
      
      const usuarioAtualizado = await Cliente.findByPk(id);
      return res.status(200).json(usuarioAtualizado);
    } 
    catch (error) 
    {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }

  // DELETE
  static async deletarCliente(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Cliente.destroy({
        where: { id }
      });
      
      if (!deleted) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }
      
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ClienteController;