/* CATEGORIAS DE USUARIO */
INSERT INTO usercategories VALUES (null, 'Usuario');
INSERT INTO usercategories VALUES (null, 'Administrador');

/* CATEGORIAS DE PRODUCTO */
INSERT INTO productcategories VALUES (null, 'Accesorios');
INSERT INTO productcategories VALUES (null, 'Videojuegos');
INSERT INTO productcategories VALUES (null, 'Consolas');
INSERT INTO productcategories VALUES (null, 'Audio y Video');
INSERT INTO productcategories VALUES (null, 'Celulares');
INSERT INTO productcategories VALUES (null, 'Relojes');

/* USUARIOS */
INSERT INTO users VALUES (null, 'Axel', 'Manzanilla', 'axelmanzanilla@gmail.com', '$2a$10$eZeN/E2OzhuCGE/ROWnWYeqqMzWaJbh5V1jK4vlh5yTCeZY8T5BGC', true, 'user_5_picture.jpg', 1, 15);
INSERT INTO users VALUES (null, 'Ivan', 'Pacheco', 'pachecomaldonadoivan@gmail.com', '$2a$10$eyX6ATawV6hmNrRjMlmp4O2p9DCLu28zpq5JYEshY7DZk8lupEZUe', false, default, default, default);
INSERT INTO users VALUES (null, 'Adrian', 'López', 'adrianlopez@gmail.com', '$2a$10$eyX6ATawV6hmNrRjMlmp4O2p9DCLu28zpq5JYEshY7DZk8lupEZUe', false, default, default, default);
INSERT INTO users VALUES (null, 'Alfonso', 'Banda', 'alfonsobanda@gmail.com', '$2a$10$eyX6ATawV6hmNrRjMlmp4O2p9DCLu28zpq5JYEshY7DZk8lupEZUe', true, default, default, default);
INSERT INTO users VALUES (null, 'Francisco', 'Arce', 'franciscoarce@gmail.com', '$2a$10$eyX6ATawV6hmNrRjMlmp4O2p9DCLu28zpq5JYEshY7DZk8lupEZUe', true, default, default, default);
INSERT INTO users VALUES (null, 'Karla', 'Figueroa', 'karlafigueroa186@gmail.com', '$2a$10$eyX6ATawV6hmNrRjMlmp4O2p9DCLu28zpq5JYEshY7DZk8lupEZUe', false, default, default, default);
INSERT INTO users VALUES (null, 'Sherlock', 'Holmes', 'sherlock@hotmail.com', '$2a$10$eyX6ATawV6hmNrRjMlmp4O2p9DCLu28zpq5JYEshY7DZk8lupEZUe', false, 'user_7_picture.jpg', default, default);
INSERT INTO users VALUES (null, 'Didier', 'Cimé', 'didiercime@hotmail.com', '$2a$10$eyX6ATawV6hmNrRjMlmp4O2p9DCLu28zpq5JYEshY7DZk8lupEZUe', true, default, default, default);
INSERT INTO users VALUES (null, 'Alejandro', 'lara', 'alex1998@gmail.com', '$2a$10$eyX6ATawV6hmNrRjMlmp4O2p9DCLu28zpq5JYEshY7DZk8lupEZUe', false, default, default, default);
INSERT INTO users VALUES (null, 'Erick', 'Buenfil', 'erick_buenfil@hotmail.com', '$2a$10$eyX6ATawV6hmNrRjMlmp4O2p9DCLu28zpq5JYEshY7DZk8lupEZUe', true, default, default, default);
INSERT INTO users VALUES (null, 'Mario', 'Castañeda', 'soyyomario@hotmail.com', '$2a$10$eyX6ATawV6hmNrRjMlmp4O2p9DCLu28zpq5JYEshY7DZk8lupEZUe', true, 'user_11_picture.jpg', default, default);

/* PRODUCTOS */
INSERT INTO products VALUES (null, 'Gomu Gomu No Mi', 'Esta es una descripción genérica.', 99.00, true, 'image_product_5.png', 5);
INSERT INTO products VALUES (null, 'Audífonos Inalámbricos', 'Esta es una descripción genérica.', 299.00, true, 'image_product_15.jpg', 35);
INSERT INTO products VALUES (null, 'Funda Dr. Stone', 'Funda para celular con diferentes diseños.', 199.00, true, 'image_product_25.jpg', 5);
INSERT INTO products VALUES (null, 'Lente para celular', 'Esta es una descripción genérica.', 99.00, true, 'image_product_35.jpg', 5);
INSERT INTO products VALUES (null, 'Funda One Punch Man', 'Funda para celular con diferentes diseños.', 149.00, true, 'image_product_45.jpg', 5);
INSERT INTO products VALUES (null, 'Funda Shingeki', 'Funda para celular con diferentes diseños.', 199.00, true, 'image_product_55.jpg', 5);
INSERT INTO products VALUES (null, 'Nintendo Switch OLED', 'Consola de videojuegos diseñada para toda la familia.', 6999.00, true, 'image_product_65.jpg', 25);
INSERT INTO products VALUES (null, 'Xbox Series X', 'Consola de videojuegos diseñada para toda la familia.', 9999.00, true, 'image_product_75.jpg', 25);
INSERT INTO products VALUES (null, 'Play Station 5', 'Consola de videojuegos diseñada para toda la familia.', 9999.00, true, 'image_product_85.jpg', 25);
INSERT INTO products VALUES (null, 'AirPods', 'Esta es una descripción genérica.', 1999.00, true, 'image_product_95.jpg', 35);
INSERT INTO products VALUES (null, 'Xiaomi mi 11', 'Telefono movil con sistema operativo android 10, MIU 11 color azul.', 4999.99, true, 'image_product_105.jpg', 5);
INSERT INTO products VALUES (null, 'Pocophone', 'ESto es una descipcion generica', 9499.00, true, 'image_product_115.jpg', 45);
INSERT INTO products VALUES (null, 'Apple watch', 'Reloj inteligente con soporte para telefonos con sistema operativo iOS.', 3999.49, true, 'image_product_125.jpg', 55);
INSERT INTO products VALUES (null, 'Galaxy A10s', 'Samsung Galaxy A10s Dual SIM 32 GB azul 2 GB RAM.', 2500.00, true, 'image_product_135.jpg', 45);
INSERT INTO products VALUES (null, 'Pokémon Leyendas Arceus', 'Videojuego para Nintendo Switch.', 1199.00, true, 'image_product_145.jpg', 15);
INSERT INTO products VALUES (null, 'PopSocket', 'Esta es una descripción genérica.', 49.99, true, 'image_product_155.jpg', 5);
INSERT INTO products VALUES (null, 'Power Bank', 'Esta es una descripción genérica.', 129.99, true, 'image_product_165.jpg', 5);
INSERT INTO products VALUES (null, 'Palo para selfie', 'Esta es una descripción genérica.', 99.99, true, 'image_product_175.jpg', 5);
INSERT INTO products VALUES (null, 'Funda cartera', 'Esta es una descripción genérica.', 300.00, true, 'image_product_185.jpg', 5);
INSERT INTO products VALUES (null, 'GTA VI', 'Esta es una descripción genérica.', 999.00, true, 'image_product_195.jpg', 15);
INSERT INTO products VALUES (null, 'Halo The Master Chief Collection', 'Esta es una descripción genérica.', 899.49, true, 'image_product_205.jpg', 15);
INSERT INTO products VALUES (null, 'Super Smash Bros', 'Esta es una descripción genérica.', 1199.99, true, 'image_product_215.jpg', 15);
INSERT INTO products VALUES (null, 'The Legend of Zelda: Breath Of The Wild', 'Esta es una descripción genérica.', 1199.99, true, 'image_product_225.jpg', 15);
INSERT INTO products VALUES (null, 'Nintendo 3DS', 'Esta es una descripción genérica.', 2499.99, true, 'image_product_235.jpg', 25);
INSERT INTO products VALUES (null, 'Play Station 4', 'Esta es una descripción genérica.', 4999.99, true, 'image_product_245.jpg', 25);
INSERT INTO products VALUES (null, 'NES Classic Edition', 'Esta es una descripción genérica.', 1999.00, true, 'image_product_255.jpg', 25);
INSERT INTO products VALUES (null, 'Play Station Vita', 'Esta es una descripción genérica.', 1999.99, true, 'image_product_265.jpg', 25);
INSERT INTO products VALUES (null, 'Xiaomi AirDots', 'Esta es una descripción genérica.', 349.00, true, 'image_product_275.jpg', 35);
INSERT INTO products VALUES (null, 'Audífonos Gamer Razer Kraken Kitty', 'Esta es una descripción genérica.', 999.00, true, 'image_product_285.jpg', 35);
INSERT INTO products VALUES (null, 'Televisor LG Smart 4K', 'Esta es una descripción genérica.', 14999.00, true, 'image_product_295.jpg', 35);
INSERT INTO products VALUES (null, 'Bocina Sony EXTRA BASS', 'Esta es una descripción genérica.', 3999.00, true, 'image_product_305.jpg', 35);
INSERT INTO products VALUES (null, 'iPhone 12 Pro 256 GB', 'Esta es una descripción genérica.', 16999.99, true, 'image_product_315.jpg', 45);
INSERT INTO products VALUES (null, 'Samsung Galaxy Z Fold 3', 'Esta es una descripción genérica.', 19999.99, true, 'image_product_325.jpg', 45);
INSERT INTO products VALUES (null, 'Xiaomi Redmi Note 10 Pro', 'Esta es una descripción genérica.', 6999.99, true, 'image_product_335.jpg', 45);
INSERT INTO products VALUES (null, 'Nokia 3310', 'Esta es una descripción genérica.', 499.00, true, 'image_product_345.jpg', 45);
INSERT INTO products VALUES (null, 'Xiaomi Mi Band 6', 'Esta es una descripción genérica.', 899.00, true, 'image_product_355.jpg', 55);
INSERT INTO products VALUES (null, 'Casio CA53W reloj con calculadora', 'Esta es una descripción genérica.', 1499.00, true, 'image_product_365.jpg', 55);
INSERT INTO products VALUES (null, 'Reloj de Bob Esponja', 'Esta es una descripción genérica.', 0.99, true, 'image_product_375.jpg', 55);
INSERT INTO products VALUES (null, 'Amazfit', 'Esta es una descripción genérica.', 999.00, true, 'image_product_385.jpg', 55);
INSERT INTO products VALUES (null, 'Huawei Watch Fit', 'Esta es una descripción genérica.', 849.00, true, 'image_product_395.jpg', 55);

/* MODELOS */
INSERT INTO models VALUES (null, 'Blanco');
INSERT INTO models VALUES (null, 'Negro');
INSERT INTO models VALUES (null, 'Plateado');
INSERT INTO models VALUES (null, 'Rojo');
INSERT INTO models VALUES (null, 'iPhone 7');
INSERT INTO models VALUES (null, 'Xiaomi Redmi Note 7');
INSERT INTO models VALUES (null, 'Samsung Galaxy S10');

/* CONEXION ENTRE MODELOS Y PRODUCTOS */
INSERT INTO product_model VALUES (null, 15, 5);
INSERT INTO product_model VALUES (null, 15, 15);
INSERT INTO product_model VALUES (null, 25, 45);
INSERT INTO product_model VALUES (null, 25, 55);
INSERT INTO product_model VALUES (null, 25, 65);
INSERT INTO product_model VALUES (null, 35, 45);
INSERT INTO product_model VALUES (null, 35, 55);
INSERT INTO product_model VALUES (null, 35, 65);
INSERT INTO product_model VALUES (null, 45, 45);
INSERT INTO product_model VALUES (null, 45, 55);
INSERT INTO product_model VALUES (null, 45, 65);
INSERT INTO product_model VALUES (null, 55, 45);
INSERT INTO product_model VALUES (null, 55, 55);
INSERT INTO product_model VALUES (null, 55, 65);
INSERT INTO product_model VALUES (null, 95, 5);
INSERT INTO product_model VALUES (null, 95, 15);
INSERT INTO product_model VALUES (null, 125, 15);
INSERT INTO product_model VALUES (null, 125, 25);
INSERT INTO product_model VALUES (null, 125, 35);
INSERT INTO product_model VALUES (null, 135, 15);
INSERT INTO product_model VALUES (null, 135, 25);
INSERT INTO product_model VALUES (null, 135, 35);

/* CARRITOS DE COMPRAS */
INSERT INTO shoppingcarts VALUES (null, 5, 65, null, 1);
INSERT INTO shoppingcarts VALUES (null, 15, 5, null, 1);
INSERT INTO shoppingcarts VALUES (null, 15, 15, 15, 2);
INSERT INTO shoppingcarts VALUES (null, 25, 45, 5, 6);
INSERT INTO shoppingcarts VALUES (null, 25, 95, 5, 1);
INSERT INTO shoppingcarts VALUES (null, 25, 105, null, 1);

/* RECIBOS */
INSERT INTO checks VALUES (null, 5, '2021-07-15 14:28:23', 2098.00);
INSERT INTO checks VALUES (null, 5, '2021-08-29 10:59:36', 1298.00);
INSERT INTO checks VALUES (null, 25, '2021-08-16 07:48:45', 547.00);
INSERT INTO checks VALUES (null, 35, '2021-08-23 03:20:03', 2500.00);
INSERT INTO checks VALUES (null, 85, '2021-08-01 21:13:07', 19998.00);

/* CONEXION ENTRE RECIBOS Y PRODUCTOS */
INSERT INTO check_product VALUES (null, 5, 95, null, 1);
INSERT INTO check_product VALUES (null, 5, 35, null, 1);
INSERT INTO check_product VALUES (null, 15, 5, null, 1);
INSERT INTO check_product VALUES (null, 15, 145, null, 1);
INSERT INTO check_product VALUES (null, 25, 25, null, 1);
INSERT INTO check_product VALUES (null, 25, 45, null, 1);
INSERT INTO check_product VALUES (null, 25, 55, null, 1);
INSERT INTO check_product VALUES (null, 35, 135, null, 1);
INSERT INTO check_product VALUES (null, 45, 75, null, 2);