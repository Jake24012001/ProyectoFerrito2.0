import { useCarrito } from "../hook/useCarrito";
import { procederPago } from "../services/facturaServices"; // Importante para la acción final

// No necesitas importar las interfaces aquí si el Hook ya las devuelve tipadas, 
// pero es bueno tenerlas presentes.

export default function Carrito() {
  // 1. Obtenemos el ID del usuario desde el almacenamiento local
  const usuario_id = Number(localStorage.getItem("usuario_id"));

  // 2. Extraemos las funciones y datos del Hook
  // 'detalles' ahora contiene la información del producto anidada
  const { detalles, loading, error, cambiarCantidad, eliminar } = useCarrito(usuario_id);

  // 3. Cálculo del total dinámico
  // Accedemos a item.producto.precio porque la interfaz está relacionada
  const total = detalles.reduce(
    (acc, item) => acc + (item.producto.precio * item.cantidad),
    0
  );

  // 4. Manejo de estados de carga y error
  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Cargando productos del carrito...</p>
      </div>
    );
  }

  if (error) {
    return <div className="container mt-5 alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🛒 Tu Carrito de Compras</h2>

      {/* 5. Verificación de carrito vacío */}
      {detalles.length === 0 ? (
        <div className="alert alert-warning text-center">
          Tu carrito está vacío actualmente.
        </div>
      ) : (
        <>
          {/* 6. Mapeo de los detalles (con info de producto anidada) */}
          {detalles.map((item) => (
            <div key={item.id_detalle} className="card mb-3 p-3 shadow-sm">
              <div className="row align-items-center">
                
                {/* Imagen del Producto */}
                <div className="col-md-2 col-4">
                  <img 
                    src={item.producto.imagen_url || 'https://via.placeholder.com/150'} 
                    alt={item.producto.nombre} 
                    className="img-fluid rounded" 
                  />
                </div>
                
                {/* Nombre y Precio Unitario */}
                <div className="col-md-4 col-8">
                  <h5 className="mb-1">{item.producto.nombre}</h5>
                  <p className="text-muted mb-0">
                    Unitario: ${item.producto.precio.toFixed(2)}
                  </p>
                </div>

                {/* Cantidad (Input) */}
                <div className="col-md-2 col-6 mt-3 mt-md-0">
                  <label className="form-label small">Cantidad</label>
                  <input 
                    type="number" 
                    className="form-control"
                    min="1"
                    max={item.producto.stock} // Evita que compren más de lo que hay
                    value={item.cantidad}
                    onChange={(e) => cambiarCantidad(item.id_detalle, Number(e.target.value))}
                  />
                </div>

                {/* Subtotal por producto */}
                <div className="col-md-2 col-6 text-end mt-3 mt-md-0">
                  <span className="text-muted d-block small">Subtotal</span>
                  <span className="fw-bold">
                    ${(item.producto.precio * item.cantidad).toFixed(2)}
                  </span>
                </div>

                {/* Botón Eliminar */}
                <div className="col-md-2 col-12 text-end mt-3 mt-md-0">
                  <button 
                    onClick={() => eliminar(item.id_detalle)} 
                    className="btn btn-outline-danger btn-sm w-100"
                  >
                    🗑️ Quitar
                  </button>
                </div>

              </div>
            </div>
          ))}
          
          {/* 7. Resumen y Acción de Pago */}
          <div className="card p-4 mt-4 bg-light">
            <div className="row align-items-center">
              <div className="col-md-6">
                <h4>Total de la orden:</h4>
              </div>
              <div className="col-md-6 text-md-end">
                <h2 className="text-primary">${total.toFixed(2)}</h2>
              </div>
            </div>
            <button 
              className="btn btn-success btn-lg w-100 mt-3"
              onClick={() => procederPago(usuario_id, total)}
            >
              Proceder al Pago
            </button>
          </div>
        </>
      )}
    </div>
  );
}