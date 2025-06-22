const express = require('express');
const router  = express.Router();

const PropostaController   = require('./controllers/propostaController');
const ContratoController   = require('./controllers/contratoController');
const ProjetoController    = require('./controllers/projetoController');
const ClienteController    = require('./controllers/clienteController');
const UsuarioController    = require('./controllers/usuarioController');
const DimensaoController   = require('./controllers/dimensaoController');
const DiversosController   = require('./controllers/diversosController');
const TaxaController       = require('./controllers/taxaController');
const ProdutoController    = require('./controllers/produtoController');
const PlanoController      = require('./controllers/planoController');
const PacoteController     = require('./controllers/pacoteController');
const FinanceiroController = require('./controllers/financeiroController');

// Proposta
router.post('/propostas', PropostaController.criarProposta);
router.get('/propostas', PropostaController.listarPropostas);
router.get('/propostas/:id', PropostaController.buscarPropostaPorId);
router.put('/propostas/:id', PropostaController.atualizarProposta);
router.delete('/propostas/:id', PropostaController.deletarProposta);

// Contrato
router.post('/contratos', ContratoController.criarContrato);
router.get('/contratos', ContratoController.listarContratos);
router.get('/contratos/:id', ContratoController.buscarContratoPorId);
router.delete('/contratos/:id', ContratoController.deletarContrato);

// Projeto
router.post('/projetos', ProjetoController.criarProjeto);
router.get('/projetos', ProjetoController.listarProjetos);
router.get('/projetos/:id', ProjetoController.buscarProjetoPorId);
router.put('/projetos/:id', ProjetoController.atualizarProjeto);
router.delete('/projetos/:id', ProjetoController.deletarProjeto);

// Cliente
router.post('/clientes', ClienteController.criarCliente);
router.get('/clientes', ClienteController.listarClientes);
router.get('/clientes/:id', ClienteController.buscarClientePorId);
router.put('/clientes/:id', ClienteController.atualizarCliente);
router.delete('/clientes/:id', ClienteController.deletarCliente);

// Usuário
router.post('/usuarios', UsuarioController.criarUsuario);
router.get('/usuarios', UsuarioController.listarUsuarios);
router.get('/usuarios/:id', UsuarioController.buscarUsuarioPorId);
router.put('/usuarios/:id', UsuarioController.atualizarUsuario);
router.delete('/usuarios/:id', UsuarioController.deletarUsuario);
router.post('/usuarios/login', UsuarioController.loginUsuario);

// Dimensão
router.post('/dimensoes', DimensaoController.criarDimensao);
router.get('/dimensoes', DimensaoController.listarDimensoes);
router.get('/dimensoes/:id', DimensaoController.buscarDimensaoPorId);
router.put('/dimensoes/:id', DimensaoController.atualizarDimensao);
router.delete('/dimensoes/:id', DimensaoController.deletarDimensao);

// Tipo
router.post('/diversos/tipos', DiversosController.criarTipo);
router.get('/diversos/tipos', DiversosController.listarTipos);
router.get('/diversos/tipos/:id', DiversosController.buscarTipoPorId);
router.delete('/diversos/tipos/:id', DiversosController.deletarTipo);

// Categoria
router.post('/diversos/categorias', DiversosController.criarCategoria);
router.get('/diversos/categorias', DiversosController.listarCategorias);
router.get('/diversos/categorias/:id', DiversosController.buscarCategoriaPorId);
router.delete('/diversos/categorias/:id', DiversosController.deletarCategoria);

// Taxa
router.get('/taxas', TaxaController.buscarTaxaPorId);
router.put('/taxas', TaxaController.atualizarTaxa);

// Produto
router.post('/produtos', ProdutoController.criarProduto);
router.get('/produtos', ProdutoController.listarProdutos);
router.get('/produtos/:id', ProdutoController.buscarProdutoPorId);
router.put('/produtos/:id', ProdutoController.atualizarProduto);
router.delete('/produtos/:id', ProdutoController.deletarProduto);

// Plano
router.post('/planos', PlanoController.criarPlano);
router.get('/planos', PlanoController.listarPlanos);
router.get('/planos/:id', PlanoController.buscarPlanoPorId);
router.put('/planos/:id', PlanoController.atualizarPlano);
router.delete('/planos/:id', PlanoController.deletarPlano);

// Pacotes
router.post('/pacotes', PacoteController.criarPacote);
router.get('/pacotes', PacoteController.listarPacotes);
router.get('/pacotes/:id', PacoteController.buscarPacotePorId);
router.get('/pacotes/filtro/:produto_id/:dimensao_id/:plano_id', PacoteController.buscarPacotePorFiltro);
router.get('/pacotes/filtro/color/:produto_id/:dimensao_id/:plano_id', PacoteController.buscarPacoteColorPorFiltro);
router.put('/pacotes/:id', PacoteController.atualizarPacote);
router.delete('/pacotes/:id', PacoteController.deletarPacote);

// Custos Propostas
router.post('/financeiro/propostas', FinanceiroController.criarProposta);
router.get('/financeiro/propostas', FinanceiroController.listarProposta);
router.get('/financeiro/propostas/:id', FinanceiroController.buscarPropostaPorId);
router.put('/financeiro/propostas/:id', FinanceiroController.atualizarProposta);
router.delete('/financeiro/propostas/:id', FinanceiroController.deletarProposta);

// Custos
router.post('/financeiro/custos', FinanceiroController.criarCusto);
router.get('/financeiro/custos', FinanceiroController.listarCustos);
router.get('/financeiro/custos/:id', FinanceiroController.buscarCustoPorId);
router.delete('/financeiro/custos/:id', FinanceiroController.deletarCusto);

// Receber
router.post('/financeiro/receber', FinanceiroController.criarReceber);
router.get('/financeiro/receber', FinanceiroController.listarReceber);
router.get('/financeiro/receber/:id', FinanceiroController.buscarReceberPorId);
router.delete('/financeiro/receber/:id', FinanceiroController.deletarReceber);

// Pagar
router.post('/financeiro/pagar', FinanceiroController.criarPagar);
router.get('/financeiro/pagar', FinanceiroController.listarPagar);
router.get('/financeiro/pagar/:id', FinanceiroController.buscarPagarPorId);
router.delete('/financeiro/pagar/:id', FinanceiroController.deletarPagar);

module.exports = router;
