import { useCarrito } from '../hooks/useCarrito';
import { detallecarrito } from '../interfaces/detallecarrito';


export default function Carrito() {
  const usuario_id = Number(localStorage.getItem('usuario_id'));
  const email = localStorage.getItem('email') || '';

  const {
    carrito,
    loading,
    cambiarCantidad,
    eliminar
  } = useCarrito(usuario_id, email);

  if (loading) return <p>Cargando carrito...</p>;

  const total =
  carrito?.detalle.reduce(
    (sum: number, item: detallecarrito) =>
      sum + item.producto_id * item.cantidad,
    0
  ) ?? 0;


  return (
    <div className="container mt-4">
      <h2>🛒 Mi Carrito</h2>

      {carrito?.detalle.length === 0 && (
        <p>No tienes productos en el carrito</p>
      )}

      {carrito?.detalle.map(item => (
        <div className="card mb-3" key={item.id_detalle}>
          <div className="row g-0 align-items-center">
            <div className="col-md-2">
              <img
                src={item.imagen_url}
                className="img-fluid"
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
                min="1"
                max={item.stock}
                value={item.cantidad}
                onChange={e =>
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

      <h4>Total: ${total}</h4>

      <button className="btn btn-success mt-3">
        Proceder al pago
      </button>
    </div>
  );
}
