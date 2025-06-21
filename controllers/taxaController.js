const { Taxa } = require('../models');

class TaxaController {
  // READ ONE
  static async buscarTaxaPorId(req, res) {
    try {
      const taxa = await Taxa.findByPk(1);
      
      if (!taxa) {
        return res.status(404).json({ error: 'Taxa não encontrada' });
      }
      
      return res.status(200).json(taxa);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }

  // UPDATE
  static async atualizarTaxa(req, res) {
    try {
      const [updated] = await Taxa.update(req.body, {
        where: { id: 1 }
      });
      
      if (!updated) {
        return res.status(404).json({ error: 'Taxa não encontrada' });
      }
      
      const taxaAtualizada = await Taxa.findByPk(1);
      return res.status(200).json(taxaAtualizada);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = TaxaController;