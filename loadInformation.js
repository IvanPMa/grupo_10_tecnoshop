const db = require('./src/database/models');

const usersCategories = [
    { name: 'Usuario' },
    { name: 'Administrador' }
]

const users = [
    { first_name: 'Axel', last_name: 'Manzanilla', email: 'axelmanzanilla@gmail.com', password:'$2a$10$HKYlNPmyMjUPZfoPHJ4k/.Ar5FNxucICdBxF0FoSaTy11HFhNDsyy', promotion: false, category_id: 2 }
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
}

createDataBase();