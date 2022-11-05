const express = require("express");
const { Router } = express;
const app = express();
const routerProductos = Router();
const port = process.env.PORT || 8080;
const Contenedor = require("./contenedor");
const contenedor = new Contenedor();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});

app.use("/api/productos", routerProductos);
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/formulario", (req, res) => {
  const { body } = req;
  contenedor.save(body);
  res.json("Formulario recibido correctamente");
});

routerProductos.get("/", async (req, res) => {
  const todos = await contenedor.getAll();
  res.json(todos);
});

routerProductos.get("/:id", async (req, res) => {
  const { id } = req.params;
  const productoEncontrado = await contenedor.getById(id);
  if (productoEncontrado) {
    res.json(productoEncontrado);
  } else {
    res.json({ error: "no se encuentra el producto" });
  }
});

routerProductos.post("/", async (req, res) => {
  const { body } = req;
  await contenedor.save(body);
  res.json({ success: "producto agregado correctamente" });
});

routerProductos.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { title, price, thumbnail } = req.body;
    await contenedor.updateById(id, title, price, thumbnail);
    res.json("producto actualizado");
  } catch (error) {
    res.json({ error: "producto no encontrado" });
  }
});

routerProductos.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await contenedor.deleteById(id);
  res.json("producto borrado");
});
