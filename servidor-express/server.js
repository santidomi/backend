const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const path = require("path");

// APP USES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
const viewsFolder = path.join(__dirname, "views");

// Inicializando motor de plantillas
app.engine("handlebars", handlebars.engine());
console.log(viewsFolder);

// Ejecutar el servidor
app.listen(8080, (req, res) => {
	console.log("Servidor desplegado en el puerto 8080");
});

// Donde tengo las vistas de mi proyecto
app.set("views", viewsFolder);

// Que motor de plantillas voy a utilizar
app.set("view engine", "handlebars");

// Lista de productos
let PRODUCTOS = [
	{
		name: "Agua mineral",
		price: 19,
		thumbnail: "https://i.postimg.cc/2Ss3K8xK/agua.jpg",
		id: 1,
	},
	{
		name: "Coca Cola sin azucar",
		price: 21,
		thumbnail: "https://i.postimg.cc/B6DzBNnz/coca-zero.webp",
		id: 2,
	},
	{
		name: "Agua saborizada de pomelo",
		price: 20,
		thumbnail:
			"https://i.postimg.cc/X7Fvy0WK/7790895640490-02-nuevopack.webp",
		id: 3,
	},
];

app.get("/", (req, res) => {
	console.log("Req recibida");
	res.render("home"); // Primer parametro: Nombre de la vista a mostrart
});

app.get("/productos", (req, res) => {
	res.render("productos", {
		productos: PRODUCTOS,
	});
});

app.post("/productos", async (req, res) => {
	const item = await req.body;
	const yaIngresado = PRODUCTOS.some((el) => el.name === item.name);
	if (yaIngresado) {
		console.log("Ya existe");
	} else {
		PRODUCTOS.push({
			...item,
			price: parseInt(item.price),
			id:
				PRODUCTOS.length > 0
					? PRODUCTOS[PRODUCTOS.length - 1].id + 1
					: PRODUCTOS.length + 1,
		});
		console.log(PRODUCTOS);
		res.redirect("/");
	}
});
