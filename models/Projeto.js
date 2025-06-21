const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Projeto = sequelize.define('Projeto', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    proposta_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'propostas',
        key: 'id'
      }
    },
    data: {
      type: DataTypes.DATE
    },
    ultimo_update: {
      type: DataTypes.DATE
    },
    status: {
      type: DataTypes.ENUM('Iniciado', 'Em andamento', 'Aguardando aprovação final do autor', 'Finalizado')
    },
    obs: {
      type: DataTypes.TEXT('long')
    },
    livros_enviados: {
      type: DataTypes.INTEGER
    }
  }, {
    tableName: 'projetos',
    timestamps: false
  });

  return Projeto;
};