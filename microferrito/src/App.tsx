import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Carrito from "./components/Carrito";
import Factura from "./components/Factura";
import AuditoriaNewFerrito from "./components/AuditoriaNewFerrito";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/factura" element={<Factura />} />
        <Route path="/auditoria" element={<AuditoriaNewFerrito />} />
      </Routes>
    </Router>
  );
}

export default App;