import { useEffect, useState, useCallback } from "react";
import { 
  obtenerOCrearCarrito, // Usando el servicio que tipamos antes
  actualizarCantidad as actualizarCantidadService, 
  eliminarProducto as eliminarProductoService 
} from "../services/carritoServices";
import { carrito } from "../interfaces/carrrito";

export function useCarrito(usuario_id: number) {
  // ✅ Tipamos el estado con la interfaz 'carrito' o null
  const [carrito, setCarrito] = useState<carrito | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Usamos useCallback para que la función no se recree en cada render
  const cargarCarrito = useCallback(async () => {
    if (!usuario_id) return;
    
    try {
      setLoading(true);
      setError(null);
      // 🔹 Usamos el servicio tipado
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

  // Efetco para carga inicial
  useEffect(() => {
    cargarCarrito();
  }, [cargarCarrito]);

  // ✏️ Cambiar cantidad de producto
  const cambiarCantidad = async (id_detalle: number, cantidad: number) => {
    try {
      await actualizarCantidadService(id_detalle, cantidad);
      await cargarCarrito(); // Refrescar datos
    } catch (err) {
      console.error("❌ Error actualizando cantidad:", err);
    }
  };

  // ❌ Eliminar producto del carrito
  const eliminar = async (id_detalle: number) => {
    if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;
    
    try {
      await eliminarProductoService(id_detalle);
      await cargarCarrito(); // Refrescar datos
    } catch (err) {
      console.error("❌ Error eliminando producto:", err);
    }
  };

  return { 
    carrito, 
    loading, 
    error, 
    cambiarCantidad, 
    eliminar, 
    refrescar: cargarCarrito 
  };
}