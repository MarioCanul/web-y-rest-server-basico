const { response, request } = require("express");
const bcryptjs= require('bcryptjs')
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generarJWT");
const { googleVerify } = require("../helpers/google-verify");

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

const signin=async(req,res=response)=>{

const {id_token}=req.body;

try {
   const {nombre,img,correo} = await googleVerify(id_token);

   let usuario = await Usuario.findOne({correo})
   //crear si el usuario no existe
if (!usuario) {
    const data={
        nombre,
        correo,
        password:'.p',
        img,
        google:true
    };
    usuario= new Usuario(data)
    await usuario.save();
}
//si el usuario esta en DB
if (!usuario.estado) {
    return res.status(401).json({
        msn:'hable con un Administrador- Usuario bloqueado'
    })
}
//generar JWT token
const token = await generarJWT(usuario.id)

   res.status(200).json({
    msn:'todo correcto',
    usuario,
    token
})

} catch (error) {
    console.log(error);
    res.status(400).json({
        msn:'Token no valido',
       
        
    })
}



}
module.exports={
    login,
    signin
}