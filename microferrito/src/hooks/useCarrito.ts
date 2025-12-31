import { useEffect, useState } from 'react';
import { Carrito } from '../interfaces/carrito';
import * as carritoService from '../services/carritoService';

export function useCarrito(usuario_id: number, email: string) {
  const [carrito, setCarrito] = useState<Carrito | null>(null);
  const [loading, setLoading] = useState(true);

  const cargarCarrito = async () => {
    setLoading(true);
    const data = await carritoService.obtenerCarrito(usuario_id, email);
    setCarrito(data);
    setLoading(false);
  };

  const agregarProducto = async (producto_id: number, cantidad = 1) => {
    await carritoService.agregarProductoCarrito({
      usuario_id,
      email,
      producto_id,
      cantidad
    });
    await cargarCarrito();
  };

  const cambiarCantidad = async (id_detalle: number, cantidad: number) => {
    await carritoService.actualizarCantidad(id_detalle, cantidad);
    await cargarCarrito();
  };

  const eliminar = async (id_detalle: number) => {
    await carritoService.eliminarProducto(id_detalle);
    await cargarCarrito();
  };

  useEffect(() => {
    if (usuario_id && email) {
      cargarCarrito();
    }
  }, [usuario_id, email]);

  return {
    carrito,
    loading,
    agregarProducto,
    cambiarCantidad,
    eliminar
  };
}
