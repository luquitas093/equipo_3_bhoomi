const fs= require('fs');




const User={
    fileName:'./src/data/users.json',
    //Buscar a todos los usuarios
    getData: function (){
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },
    findAll: function (){
        return this.getData();

    },
    //Generar ID
    generateId: function(){
        let allUsers= this.findAll();
        let lastUser= allUsers.pop();
        if (lastUser){
            return lastUser.id+1;
        }
        return 1;
        
    },
    //Buscar por id
    findByPk: function(id){
        let allUsers= this.findAll();
        let userFound= allUsers.find(aUser=> aUser.id===id);
        return userFound;

    },
    //Buscar por campo
    findByField: function(field,text){
        let allUsers= this.findAll();
        let userFound= allUsers.find(aUser=> aUser[field]===text);
        return userFound;

    },
    //Guardar usuario
    create: function (userData){
        let allUsers= this.findAll();
        let newUser={
            id:this.generateId(),
            ...userData
        }
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers,null, ' '));
        return newUser;
    },
    //Eliminar Usuario
    delete: function(id){
        let allUsers=this.findAll();
        let finalUser=allUsers.filter(aUser=> aUser.id !==id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUser,null, ' '));
    }
}

module.exports=User;

