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
    data: {
      type: DataTypes.DATE
    }
  }, {
    tableName: 'pagar',
    timestamps: false
  });

  return Pagar;
};
