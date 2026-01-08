import { useEffect, useState, useCallback } from "react";
import {
  obtenerOCrearCarrito,
  actualizarCantidad as actualizarCantidadService,
  eliminarProducto as eliminarProductoService,
} from "../services/carritoServices";
// Importamos ambas para asegurar que el tipado sea exacto
import { carrito } from "../interfaces/carrrito"; 

export function useCarrito(usuario_id: number | null) {
  // ✅ El estado ahora sabe que 'carrito' tiene una lista de 'detalle'
  const [carrito, setCarrito] = useState<carrito | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const cargarCarrito = useCallback(async () => {
    // Validación de seguridad: si no hay usuario, no pedimos nada
    if (!usuario_id || isNaN(usuario_id)) {
        setLoading(false);
        return;
    };

    try {
      setLoading(true);
      setError(null);
      
      // La API devuelve el objeto carrito que ya contiene el array 'detalle'
      const data = await obtenerOCrearCarrito(usuario_id);
      setCarrito(data);
    } catch (err: any) {
      console.error("❌ Error cargando carrito:", err);
      setError("No se pudo cargar el carrito.");
      setCarrito(null);
    } finally {
      setLoading(false);
    }
  }, [usuario_id]);

  useEffect(() => {
    cargarCarrito();
  }, [cargarCarrito]);

  // ✏️ Cambiar cantidad
  const cambiarCantidad = async (id_detalle: number, cantidad: number) => {
    if (cantidad < 1) return; // Validación mínima en el cliente
    try {
      await actualizarCantidadService(id_detalle, cantidad);
      await cargarCarrito(); // 🔄 Re-fresca la data para ver el nuevo subtotal y total
    } catch (err) {
      console.error("❌ Error actualizando cantidad:", err);
    }
  };

  // ❌ Eliminar producto
  const eliminar = async (id_detalle: number) => {
    if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;

    try {
      await eliminarProductoService(id_detalle);
      await cargarCarrito(); // 🔄 Re-fresca para que el producto desaparezca de la lista
    } catch (err) {
      console.error("❌ Error eliminando producto:", err);
    }
  };

  return {
    carrito,          // Objeto con: id_carrito, usuario_id, detalle[]
    detalles: carrito?.detalle || [], // Acceso directo opcional para facilitar el .map()
    loading,
    error,
    cambiarCantidad,
    eliminar,
    refrescar: cargarCarrito,
  };
}