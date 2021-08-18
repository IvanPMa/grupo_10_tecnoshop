// Middlewares
const express = require('express');
const session = require('express-session')
const path = require('path');
const methodOverride = require('method-override');
const cookies = require('cookie-parser');
const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware');

// Controllers
const rutaHome = require('./src/routes/home');
const rutaProductDetail = require('./src/routes/productDetail');
const rutaProductCart = require('./src/routes/productCart');
const rutasUsuarios = require('./src/routes/user');
const rutasProductManagement = require('./src/routes/productManagement');
const rutasUserManagement = require('./src/routes/userManagement');

const app = express();

var port = process.env.PORT || 3000;

const folderPublicPath = path.resolve(__dirname, './public');

// Establecemos la carpeta publica
app.use( express.static(folderPublicPath));
// Habilitamos metodos PUT y DELETE
app.use(methodOverride('_method'));
// Para guardar datos en el navegador
app.use(session({
    secret: "Esta es una palabra secreta",
    resave: false,
    saveUninitalized: false
}));
// Usamos las cookies
app.use(cookies());
// Para comprobar si esta logueado
app.use(userLoggedMiddleware);

// Cionfigurando ejs 
app.set('view engine', 'ejs');
app.set('views','./src/views' )
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

// Ruteo de direcciones
app.use('/',rutaHome);
app.use('/product', rutaProductDetail);
app.use('/productCart', rutaProductCart);
app.use('/user',rutasUsuarios);
app.use('/products', rutasProductManagement);
app.use('/users', rutasUserManagement);

// Página de error
app.use((req, res, next) => {
    res.status(404).render('error');
})

// Levantamos el servidor
app.listen(port, ()=> console.log(`Servidor iniciado en el puerto ${port}`));