-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           11.3.2-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para api_emblemas
CREATE DATABASE IF NOT EXISTS `api_emblemas` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `api_emblemas`;

-- Copiando estrutura para tabela api_emblemas.clients
CREATE TABLE IF NOT EXISTS `clients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `emblemas` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT json_array() CHECK (json_valid(`emblemas`)),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Copiando dados para a tabela api_emblemas.clients: ~4 rows (aproximadamente)
INSERT INTO `clients` (`id`, `nome`, `emblemas`) VALUES
	(1, 'Geovane', '[{"id":8,"slug":"hiena","name":"Hiena","image":"https://cidadealtarp.com/imagens/challenge/hiena.png"},{"id":7,"slug":"curuja","name":"Coruja","image":"https://cidadealtarp.com/imagens/challenge/coruja.png"},{"id":1,"slug":"cda","name":"Cidade Alta","image":"https://cidadealtarp.com/imagens/challenge/cidade-alta.png"},{"id":2,"slug":"cda-valley","name":"Cidade Alta Valley","image":"https://cidadealtarp.com/imagens/challenge/cidade-alta-valley.png"},{"id":5,"slug":"mecanica","name":"Mecânica do Cidade Alta","image":"https://cidadealtarp.com/imagens/challenge/mecanica.png"},{"id":10,"slug":"urso","name":"Urso","image":"https://cidadealtarp.com/imagens/challenge/urso.png"}]'),
	(2, 'Rm', '[]'),
	(3, 'RMDEV', '[]'),
	(12, 'Gz', '[]');

-- Copiando estrutura para tabela api_emblemas.emblemas
CREATE TABLE IF NOT EXISTS `emblemas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Copiando dados para a tabela api_emblemas.emblemas: ~10 rows (aproximadamente)
INSERT INTO `emblemas` (`id`, `slug`, `name`, `image`) VALUES
	(1, 'cda', 'Cidade Alta', 'https://cidadealtarp.com/imagens/challenge/cidade-alta.png'),
	(2, 'cda-valley', 'Cidade Alta Valley', 'https://cidadealtarp.com/imagens/challenge/cidade-alta-valley.png'),
	(3, 'policia', 'Policia do Cidade Alta', 'https://cidadealtarp.com/imagens/challenge/policia.png'),
	(4, 'hospital', 'Hospital do Cidade Alta', 'https://cidadealtarp.com/imagens/challenge/hospital.png'),
	(5, 'mecanica', 'Mecânica do Cidade Alta', 'https://cidadealtarp.com/imagens/challenge/mecanica.png'),
	(6, 'taxi', 'Taxi do Cidade Alta', 'https://cidadealtarp.com/imagens/challenge/taxi.png'),
	(7, 'curuja', 'Coruja', 'https://cidadealtarp.com/imagens/challenge/coruja.png'),
	(8, 'hiena', 'Hiena', 'https://cidadealtarp.com/imagens/challenge/hiena.png'),
	(9, 'gato', 'Gato', 'https://cidadealtarp.com/imagens/challenge/gato.png'),
	(10, 'urso', 'Urso', 'https://cidadealtarp.com/imagens/challenge/urso.png');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
