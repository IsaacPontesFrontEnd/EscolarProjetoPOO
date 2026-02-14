-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS escola_db;
USE escola_db;

-- Tabela de Escolas
CREATE TABLE IF NOT EXISTS escola (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    endereco VARCHAR(200),
    cidade VARCHAR(100),
    telefone VARCHAR(20)
);

-- Tabela de Professores
CREATE TABLE IF NOT EXISTS professor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    email VARCHAR(100),
    telefone VARCHAR(20),
    especialidade VARCHAR(100)
);

-- Tabela de Disciplinas
CREATE TABLE IF NOT EXISTS disciplina (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    carga_horaria INT,
    descricao TEXT
);

-- Tabela de Alunos (CRUD EXEMPLO)
CREATE TABLE IF NOT EXISTS aluno (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    endereco VARCHAR(200),
    cidade VARCHAR(100),
    pais VARCHAR(100),
    cpf VARCHAR(14) UNIQUE NOT NULL,
    email VARCHAR(100)
);

-- Inserir dados de exemplo na tabela escola
INSERT INTO escola (nome, endereco, cidade, telefone) VALUES
('Escola Estadual São Paulo', 'Rua das Flores, 123', 'São Paulo', '(11) 1234-5678'),
('Colégio Municipal Rio de Janeiro', 'Av. Brasil, 456', 'Rio de Janeiro', '(21) 9876-5432'),
('Instituto Federal Minas Gerais', 'Praça da Liberdade, 789', 'Belo Horizonte', '(31) 5555-1234');

-- Inserir dados de exemplo na tabela professor
INSERT INTO professor (nome, cpf, email, telefone, especialidade) VALUES
('João Silva', '123.456.789-00', 'joao.silva@email.com', '(11) 91234-5678', 'Matemática'),
('Maria Santos', '987.654.321-00', 'maria.santos@email.com', '(21) 98765-4321', 'Português'),
('Carlos Oliveira', '456.789.123-00', 'carlos.oliveira@email.com', '(31) 99999-8888', 'História');

-- Inserir dados de exemplo na tabela disciplina
INSERT INTO disciplina (nome, carga_horaria, descricao) VALUES
('Matemática Básica', 80, 'Fundamentos de matemática para ensino médio'),
('Língua Portuguesa', 60, 'Gramática e literatura brasileira'),
('Programação I', 100, 'Introdução à programação com Python'),
('Banco de Dados', 80, 'Fundamentos de banco de dados relacionais');

-- Inserir dados de exemplo na tabela aluno
INSERT INTO aluno (nome, endereco, cidade, pais, cpf, email) VALUES
('Ana Paula Costa', 'Rua dos Estudantes, 100', 'São Paulo', 'Brasil', '111.222.333-44', 'ana.costa@email.com'),
('Bruno Ferreira', 'Av. Principal, 200', 'Rio de Janeiro', 'Brasil', '222.333.444-55', 'bruno.ferreira@email.com'),
('Carla Mendes', 'Rua das Palmeiras, 300', 'Belo Horizonte', 'Brasil', '333.444.555-66', 'carla.mendes@email.com'),
('Daniel Rodrigues', 'Av. Central, 400', 'Curitiba', 'Brasil', '444.555.666-77', 'daniel.rodrigues@email.com'),
('Eduarda Lima', 'Rua do Comercio, 500', 'Porto Alegre', 'Brasil', '555.666.777-88', 'eduarda.lima@email.com');
