// Middlewares
const express = require('express');
const session = require('express-session')
const path = require('path');
const methodOverride = require('method-override');
const cookies = require('cookie-parser');
const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware');
const previousPageMiddleware = require('./src/middlewares/previousPageMiddleware');
const darkModeMiddleware = require('./src/middlewares/darkModeMiddleware');

// Controllers
const rutaHome = require('./src/routes/home');
const rutaProducts = require('./src/routes/products');
const rutaCart = require('./src/routes/cart');
const rutasUsuarios = require('./src/routes/user');
const rutasManage = require('./src/routes/manage');

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
app.use(cookies());             // Para habilitar las cookies
app.use(userLoggedMiddleware);  // Para comprobar si esta logueado
app.use(darkModeMiddleware);    // Para poner el modo oscuro
app.use(previousPageMiddleware);// Para recordar la última página visitada

// Cionfigurando ejs 
app.set('view engine', 'ejs');
app.set('views','./src/views' )
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

// Ruteo de direcciones
app.use('/',rutaHome);
app.use('/user',rutasUsuarios);
app.use('/cart', rutaCart);
app.use('/products', rutaProducts);
app.use('/manage', rutasManage);

// Página de error
app.use((req, res, next) => {
    res.status(404).render('error');
})

// Levantamos el servidor
app.listen(port, ()=> console.log(`Servidor iniciado en el puerto ${port}`));