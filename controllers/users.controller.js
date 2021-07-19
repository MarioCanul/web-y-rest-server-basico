const { response, request } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const userGet =async(req, res = response) => {
    const {limite=5,desde=0}= req.query
    const query = {estado:true};


    //COleccion de promesas para aumentar su velocidad de respuesta cuando tienes muchas pormesas en una solo controlador
    //desestructuracion de un arreglo
    const [usuarios,total] = await Promise.all([
        Usuario.find(query)
    //hasta cualtas colecciones se devuelven
    .limit(Number(limite))
    //desde que coleccion te enviaran
    .skip(Number(desde)),
    //contar total de usuarios
    Usuario.countDocuments(query)
    ])
  res.json({
      total,
    usuarios
  });
};



const userPost = async (req = request, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //verificacion si el correo existe

  //encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //Guradar en BD
  await usuario.save();

  res.json({
    method: "POST-controller",
    usuario,
  });
};

const userDelete = async(req = request, res = response) => {
  const { id } = req.params;
  const {usuarioVerificado } = req;
  //no se recomiendo borrar datos se recomiendo cambiarles el estado
//   const usuario= await Usuario.findByIdAndDelete(id)
const usuario= await Usuario.findByIdAndUpdate(id,{estado:false});
  res.json({
    usuario,
    usuarioVerificado,
  });
};

const userPut = async (req, res = response) => {
  const { id } = req.params;
  const { password, google, correo, ...resto } = req.body;

  //TODO validar contra base de datos
  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }
  const usuario = await Usuario.findByIdAndUpdate(id, resto);
  res.json({
    method: "PUT",
    id,
    usuario,
    resto,
  });
};
const userPatch = (req, res = response) => {
  res.json({
    method: "PATCH controller",
  });
};
module.exports = {
  userGet,
  userPost,
  userDelete,
  userPatch,
  userPut,
};
