# Requirements Document

## Introduction

Extensión de la landing page de Central de Taxis Girardot para incluir dos nuevas funcionalidades: una sección informativa de servicios adicionales (venta de vehículos, trámites, SOAT, seguros, etc.) y un catálogo de vehículos en venta con gestión simplificada mediante archivo JSON. Ambas secciones se integran visualmente con el diseño existente y están orientadas a los habitantes de Girardot y municipios aledaños.

## Glossary

- **Landing_Page**: Página principal de Central de Taxis Girardot desplegada en Vercel
- **Sección_Servicios_Adicionales**: Nueva sección de la landing page que lista los servicios complementarios de la empresa (no transporte)
- **Catálogo_Vehículos**: Sección de la landing page que muestra vehículos disponibles para la venta
- **Archivo_Catálogo**: Archivo JSON ubicado en el repositorio que contiene los datos de los vehículos en venta
- **Administrador**: Dueño del negocio que gestiona el contenido del catálogo de vehículos
- **Visitante**: Usuario que navega la landing page buscando servicios o vehículos
- **CTA_Contacto**: Botón de llamada a la acción que dirige al visitante a WhatsApp o teléfono para contactar a la empresa
- **Tarjeta_Vehículo**: Componente visual que muestra la información de un vehículo individual en el catálogo

## Requirements

### Requirement 1: Sección de Servicios Adicionales

**User Story:** Como visitante, quiero ver los servicios adicionales que ofrece Central de Taxis Girardot, para saber que también puedo tramitar SOAT, comprar vehículos o hacer trámites de tránsito a través de ellos.

#### Acceptance Criteria

1. THE Landing_Page SHALL display the Sección_Servicios_Adicionales containing exactly six services: Venta de vehículos nuevos y usados, Trámites ante el tránsito, Chatarrización, Crédito para compra de vehículo, Venta de SOAT, and Seguros todo riesgo
2. THE Landing_Page SHALL display each service in the Sección_Servicios_Adicionales with a distinct icon from the lucide-react library and a title of no more than 40 characters
3. THE Sección_Servicios_Adicionales SHALL include one CTA_Contacto that opens WhatsApp in a new tab using the URL format "https://wa.me/573183998101" with a pre-filled message referencing additional services
4. THE Sección_Servicios_Adicionales SHALL use the same design tokens (CSS variables), Tailwind CSS utility classes, and shadcn/ui Card components already used in other sections of the Landing_Page
5. THE Sección_Servicios_Adicionales SHALL be responsive, displaying services in a single column on viewports below 768px, two columns from 768px to 1023px, and three columns from 1024px to 1920px, with no horizontal overflow at any width from 320px to 1920px
6. WHEN a visitante activates the CTA_Contacto, THE Landing_Page SHALL open the WhatsApp link with target="_blank" and rel="noopener noreferrer" attributes

### Requirement 2: Navegación hacia Servicios Adicionales

**User Story:** Como visitante, quiero acceder fácilmente a la sección de servicios adicionales desde la navegación, para encontrar rápidamente la información que necesito.

#### Acceptance Criteria

1. THE Landing_Page SHALL include a navigation link labeled "Más Servicios" in both the desktop navigation bar and the mobile navigation menu that targets the anchor `#mas-servicios` corresponding to Sección_Servicios_Adicionales
2. WHEN a visitante clicks the "Más Servicios" navigation link while on the home page, THE Landing_Page SHALL smooth-scroll the viewport to the element with id "mas-servicios" using the same scroll behavior as existing navigation links
3. WHEN a visitante clicks the "Más Servicios" navigation link while on a page other than home, THE Landing_Page SHALL navigate to the home page and scroll to the element with id "mas-servicios"
4. THE Landing_Page SHALL display the "Más Servicios" navigation link after the existing "Servicios" link in both the desktop and mobile navigation menus

### Requirement 3: Catálogo de Vehículos en Venta

**User Story:** Como visitante, quiero ver los vehículos disponibles para la venta con su información relevante, para evaluar opciones sin tener que llamar.

#### Acceptance Criteria

1. THE Catálogo_Vehículos SHALL display a Tarjeta_Vehículo for each vehicle in the Archivo_Catálogo that has the field `disponible` set to `true`
2. THE Tarjeta_Vehículo SHALL display the following attributes: photo, brand (marca), model (modelo), year (año), and fuel type (tipo de combustible)
3. THE Catálogo_Vehículos SHALL display a maximum of 6 vehicles at one time, selecting the first 6 available vehicles in the order they appear in the Archivo_Catálogo
4. WHEN there are no vehicles with `disponible` set to `true` in the Archivo_Catálogo, THE Catálogo_Vehículos SHALL display a message indicating that there are no vehicles currently available
5. THE Catálogo_Vehículos SHALL include at least one CTA_Contacto that opens a WhatsApp conversation using the URL format `https://wa.me/573183998101`
6. THE Catálogo_Vehículos SHALL be responsive, displaying vehicles in a single column on viewports below 640px, two columns from 640px to 1023px, and three columns from 1024px and above
7. IF a vehicle photo fails to load, THEN THE Tarjeta_Vehículo SHALL display a placeholder image indicating that no photo is available instead of showing a broken image

### Requirement 4: Gestión del Catálogo mediante Archivo JSON

**User Story:** Como administrador, quiero actualizar los vehículos en venta editando un archivo simple, para no depender de un desarrollador cada vez que cambia el inventario.

#### Acceptance Criteria

1. THE Archivo_Catálogo SHALL be a JSON file located in the public directory of the project at the path `public/data/vehiculos.json`
2. THE Archivo_Catálogo SHALL define each vehicle with the following fields: id (string, unique, max 36 characters), marca (string, max 50 characters), modelo (string, max 50 characters), anio (number, integer between 2000 and the current year inclusive), tipoCombustible (string, one of: "gasolina", "diesel", "gas", "eléctrico", "híbrido"), foto (string, a URL starting with "http://" or "https://", or a relative path starting with "/"), and disponible (boolean)
3. WHEN the Administrador adds, removes, or modifies a vehicle entry in the Archivo_Catálogo and a new deployment completes, THE Catálogo_Vehículos SHALL reflect those changes on the next page load
4. THE Catálogo_Vehículos SHALL display only vehicle entries where the field `disponible` equals `true`, up to a maximum of 50 entries in the file
5. THE Archivo_Catálogo SHALL support vehicle photos referenced as absolute URLs (external image hosting starting with "http://" or "https://") or as relative paths to images in the public directory (starting with "/")
6. IF the Archivo_Catálogo contains invalid JSON, THEN THE Catálogo_Vehículos SHALL display the empty state message "No hay vehículos disponibles en este momento" instead of crashing
7. IF a vehicle entry in the Archivo_Catálogo is missing any required field or contains a field with an incorrect data type, THEN THE Catálogo_Vehículos SHALL skip that entry and display the remaining valid vehicles
8. IF all entries in the Archivo_Catálogo are invalid or the file is empty, THEN THE Catálogo_Vehículos SHALL display the empty state message "No hay vehículos disponibles en este momento"

### Requirement 5: Integración con la Estructura Existente

**User Story:** Como visitante, quiero que las nuevas secciones se integren naturalmente en la página, para tener una experiencia de navegación coherente.

#### Acceptance Criteria

1. THE Landing_Page SHALL render the Sección_Servicios_Adicionales immediately after the existing ServicesSection component (id="servicios") and before BenefitsSection in the component order of Index.tsx
2. THE Landing_Page SHALL render the Catálogo_Vehículos immediately after the Sección_Servicios_Adicionales and before BenefitsSection in the component order of Index.tsx
3. THE Sección_Servicios_Adicionales SHALL apply the useScrollReveal hook to its container element, producing an opacity transition from 0 to 1 and a translateY transition from 20px to 0 over 0.8 seconds with ease-out timing, triggered when 10% of the section is visible in the viewport
4. THE Catálogo_Vehículos SHALL apply the useScrollReveal hook to its container element, producing an opacity transition from 0 to 1 and a translateY transition from 20px to 0 over 0.8 seconds with ease-out timing, triggered when 10% of the section is visible in the viewport
5. THE Sección_Servicios_Adicionales SHALL include a unique id attribute on its root section element so that it is reachable via anchor link navigation consistent with the existing Landing_Page sections
6. THE Catálogo_Vehículos SHALL include a unique id attribute on its root section element so that it is reachable via anchor link navigation consistent with the existing Landing_Page sections

### Requirement 6: Accesibilidad del Catálogo y Servicios

**User Story:** Como visitante con discapacidad visual, quiero que las nuevas secciones sean accesibles, para poder navegar el contenido con un lector de pantalla.

#### Acceptance Criteria

1. THE Tarjeta_Vehículo SHALL include alt text in vehicle photos following the pattern "[marca] [modelo] [año]" with a maximum length of 125 characters
2. THE CTA_Contacto buttons SHALL include an aria-label attribute that states the communication channel and the phone number (e.g., "Contactar por WhatsApp al 318 3998101")
3. THE Sección_Servicios_Adicionales SHALL use semantic HTML headings starting at h2 for the section title, h3 for each service name, with no heading levels skipped
4. THE Catálogo_Vehículos SHALL use semantic HTML headings starting at h2 for the section title, h3 for each vehicle card title, with no heading levels skipped
5. THE Catálogo_Vehículos SHALL ensure that all interactive elements (links and buttons) are reachable via keyboard Tab navigation and display a visible focus indicator with a minimum contrast ratio of 3:1 against adjacent colors
6. WHILE a section contains text content over images or colored backgrounds, THE Sistema SHALL maintain a color contrast ratio of at least 4.5:1 for normal text and 3:1 for large text (18px or above) per WCAG 2.1 AA
