import { useEffect, useState } from "react";
import axios from "axios";
import { environments } from "../environments/environments";
import { CarritoConDetalle } from "../interfaces/carritoConDetalle";

const API_URL = `${environments.apiUrl}/carrito`;

export function useCarrito(email: string) {
  const [carrito, setCarrito] = useState<CarritoConDetalle | null>(null);
  const [loading, setLoading] = useState(true);

  const cargarCarrito = async () => {
    try {
      setLoading(true);

      // 1️⃣ Obtener o crear carrito
      const carritoRes = await axios.get(`${API_URL}/orcrear/${email}`);

      // 2️⃣ Obtener detalle del carrito
      const detalleRes = await axios.get(
        `${environments.apiUrl}/detallecarrito/carrito/${carritoRes.data.id_carrito}`
      );

      // 3️⃣ Unir carrito + detalle
      setCarrito({
        ...carritoRes.data,
        detalle: detalleRes.data,
      });
    } catch (error) {
      console.error("Error cargando carrito:", error);
      setCarrito(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email) cargarCarrito();
  }, [email]);

  const cambiarCantidad = async (id_detalle: number, cantidad: number) => {
    await axios.put(`${API_URL}/cantidad/${id_detalle}`, { cantidad });
    cargarCarrito();
  };

  const eliminar = async (id_detalle: number) => {
    await axios.delete(`${API_URL}/${id_detalle}`);
    cargarCarrito();
  };

  return { carrito, loading, cambiarCantidad, eliminar };
}
