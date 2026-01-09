import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Factura from "./components/Factura";
import AuditoriaNewFerrito from "./components/AuditoriaNewFerrito";
import Carrito from "./components/Carrito";

// Creamos un componente interno para manejar la lógica de la sesión
function SessionHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Buscamos el parámetro 'data' en la URL
    const params = new URLSearchParams(window.location.search);
    const dataJson = params.get("data");

    if (dataJson) {
      try {
        // 2. Descodificamos la información enviada desde Angular
        const datosRecuperados = JSON.parse(decodeURIComponent(dataJson));

        // 3. Guardamos exactamente las mismas llaves en el LocalStorage de React
        if (datosRecuperados.id_usuario) localStorage.setItem("id_usuario", datosRecuperados.id_usuario);
        if (datosRecuperados.id_carrito) localStorage.setItem("id_carrito", datosRecuperados.id_carrito);
        if (datosRecuperados.email_usuario) localStorage.setItem("email_usuario", datosRecuperados.email_usuario);
        if (datosRecuperados.token) localStorage.setItem("token", datosRecuperados.token);
        if (datosRecuperados.idToken) localStorage.setItem("idToken", datosRecuperados.idToken);

        console.log("✅ Sesión sincronizada desde Angular correctamente");

        // 4. Limpiamos la URL para que no se vean los datos y redirigimos al carrito o inicio
        // Esto elimina el "?data=..." de la barra de direcciones
        navigate("/carrito", { replace: true });
        
      } catch (error) {
        console.error("Error al procesar los datos de sesión:", error);
      }
    }
  }, [navigate]);

  return null; // Este componente no renderiza nada visualmente
}

function App() {
  return (
    <Router>
      {/* Colocamos el manejador dentro del Router para que pueda usar 'navigate' */}
      <SessionHandler /> 
      <Navbar />
      <Routes>
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/factura" element={<Factura />} />
        <Route path="/auditoria" element={<AuditoriaNewFerrito />} />
        {/* Puedes añadir una ruta por defecto */}
        <Route path="/" element={<Carrito />} /> 
      </Routes>
    </Router>
  );
}

export default App;