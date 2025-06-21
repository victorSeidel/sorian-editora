const { Proposta, Cliente, Contrato, Projeto, PropostaCusto, Plano, Pacote, Produto, Dimensao } = require('../models');

class PropostaController {
  // CREATE
  static async criarProposta(req, res) {
    try {
      const {
        cliente_id,
        paginas,
        pacote_pagina_id,
        pacote_capa_id,
        plano_id,
        preco_venda
      } = req.body;

      const novaProposta = await Proposta.create({
        cliente_id,
        paginas,
        pacote_pagina_id,
        pacote_capa_id,
        plano_id,
        preco_venda
      });

      return res.status(201).json(novaProposta);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }

  // READ ALL
  static async listarPropostas(req, res) {
    try {
      const propostas = await Proposta.findAll({
        include: [
          { model: Pacote, as: 'pacotePagina', include: [ { model: Produto }, { model: Dimensao } ] },
          { model: Pacote, as: 'pacoteCapa', include: [ { model: Produto } ] },
          { model: Plano, as: 'plano' },
          { model: Cliente, as: 'cliente' }
        ]
      });

      return res.status(200).json(propostas);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }

  // READ ONE
  static async buscarPropostaPorId(req, res) {
    try {
      const { id } = req.params;
      const proposta = await Proposta.findByPk(id, {
        include: [
          { model: Pacote, as: 'pacotePagina' },
          { model: Pacote, as: 'pacoteCapa' },
          { model: Plano, as: 'plano' },
          { model: Cliente, as: 'cliente' }
        ]
      });

      if (!proposta) {
        return res.status(404).json({ error: 'Proposta não encontrada' });
      }

      return res.status(200).json(proposta);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // UPDATE
  static async atualizarProposta(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await Proposta.update({ ...req.body, data: new Date() }, {
        where: { id }
      });

      if (!updated) {
        return res.status(404).json({ error: 'Proposta não encontrada' });
      }

      const propostaAtualizada = await Proposta.findByPk(id, {
        include: [
          { model: Pacote, as: 'pacotePagina' },
          { model: Pacote, as: 'pacoteCapa' },
          { model: Plano, as: 'plano' },
          { model: Cliente, as: 'cliente' }
        ]
      });

      if (req.body.status === 'Aceita') 
      {
        const contratoExistente = await Contrato.findOne({ where: { proposta_id: id } });
        const projetoExistente  = await Projeto.findOne({ where: { proposta_id: id } });
        const custoExistente    = await PropostaCusto.findOne({ where: { proposta_id: id } });

        if (!contratoExistente) { await Contrato.create({ proposta_id: id }); }
        if (!projetoExistente)  { await Projeto.create({ proposta_id: id }); }
        if (!custoExistente)    { await PropostaCusto.create({ proposta_id: id }); }
      }

      return res.status(200).json(propostaAtualizada);
    } 
    catch (error) 
    {
      return res.status(500).json({ error: error.message });
    }
  }

  // DELETE
  static async deletarProposta(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Proposta.destroy({
        where: { id }
      });

      if (!deleted) {
        return res.status(404).json({ error: 'Proposta não encontrada' });
      }

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = PropostaController;