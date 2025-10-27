import React, { useState, useEffect } from "react";
// Se asume que el archivo de servicio se llama 'auditoriaproductosService'
import { getAllAuditorias } from "../services/auditoriaproductosServices";
import { auditoriaproducto as AuditoriaProducto } from "../interfaces/auditoriaproductos";

/**
 * Componente que muestra la lista de registros de auditoría de productos con un diseño limpio y unificado.
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
      item.id_auditoria.toString().includes(searchTerm)
  );

  // Función para asignar estilos de Badge basados en la operación
  const getOperationBadge = (operation: string) => {
    const op = operation.toUpperCase();
    // Clases base para el badge
    let baseClasses =
      "px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full";

    switch (op) {
      case "INSERT":
      case "CREATE":
        return `${baseClasses} bg-green-100 text-green-700`; // Verde sutil para fondos claros
      case "UPDATE":
      case "MODIFICAR":
        return `${baseClasses} bg-yellow-100 text-yellow-700`; // Amarillo sutil
      case "DELETE":
      case "ELIMINAR":
        return `${baseClasses} bg-red-100 text-red-700`; // Rojo sutil
      default:
        return `${baseClasses} bg-gray-100 text-gray-700`;
    }
  };

  // --- Renderizado Condicional de Estado ---
  if (loading) {
    return (
      <div className="flex justify-center items-center h-48 bg-white p-6 rounded-xl shadow-md">
        <p className="text-xl font-semibold text-gray-700 animate-pulse">
          Cargando Registros de Auditoría...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 text-red-700 rounded-xl shadow-md border border-red-300">
        <h1 className="text-2xl font-bold mb-2">🚨 Error de Conexión</h1>
        <p>
          No se pudo mostrar la información. Por favor, verifica el servicio. (
          {error})
        </p>
      </div>
    );
  }

  if (auditorias.length === 0) {
    return (
      <div className="p-6 bg-white text-gray-700 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-2">🔍 Sin Registros</h1>
        <p>
          No se encontraron registros de Auditoría de Productos para mostrar.
        </p>
      </div>
    );
  }

  // --- Renderizado de la Tabla Final ---

  return (
    // Contenedor principal: Fondo blanco para un look limpio y profesional
    <div className="p-6 bg-white min-h-screen text-gray-800 font-sans">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800 border-b pb-2 border-gray-200">
        📜 Panel de Auditoría de Productos
      </h1>

      {/* Barra de herramientas con buscador: Limpia y con sombra sutil */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 p-4 bg-gray-50 rounded-xl shadow-inner border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 sm:mb-0">
          Total Registros: {filteredAuditorias.length}
        </h2>
        <input
          type="text"
          placeholder="Buscar por Operación o ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full sm:w-64 bg-white text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm"
        />
      </div>

      {/* Contenedor de la Tabla: Con un fuerte borde redondeado y sombra */}
      <div className="overflow-x-auto shadow-xl rounded-xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Encabezado de la tabla: Fondo gris claro y texto oscuro */}
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider rounded-tl-xl">
                ID Auditoría
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                ID Producto
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Acción
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider rounded-tr-xl">
                Fecha de Operación
              </th>
            </tr>
          </thead>

          {/* Cuerpo de la tabla: Diseño cebra sutil y hover interactivo */}
          <tbody className="bg-white divide-y divide-gray-200 text-gray-700">
            {filteredAuditorias.map((item, index) => (
              <tr
                key={item.id_auditoria}
                className={`transition-colors duration-200 
                  ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} 
                  hover:bg-blue-50`}
              >
                {/* ID Auditoría */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                  <span className="text-gray-500 font-mono">
                    #{item.id_auditoria}
                  </span>
                </td>

                {/* ID Producto */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-mono">
                  {item.id_auditoria}
                </td>

                {/* Operación/Acción (Badge de Estado) */}
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={getOperationBadge(item.operacion)}>
                    {item.operacion.toUpperCase()}
                  </span>
                </td>

                {/* Fecha */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(item.fecha_operacion).toLocaleString("es-ES", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pie de tabla/Paginación: Fondo blanco y navegación con estilo primario */}
      <div className="mt-6 p-4 flex justify-between items-center bg-white rounded-xl shadow-lg border border-gray-200">
        <p className="text-sm text-gray-600">
          Mostrando 1 a {Math.min(filteredAuditorias.length, 10)} de{" "}
          {filteredAuditorias.length} resultados
        </p>
        <div className="flex space-x-2">
          <button
            className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
            disabled
          >
            Anterior
          </button>
          <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold shadow-md">
            1
          </button>
          <button
            className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
            disabled={filteredAuditorias.length <= 10}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuditoriaNewFerrito;
