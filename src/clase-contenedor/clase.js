const fs = require("fs");
const { default: knex } = require("knex");
const { mariaDBOptions } = require("../mariaDb.js");
const { sqliteOptions } = require("../sqlite.js");
const knexProducts = require("knex")(mariaDBOptions);
const knexChat = require("knex")(sqliteOptions);
class Contenedor {
	constructor() {
		this.productos = [];
		this.messages = [];
	}
	getProducts() {
		knexProducts
			.from("products")
			.select("*")
			.then((rows) => {
				this.productos =
					rows.map((el) => {
						return {
							id: el.id,
							name: el.name,
							thumbnail: el.thumbnail,
							price: el.price,
						};
						A;
					}) || [];
			});
		// .finally(() => knexProducts.destroy());
		return;
	}

	addProductToDb(producto) {
		knexProducts("products")
			.insert(producto)
			.then((res) => {
				console.log("producto agregado correctamente");
			})
			.finally(() => {
				this.getProducts();
				return "Producto agregado con exito";
			});
		/* 			.finally(() => {
				knexProducts.destroy();
			}); */
	}
	async setMessages() {
		const results = await knexChat("chat").select("*");
		const chatMessages = await results.map((elm) => ({ ...elm }));
		console.log(chatMessages);
		this.messages = await chatMessages;
	}

	/* 	writeChat() {
		fs.writeFileSync(
			__dirname + "/chat/chat.txt",
			JSON.stringify(this.messages, null, 2)
		);
	} */
	getAll() {
		return this.productos;
	}

	addProduct(product) {
		const itExists = this.productos.some(
			(prod) => prod.name === product.name
		);
		if (!itExists) {
			if (
				product.name != "" &&
				product.price != "" &&
				product.thumbnail != ""
			) {
				const producto = {
					name: product.name,
					thumbnail: product.thumbnail,
					price: parseInt(product.price),
				};
				this.addProductToDb(producto);
				this.getProducts();
			} else {
				return "Producto incorrecto";
			}
		} else {
			return "Already exits";
		}
	}
	addMessageToDb(message) {
		knexChat("chat")
			.insert(message)
			.then(() => {
				console.log("Mensaje enviado a la base de datos");
			});
	}
	addMessage(message) {
		if (message.text != "") {
			this.messages.push(message);
			this.addMessageToDb(message);
		} else {
			return;
		}
	}
}

module.exports = Contenedor;
