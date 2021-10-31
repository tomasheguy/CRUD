const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		// new array w products que cumplen con condicion visited
		const productsVisited = products.filter((prod) =>  prod.category === "visited");
		const productsOnSale = products.filter((prod) =>  prod.category === "in-sale");
		res.render('index',{productsVisited,productsOnSale, toThousand}); // faltar filtrarlos por un lado en oferta y visitados x otro
	},
	search: (req, res) => {
		res.render('results',{products, toThousand}); // mandamos todos los productos para despues filtrarlos
	},
};

module.exports = controller;
