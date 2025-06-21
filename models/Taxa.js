const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Taxa = sequelize.define('Taxa', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    custo_editorial: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    cartao: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
    },
    imposto: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
    }
  }, {
    tableName: 'taxas',
    timestamps: false
  });

  return Taxa;
};