const fs = require("fs");
const { arch } = require("os");

class Contenedor {
	productos = [
		{
			name: "Agua mineral",
			price: 19,
			thumbnail: "https://i.postimg.cc/76b2Ld3b/coca-cola.png",
			id: 1,
		},
		{
			name: "Coca Cola sin azucar (zero)",
			price: 21,
			thumbnail: "https://i.postimg.cc/76b2Ld3b/coca-cola.png",
			id: 2,
		},
	];

	readFile() {
		const archivo = JSON.parse(
			fs.readFileSync(__dirname + "/chat/chat.txt", "utf-8")
		);
		if (archivo) {
			return archivo;
		} else {
			return [];
		}
	}
	messages = this.readFile();

	writeChat() {
		fs.writeFileSync(
			__dirname + "/chat/chat.txt",
			JSON.stringify(this.messages, null, 2)
		);
	}
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
				this.productos.push({
					...product,
					id:
						this.productos.length > 0
							? this.productos[this.productos.length - 1].id + 1
							: this.productos.length + 1,
				});
				return "Product added correctly";
			} else {
				return "Producto incorrecto";
			}
		} else {
			return "Already exits";
		}
	}

	addMessage(message) {
		if (message.text != "") {
			this.messages.push(message);
			this.writeChat();
		} else {
			return;
		}
	}
}

module.exports = Contenedor;
