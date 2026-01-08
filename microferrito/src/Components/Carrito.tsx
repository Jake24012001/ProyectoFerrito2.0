import { useCarrito } from "../hook/useCarrito";
import { procederPago } from "../services/facturaServices";

export default function Carrito() {
  const email = localStorage.getItem("email") || "";
  const usuario_id = Number(localStorage.getItem("usuario_id"));

  // ✅ Pasar ambos parámetros: usuario_id y email
  const { carrito, loading, cambiarCantidad, eliminar } = useCarrito(usuario_id, email);

  if (loading) return <p>⏳ Cargando carrito...</p>;
  if (!carrito) return <p>No hay carrito activo</p>;

  const total = carrito.detalle.reduce(
    (sum: number, item: any) => sum + item.precio * item.cantidad,
    0
  );

  return (
    <div className="container mt-4">
      <h2>🛒 Mi Carrito</h2>

      {carrito.detalle.length === 0 && (
        <p>No tienes productos en el carrito</p>
      )}

      {carrito.detalle.map((item: any) => (
        <div className="card mb-3" key={item.id_detalle}>
          <div className="row align-items-center p-2">
            <div className="col-md-2">
              <img
                src={item.imagen_url}
                className="img-fluid rounded"
                alt={item.nombre}
              />
            </div>

            <div className="col-md-4">
              <h5>{item.nombre}</h5>
              <p>${item.precio}</p>
            </div>

            <div className="col-md-3">
              <input
                type="number"
                min={1}
                max={item.stock}
                value={item.cantidad}
                className="form-control"
                onChange={(e) =>
                  cambiarCantidad(item.id_detalle, Number(e.target.value))
                }
              />
            </div>

            <div className="col-md-3">
              <button
                className="btn btn-danger"
                onClick={() => eliminar(item.id_detalle)}
              >
                ❌ Quitar
              </button>
            </div>
          </div>
        </div>
      ))}

      <h4 className="mt-3">Total: ${total.toFixed(2)}</h4>

      <button
        className="btn btn-success mt-2"
        onClick={() => procederPago(usuario_id, total)}
      >
        Proceder al pago
      </button>
    </div>
  );
}