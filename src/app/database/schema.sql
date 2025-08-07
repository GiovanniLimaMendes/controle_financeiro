
-- Banco de Dados: controle_financeiro

CREATE DATABASE IF NOT EXISTS controle_financeiro;
USE controle_financeiro;

-- Tabela: usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  senha VARCHAR(255)
);

-- Tabela: transacoes
CREATE TABLE IF NOT EXISTS transacoes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT,
  tipo ENUM('entrada', 'saida') NOT NULL,
  valor DECIMAL(10, 2) NOT NULL,
  categoria VARCHAR(50),
  data DATE NOT NULL,
  descricao TEXT,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabela: metas
CREATE TABLE IF NOT EXISTS metas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT,
  titulo VARCHAR(100),
  valor_meta DECIMAL(10,2),
  valor_atual DECIMAL(10,2) DEFAULT 0,
  data_criacao DATE,
  data_limite DATE,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabela: configuracoes
CREATE TABLE IF NOT EXISTS configuracoes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT,
  tema VARCHAR(20) DEFAULT 'claro',
  notificacoes BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);