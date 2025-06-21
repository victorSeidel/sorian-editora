const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Receber = sequelize.define('Receber', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    valor: {
      type: DataTypes.DECIMAL(10,3)
    },
  }, {
    tableName: 'receber',
    timestamps: false
  });

  return Receber;
};