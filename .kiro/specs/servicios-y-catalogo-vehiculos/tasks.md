# Implementation Plan: Servicios y Catálogo de Vehículos

## Overview

Implementación incremental de dos nuevas secciones para la landing page de Central de Taxis Girardot: una sección informativa de servicios adicionales y un catálogo de vehículos en venta. Se crean utilidades de validación, componentes presentacionales, integración en la página principal y actualización de la navegación.

## Tasks

- [x] 1. Crear utilidades de validación y datos del catálogo
  - [x] 1.1 Crear el módulo de validación de vehículos (`src/lib/vehicleValidation.ts`)
    - Definir la interfaz `Vehicle` con los campos: id, marca, modelo, anio, tipoCombustible, foto, disponible
    - Implementar `validateVehicle(entry: unknown): Vehicle | null` que valida tipos, rangos y formato de foto
    - Implementar `parseVehicleCatalog(data: unknown): Vehicle[]` que filtra por `disponible === true` y limita a 6 resultados
    - Exportar también un helper `generateAltText(vehicle: Vehicle): string` que retorna `"${marca} ${modelo} ${anio}"` (max 125 chars)
    - _Requirements: 4.2, 4.4, 4.5, 4.7, 6.1_

  - [x] 1.2 Crear el archivo JSON de ejemplo (`public/data/vehiculos.json`)
    - Crear la estructura de directorios `public/data/`
    - Incluir al menos 3 vehículos de ejemplo con `disponible: true` y 1 con `disponible: false`
    - Asegurar que todos los campos cumplen las restricciones del schema definido en el diseño
    - _Requirements: 4.1, 4.2, 4.5_

  - [x] 1.3 Write property tests for vehicle validation (Property 1)
    - **Property 1: Vehicle validation accepts valid entries and rejects invalid ones**
    - Generar objetos Vehicle válidos con fast-check y verificar que `validateVehicle` retorna un Vehicle
    - Generar objetos con campos faltantes, tipos incorrectos o valores fuera de rango y verificar que retorna `null`
    - Ubicar en `src/__tests__/properties/vehicleCatalog.property.test.ts`
    - Mínimo 100 iteraciones
    - **Validates: Requirements 4.2, 4.5, 4.7**

  - [x] 1.4 Write property tests for catalog filtering (Property 2)
    - **Property 2: Catalog filtering preserves only available vehicles**
    - Generar arrays de Vehicle válidos con `disponible` aleatorio y verificar que `parseVehicleCatalog` retorna solo los disponibles en el mismo orden relativo
    - Ubicar en `src/__tests__/properties/vehicleCatalog.property.test.ts`
    - Mínimo 100 iteraciones
    - **Validates: Requirements 3.1, 4.4**

  - [x] 1.5 Write property tests for catalog cap (Property 3)
    - **Property 3: Catalog display is capped at 6 vehicles**
    - Generar arrays de 0–50 vehículos disponibles y verificar que el resultado tiene longitud `min(n, 6)` y contiene los primeros 6 del filtrado
    - Ubicar en `src/__tests__/properties/vehicleCatalog.property.test.ts`
    - Mínimo 100 iteraciones
    - **Validates: Requirements 3.3**

  - [x] 1.6 Write property tests for alt text generation (Property 4)
    - **Property 4: Alt text follows the accessibility pattern**
    - Generar Vehicle válidos con strings de longitud variable y verificar que el alt text sigue el patrón `"${marca} ${modelo} ${anio}"` y tiene max 125 caracteres
    - Ubicar en `src/__tests__/properties/vehicleCatalog.property.test.ts`
    - Mínimo 100 iteraciones
    - **Validates: Requirements 6.1**

- [x] 2. Checkpoint - Validar utilidades de validación
  - Ensure all tests pass, ask the user if questions arise.

- [x] 3. Implementar componentes de presentación
  - [x] 3.1 Crear componente `AdditionalServicesSection` (`src/components/AdditionalServicesSection.tsx`)
    - Renderizar `<section id="mas-servicios">` con `useScrollReveal` aplicado al contenedor
    - Incluir `<h2>` con título de sección y subtítulo descriptivo
    - Renderizar 6 tarjetas de servicio con iconos lucide-react y títulos `<h3>` usando `Card` de shadcn/ui
    - Implementar layout responsivo: 1 col (<768px), 2 cols (768–1023px), 3 cols (≥1024px)
    - Incluir CTA de WhatsApp con `href="https://wa.me/573183998101?text=..."`, `target="_blank"`, `rel="noopener noreferrer"` y `aria-label="Contactar por WhatsApp al 318 3998101"`
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 5.3, 5.5, 6.2, 6.3_

  - [x] 3.2 Crear componente `VehicleCard` (`src/components/VehicleCard.tsx`)
    - Recibir prop `vehicle: Vehicle`
    - Usar `Card`, `CardHeader`, `CardContent` de shadcn/ui
    - Mostrar imagen con alt text generado por `generateAltText` y handler `onError` que muestra placeholder "Sin foto disponible"
    - Mostrar marca, modelo, año y tipo de combustible en `<h3>` y contenido
    - _Requirements: 3.2, 3.7, 6.1, 6.4_

  - [x] 3.3 Crear componente `VehicleCatalogSection` (`src/components/VehicleCatalogSection.tsx`)
    - Renderizar `<section id="catalogo-vehiculos">` con `useScrollReveal` aplicado al contenedor
    - Fetch de `/data/vehiculos.json` en `useEffect` con manejo de errores (try/catch)
    - Validar datos con `parseVehicleCatalog` para filtrar y limitar a 6
    - Mostrar estado vacío: "No hay vehículos disponibles en este momento" cuando no hay vehículos válidos
    - Implementar layout responsivo: 1 col (<640px), 2 cols (640–1023px), 3 cols (≥1024px)
    - Incluir CTA de WhatsApp con `aria-label` apropiado
    - Incluir `<h2>` para título de sección y `<h3>` en cada tarjeta vía `VehicleCard`
    - _Requirements: 3.1, 3.3, 3.4, 3.5, 3.6, 4.3, 4.6, 4.8, 5.4, 5.6, 6.2, 6.4, 6.5, 6.6_

  - [x] 3.4 Write unit tests for AdditionalServicesSection
    - Verificar que renderiza 6 tarjetas de servicio con los títulos correctos
    - Verificar CTA WhatsApp con href, target, rel y aria-label correctos
    - Verificar estructura semántica h2/h3
    - _Requirements: 1.1, 1.2, 1.3, 6.2, 6.3_

  - [x] 3.5 Write unit tests for VehicleCard
    - Verificar que muestra marca, modelo, año y tipo de combustible
    - Verificar alt text correcto en la imagen
    - Verificar que onError muestra placeholder
    - _Requirements: 3.2, 3.7, 6.1_

  - [x] 3.6 Write unit tests for VehicleCatalogSection
    - Mock fetch con datos válidos y verificar renderizado de tarjetas
    - Mock fetch con JSON inválido y verificar estado vacío
    - Mock fetch con array vacío y verificar mensaje "No hay vehículos disponibles en este momento"
    - _Requirements: 3.1, 3.4, 4.6, 4.8_

- [x] 4. Checkpoint - Validar componentes de presentación
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Integración y navegación
  - [x] 5.1 Actualizar Header con enlace "Más Servicios" (`src/components/Header.tsx`)
    - Agregar `{ name: "Más Servicios", anchor: "#mas-servicios" }` inmediatamente después de "Servicios" en `navItems`
    - Agregar el mismo item en `allNavItems` en la posición correspondiente (después de "Servicios")
    - El comportamiento de scroll y navegación inter-página se hereda del patrón `href()` existente
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [x] 5.2 Integrar nuevas secciones en `Index.tsx` (`src/pages/Index.tsx`)
    - Importar `AdditionalServicesSection` y `VehicleCatalogSection`
    - Insertar `<AdditionalServicesSection />` después de `<ServicesSection />` y antes de `<VehicleCatalogSection />`
    - Insertar `<VehicleCatalogSection />` después de `<AdditionalServicesSection />` y antes de `<BenefitsSection />`
    - _Requirements: 5.1, 5.2_

  - [x] 5.3 Write integration tests for section order and navigation
    - Verificar que el orden de secciones en Index es: ServicesSection → AdditionalServicesSection → VehicleCatalogSection → BenefitsSection
    - Verificar que el link "Más Servicios" en Header tiene href correcto
    - _Requirements: 5.1, 5.2, 2.1_

- [x] 6. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- All content is in Spanish (Colombia) as per the product requirements
- The project uses `vitest run` for test execution (not watch mode)
- fast-check v4.7.0 is already installed as a dev dependency

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["1.3", "1.4", "1.5", "1.6"] },
    { "id": 2, "tasks": ["3.1", "3.2", "3.3"] },
    { "id": 3, "tasks": ["3.4", "3.5", "3.6", "5.1"] },
    { "id": 4, "tasks": ["5.2"] },
    { "id": 5, "tasks": ["5.3"] }
  ]
}
```
