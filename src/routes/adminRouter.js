const express = require ("express");
const router = express.Router ();
const path = require ("path");
const multer = require('multer');

const adminController = require(path.resolve(__dirname,"../controllers/adminController.js"))

//Middlewares

const newProductValidation = require ("../middlewares/routes/products/newProductValidationMiddleware.js")
const editProductValidation = require ("../middlewares/routes/products/editProductValidationMiddleware.js")
const roleMiddleware = require ("../middlewares/routes/users/roleMiddleware.js")

//Setear el Storage de Multer

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '../../public/img/products'));
    },
    filename: function (req, file, cb) {
      cb(null, "product-" + Date.now() + path.extname(file.originalname))
    }
  })
   
  const upload = multer({ storage: storage })

// Requerir Rutas

//Pantalla del Administrador
router.get ("/", roleMiddleware, adminController.admin);

//Crear Producto
router.get('/crearproducto', roleMiddleware, adminController.create);
router.post('/crearproducto', roleMiddleware, upload.single('imagen'), newProductValidation, adminController.save);

//Detalle de los Productos
router.get('/detalleproducto/:id', roleMiddleware, adminController.show);

//Editar Producto
router.get('/editarproducto/:id', roleMiddleware, adminController.edit);
router.put('/editarproducto/:id', roleMiddleware, upload.single('imagen'), editProductValidation, adminController.update);

//Borrar Producto
router.get('/borrarproducto/:id', roleMiddleware, adminController.destroy);

module.exports = router;