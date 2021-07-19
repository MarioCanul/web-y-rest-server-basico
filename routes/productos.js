const { Router } = require("express");
const { check } = require("express-validator");
const { crearProducto,getProductos,getProducto,editarProducto,deleteProducto } = require("../controllers/productos.controller");
const { validarProductoExiste, validarCategoriaExiste } = require("../helpers/DB-validators");
const { validarJWT } = require("../middlewares/validar-JWT");

const {validarCampos} = require("../middlewares/validarCampos");

const router = Router();
//Obtener todas las categorias-publico
router.get("/",getProductos)

//Obtener solo una categoria por id -publico
router.get('/:id',[
    check('id','Tiene que ser requerido el ID').isMongoId(),
    check('id').custom(validarProductoExiste),
    validarCampos
],getProducto)
//Crear categoria -privado-cualquier persona con token valido
router.post('/',[
    validarJWT,
    check('nombre','El Nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un id de Mongo').isMongoId(),
    check('categoria').custom(validarCategoriaExiste),
    validarCampos
], crearProducto
)
//ACtualizar -privado-cualquiera con token valido
router.put('/:id',[
    validarJWT,
    // check('categoria','no es un id de Mongo').isMongoId(),
    check('id','Tiene que ser requerido el ID').isMongoId(),
    check('id').custom(validarProductoExiste),
    validarCampos,

],editarProducto
);
//Borra una categoria-Admin
router.delete('/:id',[
    validarJWT,
    check('id','Tiene que ser requerido el ID').isMongoId(),
    check('id').custom(validarProductoExiste),
    validarCampos,  
],deleteProducto)
module.exports=router;