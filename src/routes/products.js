// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer'); // require multer
const path = require('path');

var storage = multer.diskStorage({  // configuramos storage con destination y filename
    destination: (req, file, cb)=>{
        cb(null, 'public/images/products')
    },
    filename: (req, file,cb)=>{
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        );
    }
});
const upload = multer({storage: storage}); // generar middleware upload

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/', upload.single('foto'),productsController.store); // porque con / ya estamos en /products


/*** GET ONE PRODUCT ***/ 
router.get('/:id/', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/:id', upload.single('foto'), productsController.update); // los datos del formulario vienen por body


/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productsController.destroy); 


module.exports = router;
