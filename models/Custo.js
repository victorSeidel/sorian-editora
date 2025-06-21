const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Custo = sequelize.define('Custo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    valor: {
      type: DataTypes.DECIMAL(10,3)
    },
  }, {
    tableName: 'custos',
    timestamps: false
  });

  return Custo;
};