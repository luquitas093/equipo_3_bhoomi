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
router.get('/crear', adminController.create);
router.get('/crear', upload.single('imagen'), adminController.save);
router.get('/admin/detailProduct/:id', adminController.show);
router.get('/admin/editProduct/:id', adminController.edit);
router.put('/admin/editProduct/:id', upload.single('imagenEdit'), adminController.update);
router.get('/admin/delete/:id', adminController.destroy);

module.exports = router;