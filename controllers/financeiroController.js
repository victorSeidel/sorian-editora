const { PropostaCusto, Proposta, Custo, Receber, Pagar } = require('../models');

class FinanceiroController 
{
  // ============== PROPOSTAS ===================

  // CREATE Proposta
  static async criarProposta(req, res) 
  {
    try 
    {
      const { proposta_id } = req.body;
      const novoPropostaCusto = await PropostaCusto.create({ proposta_id });
      return res.status(201).json(novoPropostaCusto);
    } 
    catch (error) 
    {
      return res.status(500).json({ error: error.message });
    }
  }

  // READ ALL Proposta
  static async listarProposta(req, res) 
  {
    try 
    {
      const propostaCusto = await PropostaCusto.findAll({ include: [{ model: Proposta, as: 'custoProposta' }] });
      return res.status(200).json(propostaCusto);
    } 
    catch (error) 
    {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }

  // READ ONE Proposta
  static async buscarPropostaPorId(req, res)
  {
    try 
    {
      const { id } = req.params;
      const propostaCusto = await PropostaCusto.findByPk(id, { include: [{ model: Proposta, as: 'custoProposta' }] });
      
      if (!propostaCusto) return res.status(404).json({ error: 'Proposta Custo não encontrado' });
      
      return res.status(200).json(propostaCusto);
    } 
    catch (error) 
    {
      return res.status(500).json({ error: error.message });
    }
  }

  static async atualizarProposta(req, res)
  {
    try {
      const { id } = req.params;
      const propostaAtual = await PropostaCusto.findByPk(id);
      if (!propostaAtual) return res.status(404).json({ error: 'Proposta Custo não encontrada' });

      const propostaRef = await Proposta.findByPk(propostaAtual.proposta_id);
      if (!propostaRef) return res.status(404).json({ error: 'Proposta Ref não encontrada' });
      const valorTotal = propostaRef.preco_venda;

      const dados = { ...req.body };

      const entrada        = parseFloat(dados.entrada);
      const parcelas       = parseInt(dados.parcelas);
      const parcelas_pagas = parseInt(dados.parcelas_pagas);

      let valor_parcela = 0;
      if (parcelas > 0) 
      {
        valor_parcela = (valorTotal - entrada) / parcelas;
        dados.valor_parcela = parseFloat(valor_parcela.toFixed(3));
      }

      const pago  = entrada + (valor_parcela * parcelas_pagas);
      const pagar = valorTotal - pago;

      dados.pago  = parseFloat(pago.toFixed(3));
      dados.pagar = parseFloat(pagar.toFixed(3));
      
      const [updated] = await PropostaCusto.update(dados, { where: { id } });
      if (!updated) return res.status(404).json({ error: 'Proposta Custo não encontrado' });
      
      const custoAtualizado = await PropostaCusto.findByPk(id);
      return res.status(200).json(custoAtualizado);
    } 
    catch (error) 
    {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }

  // DELETE Proposta
  static async deletarProposta(req, res) 
  {
    try 
    {
      const { id } = req.params;
      const deleted = await PropostaCusto.destroy({ where: { id } });
      
      if (!deleted) return res.status(404).json({ error: 'Proposta Custo não encontrado' });
      
      return res.status(204).json();
    } 
    catch (error) 
    {
      return res.status(500).json({ error: error.message });
    }
  }

  // ============== CUSTOS ==================

  // CREATE Custo
  static async criarCusto(req, res) {
    try {
      const { valor } = req.body;
      const novoCusto = await Custo.create({ valor });
      return res.status(201).json(novoCusto);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // READ ALL Custos
  static async listarCustos(req, res) {
    try {
      const custos = await Custo.findAll();
      return res.status(200).json(custos);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // READ ONE Custo
  static async buscarCustoPorId(req, res) {
    try {
      const { id } = req.params;
      const custo = await Custo.findByPk(id);
      
      if (!custo) {
        return res.status(404).json({ error: 'Custo não encontrado' });
      }
      
      return res.status(200).json(custo);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // DELETE Custo
  static async deletarCusto(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Custo.destroy({
        where: { id }
      });
      
      if (!deleted) {
        return res.status(404).json({ error: 'Custo não encontrado' });
      }
      
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // ============== RECEBER =================

  // CREATE Receber
  static async criarReceber(req, res) {
    try {
      const { valor } = req.body;
      const novoReceber = await Receber.create({ valor });
      return res.status(201).json(novoReceber);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // READ ALL Receber
  static async listarReceber(req, res) {
    try {
      const receber = await Receber.findAll();
      return res.status(200).json(receber);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // READ ONE Receber
  static async buscarReceberPorId(req, res) {
    try {
      const { id } = req.params;
      const receber = await Receber.findByPk(id);
      
      if (!receber) {
        return res.status(404).json({ error: 'Receber não encontrado' });
      }
      
      return res.status(200).json(receber);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // DELETE Receber
  static async deletarReceber(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Receber.destroy({
        where: { id }
      });
      
      if (!deleted) {
        return res.status(404).json({ error: 'Receber não encontrado' });
      }
      
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // ============== PAGAR ===================

  // CREATE Pagar
  static async criarPagar(req, res) {
    try {
      const { valor } = req.body;
      const novoPagar = await Pagar.create({ valor });
      return res.status(201).json(novoPagar);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // READ ALL Pagar
  static async listarPagar(req, res) {
    try {
      const pagar = await Pagar.findAll();
      return res.status(200).json(pagar);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // READ ONE Pagar
  static async buscarPagarPorId(req, res) {
    try {
      const { id } = req.params;
      const pagar = await Pagar.findByPk(id);
      
      if (!pagar) {
        return res.status(404).json({ error: 'Pagar não encontrado' });
      }
      
      return res.status(200).json(pagar);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // DELETE Pagar
  static async deletarPagar(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Pagar.destroy({
        where: { id }
      });
      
      if (!deleted) {
        return res.status(404).json({ error: 'Pagar não encontrado' });
      }
      
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = FinanceiroController;