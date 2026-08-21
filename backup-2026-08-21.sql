-- MySQL dump 10.13  Distrib 8.4.11, for Linux (x86_64)
--
-- Host: localhost    Database: daniela_proyecto
-- ------------------------------------------------------
-- Server version	8.4.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Entradas','/assets/menu/entrantes.webp',1,'2026-08-18 16:33:34'),(2,'Arroces y Ensaladas','/assets/menu/arroces.webp',1,'2026-08-18 16:33:34'),(3,'Carnes','/assets/menu/carnes.webp',1,'2026-08-18 16:33:34'),(4,'Sopas o Caldos','/assets/menu/sopas-caldos.webp',1,'2026-08-18 16:33:34'),(5,'Postres','/assets/menu/postres.webp',1,'2026-08-18 16:33:34');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_pedido`
--

DROP TABLE IF EXISTS `detalle_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_pedido` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `pedido_id` int unsigned NOT NULL,
  `producto_id` int unsigned NOT NULL,
  `cantidad` int unsigned NOT NULL DEFAULT '1',
  `precio_unitario` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_detalle_pedido` (`pedido_id`),
  KEY `fk_detalle_producto` (`producto_id`),
  CONSTRAINT `fk_detalle_pedido` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_detalle_producto` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `chk_detalle_cantidad` CHECK ((`cantidad` > 0)),
  CONSTRAINT `chk_detalle_precio` CHECK ((`precio_unitario` >= 0)),
  CONSTRAINT `chk_detalle_subtotal` CHECK ((`subtotal` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_pedido`
--

LOCK TABLES `detalle_pedido` WRITE;
/*!40000 ALTER TABLE `detalle_pedido` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalle_pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `franjas_reserva`
--

DROP TABLE IF EXISTS `franjas_reserva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `franjas_reserva` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `hora` time NOT NULL,
  `capacidad_maxima` tinyint unsigned NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `hora` (`hora`),
  CONSTRAINT `chk_franjas_capacidad` CHECK ((`capacidad_maxima` > 0))
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `franjas_reserva`
--

LOCK TABLES `franjas_reserva` WRITE;
/*!40000 ALTER TABLE `franjas_reserva` DISABLE KEYS */;
INSERT INTO `franjas_reserva` VALUES (1,'13:00:00',30,1,'2026-08-20 16:34:25'),(2,'14:30:00',30,1,'2026-08-20 16:34:25'),(3,'16:00:00',30,1,'2026-08-20 16:34:25'),(4,'20:00:00',30,1,'2026-08-20 16:34:25'),(5,'21:30:00',30,1,'2026-08-20 16:34:25'),(6,'23:00:00',30,1,'2026-08-20 16:34:25');
/*!40000 ALTER TABLE `franjas_reserva` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `rol` varchar(20) NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,'Primer Producto','user'),(2,'Segundo Producto','user'),(3,'Tercer Producto','user');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `usuario_id` int unsigned DEFAULT NULL,
  `nombre_cliente` varchar(100) NOT NULL,
  `email` varchar(150) DEFAULT NULL,
  `telefono` varchar(30) NOT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `tipo` enum('recogida','domicilio') NOT NULL,
  `estado` enum('pendiente','confirmado','preparando','listo','entregado','cancelado') NOT NULL DEFAULT 'pendiente',
  `total` decimal(10,2) NOT NULL DEFAULT '0.00',
  `observaciones` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_pedidos_usuario` (`usuario_id`),
  CONSTRAINT `fk_pedidos_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `chk_pedidos_total` CHECK ((`total` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `categoria_id` int unsigned NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `vegano` tinyint(1) NOT NULL DEFAULT '0',
  `picante` tinyint unsigned NOT NULL DEFAULT '0',
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_productos_categoria` (`categoria_id`),
  CONSTRAINT `fk_productos_categoria` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `chk_productos_picante` CHECK ((`picante` between 0 and 3)),
  CONSTRAINT `chk_productos_precio` CHECK ((`precio` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,1,'Mandioca frita',4.00,1,0,1,'2026-08-18 16:34:40'),(2,1,'Yuca con mojo cubano',4.50,1,1,1,'2026-08-18 16:34:40'),(3,1,'Porción Chipa Guazú o Sopa',4.00,0,0,1,'2026-08-18 16:34:40'),(4,1,'Empanadas Paraguayas',3.85,0,1,1,'2026-08-18 16:34:40'),(5,1,'Mbeju',4.00,0,0,1,'2026-08-18 16:34:40'),(6,1,'Tamales',8.50,0,2,1,'2026-08-18 16:34:40'),(7,1,'Tostones',8.00,1,1,1,'2026-08-18 16:34:40'),(8,1,'Mariquitas de Plátano',3.00,1,0,1,'2026-08-18 16:34:40'),(9,2,'Arroz Quesu',6.00,0,0,1,'2026-08-18 16:34:40'),(10,2,'Arroz Blanco',5.00,1,0,1,'2026-08-18 16:34:40'),(11,2,'Arroz Congrí',5.00,1,0,1,'2026-08-18 16:34:40'),(12,2,'Arroz Frito Cubano',8.00,0,1,1,'2026-08-18 16:34:40'),(13,2,'Arroz Amarillo',5.00,0,0,1,'2026-08-18 16:34:40'),(14,2,'Ensalada de Arroz',8.00,0,0,1,'2026-08-18 16:34:40'),(15,2,'Ensalada Primavera',7.00,1,0,1,'2026-08-18 16:34:40'),(16,2,'Ensalada César',8.00,0,0,1,'2026-08-18 16:34:40'),(17,3,'Ropa Vieja',15.00,0,0,1,'2026-08-18 16:34:40'),(18,3,'Vaca Frita Cubana',15.00,0,0,1,'2026-08-18 16:34:40'),(19,3,'Bistec de Cerdo',12.00,0,0,1,'2026-08-18 16:34:40'),(20,3,'Bistec de Res',15.00,0,0,1,'2026-08-18 16:34:40'),(21,3,'Bife Koygua a Caballo',15.00,0,0,1,'2026-08-18 16:34:40'),(22,3,'Milanesa Napolitana de Pollo',15.00,0,0,1,'2026-08-18 16:34:40'),(23,3,'Milanesa Napolitana de Vaca',17.00,0,0,1,'2026-08-18 16:34:40'),(24,3,'Marinera de Carne',17.00,0,0,1,'2026-08-18 16:34:40'),(25,4,'Puchero con Maíz',15.00,0,0,1,'2026-08-18 16:34:40'),(26,4,'Picadito de Carne con Papas',15.00,0,0,1,'2026-08-18 16:34:40'),(27,4,'Vori Vori',13.50,0,0,1,'2026-08-18 16:34:40'),(28,4,'Frijoles Negros',10.00,1,0,1,'2026-08-18 16:34:40'),(29,4,'Frijoles Rojos',10.00,0,0,1,'2026-08-18 16:34:40'),(30,4,'Caldo de Pollo',12.00,0,0,1,'2026-08-18 16:34:40'),(31,4,'Crema de Zucchini',9.50,1,0,1,'2026-08-18 16:34:40'),(32,4,'Crema de Calabaza',9.50,1,0,1,'2026-08-18 16:34:40'),(33,5,'Dulce de Guayaba con Queso',3.50,1,0,1,'2026-08-18 16:34:40'),(34,5,'Flan de la Abuela',4.50,0,0,1,'2026-08-18 16:34:40'),(35,5,'Arroz con Leche',4.50,0,0,1,'2026-08-18 16:34:40'),(36,5,'Natilla',3.50,0,0,1,'2026-08-18 16:34:40'),(37,5,'Dulce de Coco',3.00,1,0,1,'2026-08-18 16:34:40'),(38,5,'Dulce de Frutabomba',3.50,1,0,1,'2026-08-18 16:34:40'),(39,5,'Bizcocho de Mandarina',3.50,1,0,1,'2026-08-18 16:34:40');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservas`
--

DROP TABLE IF EXISTS `reservas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservas` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `usuario_id` int unsigned DEFAULT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `telefono` varchar(30) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `personas` tinyint unsigned NOT NULL,
  `mensaje` text,
  `estado` enum('pendiente','confirmada','cancelada','completada') NOT NULL DEFAULT 'pendiente',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_reservas_usuario` (`usuario_id`),
  CONSTRAINT `fk_reservas_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `chk_reservas_personas` CHECK ((`personas` between 1 and 10))
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservas`
--

LOCK TABLES `reservas` WRITE;
/*!40000 ALTER TABLE `reservas` DISABLE KEYS */;
INSERT INTO `reservas` VALUES (1,NULL,'Daniela Prueba','daniela@example.com','600123123','2026-08-25','20:30:00',2,'Mesa junto a la ventana','pendiente','2026-08-20 15:56:31'),(2,NULL,'Daniela3','sdsanchez307@gmail.com','123123','2026-08-28','21:30:00',2,'prueba php 3','pendiente','2026-08-20 16:12:44'),(3,NULL,'Prueba Aforo','aforo@example.com','600123456','2026-08-25','20:00:00',4,'Prueba de aforo','pendiente','2026-08-20 16:38:08'),(4,NULL,'Prueba Aforo 2','aforo2@example.com','600123457','2026-08-25','20:00:00',10,'Prueba de aforo','pendiente','2026-08-20 16:39:40'),(5,NULL,'Prueba Aforo 3','aforo3@example.com','600123458','2026-08-25','20:00:00',10,'Prueba de aforo','pendiente','2026-08-20 16:39:49'),(6,NULL,'Prueba Aforo 4','aforo4@example.com','600123459','2026-08-25','20:00:00',6,'Prueba de aforo','pendiente','2026-08-20 16:39:59'),(7,NULL,'Daniela4','sdsanchez307@gmail.com','123123456','2026-08-27','13:00:00',1,'hola','pendiente','2026-08-20 16:45:03'),(8,NULL,'Daniela7','sdsanchez307@gmail.com','123123777','2026-09-03','13:00:00',3,'php7','pendiente','2026-08-20 17:40:21');
/*!40000 ALTER TABLE `reservas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `telefono` varchar(30) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `rol` enum('cliente','admin') NOT NULL DEFAULT 'cliente',
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Cliente Prueba','cliente@tajy.test','600000001','$2y$10$WXM0C5dlAKKirrz/5.BopOUvauMVQIWi5iY4dMskud8.ND5MpreGm','cliente',1,'2026-08-18 18:23:03'),(2,'Admin Prueba','admin@tajy.test','600000002','$2y$10$9Cg6MhvD3GqCE.4/pjXXp.Zgd/dzO9MNN8JBbKvP520pqUC2KFTKi','admin',1,'2026-08-18 18:23:03');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-21 13:37:47
