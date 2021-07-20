const express = require('express');
const cors = require('cors');
const fileUpload= require('express-fileupload')
const {dbConnection} = require('../database/database');
class server{
constructor(){
this.app=express();
this.port=process.env.PORT;

this.paths={
    Auth:'/api/auth',
    Buscar:'/api/buscar',
    Categoria:'/api/categoria',
    Productos:'/api/productos',
    User:'/api/users',
    Uploads:'/api/uploads',
}

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
  this.app.use(this.paths.Auth, require('../routes/auth'));
  this.app.use(this.paths.Buscar, require('../routes/buscar'));
  this.app.use(this.paths.User, require('../routes/users'));
  this.app.use(this.paths.Categoria, require('../routes/categorias'));
  this.app.use(this.paths.Productos, require('../routes/productos'));
  this.app.use(this.paths.Uploads, require('../routes/uploads'));
}

middlewares(){
    //cors
    this.app.use(cors())
    //directorio estatico
    this.app.use(express.static('public'))
    //Lectura y parseo del body
    this.app.use(express.json())
    //carga de archivos
    this.app.use(fileUpload({
        useTempFiles : true,
        tempFileDir : '/tmp/',
        createParentPath:true
    }));
}
listening(){
    this.app.listen(this.port,()=>{
        console.log(`Servidor Corriendo en`,this.port)
    })
}
}
module.exports=server;