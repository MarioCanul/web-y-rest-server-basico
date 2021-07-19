const { Categoria,Producto } = require("../models");
const Role = require("../models/role");
const Usuario = require("../models/usuario");
//Validar el rol que porporciono sea los que tiene en la BD
const validarRol = async (rol = "") => {
  const ExisteRol = await Role.findOne({ rol });

  if (!ExisteRol) {
    throw new Error(`El rol ${rol} no esta registrado en la BD`);
  }
};
//validar si es unica el email que proporciona
const validarEmailExiste = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo });

  if (existeEmail) {
    throw new Error(`El correo ${correo} esta registrado en la BD`);
  }
};
//validar si e sun di de mongo
const validarIdExiste = async (id = "") => {
  const existeId = await Usuario.findById(id);

  if (!existeId) {
    throw new Error(`El id no existe ${id} `);
  }
};
const validarCategoriaExiste = async (id = "") => {
  const existeId = await Categoria.findById(id);

  if (!existeId) {
    throw new Error(`El id no existe ${id} `);
  }
};
const validarProductoExiste = async (id = "") => {
  const existeId = await Producto.findById(id);

  if (!existeId) {
    throw new Error(`El id no existe ${id} `);
  }
};

module.exports = {
  validarRol,
  validarEmailExiste,
  validarIdExiste,
  validarCategoriaExiste,
  validarProductoExiste,
};
