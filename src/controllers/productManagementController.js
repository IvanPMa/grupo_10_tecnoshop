const controller = {
    index: (req, res)=>{
        res.send('lista de productos no disponibles por el momento');
    },
    detailProduct: (req, res)=>{
        res.send('detalles no disponibles por el momento');
    },
    createProduct: (req, res)=>{
        res.render('./productManagement/createProduct');
    },
    editProduct: (req, res)=>{
        res.render('./productManagement/editProduct');
    }
}

module.exports = controller;