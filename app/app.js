const express = require('express');
const path = require('path');

const rutaHome = require('./src/routes/home');
const rutasProductos = require('./src/routes/product');
const rutasUsers = require('./src/routes/user');
const rutasManagement = require('./src/routes/management');

const app = express();

var port = process.env.PORT || 3000;

const folderPublicPath = path.resolve(__dirname, './public');

// Establecemos la carpeta publica
app.use( express.static(folderPublicPath));


// Cionfigurando ejs 
app.set('view engine', 'ejs');
app.set('views','./src/views' )

// Ruteo de direcciones 
app.use('/',rutaHome);
app.get('/productDetail', rutasProductos);
app.get('/productCart', rutasProductos);
app.get('/register',rutasUsers);
app.get('/login',rutasUsers)
app.get('/addProduct',rutasManagement)
app.get('/editProduct',rutasManagement)



// Levantamos el servidor
app.listen(port, ()=> console.log(`Servidor iniciado en el puerto ${port}`));

