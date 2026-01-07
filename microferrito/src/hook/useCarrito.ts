import { useEffect, useState } from "react";
import axios from "axios";
import { environments } from "../environments/environments";

const API_URL = `${environments.apiUrl}/carrito`;

export function useCarrito(usuario_id: number, email: string) {
  const [carrito, setCarrito] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const cargarCarrito = async () => {
    setLoading(true);
    const res = await axios.get(`${API_URL}/orcrear/${email}`);
    const detalle = await axios.get(
      `${environments.apiUrl}/detallecarrito/carrito/${res.data.id_carrito}`
    );

    setCarrito({
      ...res.data,
      detalle: detalle.data,
    });

    setLoading(false);
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
