import React, { useEffect, useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import { generarFactura } from "../services/facturaService";

const Factura: React.FC = () => {
  const facturaRef = useRef<HTMLDivElement>(null);
  const primaryColor = "#38c172";

  const [invoiceData, setInvoiceData] = useState<any>(null);

  useEffect(() => {
    const cargarFactura = async () => {
      const carrito_id = Number(localStorage.getItem("carrito_id"));
      const usuario_id = Number(localStorage.getItem("usuario_id"));

      const total = Number(localStorage.getItem("total_factura"));

      const factura = await generarFactura(carrito_id, usuario_id, total);
      setInvoiceData(factura);
    };

    cargarFactura();
  }, []);

  const handleDownloadPDF = () => {
    if (!facturaRef.current) return;

    html2pdf().set({
      margin: 0.5,
      filename: `${invoiceData.numero}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    }).from(facturaRef.current).save();
  };

  if (!invoiceData) return <p>Cargando factura...</p>;
      <div ref={facturaRef} className="card shadow-lg p-5 mx-auto" style={{ maxWidth: "900px" }}>
        <div className="row mb-5 border-bottom pb-3">
          <div className="col-md-6">
            <h2 style={{ color: primaryColor }}>FERRITO S.A.</h2>
            <p>RUC: 0790000000001</p>
          </div>
          <div className="col-md-6 text-end">
            <h4>
              FACTURA N°: <span style={{ color: primaryColor }}>{invoiceData.numero}</span>
            </h4>
            <p>Fecha: {invoiceData.fecha}</p>
          </div>
        </div>

        <h5 style={{ color: primaryColor }}>Datos del Cliente</h5>
        <p><strong>Nombre:</strong> {invoiceData.cliente.nombre}</p>
        <p><strong>RUC:</strong> {invoiceData.cliente.ruc}</p>
        <p><strong>Dirección:</strong> {invoiceData.cliente.direccion}</p>

        <table className="table table-bordered mt-4">
          <thead style={{ backgroundColor: primaryColor, color: "white" }}>
            <tr>
              <th>#</th>
              <th>Descripción</th>
              <th className="text-end">Cantidad</th>
              <th className="text-end">Precio</th>
              <th className="text-end">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.detalle.map((item: any, i: number) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item.nombre}</td>
                <td className="text-end">{item.cantidad}</td>
                <td className="text-end">${item.precio.toFixed(2)}</td>
                <td className="text-end">${(item.precio * item.cantidad).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-end mt-4">
          <p>Subtotal: ${invoiceData.subtotal.toFixed(2)}</p>
          <p>IVA: ${invoiceData.iva.toFixed(2)}</p>
          <h4 style={{ color: primaryColor }}>
            TOTAL: ${invoiceData.total.toFixed(2)}
          </h4>
        </div>
      </div>
}