const { Router } = require("express");
const { check } = require("express-validator");
const {
  userGet,
  userPost,
  userDelete,
  userPatch,
  userPut,
} = require("../controllers/users.controller");
const {
  validarRol,
  validarEmailExiste,
  validarIdExiste,
} = require("../helpers/DB-validators");
const validarCampos = require("../middlewares/validarCampos");

const router = Router();

router.get("/", userGet);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe ser de mas de 6 caracteres").isLength({
      min: 6,
    }),
    check("correo", "El correo no es valido").isEmail(),
    check("correo").custom(validarEmailExiste),
    // check('rol','No es un rol Valido').isIn(['ADMIN_ROL','USER_ROL']),
    check("rol").custom(validarRol),
    validarCampos,
  ],
  userPost
);
router.put(
  "/:id",
  [
    //validar si es un id de mongo
    check("id", "No es un ID valido").isMongoId(),
    //validar si el id esta en la bd de mongo
    check("id").custom(validarIdExiste),
    //validar si el rol esta en la bd de mongo
    check("rol").custom(validarRol),
    validarCampos,
  ],
  userPut
);
router.patch("/", userPatch);
router.delete("/:id", 
[
  check("id", "No es un ID valido").isMongoId(),
  check("id").custom(validarIdExiste),
  validarCampos,
]
,userDelete);

module.exports = router;
