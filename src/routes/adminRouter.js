const express = require ("express");
const router = express.Router ();
const path = require ("path");
const multer = require('multer');

const adminController = require(path.resolve(__dirname,"../controllers/adminController.js")) 

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '../../public/img/products'));
    },
    filename: function (req, file, cb) {
      cb(null, 'product-'+Date.now()+path.extname(file.originalname))
    }
  })
   
  const upload = multer({ storage })

router.get ("/", adminController.admin);
router.get('/admin/newProduct', adminController.create);
router.get('/admin/newProduct', upload.single('imagenEdit'), adminController.save);
router.get('/admin/detailProduct/:id', adminController.show);
router.get('/admin/editProduct/:id', adminController.edit);
router.put('/admin/editProduct/:id', upload.single('imagenEdit'), adminController.update);
router.get('/admin/delete/:id', adminController.destroy);

module.exports = router;