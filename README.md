Wisp - Product Catalog

Aplicacion web para la exploracion y gestion de productos, desarrollada como prueba tecnica.

Herramientas utilizadas
- Framework: Next.js
- Lenguaje: TypeScript
- Estilos: Tailwind CSS, CSS
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

Cumplimiento de Requerimientos

- Listado de productos: Integracion con la API de DummyJSON para obtener el catalogo. Se implemento scroll infinito nativo (Intersection Observer) que solicita la paginacion correspondiente al servidor.
- Buscador de productos: Busqueda en tiempo real contra la API, protegiendo la carga de red mediante un debounce de 300ms.
- Pagina de detalle: Ruta dinamica (/product/[id]) con su propio ciclo de peticion, manejando estados de carga (skeleton) y error de forma aislada.
- Gestion de favoritos: Funcionalidad de agregar/eliminar centralizada en Redux y sincronizada con el localStorage del navegador para mantener la persistencia al recargar.
- Interfaz y responsividad: Maquetacion hibrida utilizando Tailwind CSS para grillas fluidas y CSS puro para efectos avanzados (transiciones, glassmorphism), asegurando la compatibilidad en moviles, tablets y escritorio.

Extras

- Modo Claro/Oscuro: Se desarrollo un componente invisible (ThemeApplier) que escucha el estado de Redux (themeSlice) e inyecta dinamicamente el atributo `data-theme='light'` en la etiqueta `:root` (html). El modo oscuro es el predeterminado. La preferencia se persiste en localStorage y se restaura automaticamente al volver a la aplicacion. El cambio de tema se realiza mediante un boton en el navbar (icono de sol/luna) y el diseño se adapta mediante la sobreescritura nativa de variables CSS, sin necesidad de scripts bloqueantes.

- Pantalla de Bienvenida: La ruta raiz (/) presenta una pantalla de entrada con animaciones que introducen al usuario a la aplicacion. Se implemento una logica de redireccion mediante sessionStorage: si el usuario ya visito la app en la sesion actual, se redirige automaticamente al catalogo sin mostrar la bienvenida.

- Filtros de Categoria y Precio: Se implementaron dos filtros adicionales controlados por flags booleanos (SHOW_CATEGORY_FILTER, SHOW_PRICE_FILTER) que permiten habilitarlos o deshabilitarlos sin afectar el funcionamiento base de la aplicacion. El filtro de categoria utiliza el endpoint nativo de DummyJSON (/products/category/{categoria}). El filtro de precio se resolvio como un ordenamiento local (menor a mayor / mayor a menor) ya que la API externa no ofrece un endpoint para filtrar o sortear por precio. La busqueda por texto y el filtro por categoria son mutuamente excluyentes para mantener la coherencia con la API.

Decisiones Tecnicas

- Persistencia manual: Se implemento la persistencia de favoritos y tema usando localStorage y store.subscribe() en lugar de redux-persist, para evitar problemas de compatibilidad con Next.js y tener control sobre que datos se guardan.

- Estado normalizado para favoritos: Los favoritos se almacenan como un diccionario (ids + entities) en vez de un array simple. Esto permite verificar si un producto es favorito de forma directa por su ID sin recorrer toda la lista.

- Instancia centralizada de Axios: Se creo una sola instancia de Axios con baseURL y timeout preconfigurados. Los componentes nunca interactuan directamente con la URL de la API.

- Debounce manual: El buscador usa setTimeout y useRef para esperar 300ms despues de que el usuario deja de escribir antes de hacer la peticion, evitando llamadas innecesarias al servidor sin dependencias externas.

- Scroll infinito con Intersection Observer: Se utilizo la API nativa del navegador para detectar cuando el usuario se acerca al final de la lista y cargar automaticamente la siguiente pagina.

- Calculo de precios: El precio original se obtiene con la formula: precio / (1 - descuento / 100). El porcentaje de descuento se redondea y solo se muestra si es mayor a 0.

- Cancelacion de peticiones: El hook useProductDetail usa una variable de control para evitar actualizar el estado si el usuario navega hacia atras antes de recibir la respuesta del servidor.
