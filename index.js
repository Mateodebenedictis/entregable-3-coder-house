const bodyParser = require('body-parser');
const Contenedor = require('./contenedor');
const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 8080;
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
const contenedor = new Contenedor('./productos.txt');
app.get('/productos', async (req, res) => {

    const productos = await contenedor.getAll();
    res.json(productos);
});
app.get('/productoRandom', async (req, res) => {

    const productos = await contenedor.getAll();
    const random = Math.floor(Math.random() * productos.length);
    res.json(productos[random]);
});
const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
server.on("error", error => console.log(`Error en servidor ${error}`));
