const controller = {
    add: (req, res)=>{
        res.render('./productsManagement/addProduct');
    },
    edit: (req, res)=>{
        res.render('./productsManagement/editProduct');
    }
}

module.exports = controller;