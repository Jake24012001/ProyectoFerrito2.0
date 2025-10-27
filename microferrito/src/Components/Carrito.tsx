import { useNavigate } from "react-router-dom";

function Carrito() {
  // Inicializa el hook de navegación para poder redirigir al usuario
  const navigate = useNavigate();

  // --- FUNCIÓN DE NAVEGACIÓN ---
  const handleSeguirComprando = () => {
    window.location.href = "http://localhost:4200/catalogo";
  };

  // --- MOCK DATA para el diseño ---
  const mockItems = [
    {
      id: 1,
      name: "Funda de Cemento",
      price: 7.2,
      quantity: 2,
      stock: 10,
      imagen:
        "https://elhogarobrero.com.ar/wp-content/uploads/2023/03/118844_1.jpg",
    },
    {
      id: 2,
      name: "Martillo de Carpintero",
      price: 15,
      quantity: 1,
      stock: 5,
      imagen:
        "https://promart.vteximg.com.br/arquivos/ids/440563-1000-1000/70408.jpg?v=637248118716230000",
    },
    {
      id: 3,
      name: "Taladro",
      price: 120.5,
      quantity: 1,
      stock: 2,
      imagen:
        "https://d2o812a6k13pkp.cloudfront.net/fit-in/1080x1080/Productos/40542954_0220240318124815.jpg",
    },
  ];

  // Calcula el subtotal (Solo para el diseño inicial)
  const subtotal = mockItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 5.0;
  const total = subtotal + shipping;

  // --- Estilo principal (verde de Ferrito) ---
  const primaryColor = "#38c172";

  return (
    <div className="container mt-5 pt-5">
      <h1
        className="mb-4"
        style={{
          color: primaryColor,
          borderBottom: `2px solid ${primaryColor}`,
          paddingBottom: "10px",
        }}
      >
        <i className="fa fa-shopping-cart me-3"></i>
        Tu Carrito de Compras
      </h1>

      <div className="row">
        {/* ------------------------------------- */}
        {/* COLUMNA IZQUIERDA: LISTA DE PRODUCTOS (col-lg-8) */}
        {/* ------------------------------------- */}
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              {mockItems.map((item) => (
                <div
                  key={item.id}
                  className="row align-items-center border-bottom py-3"
                >
                  {/* Imagen (col-2) */}
                  <div className="col-2">
                    <img
                      src={item.imagen}
                      alt={item.name}
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "5px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  {/* Nombre y Precio Unitario (col-4) */}
                  <div className="col-4">
                    <h5 className="mb-0">{item.name}</h5>
                    <small className="text-muted">
                      ${item.price.toFixed(2)} c/u
                    </small>
                  </div>
                  {/* Cantidad (col-3) */}
                  <div className="col-3 d-flex align-items-center">
                    <input
                      type="number"
                      min="1"
                      max={item.stock}
                      value={item.quantity}
                      className="form-control form-control-sm me-2"
                      style={{ width: "70px" }}
                      readOnly
                    />
                    <span className="text-muted small">
                      ({item.stock} en stock)
                    </span>
                  </div>
                  {/* Subtotal por artículo y Botón Eliminar (col-3) */}
                  <div className="col-3 text-end">
                    <strong className="d-block mb-1">
                      ${(item.price * item.quantity).toFixed(2)}
                    </strong>
                    <button className="btn btn-sm" style={{ color: "red" }}>
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botón para seguir comprando (AQUÍ ESTÁ LA MODIFICACIÓN) */}
          <div className="d-flex justify-content-end mt-3">
            <button
              className="btn btn-outline-secondary"
              onClick={handleSeguirComprando} // <-- Se añade el manejador de clic
            >
              Seguir Comprando
            </button>
          </div>
        </div>

        {/* ------------------------------------- */}
        {/* COLUMNA DERECHA: RESUMEN DE COMPRA (col-lg-4) */}
        {/* ------------------------------------- */}
        <div className="col-lg-4">
          <div
            className="card shadow-sm"
            style={{ borderTop: `5px solid ${primaryColor}` }}
          >
            <div className="card-header bg-white">
              <h5 className="mb-0">Resumen del Pedido</h5>
            </div>
            <div className="card-body">
              {/* Subtotal */}
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {/* Envío */}
              <div className="d-flex justify-content-between mb-3 border-bottom pb-3">
                <span>Envío:</span>
                <span>${shipping.toFixed(2)}</span>
              </div>

              {/* Total */}
              <div className="d-flex justify-content-between mb-4">
                <h4>Total:</h4>
                <h4>${total.toFixed(2)}</h4>
              </div>

              {/* Botón de Checkout/Pagar */}
              <button
                className="btn btn-block w-100"
                style={{
                  backgroundColor: primaryColor,
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Proceder al Pago
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carrito;
