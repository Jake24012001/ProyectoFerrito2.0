import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Factura from "./Components/Factura";
import AuditoriaNewFerrito from "./Components/AuditoriaNewFerrito";
import Carrito from "./Components/Carrito";
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