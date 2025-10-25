import "bootstrap/dist/css/bootstrap.min.css";

function Carrito() {
  // Ejemplo de productos en el carrito
  const productos = [
    { id: 1, nombre: "Casco de seguridad", precio: 25 },
    { id: 2, nombre: "Botas industriales", precio: 40 },
    { id: 3, nombre: "Guantes de trabajo", precio: 15 },
  ];

  const total = productos.reduce((acc, item) => acc + item.precio, 0);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">🛒 Carrito de Compras</h2>
      <ul className="list-group mb-3">
        {productos.map((item) => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            {item.nombre}
            <span className="badge bg-primary rounded-pill">${item.precio}</span>
          </li>
        ))}
      </ul>
      <div className="d-flex justify-content-between align-items-center">
        <strong>Total:</strong>
        <span className="fs-5">${total}</span>
      </div>
      <button className="btn btn-success mt-3 w-100">Finalizar Compra</button>
    </div>
  );
}

export default Carrito;