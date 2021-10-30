// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/', productsController.store); // porque con / ya estamos en /products


/*** GET ONE PRODUCT ***/ 
router.get('/:id/', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/id', productsController.edit); 
router.put('/id', productsController.update); // los datos del formulario vienen por body


/*** DELETE ONE PRODUCT***/ 
router.delete('/id', productsController.destroy); 


module.exports = router;
