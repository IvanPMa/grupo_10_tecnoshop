const express = require('express');
const path = require('path');
const methodOverride = require('method-override');

const rutaHome = require('./src/routes/home');
const rutaProductDetail = require('./src/routes/productDetail');
const rutaProductCart = require('./src/routes/productCart');
const rutaLogin = require('./src/routes/login');
const rutaRegister = require('./src/routes/register');
const rutasProductManagement = require('./src/routes/productManagement');

const app = express();

var port = process.env.PORT || 3000;

const folderPublicPath = path.resolve(__dirname, './public');

// Establecemos la carpeta publica
app.use( express.static(folderPublicPath));
//Habilitamos metodos PUT y DELETE
app.use(methodOverride('_method'));

// Cionfigurando ejs 
app.set('view engine', 'ejs');
app.set('views','./src/views' )
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

// Ruteo de direcciones
app.use('/',rutaHome);
app.use('/productDetail', rutaProductDetail);
app.use('/productCart', rutaProductCart);
app.use('/register', rutaRegister);
app.use('/login', rutaLogin);
app.use('/products', rutasProductManagement);
app.use((req, res, next) => {
    res.status(404).send('Página no encontrada');
})

// Levantamos el servidor
app.listen(port, ()=> console.log(`Servidor iniciado en el puerto ${port}`));