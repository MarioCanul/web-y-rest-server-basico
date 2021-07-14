const { response, request } = require("express");
const bcryptjs= require('bcryptjs')
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generarJWT");

const login=async(req=request, res=response)=>{
    const {password, correo}=req.body;

    try {
        //verificar si el correo existe
        const usuario= await Usuario.findOne({correo})
        if (!usuario) {
            res.status(400).json({
                msn:'El usuario/contraseña no son correctos - correo'
            })
        }
        //si el usuario esta activo
        if (!usuario.estado) {
            res.status(400).json({
                msn:'El usuario/contraseña no son correctos - estado:false'
            })
        }
        //verificar contraseña
        const validPassword= bcryptjs.compareSync(password,usuario.password);
        if (!validPassword) {
            res.status(400).json({
                msn:'El usuario/contraseña no son correctos - password'
            })
        }
//GENERAR JWT
const token= await generarJWT(usuario.id);
        res.json({
            msn:'login ok',
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:'Contacte a un administrador'
        })
    }
    
}
module.exports={
    login
}