const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Cliente = sequelize.define('Cliente', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
    },
    telefone: {
      type: DataTypes.STRING(100),
    },
    endereco: {
      type: DataTypes.STRING(255),
    }
  }, {
    tableName: 'clientes',
    timestamps: false
  });

  return Cliente;
};