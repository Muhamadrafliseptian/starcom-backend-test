-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 18, 2025 at 08:30 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_starcom_test`
--

-- --------------------------------------------------------

--
-- Table structure for table `tab_starcom_admin`
--

CREATE TABLE `tab_starcom_admin` (
  `id_admin` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `admin_code` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tab_starcom_admin`
--

INSERT INTO `tab_starcom_admin` (`id_admin`, `name`, `phone_number`, `email`, `admin_code`, `password`) VALUES
(1, 'admin satu tiga', '01281318', 'admin@examplee.com', '201919', '$2b$10$BtjEhHFiOeQOGP.uXgGasu0HpUphtaJPIlnq.ojcc8UN2izZNOOQq');

-- --------------------------------------------------------

--
-- Table structure for table `tab_starcom_customer`
--

CREATE TABLE `tab_starcom_customer` (
  `name` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `id_customer` int(11) NOT NULL,
  `customer_code` varchar(255) NOT NULL,
  `age` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tab_starcom_customer`
--

INSERT INTO `tab_starcom_customer` (`name`, `phone_number`, `email`, `password`, `id_customer`, `customer_code`, `age`) VALUES
('rafli', '081311126356', 'rafli@example.com', 'password', 1, '2091918', 12),
('rafli', '081311126356', 'raflii@example.com', '$2b$10$l.klJG50oSWT.oPq5/VUQuS2fZI6YBpmlQ63Flh.ihIJBbN1PIEha', 2, '2091918', 12);

-- --------------------------------------------------------

--
-- Table structure for table `tb_starcom_cart`
--

CREATE TABLE `tb_starcom_cart` (
  `id_cart` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 0,
  `total_price` bigint(20) NOT NULL,
  `added_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_customer` int(11) DEFAULT NULL,
  `id_product` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_starcom_order`
--

CREATE TABLE `tb_starcom_order` (
  `id_order` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 0,
  `total_price` bigint(20) NOT NULL,
  `status` enum('PENDING','PAID','EXPIRED') NOT NULL DEFAULT 'PENDING',
  `order_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_customer` int(11) DEFAULT NULL,
  `id_product` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_starcom_order`
--

INSERT INTO `tb_starcom_order` (`id_order`, `quantity`, `total_price`, `status`, `order_date`, `id_customer`, `id_product`) VALUES
(20, 5, 50000, 'PENDING', '2025-03-18 19:19:03', 1, 1),
(21, 5, 250000, 'PENDING', '2025-03-18 19:19:03', 1, 2),
(22, 5, 250000, 'PENDING', '2025-03-18 19:21:47', 1, 2),
(23, 5, 50000, 'PENDING', '2025-03-18 19:21:47', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tb_starcom_product`
--

CREATE TABLE `tb_starcom_product` (
  `id_product` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_code` varchar(255) NOT NULL,
  `product_description` longtext NOT NULL,
  `product_qty` int(11) NOT NULL DEFAULT 0,
  `product_price` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_starcom_product`
--

INSERT INTO `tb_starcom_product` (`id_product`, `product_name`, `product_code`, `product_description`, `product_qty`, `product_price`) VALUES
(1, 'kerudung', 'K01', 'lorem kerudung', 160, 10000),
(2, 'gamis', 'GMS01', 'lorem', 63, 50000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tab_starcom_admin`
--
ALTER TABLE `tab_starcom_admin`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indexes for table `tab_starcom_customer`
--
ALTER TABLE `tab_starcom_customer`
  ADD PRIMARY KEY (`id_customer`);

--
-- Indexes for table `tb_starcom_cart`
--
ALTER TABLE `tb_starcom_cart`
  ADD PRIMARY KEY (`id_cart`),
  ADD KEY `FK_4f99982c3a70443a1508b2fab7e` (`id_customer`),
  ADD KEY `FK_9088bcfb5cbdbd12841f84bf271` (`id_product`);

--
-- Indexes for table `tb_starcom_order`
--
ALTER TABLE `tb_starcom_order`
  ADD PRIMARY KEY (`id_order`),
  ADD KEY `FK_d91716c92e2d187ac23364be370` (`id_customer`),
  ADD KEY `FK_d702c110ed4be32b0b84e237e29` (`id_product`);

--
-- Indexes for table `tb_starcom_product`
--
ALTER TABLE `tb_starcom_product`
  ADD PRIMARY KEY (`id_product`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tab_starcom_admin`
--
ALTER TABLE `tab_starcom_admin`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tab_starcom_customer`
--
ALTER TABLE `tab_starcom_customer`
  MODIFY `id_customer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tb_starcom_cart`
--
ALTER TABLE `tb_starcom_cart`
  MODIFY `id_cart` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `tb_starcom_order`
--
ALTER TABLE `tb_starcom_order`
  MODIFY `id_order` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `tb_starcom_product`
--
ALTER TABLE `tb_starcom_product`
  MODIFY `id_product` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tb_starcom_cart`
--
ALTER TABLE `tb_starcom_cart`
  ADD CONSTRAINT `FK_4f99982c3a70443a1508b2fab7e` FOREIGN KEY (`id_customer`) REFERENCES `tab_starcom_customer` (`id_customer`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_9088bcfb5cbdbd12841f84bf271` FOREIGN KEY (`id_product`) REFERENCES `tb_starcom_product` (`id_product`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tb_starcom_order`
--
ALTER TABLE `tb_starcom_order`
  ADD CONSTRAINT `FK_d702c110ed4be32b0b84e237e29` FOREIGN KEY (`id_product`) REFERENCES `tb_starcom_product` (`id_product`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_d91716c92e2d187ac23364be370` FOREIGN KEY (`id_customer`) REFERENCES `tab_starcom_customer` (`id_customer`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
