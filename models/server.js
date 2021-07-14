const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../database/database');
class server{
constructor(){
this.app=express();
this.port=process.env.PORT;
this.apiUser='/api/users';
this.authUser='/api/auth'
//coneccion DB
this.ConnectionDB();
//middlewares
this.middlewares();
//rutas
this.routes();
}

async ConnectionDB(){
    await dbConnection();
}
routes(){
  this.app.use(this.authUser, require('../routes/auth'));
  this.app.use(this.apiUser, require('../routes/users'));
}

middlewares(){
    //cors
    this.app.use(cors())
    //directorio estatico
    this.app.use(express.static('public'))
    //Lectura y parseo del body
    this.app.use(express.json())
}
listening(){
    this.app.listen(this.port,()=>{
        console.log(`Servidor Corriendo en`,this.port)
    })
}
}
module.exports=server;