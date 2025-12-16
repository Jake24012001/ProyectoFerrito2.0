import { Link } from "react-router-dom";
// Si usas Font Awesome, asegúrate de haberlo instalado: npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faTags,
  faHeart,
  faUserShield,
  faShoppingCart,
  faFileInvoice,
  faChartLine, // Usaremos este para Auditoria
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  // Definimos el color principal que se ve en la imagen (un verde brillante)
  const primaryColor = "#38c172"; // Un verde brillante similar al de la imagen
  const whiteText = "#ffffff";

  // El navbar ya no usa bg-dark, usaremos un estilo personalizado
  return (
    // 1. Aplicamos el color de fondo verde (o un verde similar al de la imagen)
    <nav
      className="navbar navbar-expand-lg fixed-top"
      style={{ backgroundColor: primaryColor }}
    >
      <div className="container-fluid">
        {/* 2. Marca/Logo - Estilo del nombre de la app */}
        <Link
          className="navbar-brand d-flex align-items-center"
          to="http://localhost:4200/home"
          style={{ color: whiteText, fontWeight: "bold" }}
        >
          <FontAwesomeIcon icon={faHome} style={{ marginRight: "8px" }} />
          NewFerrito
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          {/* Hacemos el icono del toggler blanco para que se vea en el fondo verde */}
          <span
            className="navbar-toggler-icon"
            style={{ filter: "brightness(0) invert(1)" }}
          ></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          {/* 3. Ajustamos los elementos del menú (a la derecha y con color de texto blanco) */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {/* 4. Mapeamos las opciones visibles en la imagen */}

            {/* Home (lo conservamos como estaba) */}
            <li className="nav-item">
              <a
                className="nav-link active"
                href="http://localhost:4200/home"
                style={{ color: whiteText }}
              >
                <FontAwesomeIcon icon={faHome} style={{ marginRight: "5px" }} />
                Home
              </a>
            </li>

            {/* Carrito */}
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/carrito"
                style={{ color: whiteText }}
              >
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  style={{ marginRight: "5px" }}
                />
                Carrito
              </Link>
            </li>

            {/* Factura (Este es nuevo, aunque tu código anterior tenía Factura, la imagen muestra 'Favoritos' y 'Administrador') */}
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/factura"
                style={{ color: whiteText }}
              >
                <FontAwesomeIcon
                  icon={faFileInvoice}
                  style={{ marginRight: "5px" }}
                />
                Factura
              </Link>
            </li>

            {/* Auditoria (Usaremos un icono relacionado con administración o gráficos) */}
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/auditoria"
                style={{ color: whiteText }}
              >
                <FontAwesomeIcon
                  icon={faChartLine}
                  style={{ marginRight: "5px" }}
                />
                Auditoria
              </Link>
            </li>

            {/* Opciones de la derecha (si deseas replicar la imagen) 
                        
                        <li className="nav-item">
                            <Link className="nav-link" to="/catalogo" style={{ color: whiteText }}>
                                <FontAwesomeIcon icon={faTags} style={{ marginRight: '5px' }} />
                                Catálogo
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/favoritos" style={{ color: whiteText }}>
                                <FontAwesomeIcon icon={faHeart} style={{ marginRight: '5px' }} />
                                Favoritos
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin" style={{ color: whiteText }}>
                                <FontAwesomeIcon icon={faUserShield} style={{ marginRight: '5px' }} />
                                Administrador
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/logout" style={{ color: whiteText }}>
                                <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '5px' }} />
                                Logout
                            </Link>
                        </li>
                        
                        */}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
