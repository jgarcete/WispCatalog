Wisp - Product Catalog

Aplicacion web para la exploracion y gestion de productos, desarrollada como prueba tecnica.

Herramientas utilizadas
- Framework: Next.js 16 (App Router)
- Lenguaje: TypeScript
- Estilos: Tailwind CSS v4, CSS Custom
- Estado Global: Redux Toolkit
- Peticiones HTTP: Axios
- Animaciones: Framer Motion
- Gestor de paquetes: pnpm

Como correr el proyecto

1. Instalar las dependencias del proyecto:
pnpm install

2. Ejecutar el servidor de desarrollo local:
pnpm run dev

3. Compilar para produccion:
pnpm build
pnpm start

El proyecto estara accesible en http://localhost:3000

Arquitectura del Proyecto

El proyecto utiliza una arquitectura de componentes desacoplada orientada a la mantenibilidad:
- Comunicacion externa: La instancia de Axios y las llamadas a la API (DummyJSON) estan aisladas en el directorio de rutas. 
- Manejo de estado: Redux Toolkit administra la memoria global. Se aplico un patron de estado normalizado (diccionario de entidades) para los favoritos.
- Modo Claro/Oscuro: Se desarrollo un componente invisible (ThemeApplier) que escucha el estado de Redux (themeSlice) e inyecta dinamicamente el atributo `data-theme='light'` en la etiqueta `:root` (html). El diseño se adapta mediante la sobreescritura nativa de variables CSS.
- Renderizado hibrido: Se aprovecha el App Router de Next.js, encapsulando la interactividad (hooks, estado local) unicamente donde es necesaria ("use client").

Cumplimiento de Requerimientos

- Listado de productos: Integracion con la API de DummyJSON para obtener el catalogo. Se implemento scroll infinito nativo (Intersection Observer) que solicita la paginacion correspondiente al servidor.
- Buscador de productos: Busqueda en tiempo real contra la API, protegiendo la carga de red mediante un debounce de 300ms.
- Pagina de detalle: Ruta dinamica (/product/[id]) con su propio ciclo de peticion, manejando estados de carga (skeleton) y error de forma aislada.
- Gestion de favoritos: Funcionalidad de agregar/eliminar centralizada en Redux y sincronizada con el localStorage del navegador para mantener la persistencia al recargar.
- Interfaz y responsividad: Maquetacion hibrida utilizando Tailwind CSS para grillas fluidas y CSS puro para efectos avanzados (transiciones, glassmorphism), asegurando la compatibilidad en moviles, tablets y escritorio.
