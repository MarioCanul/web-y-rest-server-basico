const { response } = require("express");
const {Categoria}=require('../models')
const getCategorias=async(req,res=response)=>{
    const {limite=15,desde=0}= req.query
    const query = {estado:true};
    const [categorias,total] = await Promise.all([
        Categoria.find(query)
    //hasta cualtas colecciones se devuelven
    .limit(Number(limite))
    //desde que coleccion te enviaran
    .skip(Number(desde)).populate('usuario'),
    //contar total de usuarios
    Categoria.countDocuments(query)
    ])

    res.json({
        total,
        categorias
    });
}

const getCategoria=async(req,res=response)=>{
    const {id}=req.params;
    const {limite=5,desde=0}= req.query
    const query = {_id:id,estado:true};


    const [categoria,total] = await Promise.all([
        Categoria.find(query)
    //hasta cualtas colecciones se devuelven
    .limit(Number(limite))
    //desde que coleccion te enviaran
    .skip(Number(desde)).populate('usuario'),
    //contar total de usuarios
    Categoria.countDocuments(query)
    ])
    res.json({
        total,
        categoria
    });
    
  }

const crearCategoria=async(req,res=response)=>{
const nombre= req.body.nombre.toUpperCase();

const categoriaDB= await Categoria.findOne({nombre})
if (categoriaDB) {
    res.status(400).json({
        msg:`la categoria ${categoriaDB.nombre} ya existe`
    });
}

console.log(req.usuarioVerificado)
//generar la data a guardar
const data ={
    nombre,
    usuario:req.usuarioVerificado._id
}
const categoria = new Categoria(data);
//Guardar en DB
await categoria.save()
    res.status(200).json({
        msn:'ok',
        // categoria
    })
}

const editarCategoria=async(req,res=response)=>{
const {id}=req.params;
const {nombre}=req.body;

const data ={
    nombre,
    usuario:req.usuarioVerificado._id
}

const categoria = await Categoria.findByIdAndUpdate(id, data);

res.status(200).json({
    msn:'ok',
    categoria
})

}
const deleteCategoria=async(req,res=response)=>{
    const { id } = req.params;

    const categoria= await Categoria.findByIdAndUpdate(id,{estado:false});
  res.json({
    categoria,
    
  });
}

module.exports={
    crearCategoria,
    getCategorias,
    getCategoria,
    editarCategoria,
    deleteCategoria
}