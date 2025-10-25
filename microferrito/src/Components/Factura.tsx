
function Factura() {
  // Simulación de datos de factura
  const productos = [
    { id: 1, nombre: "Casco de seguridad", cantidad: 2, precioUnitario: 25 },
    { id: 2, nombre: "Botas industriales", cantidad: 1, precioUnitario: 40 },
    { id: 3, nombre: "Guantes de trabajo", cantidad: 3, precioUnitario: 15 },
  ];

  const subtotal = productos.reduce((acc, item) => acc + item.precioUnitario * item.cantidad, 0);
  const impuestos = subtotal * 0.12; // 12% IVA
  const total = subtotal + impuestos;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">🧾 Factura</h2>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((item) => (
            <tr key={item.id}>
              <td>{item.nombre}</td>
              <td>{item.cantidad}</td>
              <td>${item.precioUnitario}</td>
              <td>${item.precioUnitario * item.cantidad}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-end">
        <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
        <p><strong>IVA (12%):</strong> ${impuestos.toFixed(2)}</p>
        <h4><strong>Total a pagar:</strong> ${total.toFixed(2)}</h4>
      </div>
    </div>
  );
}

export default Factura;