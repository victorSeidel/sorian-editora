const { Projeto, Proposta } = require('../models');

class ProjetoController {
  // CREATE
  static async criarProjeto(req, res) {
    try {
      const {
        proposta_id,
      } = req.body;

      const novoProjeto = await Projeto.create({
        proposta_id,
        data: new Date(),
        ultimo_update: new Date(),
        status: 'Iniciado',
        obs: '',
        livros_enviados: 0
      });

      return res.status(201).json(novoProjeto);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }

  // READ ALL
  static async listarProjetos(req, res) {
    try {
      const projetos = await Projeto.findAll({
        include: [
          { model: Proposta, as: 'propostaProjeto' }
        ]
      });

      return res.status(200).json(projetos);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }

  // READ ONE
  static async buscarProjetoPorId(req, res) {
    try {
      const { id } = req.params;
      const projeto = await Projeto.findByPk(id, {
        include: [
          { model: Proposta, as: 'propostaProjeto' }
        ]
      });

      if (!projeto) {
        return res.status(404).json({ error: 'Projeto não encontrado' });
      }

      return res.status(200).json(projeto);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // UPDATE
  static async atualizarProjeto(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await Projeto.update({ 
        ...req.body, 
        ultimo_update: new Date() 
      }, {
        where: { id }
      });

      if (!updated) {
        return res.status(404).json({ error: 'Projeto não encontrado' });
      }

      const projetoAtualizado = await Projeto.findByPk(id, {
        include: [
          { model: Proposta, as: 'propostaProjeto' }
        ]
      });

      return res.status(200).json(projetoAtualizado);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // DELETE
  static async deletarProjeto(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Projeto.destroy({
        where: { id }
      });

      if (!deleted) {
        return res.status(404).json({ error: 'Projeto não encontrado' });
      }

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ProjetoController;