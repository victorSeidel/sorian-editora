const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Usuario = sequelize.define('Usuario', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    usuario: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true
    },
    senha: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    tipo: {
      type: DataTypes.ENUM('admin', 'financeiro', 'projetos', 'suporte'),
      allowNull: false
    }
  }, {
    tableName: 'usuarios',
    timestamps: false,
    indexes: [
      {
        name: 'idx_tipo',
        fields: ['tipo']
      }
    ]
  });

  return Usuario;
};