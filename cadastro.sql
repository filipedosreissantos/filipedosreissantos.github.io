-- phpMyAdmin SQL Dump
-- version 4.6.6deb4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 09, 2017 at 03:05 AM
-- Server version: 10.1.26-MariaDB-0+deb9u1
-- PHP Version: 7.0.19-1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cadastro`
--

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `codigo` int(11) NOT NULL,
  `nomeCompleto` varchar(70) NOT NULL,
  `nomeUsuario` varchar(10) NOT NULL,
  `emailUsuario` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`codigo`, `nomeCompleto`, `nomeUsuario`, `emailUsuario`) VALUES
(1, 'Filipe Dos Reis Santos', 'filipeReis', 'lipe.reis@yahoo.com'),
(2, 'Mary Sibilly', 'Witch', 'trevas@jamais.com.br'),
(4, 'Fábio Janclear', 'fabiojk', 'fabio@exemplo.com.br'),
(6, 'Lucas Marlon', 'lucasMarl', 'lucas@exemplo.com.br'),
(7, 'Carlos Eduardo', 'cDu', 'carlosDudu@exemplo.com.br'),
(9, 'Filipe Santos', 'lipeReis', 'lipereis@yahoo.com.br'),
(11, 'Filipe S', 'lifu', 'lips@exemplo.com'),
(13, 'kdj', 'jfksd', 'luan@exemploo.coom'),
(14, '', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`codigo`),
  ADD UNIQUE KEY `emailUsuario` (`emailUsuario`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
