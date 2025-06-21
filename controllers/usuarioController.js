const { Usuario } = require('../models');
const bcrypt = require('bcrypt');

class UsuarioController 
{
  // CREATE
  static async criarUsuario(req, res) 
  {
    try 
    {
      const { nome, usuario, email, senha, tipo } = req.body;

      const hash = await bcrypt.hash(senha, 10);

      const novoUsuario = await Usuario.create({ nome, usuario, email, senha: hash, tipo });

      return res.status(201).json(novoUsuario);
    } 
    catch (error) 
    {
      return res.status(500).json({ error: error.message });
    }
  }

  // READ ALL
  static async listarUsuarios(req, res) {
    try {
      const usuarios = await Usuario.findAll();
      return res.status(200).json(usuarios);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // READ ONE
  static async buscarUsuarioPorId(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);
      
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      
      return res.status(200).json(usuario);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // UPDATE
  static async atualizarUsuario(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await Usuario.update(req.body, {
        where: { id }
      });
      
      if (!updated) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      
      const usuarioAtualizado = await Usuario.findByPk(id);
      return res.status(200).json(usuarioAtualizado);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // DELETE
  static async deletarUsuario(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Usuario.destroy({
        where: { id }
      });
      
      if (!deleted) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async loginUsuario(req, res) 
  {
    const { usuario, senha } = req.body;

    const user = await Usuario.findOne({ where: { usuario } });

    if (!user) return res.status(401).send('Usuário não encontrado');

    //const senhaCorreta = await bcrypt.compare(senha, user.senha);
    //if (!senhaCorreta) return res.status(401).send('Senha incorreta');

    req.session.usuario = { id: user.id, nome: user.nome, tipo: user.tipo };

    res.redirect('/');
  }
}

module.exports = UsuarioController;
