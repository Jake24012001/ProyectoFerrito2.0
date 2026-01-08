import { useEffect, useState } from "react";
import axios from "axios";
import { environments } from "../environments/environments";

const API_URL = `${environments.apiUrl}/carrito`;

export function useCarrito(usuario_id: number, email: string) {
  const [carrito, setCarrito] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const cargarCarrito = async () => {
    try {
      setLoading(true);

      // ✅ RUTA CORRECTA + MÉTODO CORRECTO
      const res = await axios.post(`${API_URL}/obtener-o-crear`, {
        usuario_id,
        email,
      });

      // ✅ obtener detalle
      const detalle = await axios.get(
        `${environments.apiUrl}/detallecarrito/carrito/${res.data.id_carrito}`
      );

      setCarrito({
        ...res.data,
        detalle: detalle.data,
      });
    } catch (error) {
      console.error("❌ Error cargando carrito:", error);
      setCarrito(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email && usuario_id) {
      cargarCarrito();
    }
  }, [email, usuario_id]);

  const cambiarCantidad = async (id_detalle: number, cantidad: number) => {
    await axios.put(`${API_URL}/producto/${id_detalle}`, { cantidad });
    cargarCarrito();
  };

  const eliminar = async (id_detalle: number) => {
    await axios.delete(`${API_URL}/producto/${id_detalle}`);
    cargarCarrito();
  };

  return { carrito, loading, cambiarCantidad, eliminar };
}
