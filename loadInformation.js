const db = require('./src/database/models');

const usersCategories = [
    { name: 'Usuario' },
    { name: 'Administrador' }
]

const users = [
    { first_name: 'Axel', last_name: 'Manzanilla', email: 'axelmanzanilla@gmail.com', password:'$2a$10$c6EEtSpZj3.lS0ZNts2v3OGWYoBMUhYs1c6oj.RX.ESulvS4iUJEy', promotion: false, category_id: 2 },
    { first_name: 'Karla', last_name: 'Figueroa', email: 'karlafigueroa186@gmail.com', password:'$2a$10$C5bHUQLnL8Y4/UhcBvZ8heEQQkHEGg.kw5A1ZxU4uj9koelK2erVq', promotion: true}
]

const productCategories = [
    { name: 'Accesorios' },
    { name: 'Audio y Video' }
]

const products = [
    { name: 'Gomu Gomu No Mi', description: 'Esta es una descripción genérica.', price: 99, category_id: 1 },
    { name: 'Audífonos Inalámbricos', description: 'Esta es una descripción genérica.', price: 299, category_id: 2 }
]

async function createDataBase(){
    // Categorías de Usuario
    for(let i = 0; i < usersCategories.length; i++){
        await db.UserCategory.create(usersCategories[i]);
    }

    // Usuarios
    for(let i = 0; i < users.length; i++){
        await db.User.create(users[i]);
    }

    // Categorías de Productos
    for(let i = 0; i < productCategories.length; i++){
        await db.ProductCategory.create(productCategories[i]);
    }

    // Productos
    for(let i = 0; i < products.length; i++){
        await db.Product.create(products[i]);
    }
}

createDataBase();