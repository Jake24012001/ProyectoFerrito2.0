import { useCarrito } from "../hook/useCarrito";
import { procederPago } from "../services/facturaServices";

export default function Carrito() {
  const usuario_id = Number(localStorage.getItem("usuario_id"));
  const email = localStorage.getItem("email") || "";

  const { carrito, loading, cambiarCantidad, eliminar } =
    useCarrito(usuario_id, email);

  if (loading) return <p>Cargando carrito...</p>;
  if (!carrito) return <p>No hay carrito</p>;

  const total = carrito.detalle.reduce(
    (sum: number, item: any) => sum + item.precio * item.cantidad,
    0
  );

  return (
    <div className="container mt-4">
      <h2>🛒 Mi Carrito</h2>

      {carrito.detalle.length === 0 && <p>No tienes productos</p>}

      {carrito.detalle.map((item: any) => (
        <div className="card mb-3" key={item.id_detalle}>
          <div className="row align-items-center">
            <div className="col-md-2">
              <img src={item.imagen_url} className="img-fluid" />
            </div>

            <div className="col-md-4">
              <h5>{item.nombre}</h5>
              <p>${item.precio}</p>
            </div>

            <div className="col-md-3">
              <input
                type="number"
                min="1"
                max={item.stock}
                value={item.cantidad}
                onChange={(e) =>
                  cambiarCantidad(item.id_detalle, Number(e.target.value))
                }
                className="form-control"
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

      <h4>Total: ${total.toFixed(2)}</h4>

      <button
        className="btn btn-success"
        onClick={() => procederPago(usuario_id, total)}
      >
        Proceder al pago
      </button>
    </div>
  );
}
