# Stack Técnico: Central de Taxis Girardot

## Framework
- React 18 + TypeScript
- Vite 5 con @vitejs/plugin-react-swc (SWC como compilador)

## Estilos
- Tailwind CSS 3 con CSS variables (design tokens en HSL)
- Componentes: shadcn/ui (Radix primitives + CVA)

## Routing
- react-router-dom v6
- 2 rutas: `/` (Index) y `*` (NotFound / 404)

## Build
- Vite con SWC
- Path alias: `@` → `./src`

## Origen
- Generado con Lovable (lovable-tagger en devDependencies)
- Muchos componentes shadcn/ui instalados pero no utilizados

## Formularios
- POST directo a webhooks de Make.com (sin backend propio)
- Formulario de reserva en ContactSection
- Formulario de conductor en DriverForm

## TypeScript
- Configuración permisiva: `strict: false`, `noImplicitAny: false`

## Dependencias notables no utilizadas
- @tanstack/react-query, recharts, date-fns, react-day-picker
- react-hook-form, @hookform/resolvers, zod
- react-resizable-panels, input-otp, embla-carousel-react
- cmdk, vaul, next-themes
