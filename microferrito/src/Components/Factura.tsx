import React, { useRef } from "react";
import html2pdf from "html2pdf.js";

<<<<<<< HEAD
const primaryColor = "#38c172"; // Verde de Ferrito

const invoiceData = {
  number: "F-2025-00123",
  date: "26 de Octubre, 2025",
  client: {
    name: "Juan Pérez García",
    ruc: "1712345678001",
    address: "Av. Principal y Calle 2, Machala",
  },
  items: [
    { description: "Martillo de Carpintero", quantity: 2, unitPrice: 15.5, total: 31.0 },
    { description: "Juego de Destornilladores", quantity: 1, unitPrice: 45.99, total: 45.99 },
    { description: "Lijadora Orbital", quantity: 1, unitPrice: 89.0, total: 89.0 },
  ],
  subtotal: 165.99,
  ivaRate: 0.12,
  ivaAmount: 19.92,
  total: 185.91,
};

const Factura: React.FC = () => {
  const facturaRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    if (!facturaRef.current) return;

    const options = {
      margin: 0.5,
      filename: `${invoiceData.number}.pdf`,
      image: { type: "jpeg", quality: 0.98 } as const,
      html2canvas: { scale: 2 },
      jsPDF: {
        unit: "in",
        format: "letter",
        orientation: "portrait" as const,
      },
=======
function Factura() {
    // --- MOCK DATA para el diseño de la Factura ---
    const primaryColor = "#38c172"; // Verde de Ferrito
    
    const invoiceData = {
        number: "F-2025-00123",
        date: "26 de Octubre, 2025",
        
        // Datos del Cliente
        client: {
            name: "Jean Zambrano",
            ruc: "1712345678001",
            address: "Junin entre octava y novena norte, Machala",
        },
        
        // Items (Podrías reutilizar los datos del carrito)
        items: [
            { description: "Martillo de Carpintero", quantity: 2, unitPrice: 15, total: 30 },
            { description: "Funda de Cemento", quantity: 1, unitPrice: 7.20, total: 7.20 },
            { description: "Taladro", quantity: 1, unitPrice: 120.50, total: 120.50 },
        ],
        
        // Totales
        subtotal: 157.70,
        ivaRate: 0.14,
        ivaAmount: 22.08,
        total: 22.078,
>>>>>>> 9033f225826a08e576ec1eb58bfc9db11c51eaad
    };

    html2pdf().set(options).from(facturaRef.current).save();
  };

  return (
    <div className="container mt-5 pt-5">
      <h1 className="mb-4 text-center" style={{ color: primaryColor }}>
        <i className="fa fa-file-invoice me-3"></i>
        Factura de Venta
      </h1>

<<<<<<< HEAD
      <div ref={facturaRef} className="card shadow-lg p-4 p-md-5 mx-auto" style={{ maxWidth: "900px" }}>
        {/* 1. ENCABEZADO Y DATOS DE LA EMPRESA */}
        <div className="row mb-5 border-bottom pb-3">
          <div className="col-md-6">
            <h2 className="text-uppercase" style={{ color: primaryColor, fontWeight: "900" }}>
              FERRITO S.A.
            </h2>
            <p className="mb-0">RUC: 0790000000001</p>
            <p className="mb-0">Dir: Calle Los Materiales, Machala, Ecuador</p>
            <p className="mb-0">Telf: (07) 999-9999</p>
          </div>
          <div className="col-md-6 text-md-end mt-3 mt-md-0">
            <h4 className="mb-0">
              FACTURA N°: <span style={{ color: primaryColor }}>{invoiceData.number}</span>
            </h4>
            <p className="mb-0">Fecha de Emisión: {invoiceData.date}</p>
          </div>
=======
                {/* 2. DATOS DEL CLIENTE */}
                <div className="row mb-5 p-3" style={{ border: '1px solid #eee', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                    <h5 className="mb-3" style={{ color: primaryColor }}>Datos del Cliente</h5>
                    <div className="col-md-6">
                        <p className="mb-0"><strong>Nombre:</strong> {invoiceData.client.name}</p>
                        <p className="mb-0"><strong>RUC/C.I.:</strong> {invoiceData.client.ruc}</p>
                    </div>
                    <div className="col-md-6">
                        <p className="mb-0"><strong>Dirección:</strong> {invoiceData.client.address}</p>
                    </div>
                </div>

                {/* 3. DETALLE DE ÍTEMS */}
                <div className="table-responsive mb-5">
                    <table className="table table-bordered">
                        <thead style={{ backgroundColor: primaryColor, color: 'white' }}>
                            <tr>
                                <th>#</th>
                                <th>Descripción</th>
                                <th className="text-end">Cantidad</th>
                                <th className="text-end">Precio Unitario</th>
                                <th className="text-end">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoiceData.items.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.description}</td>
                                    <td className="text-end">{item.quantity}</td>
                                    <td className="text-end">${item.unitPrice.toFixed(2)}</td>
                                    <td className="text-end"><strong>${item.total.toFixed(2)}</strong></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* 4. TOTALES Y RESUMEN FINAL */}
                <div className="row justify-content-end">
                    <div className="col-md-5">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>Subtotal 0% y 14%:</td>
                                    <td className="text-end">${invoiceData.subtotal.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td>Impuesto (IVA 14%):</td>
                                    <td className="text-end">${invoiceData.ivaAmount.toFixed(2)}</td>
                                </tr>
                                <tr style={{ backgroundColor: '#e9f7ef', borderTop: `2px solid ${primaryColor}` }}>
                                    <td className="fw-bold">TOTAL A PAGAR:</td>
                                    <td className="text-end fw-bold">${invoiceData.total.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Opciones de la Factura (Botones de acción) */}
            <div className="text-center my-4">
                <button 
                    className="btn btn-lg me-3" 
                    style={{ backgroundColor: primaryColor, color: 'white' }}
                    onClick={() => window.print()} // Función nativa de JS para imprimir
                >
                    <i className="fa fa-print me-2"></i> Imprimir Factura
                </button>
                <button className="btn btn-outline-secondary btn-lg">
                    <i className="fa fa-download me-2"></i> Descargar PDF
                </button>
            </div>
            
>>>>>>> 9033f225826a08e576ec1eb58bfc9db11c51eaad
        </div>

        {/* 2. DATOS DEL CLIENTE */}
        <div
          className="row mb-5 p-3"
          style={{ border: "1px solid #eee", borderRadius: "5px", backgroundColor: "#f9f9f9" }}
        >
          <h5 className="mb-3" style={{ color: primaryColor }}>
            Datos del Cliente
          </h5>
          <div className="col-md-6">
            <p className="mb-0">
              <strong>Nombre:</strong> {invoiceData.client.name}
            </p>
            <p className="mb-0">
              <strong>RUC/C.I.:</strong> {invoiceData.client.ruc}
            </p>
          </div>
          <div className="col-md-6">
            <p className="mb-0">
              <strong>Dirección:</strong> {invoiceData.client.address}
            </p>
          </div>
        </div>

        {/* 3. DETALLE DE ÍTEMS */}
        <div className="table-responsive mb-5">
          <table className="table table-bordered">
            <thead style={{ backgroundColor: primaryColor, color: "white" }}>
              <tr>
                <th>#</th>
                <th>Descripción</th>
                <th className="text-end">Cantidad</th>
                <th className="text-end">Precio Unitario</th>
                <th className="text-end">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.description}</td>
                  <td className="text-end">{item.quantity}</td>
                  <td className="text-end">${item.unitPrice.toFixed(2)}</td>
                  <td className="text-end">
                    <strong>${item.total.toFixed(2)}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 4. TOTALES Y RESUMEN FINAL */}
        <div className="row justify-content-end">
          <div className="col-md-5">
            <table className="table">
              <tbody>
                <tr>
                  <td>Subtotal 0% y 12%:</td>
                  <td className="text-end">${invoiceData.subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Impuesto (IVA 12%):</td>
                  <td className="text-end">${invoiceData.ivaAmount.toFixed(2)}</td>
                </tr>
                <tr style={{ backgroundColor: "#e9f7ef", borderTop: `2px solid ${primaryColor}` }}>
                  <td className="fw-bold">TOTAL A PAGAR:</td>
                  <td className="text-end fw-bold">${invoiceData.total.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="text-center my-4">
        <button
          className="btn btn-lg me-3"
          style={{ backgroundColor: primaryColor, color: "white" }}
          onClick={() => window.print()}
        >
          <i className="fa fa-print me-2"></i> Imprimir Factura
        </button>
        <button className="btn btn-outline-secondary btn-lg" onClick={handleDownloadPDF}>
          <i className="fa fa-download me-2"></i> Descargar PDF
        </button>
      </div>
    </div>
  );
};

export default Factura;