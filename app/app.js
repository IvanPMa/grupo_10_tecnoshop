const express = require('express');
const path = require('path');

const rutaHome = require('./routes/home');
const rutasProductos = require('./routes/product');

const app = express();

var port = process.env.PORT || 3000;

const folderPublicPath = path.resolve(__dirname, './public');

// Establecemos la carpeta publica
app.use( express.static(folderPublicPath));


// Cionfigurando ejs 
app.set('view engine', 'ejs');

// Ruteo de direcciones 
app.use('/',rutaHome);

app.get('/productDetail', rutasProductos);

app.get('/productCart', rutasProductos);

app.get('/register',(req, res)=>{
    res.sendFile(path.resolve(__dirname,'./views/register.html'));
});

app.get('/login',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./views/login.html'))
})

// Levantamos el servidor
app.listen(port, ()=> console.log(`Servidor iniciado en el puerto ${port}`));

