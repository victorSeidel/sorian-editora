const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Proposta = sequelize.define('Proposta', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    data: {
      type: DataTypes.DATE
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'clientes',
        key: 'id'
      }
    },
    paginas: {
      type: DataTypes.INTEGER
    },
    plano_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'planos',
        key: 'id'
      }
    },
    pacote_pagina_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'pacotes',
        key: 'id'
      }
    },
    pacote_capa_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'pacotes',
        key: 'id'
      }
    },
    preco_venda: {
      type: DataTypes.DECIMAL(10,3)
    },
    status: {
      type: DataTypes.ENUM('Pendente', 'Enviada', 'Rejeitada', 'Aceita')
    }
  }, {
    tableName: 'propostas',
    timestamps: false
  });

  return Proposta;
};