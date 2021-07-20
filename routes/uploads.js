const { Router } = require("express");
const { check } = require("express-validator");
const { cargarArchivo,actualizarImagen,mostrarImagen, actualizarImagenCloudinary } = require("../controllers/uploads.controller");
const { coleccionesPermitidas } = require("../helpers/DB-validators");
const { validarArchivoSubir } = require("../middlewares/validar-archivo");

const {validarCampos} = require("../middlewares/validarCampos");

const router = Router();

router.post("/",[ validarArchivoSubir,
    validarCampos],cargarArchivo );
router.put('/:coleccion/:id',[
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c,['usuarios','productos'])),
    validarArchivoSubir,
    validarCampos
],actualizarImagenCloudinary),
router.get('/:coleccion/:id',[
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],mostrarImagen)


module.exports=router;