const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const PacoteProduto = sequelize.define('PacoteProduto', {
    pacote_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'pacotes',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    produto_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'produtos',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  }, {
    tableName: 'pacote_produtos',
    timestamps: false
  });

  return PacoteProduto;
};