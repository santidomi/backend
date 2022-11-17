const express = require("express");
const app = express();
// const pug = require("pug");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
const viewsFolder = path.join(__dirname, "views");

app.listen(8080, () => {
	console.log("Servidor escuchando en el puerto 8080");
});

//Configurando el motor de plantillas (No se necesita app.engine)
app.set("views", viewsFolder); // Donde están las vistas
app.set("view engine", "pug"); // Que motor de vistas uso

/* Array de productos */
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

//Configuración de rutas
app.get("/", (req, res) => {
	console.log("req recibida");
	res.render("welcome");
});

app.get("/home", (req, res) => {
	res.render("welcome", {
		message: "Curso backend",
	});
});

app.post("/productos", async (req, res) => {
	const item = await req.body;
	const yaIngresado = PRODUCTOS.some((el) => el.name === item.name);
	if (yaIngresado) {
		console.log("Producto ya existente")
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
		res.redirect("/")
	}
});

app.get("/productos", (req, res) => {
	res.render("productos", {productos: PRODUCTOS });
});
