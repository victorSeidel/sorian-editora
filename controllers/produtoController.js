const { Produto } = require('../models');

class ProdutoController 
{
  static async criarProduto(req, res) 
  {
    try 
    {
      const { nome, tipo, classe } = req.body;
      const novoProduto = await Produto.create({ nome, tipo, classe });
      return res.status(201).json(novoProduto);
    } 
    catch (error) 
    {
      return res.status(500).json({ error: error.message });
    }
  }

  static async listarProdutos(req, res) 
  {
    try {
        const produtos = await Produto.findAll({
            order: [['nome', 'ASC']]
        });

        return res.status(200).json(produtos);
    } 
    catch (error) 
    {
        return res.status(500).json({ error: error.message });
    }
  }

  static async buscarProdutoPorId(req, res) {
    try {
      const { id } = req.params;
      const produto = await Produto.findByPk(id);
      
      if (!produto) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
      
      return res.status(200).json(produto);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // UPDATE
  static async atualizarProduto(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await Produto.update(req.body, {
        where: { id }
      });
      
      if (!updated) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
      
      const produtoAtualizado = await Produto.findByPk(id);
      return res.status(200).json(produtoAtualizado);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // DELETE
  static async deletarProduto(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Produto.destroy({
        where: { id }
      });
      
      if (!deleted) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
      
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ProdutoController;