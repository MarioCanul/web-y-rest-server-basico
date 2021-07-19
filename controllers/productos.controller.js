const { response } = require("express");
const {Producto}=require('../models')


const getProductos=async(req,res=response)=>{
    const {limite=15,desde=0}= req.query
    const query = {estado:true};
    const [productos,total] = await Promise.all([
        Producto.find(query)
    //hasta cualtas colecciones se devuelven
    .limit(Number(limite))
    //desde que coleccion te enviaran
    .skip(Number(desde)).populate('usuario').populate('categoria'),
    //contar total de usuarios
    Producto.countDocuments(query)
    ])

    res.json({
        total,
        productos
    });
}

const getProducto=async(req,res=response)=>{
    const {id}=req.params;
    const {limite=5,desde=0}= req.query
    const query = {_id:id,estado:true};


    const [producto,total] = await Promise.all([
        Producto.find(query)
    //hasta cualtas colecciones se devuelven
    .limit(Number(limite))
    //desde que coleccion te enviaran
    .skip(Number(desde)).populate('usuario').populate('categoria'),
    //contar total de usuarios
    Producto.countDocuments(query)
    ])
    res.json({
        total,
        producto
    });
    
  }

const crearProducto=async(req,res=response)=>{
const {estado,usuario,...body}= req.body;

const productoDB = await Producto.findOne({nombre:body.nombre})
if (productoDB) {
    return res.status(400).json({
        msg:`la categoria ${productoDB.nombre} ya existe`
    });
}

//generar la data a guardar
const data ={
    ...body,
    nombre:body.nombre.toUpperCase(),
    usuario:req.usuarioVerificado._id
}
const producto = new Producto(data);
//Guardar en DB
await producto.save()
    res.status(200).json({
        msn:'ok',
        producto
    })
}

const editarProducto=async(req,res=response)=>{
const {id}=req.params;
const {estado,usuario,...body}=req.body;
if (body.nombre) {
    
    body.nombre=body.nombre.toUpperCase();
}

const data ={
    ...body,
    usuario:req.usuarioVerificado._id
}

const producto = await Producto.findByIdAndUpdate(id, data,{new:true});

res.status(200).json({
    msn:'ok',
    producto
})

}
const deleteProducto=async(req,res=response)=>{
    const { id } = req.params;

    const producto= await Producto.findByIdAndUpdate(id,{estado:false},{new:true});
  res.json({
    producto,
    
  });
}

module.exports={
    crearProducto,
    getProductos,
    getProducto,
    editarProducto,
    deleteProducto
}