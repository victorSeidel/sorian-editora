const { Plano } = require('../models');

class PlanoController {
  // CREATE
  static async criarPlano(req, res) {
    try {
      const { nome, quantidade_autor } = req.body;
      const novoPlano = await Plano.create({ nome, quantidade_autor });
      return res.status(201).json(novoPlano);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // READ ALL
  static async listarPlanos(req, res) {
    try {
      const planos = await Plano.findAll();
      return res.status(200).json(planos);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // READ ONE
  static async buscarPlanoPorId(req, res) {
    try {
      const { id } = req.params;
      const plano = await Plano.findByPk(id);
      
      if (!plano) {
        return res.status(404).json({ error: 'Plano não encontrado' });
      }
      
      return res.status(200).json(plano);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // UPDATE
  static async atualizarPlano(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await Plano.update(req.body, {
        where: { id }
      });
      
      if (!updated) {
        return res.status(404).json({ error: 'Plano não encontrado' });
      }
      
      const planoAtualizado = await Plano.findByPk(id);
      return res.status(200).json(planoAtualizado);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // DELETE
  static async deletarPlano(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Plano.destroy({
        where: { id }
      });
      
      if (!deleted) {
        return res.status(404).json({ error: 'Plano não encontrado' });
      }
      
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = PlanoController;