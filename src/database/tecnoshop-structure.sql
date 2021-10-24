/* CATEGORIAS DE USUARIO */
CREATE TABLE IF NOT EXISTS `usercategories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`));
    
/* CATEGORIAS DE PRODUCTOS */
CREATE TABLE IF NOT EXISTS `productcategories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`));

/* USUARIOS */
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `promotion` TINYINT NOT NULL,
  `image` VARCHAR(45) NOT NULL DEFAULT 'default.jpg',
  `dark_mode` TINYINT NOT NULL DEFAULT FALSE,
  `category_id` INT NOT NULL DEFAULT 5,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  FOREIGN KEY (`category_id`) REFERENCES `usercategories` (`id`));
  
/* PRODUCTOS */
CREATE TABLE IF NOT EXISTS `products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` VARCHAR(200) NOT NULL,
  `price` DECIMAL(11, 2) NOT NULL,
  `active` TINYINT NOT NULL NULL DEFAULT FALSE,
  `image` VARCHAR(45) NOT NULL DEFAULT 'default.jpg',
  `category_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`category_id`) REFERENCES `productcategories` (`id`));
  
/* MODELOS DE LOS PRODUCTOS */
CREATE TABLE IF NOT EXISTS `models` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));
  
/* CONEXIÓN ENTRE PRODUCTOS Y MODELOS */
CREATE TABLE IF NOT EXISTS `product_model` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `model_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  FOREIGN KEY (`model_id`) REFERENCES `models` (`id`));
  
/* CARRITO DE COMPRAS */
CREATE TABLE IF NOT EXISTS `shoppingcarts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `model_id` INT,
  `quantity` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  FOREIGN KEY (`product_id`) REFERENCES `products` (`id`));

/* RECIBOS */
CREATE TABLE IF NOT EXISTS `checks` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `date` DATETIME NOT NULL,
  `total` DECIMAL(11, 2) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`));
  
/* CONEXIÓN ENTRE RECIBOS Y PRODUCTOS */
CREATE TABLE IF NOT EXISTS `check_product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `check_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `model_id` INT,
  `quantity` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`check_id`) REFERENCES `checks` (`id`),
  FOREIGN KEY (`product_id`) REFERENCES `products` (`id`));