import React, { useEffect, useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import { getFacturasByUsuario } from "../services/facturaServices";

const Factura: React.FC = () => {
  const facturaRef = useRef<HTMLDivElement>(null);
  const [invoiceData, setInvoiceData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Datos del usuario desde localStorage para personalizar la factura
  const usuarioInfo = JSON.parse(localStorage.getItem("usuario") || "{}");

  useEffect(() => {
    const cargarFactura = async () => {
      const idUsuarioRaw = localStorage.getItem("id_usuario");
      if (!idUsuarioRaw) {
        setLoading(false);
        return;
      }

      try {
        const facturas = await getFacturasByUsuario(Number(idUsuarioRaw));
        if (facturas.length > 0) {
          // Tomamos la factura más reciente
          setInvoiceData(facturas[facturas.length - 1]);
        }
      } catch (error) {
        console.error("Error al cargar la factura:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarFactura();
  }, []);

  const descargarPDF = () => {
    const element = facturaRef.current;
    if (!element || !invoiceData) return;

    // Agregamos "as const" al final del objeto para fijar los tipos literales
    const opt = {
      margin: 10,
      filename: `Factura_${invoiceData.id_factura || "001"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    } as const; // <--- ESTO CORRIGE EL ERROR

    try {
      // Importante: Para evitar errores de ejecución,
      // llamamos a html2pdf como una función
      const worker = html2pdf();
      worker.set(opt).from(element).save();
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
  };

  if (loading)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-success"></div>
        <p className="mt-2">Generando documento...</p>
      </div>
    );

  if (!invoiceData)
    return (
      <div className="alert alert-warning m-5 text-center">
        No se encontró ninguna factura para este usuario.
      </div>
    );

  return (
    <div className="container py-5">
      {/* Área de la Factura */}
      <div
        ref={facturaRef}
        className="card shadow-lg p-5 mx-auto border-0"
        style={{ maxWidth: "800px", backgroundColor: "#fff", color: "#333" }}
      >
        {/* Encabezado de Factura */}
        <div className="d-flex justify-content-between align-items-start mb-5">
          <div>
            <h1 className="fw-bold text-success mb-1">NewFerrito</h1>
            <p className="text-muted small mb-0">RUC: 1234567890001</p>
            <p className="text-muted small">Machala, El Oro, Ecuador</p>
          </div>
          <div className="text-end">
            <h3 className="fw-bold">FACTURA</h3>
            <span className="badge bg-light text-dark border">
              #{invoiceData.id_factura}
            </span>
            <p className="mt-2 mb-0 small">
              <b>Fecha:</b>{" "}
              {new Date(invoiceData.fecha_creacion).toLocaleDateString()}
            </p>
          </div>
        </div>

        <hr />

        {/* Información del Cliente */}
        <div className="row my-4">
          <div className="col-6">
            <h6 className="text-muted text-uppercase small fw-bold">
              Facturar a:
            </h6>
            <p className="mb-1 fw-bold">
              {usuarioInfo.nombre || "Cliente Final"}
            </p>
            <p className="mb-1 text-muted small">
              {usuarioInfo.correo || "Sin correo"}
            </p>
            <p className="text-muted small">
              ID Usuario: {invoiceData.usuario_id}
            </p>
          </div>
        </div>

        {/* Tabla de Conceptos */}
        <table className="table mt-4">
          <thead className="table-dark">
            <tr>
              <th>Descripción</th>
              <th className="text-center">Cant.</th>
              <th className="text-end">Total</th>
            </tr>
          </thead>
          <tbody>
            {/* Si tu factura incluye el detalle de productos, los mapearías aquí. 
                Sino, mostramos el resumen general de la orden */}
            <tr>
              <td className="py-3">Compra de suministros en línea</td>
              <td className="text-center py-3">1</td>
              <td className="text-end py-3">
                ${Number(invoiceData.total).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Totales */}
        <div className="row justify-content-end mt-4">
          <div className="col-5">
            <div className="d-flex justify-content-between p-2">
              <span className="fw-bold">Subtotal:</span>
              <span>${(Number(invoiceData.total) / 1.15).toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between p-2">
              <span className="fw-bold">IVA (15%):</span>
              <span>
                $
                {(
                  Number(invoiceData.total) -
                  Number(invoiceData.total) / 1.15
                ).toFixed(2)}
              </span>
            </div>
            <div className="d-flex justify-content-between p-2 bg-light rounded mt-2">
              <span className="h5 fw-bold mb-0">Total:</span>
              <span className="h5 fw-bold text-success mb-0">
                ${Number(invoiceData.total).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-5 text-center">
          <p className="text-muted small">
            ¡Gracias por su compra en NewFerrito!
          </p>
        </div>
      </div>

      {/* Botones de Acción (Fuera del PDF) */}
      <div className="text-center mt-4 no-print">
        <button
          className="btn btn-success btn-lg px-5 shadow"
          onClick={descargarPDF}
        >
          📥 Descargar Factura en PDF
        </button>
        <button
          className="btn btn-link text-muted d-block mt-2"
          onClick={() =>
            (window.location.href = "http://localhost:4200/catalogo")
          }
        >
          Volver a la tienda
        </button>
      </div>
    </div>
  );
};

export default Factura;
