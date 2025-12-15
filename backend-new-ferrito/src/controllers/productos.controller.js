const productosService = require('../services/productos.service');

// 🔍 Obtener todas las productos
async function obtenerproductos(req, res) {
  try {
    const productos= await productosService.obtenerproductos();
    res.status(200).json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error.message);
    res.status(500).json({ message: 'Error al obtener productos' });
  }
}
// 🔍 Obtener Producto por subcategoria
async function obtenerProductoSubcategoria(req, res) {
  try {
    const subcategoria_id= parseInt(req.params.subcategoria_id);
    const productos = await productosService.obtenerProductosSub(subcategoria_id);
    res.status(200).json(productos);
  } catch (error) {
    console.error('Error al obtener producto por subcategoria:', error.message);
    res.status(500).json({ message: 'Error al obtener producto por subcategoria' });
  }
}

// 🆕 Crear nuevo productos
async function crearproductos(req, res) {
  try {
    const {
        nombre,
        marca_id,
        categoria_id,
        subcategoria_id,
        precio, valoracion,
        fecha_creacion,
        estado,
        imagen_url,
        stock
    } = req.body;

    const nuevoProducto= await productosService.crearproductos({
        nombre,
        marca_id,
        categoria_id,
        subcategoria_id,
        precio, valoracion,
        fecha_creacion,
        estado,
        imagen_url,
        stock
    });

    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error('Error al crear Producto:', error.message);
    res.status(500).json({ message: 'Error al crear Producto' });
  }
}

// ✏️ Modificar Producto
async function modificarProducto(req, res) {
  try {
    const id_producto = parseInt(req.params.id_producto);
    const {
        nombre,
        marca_id,
        categoria_id,
        subcategoria_id,
        precio, valoracion,
        fecha_creacion,
        estado,
        imagen_url,
        stock
    } = req.body;

    const ProductoActualizada = await productosService.modificarproductos({
        id_producto,
        nombre,
        marca_id,
        categoria_id,
        subcategoria_id,
        precio, valoracion,
        fecha_creacion,
        estado,
        imagen_url,
        stock
    });

    res.status(200).json(ProductoActualizada);
  } catch (error) {
    console.error('Error al modificar Producto:', error.message);
    res.status(500).json({ message: 'Error al modificar Producto' });
  }
}

// ❌ Eliminar Producto
async function eliminarProducto(req, res) {
  try {
    const id_producto = parseInt(req.params.id_producto);
    const resultado = await productosService.eliminarproductos(id_producto);
    res.status(200).json({ message: 'Eliminar Producto correctamente', resultado });
  } catch (error) {
    console.error('Error al eliminar Producto:', error.message);
    res.status(500).json({ message: 'Error al eliminar Producto' });
  }
}

module.exports = {
  obtenerproductos,
  obtenerProductoSubcategoria,
  crearproductos,
  modificarProducto,
  eliminarProducto
};