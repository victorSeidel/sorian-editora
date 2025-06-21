const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const PropostaCusto = sequelize.define('PropostaCusto', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    proposta_id: {
      type: DataTypes.INTEGER
    },
    metodo_pagamento: {
      type: DataTypes.ENUM('PIX', 'Boleto', 'Crédito', 'Débito', 'Dinheiro', 'Transferência Bancária', 'PayPal')
    },
    parcelas: {
      type: DataTypes.INTEGER
    },
    parcelas_pagas: {
      type: DataTypes.INTEGER
    },
    entrada: {
      type: DataTypes.DECIMAL(10,3)
    },
    valor_parcela: {
      type: DataTypes.DECIMAL(10,3)
    },
    pago: {
      type: DataTypes.DECIMAL(10,3)
    },
    pagar: {
      type: DataTypes.DECIMAL(10,3)
    }
  }, {
    tableName: 'propostas_custos',
    timestamps: false
  });

  return PropostaCusto;
};