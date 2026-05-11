# Plan de Implementación: Rediseño Visual — Central de Taxis Girardot

## Resumen

Transformación visual completa de la landing page manteniendo el mismo contenido, imágenes y funcionalidad. Se actualizan design tokens, tipografía (Inter), espaciado, componentes y animaciones para lograr una estética moderna y minimalista.

## Tareas

- [x] 1. Fundación: Instalar fuente y actualizar sistema de diseño
  - [x] 1.1 Instalar `@fontsource/inter` e importar en `src/main.tsx`
    - Ejecutar `npm install @fontsource/inter`
    - Agregar `import '@fontsource/inter'` en `src/main.tsx`
    - _Requisitos: 2.1, 2.2, 15.1_

  - [x] 1.2 Actualizar CSS variables en `src/index.css`
    - Reemplazar TODOS los tokens `:root` con la nueva paleta (--primary: 43 96% 56%, --foreground: 20 14% 12%, --background: 40 33% 99%, etc.)
    - Agregar nuevos tokens: --surface, --surface-elevated, --primary-soft, --text-heading, --text-body
    - Actualizar tokens taxi (--taxi-yellow, --taxi-yellow-dark, --taxi-yellow-light, --taxi-black, --taxi-gray, --taxi-light, --primary-text)
    - Actualizar sombras (--shadow-card, --shadow-elevated, --shadow-button: none)
    - Actualizar --transition-smooth a `all 0.5s cubic-bezier(0.4, 0, 0.2, 1)`
    - Actualizar --radius a `1rem`
    - _Requisitos: 1.1, 1.2, 1.3_

  - [x] 1.3 Actualizar `tailwind.config.ts`
    - Agregar `fontFamily: { sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'] }`
    - Agregar colores: surface (DEFAULT, elevated), primary-soft, text-heading, text-body
    - Agregar spacing: '18': '4.5rem', '22': '5.5rem'
    - Agregar borderRadius: '2xl': '1rem', '3xl': '1.5rem', '4xl': '2rem'
    - Actualizar keyframes: fade-in (translateY 20px), fade-in-up (translateY 40px), slide-in-right (translateX 20px)
    - Actualizar animations con duraciones y easing correctos
    - _Requisitos: 2.1, 3.1, 3.3_

  - [x] 1.4 Actualizar variantes de botón en `src/components/ui/button.tsx`
    - Cambiar base: eliminar `rounded-md`, agregar `duration-500`
    - Variante default: `rounded-full`, eliminar shadow-md, hover:shadow-lg, transform, hover:-translate-y
    - Variante outline: `rounded-full border-2 border-foreground/20`, eliminar shadow y translate
    - Variante secondary: `rounded-full`, eliminar shadow y translate
    - Variante hero: `rounded-full`, eliminar shadow-lg, hover:shadow-xl, transform, hover:-translate-y-1
    - Variante whatsapp: `rounded-full`, eliminar shadow y translate
    - Variante call: `rounded-full`, eliminar shadow, border y translate
    - Actualizar sizes: default `h-11 px-6`, lg `h-13 px-8 py-4 text-base`
    - _Requisitos: 13.1, 13.2, 13.3, 13.4_

  - [x] 1.5 Actualizar clases utilitarias en `src/index.css`
    - `.taxi-card`: cambiar a `bg-surface-elevated rounded-2xl p-8 lg:p-10 border border-border/50 hover:border-primary/20 transition-all duration-500` (sin sombra)
    - `.section-padding`: cambiar a `px-6 lg:px-8 py-24 lg:py-32`
    - `.taxi-button`: cambiar a `bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-500 font-semibold rounded-full px-8 py-4` (sin sombra ni translate)
    - Agregar nuevas clases: `.overline`, `.section-heading`, `.section-subheading`, `.icon-container`, `.glass`
    - _Requisitos: 3.1, 3.3, 6.2, 6.4, 13.4_

  - [ ]* 1.6 Actualizar tests de propiedad de contraste
    - Actualizar `src/__tests__/properties/contrast.property.test.ts` con los nuevos valores HSL
    - Verificar que --primary-text (38 92% 30%) mantiene contraste ≥ 4.5:1 contra --background (40 33% 99%)
    - Verificar que --text-body (20 10% 40%) tiene contraste suficiente sobre --background
    - **Propiedad 1: Contraste WCAG AA**
    - **Valida: Requisitos 14.1, 14.2, 14.3, 14.4**

- [x] 2. Checkpoint — Verificar fundación
  - Asegurar que el build compila sin errores, que los tests pasan, y preguntar al usuario si hay dudas.

- [x] 3. Rediseño del Header
  - [x] 3.1 Actualizar `src/components/Header.tsx`
    - Cambiar fondo a `bg-white/80 backdrop-blur-xl border-b border-border/30` (glassmorphism)
    - Cambiar altura a `h-20`, logo a `h-12`
    - Nav links: `text-sm font-medium text-foreground/70 hover:text-foreground`
    - Eliminar botón "Llama Ahora" del header desktop, dejar solo "Pide tu Taxi" con `rounded-full bg-primary`
    - Mantener ambos botones en menú mobile
    - _Requisitos: 4.1, 4.2, 4.3, 4.4_

  - [x] 3.2 Actualizar `pt-16` a `pt-20` en `<main>` de `src/pages/Index.tsx`
    - El header ahora es h-20, ajustar el padding-top del main
    - _Requisitos: 4.3_

- [x] 4. Rediseño del Hero Section
  - [x] 4.1 Actualizar `src/components/HeroSection.tsx`
    - Overlay: cambiar a `from-black/60 via-black/30 to-black/10`
    - Título: `text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white`
    - Subtítulo: `text-lg sm:text-xl text-white/80 max-w-xl` (más corto y elegante)
    - Un solo CTA principal: WhatsApp con `rounded-full` grande
    - Stats: convertir a strip horizontal sutil (sin cards glassmorphism, sin backdrop-blur)
    - Eliminar gradient-to-white inferior (`bg-gradient-to-t from-white to-transparent`)
    - _Requisitos: 5.1, 5.2, 5.3, 5.4, 5.5, 16.1, 16.2_

- [x] 5. Rediseño de Servicios
  - [x] 5.1 Actualizar `src/components/ServicesSection.tsx`
    - Agregar overline "NUESTROS SERVICIOS" con clase `.overline`
    - Título: usar `.section-heading`
    - Fondo de sección: `bg-surface` (alternancia)
    - Cards: usar estilo `.taxi-card` actualizado (sin hover:scale)
    - Iconos: contenedor `w-12 h-12 rounded-xl bg-primary-soft` (no circular)
    - Hover de cards: `hover:border-primary/20 transition-colors duration-500`
    - _Requisitos: 3.4, 6.1, 6.2, 6.3, 6.4_

- [x] 6. Rediseño de Contacto
  - [x] 6.1 Actualizar `src/components/ContactSection.tsx`
    - Form como protagonista: card elevada con `p-10 lg:p-12`
    - Inputs: `border-0 bg-surface rounded-xl`
    - Botón submit: `rounded-full` full-width
    - Info de contacto: lista compacta con iconos inline (simplificar layout)
    - Fondo de sección: `bg-background` (alternancia)
    - Mantener toda la lógica de validación y webhooks intacta
    - _Requisitos: 7.1, 7.2, 7.3, 7.4, 16.2, 16.4_

- [x] 7. Rediseño de Beneficios
  - [x] 7.1 Actualizar `src/components/BenefitsSection.tsx`
    - Cards: icono alineado a la izquierda (no centrado), tamaño `h-6 w-6`, color `text-primary`
    - Eliminar `hover:scale-105` de las cards
    - Imagen: `rounded-3xl` full-width, sin stat card flotante ("98%")
    - Fondo de sección: `bg-surface` (alternancia)
    - Usar `.section-heading` y `.overline` para títulos
    - _Requisitos: 3.4, 8.1, 8.2, 8.3, 16.1_

- [x] 8. Rediseño de Flota
  - [x] 8.1 Actualizar `src/components/FleetSection.tsx`
    - Imagen principal: `h-[500px] rounded-3xl overflow-hidden`
    - Tipos de vehículo: strip horizontal (icono + nombre + capacidad en una línea), no cards
    - CTA: ghost button "Ver más →" en lugar de botón hero grande
    - Fondo de sección: `bg-background` (alternancia)
    - _Requisitos: 3.4, 9.1, 9.2, 9.3, 16.1_

- [x] 9. Rediseño de Nosotros
  - [x] 9.1 Actualizar `src/components/AboutSection.tsx`
    - Stats: números grandes `text-5xl font-extrabold` sin card, solo número + label
    - Eliminar iconos decorativos de misión/visión
    - Simplificar misión/visión: eliminar backdrop-blur y gradients decorativos
    - Fondo de sección: `bg-surface` (alternancia)
    - Eliminar `hover:scale-105` de stat cards
    - _Requisitos: 3.4, 15.2, 16.3_

- [x] 10. Rediseño de Testimonios
  - [x] 10.1 Actualizar `src/components/TestimonialsSection.tsx`
    - Texto de testimonio: `text-2xl italic` como elemento destacado
    - Fotos: `w-16 h-16` circular (antes w-12 h-12)
    - Estrellas: más pequeñas, color primary sutil
    - Eliminar cards visibles: solo contenido con separador sutil
    - Fondo de sección: `bg-background` (alternancia)
    - _Requisitos: 3.4, 10.1, 10.2, 10.3, 10.4, 16.1_

- [x] 11. Checkpoint — Verificar componentes principales
  - Asegurar que el build compila sin errores, que los tests pasan, y preguntar al usuario si hay dudas.

- [x] 12. Rediseño de Mapa + Conductor
  - [x] 12.1 Actualizar `src/components/MapAndDriverSection.tsx`
    - Mapa: `rounded-2xl` con border sutil
    - Eliminar `animate-pulse` del indicador verde "SERVICIO ACTIVO 24/7"
    - Badge más sutil: `text-sm`
    - Fondo de sección: `bg-surface` (alternancia)
    - Mantener toda la lógica del formulario de conductor intacta
    - _Requisitos: 3.4, 16.2, 16.4_

- [x] 13. Rediseño del Footer
  - [x] 13.1 Actualizar `src/components/Footer.tsx`
    - Fondo: `bg-foreground` (negro cálido)
    - Layout: centrado, logo + links en una fila
    - Links: `text-sm text-white/60 hover:text-white`
    - Copyright: centrado, `text-xs text-white/40`
    - Facebook: icono sutil (no botón grande), mantener enlace
    - Eliminar descripción larga, solo esenciales
    - _Requisitos: 11.1, 11.2, 11.3, 11.4, 16.2_

- [x] 14. Rediseño de elementos flotantes
  - [x] 14.1 Actualizar `src/components/WhatsAppFloat.tsx`
    - Eliminar botón flotante de Facebook (mover al Footer)
    - WhatsApp: `bg-green-500/90 backdrop-blur-sm`, eliminar punto rojo `animate-pulse`
    - Posición: `bottom-8 right-8`
    - _Requisitos: 12.1, 12.2, 12.4_

  - [x] 14.2 Actualizar `src/components/ScrollToTop.tsx`
    - Estilo: `bg-foreground/80 backdrop-blur-sm text-white`
    - Posición: `bottom-8 left-8` (más separado del borde)
    - Eliminar `hover:scale-110 hover:-translate-y-1`
    - _Requisitos: 12.3, 13.2_

- [x] 15. Animaciones de scroll
  - [x] 15.1 Crear hook `src/hooks/useScrollReveal.ts`
    - Implementar con Intersection Observer (threshold: 0.1)
    - Clase inicial: `opacity-0 translate-y-8`
    - Clase activa: `opacity-100 translate-y-0`
    - Duración: 800ms, ease-out
    - Soporte para stagger en children
    - _Requisitos: 3.1, 15.3_

  - [x] 15.2 Aplicar `useScrollReveal` a las secciones principales
    - Integrar el hook en ServicesSection, ContactSection, BenefitsSection, FleetSection, AboutSection, TestimonialsSection, MapAndDriverSection
    - _Requisitos: 3.1_

- [x] 16. Checkpoint final — Verificación completa
  - Ejecutar build (`npm run build`) y verificar que compila sin errores
  - Ejecutar tests (`npm run test`) y verificar que todos pasan
  - Verificar que no hay errores de TypeScript
  - Preguntar al usuario si hay dudas o ajustes necesarios

- [ ]* 17. Tests de propiedad adicionales
  - [ ]* 17.1 Escribir test de propiedad para consistencia de botones
    - **Propiedad 5: Consistencia de botones**
    - Verificar que todas las variantes primarias incluyen `rounded-full`, no incluyen `hover:-translate-y`, y usan `duration-500`
    - **Valida: Requisitos 13.1, 13.2, 13.3**

  - [ ]* 17.2 Escribir test de propiedad para preservación de imágenes
    - **Propiedad 6: Preservación de imágenes**
    - Verificar que las 6 imágenes siguen referenciadas en sus componentes originales
    - **Valida: Requisito 16.1**

## Notas

- Las tareas marcadas con `*` son opcionales y pueden omitirse para un MVP más rápido
- Cada tarea referencia requisitos específicos para trazabilidad
- Los checkpoints aseguran validación incremental
- El rediseño es SOLO visual: no se modifica lógica de formularios, validación, webhooks ni navegación
- Mismas imágenes, mismo contenido textual, misma funcionalidad
