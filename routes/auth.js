const { Router } = require("express");
const { check } = require("express-validator");
const { login,signin } = require("../controllers/auth.controller");
const {validarCampos} = require("../middlewares/validarCampos");

const router = Router();

router.post("/login",[
    
    check('correo','el correo es obligatorio').isEmail(),
    check('password','la contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login );

router.post('/google',
[
check('id_token','el token debe venir en la peticion').not().isEmpty(),
validarCampos
],signin)

module.exports=router;