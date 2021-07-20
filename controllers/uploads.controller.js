const { response } = require("express");
const path= require('path')
const fs= require('fs')
const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret:process.env.API_SECRET ,
    secure: true,
    });
const { validarIdExiste, validarProductoExiste } = require("../helpers/DB-validators");
const { subirArchivo } = require("../helpers/subir-archivo");

const cargarArchivo = async (req, res = response) => {
  try {
    //imagenes
    const nombre = await subirArchivo(req.files, ["txt", "md"]);
    res.json({ nombre });
  } catch (msg) {
    res.status(400).json({ msg });
  }
};

const actualizarImagen=async(req,res=response)=>{
const {id,coleccion}=req.params;
let modelo;

switch (coleccion) {
    case 'usuarios':
        try {
            modelo=await validarIdExiste(id);
        } catch (error) {
            return res.status(400).json({
                msg:`No existe un usuario con el id ${id}`
            }) 
        }
        break;
        case 'productos':
            try {
                modelo=await validarProductoExiste(id);
            } catch (error) {
                return res.status(400).json({
                    msg:`No existe un producto con el id ${id}`
                }) 
            }
            break;

    default:
        return res.status(500).json({msg:'se me olvido validar esto'});
        
}
if (modelo.img) {
    const pathImagen=path.join(__dirname,'../uploads',coleccion,modelo.img);
    if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
    }
}
}



const actualizarImagenCloudinary=async(req,res=response)=>{
    const {id,coleccion}=req.params;
    let modelo;
    
    switch (coleccion) {
        case 'usuarios':
            try {
                modelo=await validarIdExiste(id);
            } catch (error) {
                return res.status(400).json({
                    msg:`No existe un usuario con el id ${id}`
                }) 
            }
            break;
            case 'productos':
                try {
                    modelo=await validarProductoExiste(id);
                } catch (error) {
                    return res.status(400).json({
                        msg:`No existe un producto con el id ${id}`
                    }) 
                }
                break;
    
        default:
            return res.status(500).json({msg:'se me olvido validar esto'});
            
    }
    if (modelo.img) {
       const nombreArr= modelo.img.split('/');
       const nombre= nombreArr[nombreArr.length-1];
       const [public_id]=nombre.split('.');
       cloudinary.uploader.destroy(public_id);
    }
    const {tempFilePath}=req.files.archivo;
    const {secure_url}= await cloudinary.uploader.upload(tempFilePath);
    modelo.img=secure_url;
    await modelo.save();
    res.json(modelo) 

}

const mostrarImagen=async(req,res=response)=>{
    const {id,coleccion}=req.params;
    let modelo;
    
    switch (coleccion) {
        case 'usuarios':
            try {
                modelo=await validarIdExiste(id);
            } catch (error) {
                return res.status(400).json({
                    msg:`No existe un usuario con el id ${id}`
                }) 
            }
            break;
            case 'productos':
                try {
                    modelo=await validarProductoExiste(id);
                } catch (error) {
                    return res.status(400).json({
                        msg:`No existe un producto con el id ${id}`
                    }) 
                }
                break;
    
        default:
            return res.status(500).json({msg:'se me olvido validar esto'});
            
    }
    if (modelo.img) {
        const pathImagen=path.join(__dirname,'../uploads',coleccion,modelo.img);
        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen)
        }
    }
    const pathImagen=path.join(__dirname,'../assets','no-image.jpg');
        res.sendFile(pathImagen); 


}
module.exports = {
  cargarArchivo,
  actualizarImagen,
  mostrarImagen,
  actualizarImagenCloudinary
}
