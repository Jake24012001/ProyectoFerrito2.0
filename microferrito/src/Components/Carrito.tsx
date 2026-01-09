import { useEffect, useState } from "react";
// Asegúrate de que eliminarDetalle esté exportado en tu servicio
import { obtenerDetallesPorCarrito, deleteDetalleCarrito } from "../services/detallecarritoServices"; 
import { getProductoById } from "../services/productosServices";

export default function Carrito() {
  const [detallesFull, setDetallesFull] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const URL_ANGULAR_CATALOGO = "http://localhost:4200/catalogo";

  const sincronizarCarrito = async () => {
    const idCarrito = localStorage.getItem("id_carrito");
    if (!idCarrito) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const detallesBase = await obtenerDetallesPorCarrito(Number(idCarrito));
      const promesas = detallesBase.map(async (detalle: any) => {
        const infoProducto = await getProductoById(detalle.producto_id);
        return { ...detalle, productoInfo: infoProducto };
      });

      const resultados = await Promise.all(promesas);
      setDetallesFull(resultados);
    } catch (error) {
      console.error("Error cargando carrito:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    sincronizarCarrito();
  }, []);

  // Función para eliminar un producto del carrito
  const handleEliminar = async (id_detalle: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto del carrito?")) {
      try {
        await deleteDetalleCarrito(id_detalle);
        // Recargamos el carrito después de eliminar
        await sincronizarCarrito(); 
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
        alert("No se pudo eliminar el producto.");
      }
    }
  };

  const total = detallesFull.reduce((acc, item) => {
    return acc + (Number(item.productoInfo?.precio || 0) * item.cantidad);
  }, 0);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <div className="spinner-grow text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid bg-light min-vh-100 py-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card shadow-sm border-0 rounded-3">
              <div className="card-header bg-white py-3 border-bottom-0">
                <h4 className="mb-0 fw-bold d-flex align-items-center">
                  <span className="me-2">🛒</span> Mi Carrito 
                  <span className="badge bg-primary rounded-pill ms-2 fs-6">{detallesFull.length}</span>
                </h4>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light text-secondary">
                      <tr>
                        <th className="ps-4 py-3 fw-semibold">PRODUCTO</th>
                        <th className="py-3 fw-semibold">PRECIO</th>
                        <th className="py-3 fw-semibold text-center">CANTIDAD</th>
                        <th className="py-3 fw-semibold text-end">SUBTOTAL</th>
                        <th className="pe-4 py-3 fw-semibold text-center">ACCIONES</th>
                      </tr>
                    </thead>
                    <tbody>
                      {detallesFull.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="text-center py-5 text-muted italic">
                            Tu carrito está vacío.
                          </td>
                        </tr>
                      ) : (
                        detallesFull.map((item) => (
                          <tr key={item.id_detalle} className="border-bottom">
                            <td className="ps-4 py-3">
                              <div className="d-flex align-items-center">
                                <div className="bg-light rounded p-1 me-3 shadow-sm">
                                  <img 
                                    src={item.productoInfo?.imagen_url || 'https://via.placeholder.com/80'} 
                                    className="rounded" 
                                    style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                                    alt={item.productoInfo?.nombre} 
                                  />
                                </div>
                                <div>
                                  <h6 className="mb-1 fw-bold text-dark">{item.productoInfo?.nombre}</h6>
                                  <p className="mb-0 text-muted small">ID: {item.producto_id}</p>
                                </div>
                              </div>
                            </td>
                            <td className="text-secondary">${Number(item.productoInfo?.precio || 0).toFixed(2)}</td>
                            <td className="text-center">
                              <span className="badge bg-white text-dark border border-2 px-3 py-2 fs-6 fw-normal">
                                {item.cantidad}
                              </span>
                            </td>
                            <td className="text-end fw-bold text-primary">
                              ${(Number(item.productoInfo?.precio || 0) * item.cantidad).toFixed(2)}
                            </td>
                            <td className="pe-4 text-center">
                              <button 
                                className="btn btn-outline-danger btn-sm rounded-circle p-2"
                                onClick={() => handleEliminar(item.id_detalle)}
                                title="Eliminar producto"
                              >
                                <i className="bi bi-trash"></i> 🗑️
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card shadow border-0 rounded-3 sticky-top" style={{ top: '100px' }}>
              <div className="card-body p-4">
                <h5 className="fw-bold mb-4 border-bottom pb-2">Resumen de Compra</h5>
                
                <div className="d-flex justify-content-between mb-3 text-muted">
                  <span>Productos ({detallesFull.length})</span>
                  <span className="fw-semibold">${total.toFixed(2)}</span>
                </div>
                
                <div className="d-flex justify-content-between mb-3 text-success">
                  <span>Envío</span>
                  <span className="fw-bold">Gratis</span>
                </div>
                
                <hr className="my-4" />
                
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <span className="h5 fw-bold mb-0">Total a pagar</span>
                  <span className="h4 fw-bold text-primary mb-0">${total.toFixed(2)}</span>
                </div>

                <button 
                  className="btn btn-primary w-100 py-3 fw-bold rounded-pill shadow mb-3"
                  onClick={() => alert("Procesando pago...")}
                  disabled={detallesFull.length === 0}
                >
                  FINALIZAR COMPRA
                </button>

                <button 
                  className="btn btn-link w-100 text-decoration-none text-muted fw-semibold text-center"
                  onClick={() => window.location.href = URL_ANGULAR_CATALOGO}
                >
                  ← Seguir comprando
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}