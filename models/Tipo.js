const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Tipo = sequelize.define('Tipo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(30),
      allowNull: false
    }
  }, {
    tableName: 'tipos',
    timestamps: false
  });

  return Tipo;
};