const express = require("express");
const handlebars = require("express-handlebars");
const { Server } = require("socket.io");
const app = express();
const path = require("path");
const Contenedor = require("./clase-contenedor/clase");
const { measureMemory } = require("vm");

const productContainer = new Contenedor();
// APP USES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
const viewsFolder = path.join(__dirname, "views");

// Inicializando motor de plantillas
app.engine("handlebars", handlebars.engine());

// Donde tengo las vistas de mi proyecto
app.set("views", viewsFolder);

// Que motor de plantillas voy a utilizar
app.set("view engine", "handlebars");

const server = app.listen(8080, () => {
	console.log("Server listening on port 8080");
	productContainer.getProducts();
	productContainer.setMessages();
});

// Creación servidor websocker
const io = new Server(server); // Conectamos el websocket con el servidor principal de Express.

app.get("/", (req, res) => {
	res.render("home"); // Primer parametro: Nombre de la vista a mostrart
});

io.on("connection", (socket) => {
	console.log("Nuevo cliente conectado");
	socket.emit("productos", productContainer.productos);
	socket.emit("messages", productContainer.messages);

	socket.on("newProduct", (data) => {
		const message = productContainer.addProduct(data);
		console.log(message);
		productContainer.getProducts();
		setTimeout(() => {
			io.sockets.emit("productos", productContainer.productos);
		}, 1000);
	});

	socket.on("newMessage", (data) => {
		productContainer.addMessage(data);
		io.sockets.emit("messages", productContainer.messages);
	});
});

/*
LINK FOTO PARA HACER MAS RAPIDO

https://i.postimg.cc/76b2Ld3b/coca-cola.png

*/
