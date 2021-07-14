const { response, request } = require("express");
const Usuario = require('../models/usuario');
const JWT = require('jsonwebtoken')
const validarJWT=async(req=request,res=response,next)=>{
const token = req.header('x-token');

if (!token) {
    return res.status(401).json({
        msn:'NO TOKEN EN LA PETICION'
    })
}

try {
    //jalamos el uid den JWT
    const {uid}=JWT.verify(token,process.env.PRIVATEJWT);
//buscamos el usuario con el uid del JWT usuario que esta logueado
    const usuario = await Usuario.findById(uid)

    //verificar si el usuario existe
    if (!usuario) {
        return res.status(401).json({
            msn:'TOKEN no valido -usuario borrado'
        })
    }
  
    //verificar si el uid tiene estado true
    if (!usuario.estado) {
        return res.status(401).json({
            msn:'TOKEN no valido -usuario con estado false'
        })
    }

   //lo enviamos como referencia al request
    req.usuarioVerificado=usuario;
    

    next();
} catch (error) {
    console.log(error)
    res.status(401).json({
        msn:'NO token valido'
    })
}
}
module.exports={
    validarJWT
}