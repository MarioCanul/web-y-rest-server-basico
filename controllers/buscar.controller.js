const { response } = require("express");
const { isValidObjectId } = require("mongoose");
const { Usuario,Producto, Categoria } = require("../models");

const coleccionesPermitidas = ["usuarios", "productos", "categoria", "roles"];

const buscar = (req, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `las colecciones permitidas son ${coleccionesPermitidas}`,
    });
  }

const buscarUsuario=async (termino='',res=response)=>{

    const esIddeMongo = isValidObjectId(termino);

    if (esIddeMongo) {
        const usuario = await Usuario.findById(termino);
       return res.json({
            results:(usuario)?[usuario]:[]
        })
    }

    //expresion regular para case sensitive
    const regex = new RegExp(termino,'i');
    const usuarios= await Usuario.find({
        $or:[{nombre:regex},{correo:regex}],
        $and : [{estado:true}]
    });

res.json({
    resulst:usuarios
})

}

const buscarProducto=async (termino='',res=response)=>{

    const esIddeMongo = isValidObjectId(termino);

    if (esIddeMongo) {
        const producto = await Producto.findById(termino).populate('categoria','nombre');
       return res.json({
            results:(producto)?[producto]:[]
        })
    }

    //expresion regular para case sensitive
    const regex = new RegExp(termino,'i');
    const producto= await Producto.find({
        $and : [{nombre:regex},{estado:true}]
    }).populate('categoria','nombre');

res.json({
    resulst:producto
})

}

const buscarCategoria=async (termino='',res=response)=>{

    const esIddeMongo = isValidObjectId(termino);

    if (esIddeMongo) {
        const categoria = await Categoria.findById(termino);
       return res.json({
            results:(categoria)?[categoria]:[]
        })
    }

    //expresion regular para case sensitive
    const regex = new RegExp(termino,'i');
    const categoria= await Categoria.find({
        $and : [{nombre:regex},{estado:true}]
    });

res.json({
    resulst:categoria
})

}

  switch (coleccion) {
    case "usuarios":

        buscarUsuario(termino,res);
      break;
    case "productos":

        buscarProducto(termino,res);
      break;
    case "categoria":

        buscarCategoria(termino,res);
      break;

    default:
        return res.status(500).json({
            msg:'NO se a implementado'
        })
      break;
  }

};
module.exports = {
  buscar,
};
