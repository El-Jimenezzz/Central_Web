# Plan de Implementación: Auditoría y Mejoras de la Landing Page

## Resumen

Plan de tareas para la auditoría y mejora de la landing page de Central de Taxis Girardot. Las tareas están organizadas en tres fases según prioridad: (1) correcciones críticas, (2) mejoras funcionales, (3) mejoras visuales. Cada tarea es atómica y referencia los requisitos y archivos afectados.

## Tareas

- [x] 1. Eliminar archivos no utilizados y dependencias muertas
  - [x] 1.1 Eliminar componentes UI no utilizados de `src/components/ui/`
    - Eliminar los siguientes archivos: `accordion.tsx`, `alert-dialog.tsx`, `alert.tsx`, `aspect-ratio.tsx`, `avatar.tsx`, `badge.tsx`, `breadcrumb.tsx`, `calendar.tsx`, `carousel.tsx`, `chart.tsx`, `checkbox.tsx`, `collapsible.tsx`, `command.tsx`, `context-menu.tsx`, `dialog.tsx`, `drawer.tsx`, `dropdown-menu.tsx`, `form.tsx`, `hover-card.tsx`, `input-otp.tsx`, `label.tsx`, `menubar.tsx`, `navigation-menu.tsx`, `pagination.tsx`, `popover.tsx`, `progress.tsx`, `radio-group.tsx`, `resizable.tsx`, `scroll-area.tsx`, `select.tsx`, `separator.tsx`, `sheet.tsx`, `sidebar.tsx`, `skeleton.tsx`, `slider.tsx`, `switch.tsx`, `table.tsx`, `tabs.tsx`, `toggle-group.tsx`, `toggle.tsx`
    - Conservar únicamente: `button.tsx`, `input.tsx`, `textarea.tsx`, `card.tsx`, `sonner.tsx`, `tooltip.tsx`
    - _Requisitos: R6 (6.1, 6.2, 6.3)_
  - [x] 1.2 Eliminar sistema Radix Toast completo
    - Eliminar `src/components/ui/toast.tsx`, `src/components/ui/toaster.tsx`, `src/components/ui/use-toast.ts`
    - Eliminar `src/hooks/use-toast.ts`
    - _Requisitos: R7 (7.1, 7.2)_
  - [x] 1.3 Eliminar hook y CSS residuales
    - Eliminar `src/hooks/use-mobile.tsx` (no importado por ningún componente)
    - Eliminar `src/App.css` (estilos residuales de plantilla Vite, no importado)
    - _Requisitos: R6 (6.2), R3 (3.1, 3.2)_
  - [x] 1.4 Eliminar assets no referenciados
    - Eliminar de `src/assets/`: `passenger-happy.jpg`, `logo1.png`
    - Eliminar de `public/`: `logo2.png`, `car.svg`, `taxi.ico`, `favicon.ico`, `Gemini_Generated_Image_4z49as4z49as4z49.png`, `lovable-uploads/429b1394-8e28-4ec0-bf48-2b0aee2b0439.png`, `placeholder.svg`
    - Eliminar el directorio `public/lovable-uploads/` si queda vacío
    - _Requisitos: R8 (8.1, 8.2, 8.3, 8.4)_
  - [x] 1.5 Eliminar dependencias npm no utilizadas
    - Ejecutar `npm uninstall` para las dependencias de producción: `@hookform/resolvers @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-toggle @radix-ui/react-toggle-group @tanstack/react-query cmdk date-fns embla-carousel-react input-otp next-themes react-day-picker react-hook-form react-resizable-panels recharts vaul zod`
    - Ejecutar `npm uninstall` para las devDependencies: `lovable-tagger @tailwindcss/typography`
    - **Nota:** `next-themes` se elimina aquí porque se simplificará `sonner.tsx` en la tarea 1.6
    - _Requisitos: R5 (5.1, 5.2, 5.3)_
  - [x] 1.6 Simplificar `src/components/ui/sonner.tsx` y unificar toast en `src/App.tsx`
    - En `sonner.tsx`: eliminar import de `useTheme` de `next-themes`, hardcodear `theme="light"` en el componente `<Sonner>`
    - En `src/App.tsx`: eliminar `<Toaster />` (Radix), eliminar import de `Toaster` desde `@/components/ui/toaster`, eliminar `QueryClientProvider` y `QueryClient` de `@tanstack/react-query`, mantener solo `<Sonner />` como sistema de toast
    - Re-exportar `toast` desde `sonner.tsx` para uso directo en formularios
    - _Requisitos: R7 (7.1, 7.2, 7.3, 7.4)_

- [x] 2. Checkpoint — Verificar que el build compila sin errores
  - Ejecutar `npm run build` y confirmar que no hay errores de importación tras las eliminaciones
  - Preguntar al usuario si hay dudas

- [x] 3. Corregir componentes con problemas estructurales
  - [x] 3.1 Integrar FleetSection en `src/pages/Index.tsx`
    - Agregar import de `FleetSection` desde `@/components/FleetSection`
    - Renderizar `<FleetSection />` entre `<BenefitsSection />` y `<AboutSection />` dentro de `<main>`
    - Verificar que `FleetSection.tsx` ya tiene `id="flota"` en su `<section>`
    - _Requisitos: R1 (1.1, 1.2, 1.3)_
  - [x] 3.2 Limpiar imports no usados en `src/components/Footer.tsx`
    - Eliminar importaciones de `Car`, `Phone`, `MessageCircle`, `Instagram`, `Twitter` de `lucide-react`
    - Mantener solo `Facebook` que sí se usa en el JSX
    - _Requisitos: R2 (2.1, 2.3)_
  - [x] 3.3 Renderizar quickLinks en `src/components/Footer.tsx`
    - Actualizar el array `quickLinks` para incluir todas las secciones: Inicio, Servicios, Contacto, Beneficios, Flota, Nosotros, Testimonios, Trabaja con nosotros
    - Renderizar `quickLinks` como enlaces `<a>` funcionales con `href` apuntando a cada sección
    - _Requisitos: R2 (2.2), R16 (16.2, 16.4)_
  - [x] 3.4 Corregir doble padding en `src/components/DriverForm.tsx`
    - Cambiar el elemento raíz de `<section className="section-padding bg-background">` a `<div>` sin clases de padding/container
    - Eliminar `<div className="container mx-auto">` y `<div className="max-w-2xl mx-auto">` internos redundantes (el contenedor lo provee `MapAndDriverSection`)
    - _Requisitos: R9 (9.1, 9.2)_
  - [x] 3.5 Corregir solapamiento del Header con contenido en `src/pages/Index.tsx`
    - Agregar `className="pt-16"` al elemento `<main>` para compensar el header fijo de 64px
    - _Requisitos: R12 (12.1, 12.2)_

- [x] 4. Implementar validación compartida y mejorar formularios
  - [x] 4.1 Crear `src/lib/validation.ts` con funciones de validación
    - Implementar `isValidPhone(phone: string): boolean` — valida mínimo 7 dígitos, máximo 15, permite `+` y espacios
    - Implementar `isAtLeast12HoursAhead(date: string, time: string): boolean` — valida que fecha/hora combinadas estén al menos 12 horas en el futuro
    - _Requisitos: R18 (18.3, 18.4, 18.5)_
  - [x]* 4.2 Escribir test de propiedad para validación de teléfono
    - **Property 1: Validación de teléfono acepta formatos válidos y rechaza inválidos**
    - Instalar `fast-check` y `vitest` como devDependencies, configurar vitest en `vite.config.ts`
    - Crear `src/__tests__/properties/validation.property.test.ts`
    - Generar strings con 7+ dígitos y caracteres permitidos → `isValidPhone` retorna `true`
    - Generar strings con <7 dígitos o caracteres no permitidos → `isValidPhone` retorna `false`
    - **Valida: Requisitos 18.3, 18.4**
  - [x]* 4.3 Escribir test de propiedad para validación de fecha/hora
    - **Property 2: Validación de fecha/hora rechaza fechas menores a 12 horas en el futuro**
    - Crear test en `src/__tests__/properties/validation.property.test.ts`
    - Generar pares (fecha, hora) < 12h en el futuro → `isAtLeast12HoursAhead` retorna `false`
    - Generar pares (fecha, hora) >= 12h en el futuro → `isAtLeast12HoursAhead` retorna `true`
    - **Valida: Requisito 18.5**
  - [x] 4.4 Crear `.env.example` y archivo `.env` con variables de entorno para webhooks
    - Crear `.env.example` con `VITE_WEBHOOK_RESERVA` y `VITE_WEBHOOK_CONDUCTOR`
    - Crear `.env` con los valores reales de los webhooks
    - Agregar `.env` a `.gitignore` si no está ya
    - Actualizar `src/vite-env.d.ts` para tipar `ImportMetaEnv` con las nuevas variables
    - _Requisitos: R18 (18.6)_
  - [x] 4.5 Mejorar UX del formulario de reserva en `src/components/ContactSection.tsx`
    - Reemplazar `alert()` por `toast()` de Sonner (importar `toast` desde `@/components/ui/sonner`) para éxito y error
    - Agregar validación de teléfono con `isValidPhone` antes del envío, mostrar mensaje inline si es inválido
    - Agregar revalidación de fecha/hora con `isAtLeast12HoursAhead` al momento del envío (no solo al renderizar)
    - Reemplazar URL hardcodeada del webhook por `import.meta.env.VITE_WEBHOOK_RESERVA`
    - _Requisitos: R18 (18.1, 18.2, 18.3, 18.5, 18.6)_
  - [x] 4.6 Mejorar UX del formulario de conductor en `src/components/DriverForm.tsx`
    - Reemplazar `useToast` (Radix) por `toast` de Sonner (importar desde `@/components/ui/sonner`)
    - Agregar validación de teléfono con `isValidPhone` antes del envío, mostrar mensaje inline si es inválido
    - Reemplazar URL hardcodeada del webhook por `import.meta.env.VITE_WEBHOOK_CONDUCTOR`
    - _Requisitos: R18 (18.4, 18.6)_

- [x] 5. Checkpoint — Verificar formularios y validación
  - Ejecutar `npm run build` para confirmar que compila sin errores
  - Preguntar al usuario si hay dudas

- [x] 6. Completar navegación y SEO
  - [x] 6.1 Ampliar navegación del Header en `src/components/Header.tsx`
    - Actualizar `navItems` para incluir todas las secciones: Inicio, Servicios, Contacto, Beneficios, Flota, Nosotros, Testimonios, Trabaja con nosotros
    - _Requisitos: R16 (16.1, 16.3)_
  - [x]* 6.2 Escribir test de propiedad para completitud de navegación del Header
    - **Property 3: Completitud de navegación en Header**
    - Crear `src/__tests__/properties/navigation.property.test.ts`
    - Verificar que para cada sección con `id` en Index.tsx, existe un enlace correspondiente en `navItems` del Header
    - **Valida: Requisito 16.1**
  - [x]* 6.3 Escribir test de propiedad para enlaces del Footer
    - **Property 4: Enlaces del Footer apuntan a secciones existentes**
    - Crear test en `src/__tests__/properties/navigation.property.test.ts`
    - Verificar que cada enlace en `quickLinks` del Footer corresponde a un `id` de sección existente
    - **Valida: Requisitos 16.2, 16.4**
  - [x] 6.4 Corregir SEO en `index.html`
    - Cambiar `lang="en"` a `lang="es"` en la etiqueta `<html>`
    - Reemplazar la imagen OG de Lovable (`lovable.dev/opengraph-image-p98pqg.png`) por `/logo_taxis_transparente.png` (o URL absoluta del dominio)
    - Eliminar o actualizar `twitter:site` (quitar `@lovable_dev`)
    - Actualizar `twitter:image` con la imagen propia
    - Agregar "Girardot" a la meta description
    - _Requisitos: R17 (17.1, 17.2, 17.3, 17.6)_
  - [x] 6.5 Agregar datos estructurados JSON-LD en `index.html`
    - Insertar `<script type="application/ld+json">` con datos de `LocalBusiness`: nombre, dirección (Carrera 4 N. 10 29 Alto de la Cruz, Girardot, Cundinamarca, CO), teléfonos, horario 24/7, URL
    - _Requisitos: R17 (17.5)_
  - [x] 6.6 Crear `public/sitemap.xml`
    - Crear archivo sitemap con la URL principal del sitio
    - _Requisitos: R17 (17.4)_
  - [x] 6.7 Traducir página 404 en `src/pages/NotFound.tsx`
    - Cambiar "Oops! Page not found" → "Página no encontrada"
    - Cambiar "Return to Home" → "Volver al inicio"
    - Aplicar estilos del design system: `bg-background`, `text-foreground`, `text-primary`
    - _Requisitos: R19 (19.1, 19.2, 19.3)_
  - [x] 6.8 Optimizar rendimiento de carga en `index.html` y `src/components/HeroSection.tsx`
    - En `index.html`: agregar `<link rel="preload" as="image" href="/src/assets/hero-taxi.jpg">` y `<link rel="preconnect" href="https://www.google.com">`, `<link rel="preconnect" href="https://hook.us2.make.com">`
    - En `HeroSection.tsx`: agregar `fetchpriority="high"` al `<img>` de la imagen hero
    - _Requisitos: R20 (20.1, 20.2, 20.3)_

- [x] 7. Checkpoint — Verificar navegación, SEO y rendimiento
  - Ejecutar `npm run build` para confirmar que compila sin errores
  - Preguntar al usuario si hay dudas

- [x] 8. Mejoras visuales (UI/UX)
  - [x] 8.1 Agregar variable CSS de contraste para texto primario en `src/index.css`
    - Agregar `--primary-text: 40 100% 32%;` en `:root` (amarillo oscuro con contraste >= 4.5:1 vs blanco)
    - _Requisitos: R10 (10.1, 10.2, 10.3)_
  - [x] 8.2 Registrar color `primary-text` en `tailwind.config.ts`
    - Agregar `"primary-text": "hsl(var(--primary-text))"` dentro de `colors.taxi`
    - _Requisitos: R10 (10.2)_
  - [x]* 8.3 Escribir test de propiedad para contraste del color primario
    - **Property 5: Contraste del color primario de texto**
    - Crear `src/__tests__/properties/contrast.property.test.ts`
    - Verificar que el valor HSL de `--primary-text` (40 100% 32%) tiene ratio de contraste >= 4.5:1 contra blanco según WCAG 2.1
    - **Valida: Requisito 10.1**
  - [x] 8.4 Reemplazar clases inline de botones en `src/components/ContactSection.tsx`
    - Cambiar `className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold border-none"` por `variant="call"` en todos los botones de teléfono
    - _Requisitos: R11 (11.1, 11.2)_
  - [x] 8.5 Definir animación `fade-in` y reemplazar `hover-scale` en `tailwind.config.ts`
    - Agregar keyframe `fade-in`: `from { opacity: 0; transform: translateY(10px) }` → `to { opacity: 1; transform: translateY(0) }`
    - Agregar animación: `"fade-in": "fade-in 0.6s ease-out forwards"`
    - Eliminar keyframes de `accordion-down` y `accordion-up` (ya no se usa el componente accordion)
    - _Requisitos: R4 (4.1, 4.3), R15 (15.1, 15.3)_
  - [x] 8.6 Reemplazar `hover-scale` por `hover:scale-105` en componentes
    - En `src/components/BenefitsSection.tsx`: cambiar `hover-scale` por `hover:scale-105 transition-transform`
    - En `src/components/AboutSection.tsx`: cambiar `hover-scale` por `hover:scale-105 transition-transform`
    - _Requisitos: R4 (4.2), R15 (15.2)_
  - [x] 8.7 Corregir desbordamiento de tarjeta flotante en `src/components/BenefitsSection.tsx`
    - Cambiar posicionamiento de la tarjeta de estadísticas "98% Satisfacción": `static` en móvil, `sm:absolute` en pantallas >= 640px
    - Agregar margen superior en móvil para separar la tarjeta de la imagen
    - _Requisitos: R13 (13.1, 13.2)_
  - [x] 8.8 Ajustar botones flotantes en `src/components/WhatsAppFloat.tsx`
    - Verificar separación vertical >= 60px entre botones de Facebook y WhatsApp (actualmente `bottom-36` vs `bottom-20` = 64px, cumple)
    - Ajustar posición del menú de WhatsApp para que no se superponga con el botón de Facebook cuando está abierto
    - _Requisitos: R14 (14.1, 14.2)_

- [x] 9. Habilitar TypeScript estricto
  - [x] 9.1 Activar `strict: true` en `tsconfig.app.json`
    - Cambiar `"strict": false` a `"strict": true`
    - Cambiar `"noImplicitAny": false` a `"noImplicitAny": true` (o eliminar ya que `strict` lo incluye)
    - _Requisitos: R21 (21.1, 21.2)_
  - [x] 9.2 Corregir errores de tipo resultantes del modo estricto
    - Ejecutar `npx tsc --noEmit` para identificar errores
    - Corregir todos los errores de tipo en los archivos del proyecto
    - Verificar que `npm run build` compila sin errores
    - _Requisitos: R21 (21.3)_

- [x] 10. Checkpoint final — Verificar build completo y preguntar al usuario
  - Ejecutar `npm run build` para confirmar que todo compila correctamente
  - Preguntar al usuario si hay dudas o ajustes necesarios

## Notas

- Las tareas marcadas con `*` son opcionales (tests de propiedades) y pueden omitirse para un MVP más rápido
- Cada tarea referencia los requisitos específicos que cumple para trazabilidad
- Los checkpoints aseguran validación incremental del build
- Los tests de propiedades validan las propiedades de correctitud universales definidas en el diseño
- Los tests unitarios validan ejemplos específicos y casos borde
