const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Categoria = sequelize.define('Categoria', {
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
    tableName: 'categorias',
    timestamps: false
  });

  return Categoria;
};