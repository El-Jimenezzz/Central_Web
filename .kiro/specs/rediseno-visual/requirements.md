# Documento de Requisitos: Rediseño Visual — Central de Taxis Girardot

## Introducción

Este documento formaliza los requisitos derivados del diseño visual aprobado para la landing page de Central de Taxis Girardot. El rediseño transforma la estética actual en una experiencia moderna y minimalista, manteniendo el mismo contenido, imágenes y funcionalidad.

## Glosario

- **Sistema**: La landing page de Central de Taxis Girardot (aplicación React)
- **Design_Tokens**: Variables CSS definidas en `:root` que controlan colores, espaciado y tipografía
- **Componente**: Archivo TSX que renderiza una sección de la página
- **Paleta**: Conjunto de colores HSL definidos como CSS variables
- **WCAG_AA**: Estándar de accesibilidad que requiere ratio de contraste ≥ 4.5:1 para texto normal y ≥ 3:1 para texto grande
- **Surface**: Fondo alternativo para secciones (`hsl(40 20% 97%)`)
- **Glassmorphism**: Efecto visual con fondo semi-transparente y backdrop-blur
- **CTA**: Call-to-action, botón principal de acción en una sección
- **Overline**: Texto decorativo pequeño en mayúsculas sobre un título de sección

## Requisitos

### Requisito 1: Sistema de Design Tokens

**User Story:** Como desarrollador, quiero que todos los colores y estilos estén centralizados en CSS variables, para que el diseño sea consistente y fácil de mantener.

#### Criterios de Aceptación

1. THE Sistema SHALL definir los siguientes tokens de color en `:root`: `--primary` (43 96% 56%), `--foreground` (20 14% 12%), `--background` (40 33% 99%), `--muted` (40 20% 96%), `--border` (40 10% 92%), `--surface` (40 20% 97%), `--surface-elevated` (0 0% 100%), `--primary-soft` (43 96% 95%), `--text-heading` (20 14% 8%), `--text-body` (20 10% 40%)
2. WHEN un Componente usa un color, THE Sistema SHALL referenciar una CSS variable definida en `:root` en lugar de un valor hardcodeado
3. THE Sistema SHALL permitir únicamente `white`, `black` y colores de terceros (green-500 para WhatsApp) como excepciones a la regla de tokens

### Requisito 2: Tipografía

**User Story:** Como usuario, quiero que la página use una tipografía moderna y legible, para que la lectura sea cómoda y la marca se perciba profesional.

#### Criterios de Aceptación

1. THE Sistema SHALL usar la fuente Inter como familia tipográfica principal con fallback a system-ui y sans-serif
2. THE Sistema SHALL cargar la fuente Inter de forma self-hosted mediante el paquete `@fontsource/inter`
3. WHEN se renderiza un título Hero (H1), THE Sistema SHALL aplicar las clases `text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight`
4. WHEN se renderiza un título de sección (H2), THE Sistema SHALL aplicar las clases `text-4xl lg:text-5xl font-bold tracking-tight`
5. WHEN se renderiza texto de cuerpo, THE Sistema SHALL aplicar `text-base font-normal` con color `text-body`

### Requisito 3: Espaciado y Layout

**User Story:** Como usuario, quiero que la página tenga un diseño espacioso y limpio, para que el contenido sea fácil de escanear y no se sienta abarrotado.

#### Criterios de Aceptación

1. THE Sistema SHALL aplicar padding vertical `py-24 lg:py-32` a todas las secciones de contenido
2. THE Sistema SHALL usar `max-w-7xl` como ancho máximo del contenedor principal y `max-w-3xl` para bloques de texto
3. THE Sistema SHALL aplicar padding horizontal `px-6 lg:px-8` a todas las secciones
4. THE Sistema SHALL alternar fondos entre `bg-background` y `bg-surface` en secciones consecutivas sin usar bordes ni líneas divisorias

### Requisito 4: Componente Header

**User Story:** Como usuario, quiero un header fijo y transparente, para que la navegación esté siempre accesible sin obstruir el contenido.

#### Criterios de Aceptación

1. THE Sistema SHALL renderizar el Header con posición fija, fondo `bg-white/80`, `backdrop-blur-xl` y borde inferior `border-border/30`
2. THE Sistema SHALL mostrar un único CTA visible en el Header con texto "Pide tu Taxi" y estilo `rounded-full bg-primary`
3. THE Sistema SHALL aplicar altura `h-20` al Header y tamaño `h-12` al logo
4. WHEN el usuario hace scroll, THE Sistema SHALL mantener el efecto glassmorphism del Header visible en todo momento

### Requisito 5: Componente Hero Section

**User Story:** Como usuario, quiero una primera impresión impactante al entrar a la página, para que la marca transmita profesionalismo y confianza.

#### Criterios de Aceptación

1. THE Sistema SHALL renderizar la Hero Section a pantalla completa con imagen de fondo y overlay gradient `from-black/60 via-black/30 to-black/10`
2. THE Sistema SHALL mostrar el título con tipografía `text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight` en color blanco
3. THE Sistema SHALL mostrar un único CTA principal con estilo `rounded-full` e ícono de WhatsApp
4. THE Sistema SHALL mostrar las estadísticas como strip horizontal sutil en lugar de cards con glassmorphism
5. THE Sistema SHALL aplicar subtítulo con `text-lg sm:text-xl text-white/80 max-w-xl`

### Requisito 6: Componente Servicios

**User Story:** Como usuario, quiero ver los servicios de forma clara y organizada, para entender rápidamente qué ofrece la empresa.

#### Criterios de Aceptación

1. THE Sistema SHALL mostrar un Overline "NUESTROS SERVICIOS" con estilo `text-xs uppercase tracking-widest text-primary` sobre el título
2. THE Sistema SHALL renderizar cards de servicio con `bg-surface-elevated rounded-2xl p-8 lg:p-10 border border-border/50` sin sombra
3. WHEN el usuario pasa el cursor sobre una card de servicio, THE Sistema SHALL aplicar `border-primary/20` con transición de 500ms
4. THE Sistema SHALL mostrar iconos de servicio en contenedores `w-12 h-12 rounded-xl bg-primary-soft`

### Requisito 7: Componente Contacto

**User Story:** Como usuario, quiero poder reservar un taxi de forma rápida, para que el proceso de contacto sea simple y directo.

#### Criterios de Aceptación

1. THE Sistema SHALL renderizar el formulario como protagonista en una card elevada con `p-10 lg:p-12`
2. THE Sistema SHALL mostrar inputs con estilo `border-0 bg-surface rounded-xl`
3. THE Sistema SHALL mostrar el botón de envío con estilo `rounded-full` y ancho completo
4. THE Sistema SHALL condensar la información de contacto en una lista compacta con iconos inline

### Requisito 8: Componente Beneficios

**User Story:** Como usuario, quiero conocer las ventajas del servicio de forma visual, para decidir si usar esta empresa de taxis.

#### Criterios de Aceptación

1. THE Sistema SHALL renderizar cards de beneficio con icono alineado a la izquierda, tamaño `h-6 w-6` y color `text-primary`
2. THE Sistema SHALL mostrar la imagen de la sección con `rounded-3xl` y ancho completo
3. THE Sistema SHALL eliminar el stat card flotante sobre la imagen

### Requisito 9: Componente Flota

**User Story:** Como usuario, quiero ver la flota de vehículos de forma atractiva, para confiar en la calidad del servicio.

#### Criterios de Aceptación

1. THE Sistema SHALL renderizar la imagen principal con `h-[500px] rounded-3xl overflow-hidden`
2. THE Sistema SHALL mostrar los tipos de vehículo como strip horizontal con icono, nombre y capacidad en una línea
3. THE Sistema SHALL usar un ghost button "Ver más →" como CTA en lugar de un botón prominente

### Requisito 10: Componente Testimonios

**User Story:** Como usuario, quiero leer opiniones de otros clientes, para sentir confianza en el servicio.

#### Criterios de Aceptación

1. THE Sistema SHALL mostrar testimonios con texto en `text-2xl italic` como elemento destacado
2. THE Sistema SHALL renderizar fotos de testimonios con tamaño `w-16 h-16` circular
3. THE Sistema SHALL mostrar estrellas con tamaño reducido y color primary sutil
4. THE Sistema SHALL eliminar cards visibles, mostrando solo contenido con separador sutil

### Requisito 11: Componente Footer

**User Story:** Como usuario, quiero encontrar información esencial de la empresa al final de la página, sin distracciones.

#### Criterios de Aceptación

1. THE Sistema SHALL renderizar el Footer con fondo `bg-foreground` (negro cálido)
2. THE Sistema SHALL mostrar layout centrado con logo y links en una fila
3. THE Sistema SHALL aplicar estilo `text-sm text-white/60 hover:text-white` a los links
4. THE Sistema SHALL mostrar copyright centrado con `text-xs text-white/40`

### Requisito 12: Elementos Flotantes

**User Story:** Como usuario, quiero acceder rápidamente a WhatsApp y volver al inicio, sin que los botones flotantes distraigan.

#### Criterios de Aceptación

1. THE Sistema SHALL renderizar el botón de WhatsApp con `bg-green-500/90 backdrop-blur-sm` sin animación pulse
2. THE Sistema SHALL eliminar el botón flotante de Facebook (mover al Footer)
3. THE Sistema SHALL renderizar ScrollToTop con `bg-foreground/80 backdrop-blur-sm text-white` en posición `bottom-8 right-8`
4. THE Sistema SHALL eliminar el indicador rojo con `animate-pulse` del botón de WhatsApp

### Requisito 13: Botones y CTAs

**User Story:** Como desarrollador, quiero un sistema de botones consistente, para que todos los CTAs de la página tengan un estilo unificado.

#### Criterios de Aceptación

1. THE Sistema SHALL aplicar `rounded-full` a todos los botones primarios, secundarios y de variante hero
2. THE Sistema SHALL eliminar `transform hover:-translate-y` de todos los botones
3. THE Sistema SHALL aplicar transiciones con `duration-500` en lugar de `duration-300` a todos los elementos interactivos
4. WHEN se define la clase `.taxi-button`, THE Sistema SHALL aplicar `bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-full px-8 py-4` sin sombra ni translate

### Requisito 14: Accesibilidad de Contraste

**User Story:** Como usuario con dificultades visuales, quiero que el texto sea legible sobre cualquier fondo, para poder usar la página sin problemas.

#### Criterios de Aceptación

1. THE Sistema SHALL mantener un ratio de contraste WCAG_AA ≥ 4.5:1 para todo texto normal sobre su fondo correspondiente
2. THE Sistema SHALL mantener un ratio de contraste WCAG_AA ≥ 3:1 para texto grande (≥ 18pt o ≥ 14pt bold) sobre su fondo correspondiente
3. THE Sistema SHALL garantizar que el color `--text-body` (20 10% 40%) tenga contraste suficiente sobre `--background` (40 33% 99%)
4. THE Sistema SHALL garantizar que `--primary` (43 96% 56%) tenga contraste suficiente contra `--primary-foreground` (20 14% 10%)

### Requisito 15: Rendimiento de Carga de Fuentes

**User Story:** Como usuario con conexión lenta, quiero que la página cargue sin saltos visuales de tipografía, para una experiencia fluida.

#### Criterios de Aceptación

1. THE Sistema SHALL cargar la fuente Inter mediante `@fontsource/inter` (self-hosted) para evitar Flash of Unstyled Text (FOUT)
2. THE Sistema SHALL usar `backdrop-blur` únicamente en el Header y botones flotantes para evitar problemas de rendimiento en dispositivos de gama baja
3. THE Sistema SHALL aplicar `will-change: transform` solo a elementos que ejecutan animaciones activamente

### Requisito 16: Preservación de Contenido y Funcionalidad

**User Story:** Como stakeholder, quiero que el rediseño no altere el contenido ni la funcionalidad existente, para que los usuarios sigan encontrando la misma información y servicios.

#### Criterios de Aceptación

1. THE Sistema SHALL mantener exactamente las mismas 6 imágenes referenciadas en los mismos componentes: `hero-taxi.jpg`, `taxi-fleet.jpg`, `taxi-fleet-multiple.jpg`, `testimonial-ana.jpg`, `testimonial-carlos.jpg`, `testimonial-maria.jpg`
2. THE Sistema SHALL preservar todos los enlaces (`href`), formularios (`onSubmit`) y elementos interactivos con la misma funcionalidad
3. THE Sistema SHALL mantener el mismo contenido textual en todas las secciones
4. THE Sistema SHALL preservar los endpoints de webhooks de Make.com en los formularios de reserva y conductor
5. THE Sistema SHALL mantener la navegación por anclas entre secciones funcionando correctamente
