-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: groupomania_p7
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` text NOT NULL,
  `messageUrl` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,'Bienvenue sur votre nouveau réseau sociale !','http://localhost:3000/images/welcome.jpg1632071183778.jpg','2021-09-01 17:25:00','2021-09-01 17:25:00',1),(12,'C\'\'est pour voir si avec un long message les informations sont bien positionner dans le bloc par rapport Ã  la phot d\'\'accompagnement du post. En plus je veux voir quand il y a beaucoup de caractère comment cela s\'\'affiche. C\'\'est pour voir si avec un long message les informations sont bien positionner dans le bloc par rapport Ã  la phot d\'\'accompagnement du post. En plus je veux voir quand il y a beaucoup de caractère comment cela s\'\'affiche. C\'\'est pour voir si avec un long message les informations sont bien positionner dans le bloc par rapport Ã  la phot d\'\'accompagnement du post. En plus je veux voir quand il y a beaucoup de caractère comment cela s\'\'affiche.','http://localhost:3000/images/8.jpg1632126625565.jpg','2021-09-04 20:57:23','2021-09-04 20:57:23',3),(13,'Dans réunion, des réunions, et on bosse quand ?','http://localhost:3000/images/4.jpg1632126656285.jpg','2021-09-07 09:58:23','2021-09-07 09:58:23',3),(14,'Super le voyage. C\'était magnifique et avec du soleil','http://localhost:3000/images/IMG-20210727-WA00191629792645314.jpg1632126733326.jpg','2021-09-20 10:32:13','2021-09-20 10:32:13',6),(15,'C\'est bien d\'échanger. N\'hésitez pas à publier des messages','http://localhost:3000/images/2.jpg1632126853058.jpg','2021-09-19 09:57:23','2021-09-19 09:57:23',1),(33,'test post responsive','http://localhost:3000/images/9.png1632240840845.png','2021-09-21 18:14:00','2021-09-21 18:14:00',1),(34,'Il est vraiment top ce nouveau site d\'entreprise','http://localhost:3000/images/5.png1632243166141.png','2021-09-21 18:52:46','2021-09-21 18:52:46',1),(35,'Je suis un nouvel utilisateur, si quelqu\'un peut m\'expliquer le fonctionnement du site SVP','http://localhost:3000/images/6.jpg1632243300858.jpg','2021-09-21 18:55:00','2021-09-21 18:55:00',8);
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-21 20:44:24
