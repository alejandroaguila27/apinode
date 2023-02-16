const express = require('express');
const app = express();
app.use(express.json());

const productos = [
    { id: 1, nombre: 'Producto 1', precio: 10 },
    { id: 2, nombre: 'Producto 2', precio: 20 },
    { id: 3, nombre: 'Producto 3', precio: 30 }
  ];

// Obtener todos los productos
const obtenerProductos = (req, res) => {
    res.json(productos);
  };
  
  // Obtener un producto por ID
  const obtenerProductoPorId = (req, res) => {
    const id = parseInt(req.params.id);
    const producto = productos.find(p => p.id === id);
    if (producto) {
      res.json(producto);
    } else {
      res.status(404).send('Producto no encontrado');
    }
  };
  
  // Crear un nuevo producto
  const crearProducto = (req, res) => {
    const { nombre, precio } = req.body;
    const id = productos.length + 1;
    const nuevoProducto = { id, nombre, precio };
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
  };
  
  // Actualizar un producto existente
  const actualizarProducto = (req, res) => {
    const id = parseInt(req.params.id);
    const productoIndex = productos.findIndex(p => p.id === id);
    if (productoIndex !== -1) {
      const { nombre, precio } = req.body;
      productos[productoIndex].nombre = nombre;
      productos[productoIndex].precio = precio;
      res.json(productos[productoIndex]);
    } else {
      res.status(404).send('Producto no encontrado');
    }
  };
  
  // Eliminar un producto existente
  const eliminarProducto = (req, res) => {
    const id = parseInt(req.params.id);
    const productoIndex = productos.findIndex(p => p.id === id);
    if (productoIndex !== -1) {
      productos.splice(productoIndex, 1);
      res.send('Producto eliminado');
    } else {
      res.status(404).send('Producto no encontrado');
    }
  };

  
  app.get('/productos', obtenerProductos);
  app.get('/productos/:id', obtenerProductoPorId);
  app.post('/productos', crearProducto);
  app.put('/productos/:id', actualizarProducto);
  app.delete('/productos/:id', eliminarProducto);
  
  app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
  });