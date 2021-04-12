const express = require ("express");
const router = express.Router ();
const path = require ("path");
const multer = require('multer');

const adminController = require(path.resolve(__dirname,"../controllers/adminController.js"))

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

router.get ("/", adminController.admin);
router.get('/crearproducto', adminController.create);
router.post('/crearproducto', upload.single('imagen'), adminController.save);
router.get('/detalleproducto/:id', adminController.show);
router.get('/editarproducto/:id', adminController.edit);
router.put('/editarproducto/:id', upload.single('imagen'), adminController.update);
router.get('/borrarproducto/:id', adminController.destroy);
router.get('/detalleproducto/:id', adminController.findProduct);

module.exports = router;