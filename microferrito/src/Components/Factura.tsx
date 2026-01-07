import React, { useEffect, useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import { getFacturaById } from "../services/facturaService";

const Factura: React.FC = () => {
  const facturaRef = useRef<HTMLDivElement>(null);
  const primaryColor = "#38c172";

  const [invoiceData, setInvoiceData] = useState<any>(null);

  useEffect(() => {
    const cargarFactura = async () => {
      const id_factura = Number(localStorage.getItem("id_factura"));
      if (!id_factura) return;

      const factura = await getFacturaById(id_factura);
      setInvoiceData(factura);
    };

    cargarFactura();
  }, []);

  const handleDownloadPDF = () => {
    if (!facturaRef.current || !invoiceData) return;

    html2pdf()
      .set({
        margin: 0.5,
        filename: `factura_${invoiceData.id_factura}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      })
      .from(facturaRef.current)
      .save();
  };

  if (!invoiceData) return <p>Cargando factura...</p>;

  return (
    <>
      <div
        ref={facturaRef}
        className="card shadow-lg p-5 mx-auto"
        style={{ maxWidth: "900px" }}
      >
        <div className="row mb-5 border-bottom pb-3">
          <div className="col-md-6">
            <h2 style={{ color: primaryColor }}>FERRITO S.A.</h2>
            <p>RUC: 0790000000001</p>
          </div>
          <div className="col-md-6 text-end">
            <h4>
              FACTURA N°{" "}
              <span style={{ color: primaryColor }}>
                {invoiceData.id_factura}
              </span>
            </h4>
            <p>Fecha: {new Date(invoiceData.fecha_creacion).toLocaleDateString()}</p>
          </div>
        </div>

        <h5 style={{ color: primaryColor }}>Datos del Cliente</h5>
        <p><strong>ID Usuario:</strong> {invoiceData.usuario_id}</p>

        <div className="text-end mt-4">
          <h4 style={{ color: primaryColor }}>
            TOTAL: ${Number(invoiceData.total).toFixed(2)}
          </h4>
        </div>
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-success" onClick={handleDownloadPDF}>
          Descargar PDF
        </button>
      </div>
    </>
  );
};

export default Factura;
