const { Dimensao } = require('../models');

class DimensaoController {
  // CREATE
  static async criarDimensao(req, res) {
    try {
      const { largura_min, largura_max, altura_min, altura_max } = req.body;
      const novaDimensao = await Dimensao.create({ largura_min, largura_max, altura_min, altura_max });
      return res.status(201).json(novaDimensao);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // READ ALL
  static async listarDimensoes(req, res) {
    try {
      const dimensoes = await Dimensao.findAll();
      return res.status(200).json(dimensoes);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // READ ONE
  static async buscarDimensaoPorId(req, res) {
    try {
      const { id } = req.params;
      const dimensao = await Dimensao.findByPk(id);
      
      if (!dimensao) {
        return res.status(404).json({ error: 'Dimensão não encontrada' });
      }
      
      return res.status(200).json(dimensao);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // UPDATE
  static async atualizarDimensao(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await Dimensao.update(req.body, {
        where: { id }
      });
      
      if (!updated) {
        return res.status(404).json({ error: 'Dimensão não encontrada' });
      }
      
      const dimensaoAtualizada = await Dimensao.findByPk(id);
      return res.status(200).json(dimensaoAtualizada);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }

  // DELETE
  static async deletarDimensao(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Dimensao.destroy({
        where: { id }
      });
      
      if (!deleted) {
        return res.status(404).json({ error: 'Dimensão não encontrada' });
      }
      
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = DimensaoController;