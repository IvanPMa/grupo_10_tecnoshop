const fs = require('fs');
const path = require('path');

const User = {
    getData: function(){
        return JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json'), {encoding : 'utf-8'}));
    },

    generateId: function(){
        let users = this.getData();

        if(users){
            let lastUser = users[users.length - 1];
            return id = lastUser.id + 1;
        }
        else{
            return 0;
        }
    },

    create: function(newUser){
        let users = this.getData();
        users.push(newUser);
        let usersJSON = JSON.stringify(users, null, 1);
        fs.writeFileSync(path.join(__dirname, '../data/users.json'), usersJSON);
    },

    edit: function(user){
        let users = this.getData();
        let index = users.indexOf(users.find(u => u.id == user.id));

        users[index] = {
            ...user
        }
        
        let usersJSON = JSON.stringify(users, null, 1);
        fs.writeFileSync(path.join(__dirname, '../data/users.json'), usersJSON);
    },

    delete: function(user){
        let users = this.getData();
        let index = users.indexOf(users.find(u => u.id == user.id));
        users.splice(index, 1);
        let usersJSON = JSON.stringify(users, null, 1);
        fs.writeFileSync(path.join(__dirname, '../data/users.json'), usersJSON);
    },

    findByField: function(field, text){
        let users = this.getData();
        let user = users.find(u => u[field] == text);
        return user;
    },

    isNewEmailInUse: function(user, newEmail){
        let users = this.getData();
        let index = users.indexOf(users.find(u => u.id == user.id));
        users.splice(index, 1);
        let existEmail = users.find(u => u.email == newEmail);
        return existEmail;
    },
}

module.exports = User;