const { Router } = require("express");
const { check } = require("express-validator");
const { crearCategoria,getCategorias,getCategoria,editarCategoria,deleteCategoria } = require("../controllers/categorias.controller");
const { validarCategoriaExiste } = require("../helpers/DB-validators");
const { validarJWT } = require("../middlewares/validar-JWT");

const {validarCampos} = require("../middlewares/validarCampos");

const router = Router();
//Obtener todas las categorias-publico
router.get("/",getCategorias)

//Obtener solo una categoria por id -publico
router.get('/:id',[
    check('id','Tiene que ser requerido el ID').isMongoId(),
    check('id').custom(validarCategoriaExiste),
    validarCampos
],getCategoria)
//Crear categoria -privado-cualquier persona con token valido
router.post('/',[
    validarJWT,
    check('nombre','El Nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria
)
//ACtualizar -privado-cualquiera con token valido
router.put('/:id',[
    validarJWT,
    check('nombre','es requerido el nombre').not().isEmpty(),
    check('id','Tiene que ser requerido el ID').isMongoId(),
    check('id').custom(validarCategoriaExiste),
    validarCampos,

],editarCategoria
);
//Borra una categoria-Admin
router.delete('/:id',[
    validarJWT,
    check('id','Tiene que ser requerido el ID').isMongoId(),
    check('id').custom(validarCategoriaExiste),
    validarCampos,  
],deleteCategoria)
module.exports=router;