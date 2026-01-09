import { useEffect, useState, useCallback } from "react";
import { obtenerOCrearCarrito, actualizarCantidad, eliminarProducto } from "../services/carritoServices";

export function useCarrito(id_recibido: any) {
  const [carrito, setCarrito] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const procesarIdUsuario = useCallback(() => {
    if (!id_recibido) return null;
    if (typeof id_recibido === 'object') return Number(id_recibido.backend2 || id_recibido.id_usuario);
    if (typeof id_recibido === 'string' && id_recibido.includes('{')) {
      try {
        const parsed = JSON.parse(id_recibido);
        return Number(parsed.backend2 || parsed.id_usuario);
      } catch { return null; }
    }
    return isNaN(Number(id_recibido)) ? null : Number(id_recibido);
  }, [id_recibido]);

  const cargarCarrito = useCallback(async () => {
    const userId = procesarIdUsuario();
    if (!userId) { setLoading(false); return; }

    try {
      setLoading(true);
      const data = await obtenerOCrearCarrito(userId);
      console.log("📦 Carrito cargado correctamente:", data);
      setCarrito(data);
    } catch (err: any) {
      console.error("❌ Error al cargar carrito:", err);
      setError(err.response?.status === 404 ? "Endpoint no encontrado en el servidor" : "Error al cargar el carrito");
    } finally {
      setLoading(false);
    }
  }, [procesarIdUsuario]);

  useEffect(() => { cargarCarrito(); }, [cargarCarrito]);

  return {
    carrito,
    // Busca la lista sin importar cómo la nombre la base de datos (plural, singular o alias)
    detalles: carrito?.detalles || carrito?.detalle_carritos || carrito?.DetalleCarritos || carrito?.detalle || [],
    loading,
    error,
    cambiarCantidad: async (id: number, cant: number) => {
      await actualizarCantidad(id, cant);
      await cargarCarrito();
    },
    eliminar: async (id: number) => {
      if (window.confirm("¿Eliminar producto?")) {
        await eliminarProducto(id);
        await cargarCarrito();
      }
    }
  };
}