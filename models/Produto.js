const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Produto = sequelize.define('Produto', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    tipo: {
      type: DataTypes.STRING(20),
    },
    classe: {
      type: DataTypes.ENUM('Página', 'Capa')
    }
  }, {
    tableName: 'produtos',
    timestamps: false
  });

  return Produto;
};