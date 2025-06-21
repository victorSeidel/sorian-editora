const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Dimensao = sequelize.define('Dimensao', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    largura_min: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
    },
    largura_max: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
    },
    altura_min: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
    },
    altura_max: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
    }
  }, {
    tableName: 'dimensoes',
    timestamps: false
  });

  return Dimensao;
};