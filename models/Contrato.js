const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Contrato = sequelize.define('Contrato', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    data: {
      type: DataTypes.DATE
    },
    proposta_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'propostas',
        key: 'id'
      }
    }
  }, {
    tableName: 'contratos',
    timestamps: false
  });

  return Contrato;
};