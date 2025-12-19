import { useState, useEffect } from "react";
// Se asume que el archivo de servicio se llama 'auditoriaproductosService'
import { getAllAuditorias } from "../services/auditoriaproductosServices";
import { auditoriaproducto as AuditoriaProducto } from "../interfaces/auditoriaproductos";

/**
 * Componente que muestra la lista de registros de auditoría de productos con un diseño limpio, profesional y unificado (usando una paleta verde/emerald).
 */
function AuditoriaNewFerrito() {
  const [auditorias, setAuditorias] = useState<AuditoriaProducto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Hook useEffect para ejecutar la carga de datos una vez al montar el componente
  useEffect(() => {
    const fetchAuditorias = async () => {
      try {
        setLoading(true);
        const data = await getAllAuditorias();
        setAuditorias(data);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ocurrió un error desconocido al cargar los datos.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchAuditorias();
  }, []);

  // Función para filtrar los datos
  const filteredAuditorias = auditorias.filter(
    (item) =>
      item.operacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id_auditoria.toString().includes(searchTerm) ||
      item.descripcion_cambio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /**
   * Función para asignar estilos de Badge basados en la operación
   */
  const getOperationBadge = (operation: string) => {
    const op = operation.toUpperCase();
    const baseClasses =
      "px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full shadow-sm min-w-[70px] justify-center";

    switch (op) {
      case "C":
      case "INSERT":
        return `${baseClasses} bg-emerald-500 text-white`;
      case "U":
      case "MODIFICAR":
        return `${baseClasses} bg-yellow-500 text-yellow-900`;
      case "D":
      case "ELIMINAR":
        return `${baseClasses} bg-red-500 text-white`;
      default:
        return `${baseClasses} bg-gray-300 text-gray-800`;
    }
  };

  /**
   * Función para obtener el badge de Estado
   */
  const getStateBadge = (estado: "A" | "I") => {
    const baseClasses =
      "px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full shadow-sm";
    if (estado === "A") {
      return `${baseClasses} bg-blue-100 text-blue-800`; // Azul para Activo
    } else {
      return `${baseClasses} bg-gray-100 text-gray-500`; // Gris para Inactivo
    }
  };

  // --- Renderizado Condicional de Estado ---
  if (loading) {
    return (
      <div className="flex justify-center items-center h-48 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <div className="flex items-center space-x-2 text-emerald-600">
          <svg
            className="animate-spin h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-xl font-semibold">
            Cargando Registros de Auditoría...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-red-100 text-red-800 rounded-xl shadow-lg border border-red-400">
        <h1 className="text-2xl font-bold mb-2 flex items-center">
          <span className="mr-2 text-3xl">🚨</span> Error de Conexión
        </h1>
        <p className="text-lg">
          No se pudo mostrar la información. Por favor, verifica el servicio. (
          <span className="font-mono">{error}</span>)
        </p>
      </div>
    );
  }

  if (auditorias.length === 0) {
    return (
      <div className="p-8 bg-white text-gray-700 rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-2xl font-bold mb-2 flex items-center">
          <span className="mr-2 text-3xl">🔍</span> Sin Registros de Auditoría
        </h1>
        <p className="text-lg">
          No se encontraron registros de Auditoría de Productos para mostrar en
          este momento.
        </p>
      </div>
    );
  }

  // --- Renderizado de la Tabla Final ---

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-800 flex items-center">
          <span className="mr-3 text-5xl text-emerald-600">📊</span> Panel de
          Auditoría de Productos
        </h1>

        {/* BARRA DE FILTROS Y BÚSQUEDA */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 py-2 px-0">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 md:mb-0">
            Registros Totales:{" "}
            <span className="font-bold text-emerald-600">
              {filteredAuditorias.length}
            </span>
          </h2>
          <div className="w-full md:w-80">
            <input
              type="text"
              placeholder="🔍 Buscar por Operación, ID o Descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-3 border border-gray-300 rounded-xl w-full bg-white text-gray-900 placeholder-gray-500 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow duration-300 shadow-sm"
            />
          </div>
        </div>

        {/* Contenedor de la Tabla */}
        <div className="overflow-x-auto shadow-xl rounded-xl border border-gray-200 w-full">
          <table className="min-w-full divide-y divide-gray-200">
            {/* ENCABEZADO DE LA TABLA - AJUSTE DE ESPACIADO */}
            <thead className="bg-emerald-600">
              <tr>
                {/* Menos padding para columnas cortas */}
                <th className="px-3 py-3 text-left text-xs font-extrabold text-dark uppercase tracking-wider rounded-tl-xl">
                  ID Audit.
                </th>
                <th className="px-3 py-3 text-left text-xs font-extrabold text-dark uppercase tracking-wider">
                  ID Prod.
                </th>
                <th className="px-3 py-3 text-left text-xs font-extrabold text-dark uppercase tracking-wider">
                  Acción
                </th>
                {/* Más padding y ancho implícito para Fecha y Descripción */}
                <th className="px-6 py-3 text-left text-xs font-extrabold text-dark uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-extrabold text-dark uppercase tracking-wider w-1/3"> 
                  Descripción del Cambio
                </th>
                <th className="px-3 py-3 text-center text-xs font-extrabold text-dark uppercase tracking-wider rounded-tr-xl">
                  Estado
                </th>
              </tr>
            </thead>

            {/* CUERPO DE LA TABLA - AJUSTE DE ESPACIADO */}
            <tbody className="bg-white divide-y divide-gray-100 text-gray-700">
              {filteredAuditorias.map((item, index) => (
                <tr
                  key={item.id_auditoria}
                  className={`transition-colors duration-200 
                  ${index % 2 === 0 ? "bg-white" : "bg-emerald-50"} 
                  hover:bg-emerald-100`}
                >
                  {/* ID Auditoría */}
                  <td className="px-3 py-4 whitespace-nowrap text-sm font-bold">
                    <span className="text-gray-600 font-mono">
                      #{item.id_auditoria}
                    </span>
                  </td>

                  {/* ID Producto */}
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-emerald-600 font-mono font-semibold">
                    {item.producto_id}
                  </td>

                  {/* Operación/Acción (Badge de Estado) */}
                  <td className="px-3 py-4 whitespace-nowrap">
                    <span className={getOperationBadge(item.operacion)}>
                      {item.operacion.toUpperCase()}
                    </span>
                  </td>

                  {/* Fecha */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
                    {new Date(item.fecha_operacion).toLocaleString("es-ES", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>

                  {/* DESCRIPCIÓN DEL CAMBIO - Aseguramos que sea legible */}
                  <td
                    className="px-6 py-4 text-sm text-gray-700 max-w-sm truncate" // Aumentado max-w para más texto
                    title={item.descripcion_cambio}
                  >
                    {item.descripcion_cambio}
                  </td>

                  {/* ESTADO */}
                  <td className="px-3 py-4 whitespace-nowrap text-center">
                    <span className={getStateBadge(item.estado)}>
                      {item.estado === "A" ? "ACTIVO" : "INACTIVO"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pie de tabla/Paginación */}
        <div className="mt-8 p-4 flex flex-col md:flex-row justify-between items-center bg-white rounded-xl shadow-lg border border-gray-200">
          <p className="text-sm text-gray-600 mb-4 md:mb-0">
            Mostrando 1 a {Math.min(filteredAuditorias.length, 10)} de{" "}
            <span className="font-bold text-emerald-600">
              {filteredAuditorias.length}
            </span>{" "}
            resultados
          </p>
          <div className="flex space-x-2">
            <button
              className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
            >
              « Anterior
            </button>
            <button className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-bold shadow-md ring-2 ring-emerald-300">
              1
            </button>
            <button
              className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={filteredAuditorias.length <= 10}
            >
              Siguiente »
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuditoriaNewFerrito;