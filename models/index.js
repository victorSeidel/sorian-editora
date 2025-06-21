const sequelize = require('../config/database');

const Proposta      = require('./Proposta')(sequelize);
const Contrato      = require('./Contrato')(sequelize);
const Projeto       = require('./Projeto')(sequelize);
const Cliente       = require('./Cliente')(sequelize);
const Usuario       = require('./Usuario')(sequelize);
const Dimensao      = require('./Dimensao')(sequelize);
const Tipo          = require('./Tipo')(sequelize);
const Categoria     = require('./Categoria')(sequelize);
const Taxa          = require('./Taxa')(sequelize);
const Produto       = require('./Produto')(sequelize);
const Plano         = require('./Plano')(sequelize);
const Pacote        = require('./Pacote')(sequelize);
const PacoteProduto = require('./PacoteProduto')(sequelize);

const PropostaCusto = require('./PropostaCusto')(sequelize);
const Custo         = require('./Custo')(sequelize);
const Receber       = require('./Receber')(sequelize);
const Pagar         = require('./Pagar')(sequelize);

// RELAÇÕES

Proposta.belongsTo(Cliente, { as: 'cliente', foreignKey: 'cliente_id', onDelete: 'CASCADE' });
Cliente.hasMany(Proposta,   { as: 'cliente', foreignKey: 'cliente_id'});

Proposta.belongsTo(Pacote,  { as: 'pacotePagina', foreignKey: 'pacote_pagina_id', onDelete: 'CASCADE' });
Pacote.hasMany(Proposta,    { as: 'propostasComoPagina', foreignKey: 'pacote_pagina_id', onDelete: 'CASCADE' });

Proposta.belongsTo(Pacote,  { as: 'pacoteCapa', foreignKey: 'pacote_capa_id', onDelete: 'CASCADE' });
Pacote.hasMany(Proposta,    { as: 'propostasComoCapa', foreignKey: 'pacote_capa_id', onDelete: 'CASCADE' });

Proposta.belongsTo(Plano,   { as: 'plano', foreignKey: 'plano_id', onDelete: 'CASCADE' });
Plano.hasMany(Proposta,     { as: 'plano', foreignKey: 'plano_id'});

Proposta.hasMany(Contrato,   { as: 'proposta', foreignKey: 'proposta_id'});
Contrato.belongsTo(Proposta, { as: 'proposta', foreignKey: 'proposta_id', onDelete: 'CASCADE' });

Proposta.hasMany(Projeto,   { as: 'propostaProjeto', foreignKey: 'proposta_id'});
Projeto.belongsTo(Proposta, { as: 'propostaProjeto', foreignKey: 'proposta_id', onDelete: 'CASCADE' });

Pacote.belongsTo(Produto,  { foreignKey: 'produto_id', onDelete: 'CASCADE' });
Produto.hasMany(Pacote,    { foreignKey: 'produto_id'});

Pacote.belongsTo(Dimensao, { foreignKey: 'dimensao_id', onDelete: 'CASCADE' });
Dimensao.hasMany(Pacote,   { foreignKey: 'dimensao_id' });

Proposta.hasMany(PropostaCusto,   { as: 'propostaCusto', foreignKey: 'proposta_id'});
PropostaCusto.belongsTo(Proposta, { as: 'custoProposta', foreignKey: 'proposta_id', onDelete: 'CASCADE' });

// EXPORTAÇÃO

module.exports = 
{
  sequelize,
  
  Proposta, Contrato, Projeto,
  Cliente, Usuario,
  Dimensao, Taxa, Tipo, Categoria,
  Produto, Plano, Pacote, PacoteProduto,

  PropostaCusto, Custo, Receber, Pagar
};
