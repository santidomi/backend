
const Contenedor = require("./classContenedor");
const fs = require("fs");
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

const contenedor = new Contenedor('productos.txt');

app.get('/', (req, res) => {
    res.send("Para buscar todos los productos disponible ingrese: localhost:8080/productos. Para seleccionar un producto al azar ingrese: /productoRandom")
  });

app.get('/productos', async(req, res) => {
    const productos = await contenedor.getAll();

    res.send(productos);
})

app.get('/productoRandom', async(req, res) => {
    const maxId = 4;
    const numRandom = Math.floor(Math.random() * maxId);
    const productos = await contenedor.getById(numRandom);
    res.send(productos);
  })

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})