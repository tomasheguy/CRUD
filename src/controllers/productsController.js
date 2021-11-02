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
		res.body
		res.render('product-create-form'); //
	},
	
	// Create -  Method to store
	store: (req, res) => {

		const nuevoProducto = {
		
			id : products[products.length-1].id + 1, // le crea un id 1 mas alto que el del ultimo
			...req.body, // le agrega todo lo del formulario excepto el file
			image: req.file? req.file.filename : '' //le agrega el file que uploade
			};
		
		products.push(nuevoProducto);

		fs.writeFileSync(productsFilePath,JSON.stringify(products,null,' '));
		

		res.redirect('/');
		
		//res.send('se creo producto');
	},

	// Update - Form to edit
	edit: (req, res) => {
		// solo falta auto completar los campos
		const productToEdit = products.find((prod) => prod.id == req.params.id);
		res.render('product-edit-form',{productToEdit,toThousand}); //recibe respueta del formulario
	},
	// Update - Method to update
	update: (req, res) => {
		const productIndex = products.findIndex((producto)=>{
			return (producto.id == req.params.id)
			
		});

		const productoEditado = {
			id: products[productIndex].id,
			
			...req.body, // le agrega todo lo del formulario excepto el file
			image: req.file? req.file.filename : products[productIndex].image //le agrega el file que uploade, si lo hice, sino mantengo el anterior
			};
		
			products[productIndex] = productoEditado;

			fs.writeFileSync(productsFilePath,JSON.stringify(products,null,' '));
		

			res.redirect('/');
		
		
		
		
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {

		

		const productIndex = products.findIndex((producto)=>{
			return (producto.id == req.params.id)
			
		});
			
		// buscar el producto con ese id	
		
		products.splice(productIndex,1);

		fs.writeFileSync(productsFilePath,JSON.stringify(products,null,' '));
		

		res.redirect('/')
		
		
	}
};

module.exports = controller;