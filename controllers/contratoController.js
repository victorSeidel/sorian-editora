const { Contrato, Proposta, Cliente, Plano, Pacote, Produto, Dimensao } = require('../models');

class ContratoController 
{
  // CREATE
  static async criarContrato(req, res) {
    try {
      const { proposta_id } = req.body;

      const proposta = await Proposta.findByPk(proposta_id);
      if (!proposta) {
        return res.status(404).json({ error: 'Proposta não encontrada' });
      }

      const novoContrato = await Contrato.create({ proposta_id });

      return res.status(201).json(novoContrato);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }

  // READ ALL
  static async listarContratos(req, res) {
    try {
      const contratos = await Contrato.findAll({
        include: {
          model: Proposta, as: 'proposta',
          include: [
            { model: Pacote, as: 'pacotePagina', include: [{ model: Produto }, { model: Dimensao }] },
            { model: Pacote, as: 'pacoteCapa', include: [{ model: Produto }] },
            { model: Plano, as: 'plano' },
            { model: Cliente, as: 'cliente' }
          ]
        }
      });

      return res.status(200).json(contratos);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }

  // READ ONE
  static async buscarContratoPorId(req, res) {
    try {
      const { id } = req.params;
      const contrato = await Contrato.findByPk(id, {
        include: {
          model: Proposta, as: 'proposta',
          include: [
            { model: Pacote, as: 'pacotePagina', include: [{ model: Produto }, { model: Dimensao }] },
            { model: Pacote, as: 'pacoteCapa', include: [{ model: Produto }] },
            { model: Plano, as: 'plano' },
            { model: Cliente, as: 'cliente' }
          ]
        }
      });

      if (!contrato) {
        return res.status(404).json({ error: 'Contrato não encontrado' });
      }

      return res.status(200).json(contrato);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // DELETE
  static async deletarContrato(req, res) 
  {
    try {
      const { id } = req.params;
      const deleted = await Contrato.destroy({ where: { id } });

      if (!deleted) {
        return res.status(404).json({ error: 'Contrato não encontrado' });
      }

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ContratoController;