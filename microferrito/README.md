# microferrito - Frontend de Ferretería

Este es el repositorio del frontend de la aplicación web de ferretería "microferrito", construida con React, TypeScript y Vite. Este proyecto ofrece una interfaz de usuario interactiva y responsiva para los clientes y el personal de la ferretería.

## Características Principales

*   **Gestión de Productos:** Navegación, búsqueda y visualización detallada de productos.
*   **Carro de Compras:** Funcionalidad para añadir, eliminar y gestionar productos en el carro.
*   **Autenticación de Usuarios:** Registro e inicio de sesión para clientes y administradores.
*   **Perfiles de Usuario:** Gestión de información de perfil, historial de compras, favoritos.
*   **Categorías y Subcategorías:** Organización de productos por categorías.
*   **Descuentos y Promociones:** Visualización y aplicación de descuentos.
*   **Comentarios y Valoraciones:** Interacción de usuarios con los productos.
*   **Facturación y Envíos:** Proceso de compra, métodos de pago y seguimiento de envíos.
*   **Panel de Administración:** (Si aplica) Funcionalidades para la gestión de productos, usuarios, pedidos, etc.

## Tecnologías Utilizadas

*   **Framework:** [React](https://reactjs.org/)
*   **Construcción:** [Vite](https://vitejs.dev/)
*   **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
*   **Estilos:** [Bootstrap](https://getbootstrap.com/)
*   **Peticiones HTTP:** [Axios](https://axios-http.com/)
*   **Rutas:** [React Router DOM](https://reactrouter.com/web/guides/quick-start)
*   **Iconos:** [Font Awesome](https://fontawesome.com/)
*   **Generación de PDF:** [html2pdf.js](https://github.com/eKoopmans/html2pdf.js)

## Estructura del Proyecto

```
microferrito/
├── public/                # Archivos estáticos
├── src/
│   ├── assets/            # Imágenes, iconos, etc.
│   ├── components/        # Componentes reutilizables de React
│   ├── environments/      # Variables de entorno por ambiente
│   ├── interfaces/        # Definiciones de interfaces TypeScript
│   ├── services/          # Lógica para interactuar con el backend (APIs)
│   ├── App.css            # Estilos globales de la aplicación
│   ├── App.tsx            # Componente principal de la aplicación
│   ├── index.css          # Estilos base
│   ├── main.tsx           # Punto de entrada de la aplicación
│   └── vite-env.d.ts      # Definiciones de tipos para Vite
├── .eslintrc.cjs          # Configuración de ESLint
├── .gitignore             # Archivos y carpetas a ignorar por Git
├── index.html             # Archivo HTML principal
├── package.json           # Dependencias y scripts del proyecto
├── README.md              # Este archivo
├── tsconfig.json          # Configuración de TypeScript
├── tsconfig.node.json     # Configuración de TypeScript para Node.js
└── vite.config.ts         # Configuración de Vite
```

## Configuración y Ejecución

Para levantar el proyecto en tu máquina local, sigue los siguientes pasos:

### Prerrequisitos

Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior) y [npm](https://www.npmjs.com/) (o Yarn, pnpm).

### Instalación

1.  Clona el repositorio:
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd microferrito
    ```
2.  Instala las dependencias del proyecto:
    ```bash
    npm install
    # o yarn install
    # o pnpm install
    ```

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto (al mismo nivel que `package.json`) y define las variables de entorno necesarias. Ejemplo:

```dotenv
VITE_API_BASE_URL=http://localhost:3000/api
```

### Ejecución del Proyecto

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

Esto iniciará la aplicación en modo de desarrollo y podrás acceder a ella en `http://localhost:5173` (o el puerto que Vite asigne).

### Construcción para Producción

Para generar la versión optimizada para producción:

```bash
npm run build
```

Los archivos estáticos generados se encontrarán en la carpeta `dist/`.

### Linting

Para ejecutar el linter y verificar problemas de estilo y errores:

```bash
npm run lint
```

## Contribución

Si deseas contribuir a este proyecto, por favor, sigue estas guías:

1.  Haz un "fork" del repositorio.
2.  Crea una nueva rama (`git checkout -b feature/nombre-caracteristica`).
3.  Realiza tus cambios y asegúrate de que pasen las pruebas.
4.  Haz commit de tus cambios (`git commit -m 'feat: Añade nueva característica'`).
5.  Sube tus cambios a tu "fork" (`git push origin feature/nombre-caracteristica`).
6.  Abre un "pull request" al repositorio original.

## Licencia

Este proyecto está bajo la licencia [ISC](https://opensource.org/licenses/ISC).

---
