const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Pagar = sequelize.define('Pagar', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    valor: {
      type: DataTypes.DECIMAL(10,3)
    },
  }, {
    tableName: 'pagar',
    timestamps: false
  });

  return Pagar;
};