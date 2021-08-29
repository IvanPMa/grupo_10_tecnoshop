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
INSERT INTO users VALUES (null, 'Axel', 'Manzanilla', 'axelmanzanilla@gmail.com', '$2a$10$eZeN/E2OzhuCGE/ROWnWYeqqMzWaJbh5V1jK4vlh5yTCeZY8T5BGC', true, 'user_1_picture.jpg', 1, 2);
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
INSERT INTO products VALUES (null, 'Gomu Gomu No Mi', 'Esta es una descripción genérica.', 99.00, true, 'image_product_1.png', 1);
INSERT INTO products VALUES (null, 'Audífonos Inalámbricos', 'Esta es una descripción genérica.', 299.00, true, 'image_product_2.jpg', 4);
INSERT INTO products VALUES (null, 'Funda Dr. Stone', 'Funda para celular con diferentes diseños.', 199.00, true, 'image_product_3.jpg', 1);
INSERT INTO products VALUES (null, 'Lente para celular', 'Esta es una descripción genérica.', 99.00, true, 'image_product_4.jpg', 1);
INSERT INTO products VALUES (null, 'Funda One Punch Man', 'Funda para celular con diferentes diseños.', 149.00, true, 'image_product_5.jpg', 1);
INSERT INTO products VALUES (null, 'Funda Shingeki', 'Funda para celular con diferentes diseños.', 199.00, true, 'image_product_6.jpg', 1);
INSERT INTO products VALUES (null, 'Nintendo Switch OLED', 'Consola de videojuegos diseñada para toda la familia.', 6999.00, true, 'image_product_7.jpg', 3);
INSERT INTO products VALUES (null, 'Xbox Series X', 'Consola de videojuegos diseñada para toda la familia.', 9999.00, true, 'image_product_8.jpg', 3);
INSERT INTO products VALUES (null, 'Play Station 5', 'Consola de videojuegos diseñada para toda la familia.', 9999.00, true, 'image_product_9.jpg', 3);
INSERT INTO products VALUES (null, 'AirPods', 'Esta es una descripción genérica.', 1999.00, true, 'image_product_10.jpg', 4);
INSERT INTO products VALUES (null, 'Xiaomi mi 11', 'Telefono movil con sistema operativo android 10, MIU 11 color azul.', 4999.99, true, 'image_product_11.jpg', 5);
INSERT INTO products VALUES (null, 'Pocophone', 'ESto es una descipcion generica', 9499.00, true, 'image_product_12.jpg', 5);
INSERT INTO products VALUES (null, 'Apple watch', 'Reloj inteligente con soporte para telefonos con sistema operativo iOS.', 3999.49, true, 'image_product_13.jpg', 6);
INSERT INTO products VALUES (null, 'Galaxy A10s', 'Samsung Galaxy A10s Dual SIM 32 GB azul 2 GB RAM.', 2500.00, true, 'image_product_14.jpg', 5);
INSERT INTO products VALUES (null, 'Pokémon Leyendas Arceus', 'Videojueo para Nintendo Switch.', 1199.00, true, 'image_product_15.jpg', 2);

/* MODELOS */
INSERT INTO models VALUES (null, 'Blanco');
INSERT INTO models VALUES (null, 'Negro');
INSERT INTO models VALUES (null, 'Plateado');
INSERT INTO models VALUES (null, 'Rojo');
INSERT INTO models VALUES (null, 'iPhone 7');
INSERT INTO models VALUES (null, 'Xiaomi Redmi Note 7');
INSERT INTO models VALUES (null, 'Samsung Galaxy S10');

/* CONEXION ENTRE MODELOS Y PRODUCTOS */
INSERT INTO product_model VALUES (null, 2, 1);
INSERT INTO product_model VALUES (null, 2, 2);
INSERT INTO product_model VALUES (null, 3, 5);
INSERT INTO product_model VALUES (null, 3, 6);
INSERT INTO product_model VALUES (null, 3, 7);
INSERT INTO product_model VALUES (null, 4, 5);
INSERT INTO product_model VALUES (null, 4, 6);
INSERT INTO product_model VALUES (null, 4, 7);
INSERT INTO product_model VALUES (null, 5, 5);
INSERT INTO product_model VALUES (null, 5, 6);
INSERT INTO product_model VALUES (null, 5, 7);
INSERT INTO product_model VALUES (null, 6, 5);
INSERT INTO product_model VALUES (null, 6, 6);
INSERT INTO product_model VALUES (null, 6, 7);
INSERT INTO product_model VALUES (null, 10, 1);
INSERT INTO product_model VALUES (null, 10, 2);
INSERT INTO product_model VALUES (null, 13, 2);
INSERT INTO product_model VALUES (null, 13, 3);
INSERT INTO product_model VALUES (null, 13, 4);
INSERT INTO product_model VALUES (null, 14, 2);
INSERT INTO product_model VALUES (null, 14, 3);
INSERT INTO product_model VALUES (null, 14, 4);

/* CARRITOS DE COMPRAS */
INSERT INTO shoppingcarts VALUES (null, 1, 7, null, 1);
INSERT INTO shoppingcarts VALUES (null, 2, 1, null, 1);
INSERT INTO shoppingcarts VALUES (null, 2, 2, 2, 2);
INSERT INTO shoppingcarts VALUES (null, 3, 5, 1, 6);
INSERT INTO shoppingcarts VALUES (null, 3, 10, 1, 1);
INSERT INTO shoppingcarts VALUES (null, 3, 11, null, 1);

/* RECIBOS */
INSERT INTO checks VALUES (null, 1, '2021-07-15 14:28:23', 2098.00);
INSERT INTO checks VALUES (null, 1, '2021-08-29 10:59:36', 1298.00);
INSERT INTO checks VALUES (null, 3, '2021-08-16 07:48:45', 547.00);
INSERT INTO checks VALUES (null, 4, '2021-08-23 03:20:03', 2500.00);
INSERT INTO checks VALUES (null, 9, '2021-08-01 21:13:07', 19998.00);

/* CONEXION ENTRE RECIBOS Y PRODUCTOS */
INSERT INTO check_product VALUES (null, 1, 10, 1);
INSERT INTO check_product VALUES (null, 1, 4, 1);
INSERT INTO check_product VALUES (null, 2, 1, 1);
INSERT INTO check_product VALUES (null, 2, 15, 1);
INSERT INTO check_product VALUES (null, 3, 3, 1);
INSERT INTO check_product VALUES (null, 3, 5, 1);
INSERT INTO check_product VALUES (null, 3, 6, 1);
INSERT INTO check_product VALUES (null, 4, 14, 1);
INSERT INTO check_product VALUES (null, 5, 8, 2);