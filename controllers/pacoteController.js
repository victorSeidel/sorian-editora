const { Pacote, Produto, Dimensao } = require('../models');
const { Op } = require('sequelize');

class PacoteController 
{
  static async criarPacote(req, res) 
  {
    try 
    {
        const { produto_id, dimensao_id, quantidade_minima, quantidade_maxima, preco } = req.body;
        
        const pacote = await Pacote.create({
            produto_id,
            dimensao_id,
            quantidade_minima,
            quantidade_maxima,
            preco
        });
        
        const result = await Pacote.findByPk(pacote.id, {
            include: [
              { model: Produto },
              { model: Dimensao }
            ]
        });
        
        return res.status(201).json(result);
    } 
    catch (error) 
    {
      console.error('Erro ao criar pacote:', error);
      return res.status(500).json({ error: error.message });
    }
  }

  // READ ALL (com relacionamentos)
  static async listarPacotes(req, res) {
    try {
        const pacotes = await Pacote.findAll({
            include: [
              { model: Produto },
              { model: Dimensao }
            ]
        });
        
        return res.status(200).json(pacotes);
    } catch (error) {
      console.error('Erro ao listar pacotes:', error);
      return res.status(500).json({ error: error.message });
    }
}

  static async buscarPacotePorId(req, res) {
    try {
      const { id } = req.params;
      const pacote = await Pacote.findByPk(id, {
        include: [
          { model: Produto },
          { model: Dimensao }
        ]
      });
      
      if (!pacote) {
        return res.status(404).json({ error: 'Pacote não encontrado' });
      }
      
      return res.status(200).json(pacote);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async buscarPacotePorFiltro(req, res) 
  {
    try 
    {
      const { produto_id, dimensao_id, paginas } = req.params;

      if (!produto_id || !dimensao_id || !paginas) { return res.status(400).json({ error: 'Parâmetros produto_id, dimensao_id e paginas são obrigatórios' }); }

      const pacote = await Pacote.findOne({
        where: {
          produto_id,
          dimensao_id,
          quantidade_minima: { [Op.lte]: paginas },
          quantidade_maxima: { [Op.gte]: paginas }
        },
        include: [
          { model: Produto },
          { model: Dimensao }
        ]
      });

      if (!pacote) {
        return res.status(404).json({ error: 'Pacote não encontrado para os critérios fornecidos' });
      }

      return res.status(200).json(pacote);
    } 
    catch (error) 
    {
      console.error('Erro ao buscar pacote por filtro:', error);
      return res.status(500).json({ error: error.message });
    }
  }

  static async atualizarPacote(req, res) {
    try {
      const { id } = req.params;
      const body = req.body;
      
      const [updated] = await Pacote.update(body, {
        where: { id }
      });
      
      if (!updated) {
        return res.status(404).json({ error: 'Pacote não encontrado' });
      }
      
      const pacoteAtualizado = await Pacote.findByPk(id, {
        include: [
          { model: Produto },
          { model: Dimensao }
        ]
      });
      return res.status(200).json(pacoteAtualizado);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async deletarPacote(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Pacote.destroy({
        where: { id }
      });
      
      if (!deleted) {
        return res.status(404).json({ error: 'Pacote não encontrado' });
      }
      
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = PacoteController;