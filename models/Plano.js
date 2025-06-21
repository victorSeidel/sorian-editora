const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Plano = sequelize.define('Plano', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    quantidade_autor: {
      type: DataTypes.INTEGER
    },
    lucro: {
      type: DataTypes.DECIMAL(10,3)
    },
  }, {
    tableName: 'planos',
    timestamps: false
  });

  return Plano;
};