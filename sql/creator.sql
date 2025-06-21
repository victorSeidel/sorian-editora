CREATE DATABASE IF NOT EXISTS sorian_db;
USE sorian_db;

CREATE TABLE IF NOT EXISTS clientes 
(
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE,
  telefone VARCHAR(100) NOT NULL,
  endereco VARCHAR(255)
);

SELECT * FROM propostas;

CREATE TABLE IF NOT EXISTS usuarios 
(
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(30) NOT NULL,
  usuario VARCHAR(20) NOT NULL UNIQUE,
  email VARCHAR(100) UNIQUE,
  senha VARCHAR(100) NOT NULL,
  tipo ENUM('Administrador', 'Financeiro', 'Projetos', 'Suporte') NOT NULL,
  
  INDEX idx_tipo (tipo)
);

CREATE TABLE IF NOT EXISTS dimensoes 
(
  id INT AUTO_INCREMENT PRIMARY KEY,
  largura_min DECIMAL(5,2) NOT NULL,
  largura_max DECIMAL(5,2) NOT NULL,
  altura_min DECIMAL(5,2) NOT NULL,
  altura_max DECIMAL(5,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS taxas 
(
  id INT AUTO_INCREMENT PRIMARY KEY,
  custo_editorial DECIMAL(10,2) NOT NULL,
  cartao DECIMAL(5,2) NOT NULL,
  imposto DECIMAL(5,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS planos 
(
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(30) NOT NULL,
  quantidade_autor INT,
  lucro DECIMAL(10,3)
);

CREATE TABLE IF NOT EXISTS produtos 
(
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  tipo VARCHAR(20) NOT NULL,
  classe ENUM('Página', 'Capa')
);

CREATE TABLE IF NOT EXISTS pacotes
(
  id INT AUTO_INCREMENT PRIMARY KEY,
  produto_id INT,
  dimensao_id INT,
  quantidade_minima INT NOT NULL,
  quantidade_maxima INT NOT NULL,
  preco DECIMAL(10,3),

  FOREIGN KEY (produto_id) REFERENCES produtos(id)     ON DELETE CASCADE,
  FOREIGN KEY (dimensao_id) REFERENCES dimensoes(id)   ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS propostas
(
	id INT AUTO_INCREMENT PRIMARY KEY,
    data DATETIME DEFAULT current_timestamp,
    cliente_id INT,
    paginas INT,
    pacote_pagina_id INT,
    pacote_capa_id INT,
    plano_id INT,
    preco_venda DECIMAL(10,3),
    status ENUM('Pendente', 'Enviada', 'Rejeitada', 'Aceita') DEFAULT 'Pendente',
    
    FOREIGN KEY (cliente_id)       REFERENCES clientes(id) ON DELETE CASCADE,
    FOREIGN KEY (pacote_pagina_id) REFERENCES pacotes(id)  ON DELETE CASCADE,
    FOREIGN KEY (pacote_capa_id)   REFERENCES pacotes(id)  ON DELETE CASCADE,
    FOREIGN KEY (plano_id)         REFERENCES planos(id)   ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS contratos
(
	id INT AUTO_INCREMENT PRIMARY KEY,
    data DATETIME DEFAULT current_timestamp,
    proposta_id INT,
    
    FOREIGN KEY (proposta_id) REFERENCES propostas(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS projetos
(
	id INT AUTO_INCREMENT PRIMARY KEY,
    proposta_id INT,
    data DATETIME DEFAULT current_timestamp,
    ultimo_update DATETIME DEFAULT current_timestamp,
    status ENUM('Iniciado', 'Em andamento', 'Aguardando aprovação final do autor', 'Finalizado') DEFAULT 'Iniciado',
    obs VARCHAR(500) DEFAULT '',
    livros_enviados INT DEFAULT 0,
    
    FOREIGN KEY (proposta_id) REFERENCES propostas(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS custos
(
	id INT AUTO_INCREMENT PRIMARY KEY,
    valor DECIMAL(10,3)
);

CREATE TABLE IF NOT EXISTS receber
(
	id INT AUTO_INCREMENT PRIMARY KEY,
    valor DECIMAL(10,3)
);

CREATE TABLE IF NOT EXISTS pagar
(
	id INT AUTO_INCREMENT PRIMARY KEY,
    valor DECIMAL(10,3)
);

CREATE TABLE IF NOT EXISTS propostas_custos 
(
	id INT AUTO_INCREMENT PRIMARY KEY,
	proposta_id INT,
    metodo_pagamento ENUM('PIX', 'Boleto', 'Crédito', 'Débito', 'Dinheiro', 'Transferência Bancária', 'PayPal'),
    parcelas INT DEFAULT 0,
	parcelas_pagas INT DEFAULT 0,
    entrada DECIMAL(10,3) DEFAULT 0,
    valor_parcela DECIMAL(10,3) DEFAULT 0,
    pago DECIMAL(10,3) DEFAULT 0,
    pagar DECIMAL(10,3) DEFAULT 0,
    
    FOREIGN KEY (proposta_id) REFERENCES propostas(id) ON DELETE CASCADE
);