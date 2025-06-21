const { Tipo, Categoria } = require('../models');

class DiversosController {
  // ====== TIPO ======
  static async criarTipo(req, res) {
    try {
      const { nome } = req.body;
      const novoTipo = await Tipo.create({ nome });
      return res.status(201).json(novoTipo);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async listarTipos(req, res) {
    try {
      const tipos = await Tipo.findAll({ order: [['nome', 'ASC']] });
      return res.status(200).json(tipos);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async buscarTipoPorId(req, res) {
    try {
      const { id } = req.params;
      const tipo = await Tipo.findByPk(id);
      if (!tipo) return res.status(404).json({ error: 'Tipo não encontrado' });
      return res.status(200).json(tipo);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async deletarTipo(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Tipo.destroy({ where: { id } });
      if (!deleted) return res.status(404).json({ error: 'Tipo não encontrado' });
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // ====== CATEGORIA ======
  static async criarCategoria(req, res) {
    try {
      const { nome } = req.body;
      const novaCategoria = await Categoria.create({ nome });
      return res.status(201).json(novaCategoria);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async listarCategorias(req, res) {
    try {
      const categorias = await Categoria.findAll({ order: [['nome', 'ASC']] });
      return res.status(200).json(categorias);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async buscarCategoriaPorId(req, res) {
    try {
      const { id } = req.params;
      const categoria = await Categoria.findByPk(id);
      if (!categoria) return res.status(404).json({ error: 'Categoria não encontrada' });
      return res.status(200).json(categoria);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async deletarCategoria(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Categoria.destroy({ where: { id } });
      if (!deleted) return res.status(404).json({ error: 'Categoria não encontrada' });
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = DiversosController;