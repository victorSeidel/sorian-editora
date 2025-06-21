const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Pacote = sequelize.define('Pacote', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    produto_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'produtos',
        key: 'id'
      }
    },
    dimensao_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'dimensoes',
        key: 'id'
      }
    },
    quantidade_maxima: {
      type: DataTypes.INTEGER
    },
    quantidade_minima: {
      type: DataTypes.INTEGER
    },
    preco: {
      type: DataTypes.DECIMAL(10,3)
    }
  }, {
    tableName: 'pacotes',
    timestamps: false
  });

  return Pacote;
};