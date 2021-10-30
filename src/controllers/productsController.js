const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));// pasa el json a un array

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', {products,toThousand}); //le paso el objeto products como parametro
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const product = products.find((prod) => prod.id == req.params.id);
		res.render('detail',{product,toThousand});
	},

	// Create - Form to create
	create: (req, res) => {
		
		res.render('product-create-form'); //
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const nuevoProducto = req.body;
		res.send(nuevoProducto); //no estoy muy seguro de esto
		res.send('se creo producto');
	},

	// Update - Form to edit
	edit: (req, res) => {
		// solo falta auto completar los campos
		const productToEdit = products.find((prod) => prod.id == req.params.id);
		res.render('product-edit-form',{productToEdit,toThousand}); //recibe respueta del formulario
	},
	// Update - Method to update
	update: (req, res) => {
		const editedProduct = req.body;
		res.send(editedProduct); //no estoy muy seguro de esto
		res.send('se actualizo el producto');
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		
		res.send('se borro el producto ' + req.params.id);
	}
};

module.exports = controller;