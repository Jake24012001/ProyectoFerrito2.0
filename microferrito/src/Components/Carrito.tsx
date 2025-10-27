

function Carrito() {
    // --- MOCK DATA para el diseño ---
    const mockItems = [
        { id: 1, name: "Martillo de Carpintero", price: 15.50, quantity: 2, stock: 10 },
        { id: 2, name: "Juego de Destornilladores (12 pzs)", price: 45.99, quantity: 1, stock: 5 },
        { id: 3, name: "Lijadora Orbital Eléctrica", price: 89.00, quantity: 1, stock: 2 },
    ];
    
    // Calcula el subtotal (Solo para el diseño inicial)
    const subtotal = mockItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 5.00;
    const total = subtotal + shipping;

    // --- Estilo principal (verde de Ferrito) ---
    const primaryColor = "#38c172";

    return (
        <div className="container mt-5 pt-5">
            <h1 className="mb-4" style={{ color: primaryColor, borderBottom: `2px solid ${primaryColor}`, paddingBottom: '10px' }}>
                <i className="fa fa-shopping-cart me-3"></i>
                Tu Carrito de Compras
            </h1>
            
            {/* El diseño principal usa un grid de 12 columnas: 
                8 columnas para la lista de productos y 4 para el resumen. */}
            <div className="row">
                
                {/* ------------------------------------- */}
                {/* COLUMNA IZQUIERDA: LISTA DE PRODUCTOS (col-lg-8) */}
                {/* ------------------------------------- */}
                <div className="col-lg-8">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            {mockItems.map((item) => (
                                <div key={item.id} className="row align-items-center border-bottom py-3">
                                    
                                    {/* Imagen (col-2) */}
                                    <div className="col-2">
                                        {/* Aquí iría la imagen del producto */}
                                        <div style={{ width: '60px', height: '60px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}></div>
                                    </div>
                                    
                                    {/* Nombre y Precio Unitario (col-4) */}
                                    <div className="col-4">
                                        <h5 className="mb-0">{item.name}</h5>
                                        <small className="text-muted">${item.price.toFixed(2)} c/u</small>
                                    </div>

                                    {/* Cantidad (col-3) */}
                                    <div className="col-3 d-flex align-items-center">
                                        <input
                                            type="number"
                                            min="1"
                                            max={item.stock}
                                            value={item.quantity}
                                            className="form-control form-control-sm me-2"
                                            style={{ width: '70px' }}
                                            // Aquí iría el onChange para actualizar la cantidad
                                            readOnly // Puesto como readOnly para el diseño estático
                                        />
                                        <span className="text-muted small">({item.stock} en stock)</span>
                                    </div>

                                    {/* Subtotal por artículo y Botón Eliminar (col-3) */}
                                    <div className="col-3 text-end">
                                        <strong className="d-block mb-1">${(item.price * item.quantity).toFixed(2)}</strong>
                                        <button className="btn btn-sm" style={{ color: 'red' }}>Eliminar</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Botón para seguir comprando */}
                    <div className="d-flex justify-content-end mt-3">
                        <button className="btn btn-outline-secondary">Seguir Comprando</button>
                    </div>
                </div>

                
                {/* ------------------------------------- */}
                {/* COLUMNA DERECHA: RESUMEN DE COMPRA (col-lg-4) */}
                {/* ------------------------------------- */}
                <div className="col-lg-4">
                    <div className="card shadow-sm" style={{ borderTop: `5px solid ${primaryColor}` }}>
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
                                style={{ backgroundColor: primaryColor, color: 'white', fontWeight: 'bold' }}
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