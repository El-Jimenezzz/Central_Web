# Documento de Requisitos — Auditoría y Mejoras de la Landing Page

## Introducción

Este documento define los requisitos para la auditoría y mejora de la landing page de Central de Taxis Girardot. Los hallazgos se organizan en tres dimensiones: correcciones críticas de componentes, mejoras funcionales y mejoras visuales (UI/UX). El objetivo es eliminar código muerto, corregir errores funcionales, mejorar el SEO, la accesibilidad y la experiencia de usuario del sitio.

## Glosario

- **Landing_Page**: Sitio web informativo de Central de Taxis Girardot, construido con React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui.
- **Index_Page**: Página principal (`/`) que renderiza todas las secciones visibles de la landing.
- **FleetSection**: Componente React (`FleetSection.tsx`) que muestra la sección "Nuestra Flota".
- **Footer**: Componente React (`Footer.tsx`) que renderiza el pie de página del sitio.
- **Header**: Componente React (`Header.tsx`) que renderiza la barra de navegación fija superior.
- **BenefitsSection**: Componente React (`BenefitsSection.tsx`) que muestra los beneficios del servicio.
- **AboutSection**: Componente React (`AboutSection.tsx`) que muestra la sección "Quiénes Somos".
- **ContactSection**: Componente React (`ContactSection.tsx`) que contiene el formulario de reserva y la información de contacto.
- **DriverForm**: Componente React (`DriverForm.tsx`) que contiene el formulario para conductores interesados.
- **MapAndDriverSection**: Componente React (`MapAndDriverSection.tsx`) que contiene el mapa de ubicación y el DriverForm.
- **NotFound_Page**: Página 404 (`NotFound.tsx`) que se muestra cuando el usuario accede a una ruta inexistente.
- **WhatsAppFloat**: Componente React (`WhatsAppFloat.tsx`) que muestra los botones flotantes de WhatsApp y Facebook.
- **HeroSection**: Componente React (`HeroSection.tsx`) que muestra la sección principal con imagen de fondo y CTAs.
- **Toast_System**: Sistema de notificaciones in-app basado en Radix Toast y/o Sonner.
- **Design_System**: Sistema de diseño basado en shadcn/ui con variantes de botón definidas en `button.tsx` mediante CVA.
- **Tailwind_Config**: Archivo `tailwind.config.ts` que define la configuración de Tailwind CSS, incluyendo animaciones y colores personalizados.
- **Make_Webhook**: URL de webhook de Make.com utilizada para recibir datos de formularios.
- **CSS_Variables**: Variables CSS definidas en `src/index.css` que controlan los design tokens (colores HSL, sombras, gradientes).
- **Dependencia_No_Utilizada**: Paquete npm listado en `package.json` que no es importado por ningún archivo del proyecto.
- **Componente_UI_No_Utilizado**: Archivo en `src/components/ui/` que exporta un componente shadcn/ui no importado por ningún otro archivo del proyecto.

---

## Requisitos

---

### Dimensión 1: Correcciones Críticas (Validación de Componentes)

---

### Requisito 1: Integrar FleetSection en la página principal

**User Story:** Como visitante del sitio, quiero ver la sección de flota de vehículos en la página principal, para conocer los tipos de vehículos disponibles.

#### Criterios de Aceptación

1. WHEN la Index_Page se renderiza, THE Index_Page SHALL incluir el componente FleetSection como sección visible dentro del contenido principal.
2. WHEN el usuario hace clic en el enlace `#flota` del Footer, THE Landing_Page SHALL desplazar la vista hasta la FleetSection renderizada.
3. THE FleetSection SHALL tener el atributo `id="flota"` para que los enlaces de ancla funcionen correctamente.

---

### Requisito 2: Eliminar código muerto del Footer

**User Story:** Como desarrollador, quiero que el Footer no contenga importaciones ni variables sin uso, para mantener el código limpio y reducir el tamaño del bundle.

#### Criterios de Aceptación

1. THE Footer SHALL importar únicamente los íconos de `lucide-react` que utiliza en su JSX renderizado.
2. THE Footer SHALL eliminar la variable `quickLinks` si no se renderiza en el JSX, o renderizarla como enlaces de navegación funcionales.
3. THE Footer SHALL eliminar las importaciones de `Car`, `Phone`, `MessageCircle`, `Instagram` y `Twitter` si no se utilizan en el JSX.

---

### Requisito 3: Eliminar archivo residual App.css

**User Story:** Como desarrollador, quiero eliminar archivos CSS residuales que no se importan, para evitar confusión y reducir el tamaño del repositorio.

#### Criterios de Aceptación

1. THE Landing_Page SHALL eliminar el archivo `src/App.css` que contiene estilos de la plantilla Vite no utilizados.
2. IF algún archivo importa `App.css`, THEN THE Landing_Page SHALL eliminar esa importación antes de borrar el archivo.

---

### Requisito 4: Definir o eliminar clases CSS inexistentes

**User Story:** Como visitante del sitio, quiero que las animaciones y efectos visuales declarados en los componentes funcionen correctamente, para tener una experiencia visual coherente.

#### Criterios de Aceptación

1. WHEN la clase `animate-fade-in` se utiliza en un componente, THE Tailwind_Config SHALL definir el keyframe y la animación `fade-in` correspondiente para que produzca un efecto visual.
2. WHEN la clase `hover-scale` se utiliza en un componente, THE Tailwind_Config SHALL definir la utilidad `hover-scale` o THE Landing_Page SHALL reemplazarla por clases Tailwind equivalentes (por ejemplo, `hover:scale-105`).
3. WHEN se definen `animationDelay` inline en componentes que usan `animate-fade-in`, THE Landing_Page SHALL asegurar que la animación base exista para que los delays surtan efecto.

---

### Requisito 5: Eliminar dependencias npm no utilizadas

**User Story:** Como desarrollador, quiero que `package.json` solo contenga dependencias que el proyecto utiliza, para reducir el tiempo de instalación y el tamaño de `node_modules`.

#### Criterios de Aceptación

1. THE Landing_Page SHALL eliminar de `dependencies` en `package.json` todos los paquetes que no son importados por ningún archivo del proyecto.
2. THE Landing_Page SHALL verificar que los paquetes eliminados no son dependencias transitivas requeridas por paquetes que sí se utilizan.
3. WHEN se eliminan dependencias, THE Landing_Page SHALL ejecutar el build sin errores tras la eliminación.

---

### Requisito 6: Eliminar componentes shadcn/ui no utilizados

**User Story:** Como desarrollador, quiero eliminar los componentes UI que no se usan en la landing, para reducir el tamaño del código fuente y simplificar el mantenimiento.

#### Criterios de Aceptación

1. THE Landing_Page SHALL conservar en `src/components/ui/` únicamente los componentes que son importados por al menos un archivo del proyecto (button, input, textarea, card, toast, toaster, sonner, tooltip y sus dependencias directas).
2. THE Landing_Page SHALL eliminar los archivos de componentes UI que no son importados por ningún archivo fuera de `src/components/ui/`.
3. WHEN se eliminan componentes UI, THE Landing_Page SHALL compilar sin errores de importación.

---

### Requisito 7: Unificar el sistema de toast

**User Story:** Como desarrollador, quiero tener un único sistema de notificaciones toast, para evitar duplicación de código y comportamiento inconsistente.

#### Criterios de Aceptación

1. THE Landing_Page SHALL utilizar un único sistema de toast (Radix Toast o Sonner), eliminando el sistema duplicado.
2. THE Landing_Page SHALL eliminar el archivo `src/components/ui/use-toast.ts` que re-exporta desde `src/hooks/use-toast.ts`, o consolidar ambos en una única ubicación.
3. THE App SHALL montar un único componente Toaster (no ambos `<Toaster />` y `<Sonner />` simultáneamente).
4. WHEN un formulario envía datos exitosamente, THE Toast_System SHALL mostrar la notificación usando el sistema unificado.

---

### Requisito 8: Eliminar assets no referenciados

**User Story:** Como desarrollador, quiero eliminar imágenes y archivos estáticos que no se referencian en el código, para reducir el tamaño del repositorio y evitar confusión.

#### Criterios de Aceptación

1. THE Landing_Page SHALL eliminar `src/assets/passenger-happy.jpg` si no es referenciado por ningún componente.
2. THE Landing_Page SHALL eliminar `src/assets/logo1.png` si el proyecto utiliza exclusivamente `public/logo_taxis_transparente.png` como logo.
3. THE Landing_Page SHALL eliminar de `public/` los archivos no referenciados: `logo2.png`, `car.svg`, `taxi.ico`, `favicon.ico`, las imágenes `Gemini_Generated_Image_*.png`, `lovable-uploads/429b1394-*.png` y `placeholder.svg`.
4. WHEN se eliminan assets, THE Landing_Page SHALL verificar que ningún componente ni archivo HTML los referencia.

---

### Requisito 9: Corregir doble padding en DriverForm

**User Story:** Como visitante del sitio, quiero que la sección de formulario de conductores tenga un espaciado visual correcto, sin padding duplicado.

#### Criterios de Aceptación

1. WHEN el DriverForm se renderiza dentro de MapAndDriverSection, THE DriverForm SHALL delegar el padding y contenedor al componente padre (MapAndDriverSection).
2. THE DriverForm SHALL eliminar las clases `section-padding` y `container` de su elemento raíz, ya que MapAndDriverSection ya provee esas clases.

---

### Dimensión 2: Mejoras Visuales (UI/UX)

---

### Requisito 10: Mejorar contraste del color primario

**User Story:** Como visitante del sitio, quiero que el texto en color primario sea legible sobre fondos claros, para poder leer toda la información sin dificultad.

#### Criterios de Aceptación

1. WHEN se usa `text-primary` sobre fondo claro (`background` o `white`), THE CSS_Variables SHALL definir un valor de `--primary` que logre un ratio de contraste mínimo de 4.5:1 según WCAG 2.1 AA.
2. THE CSS_Variables SHALL ajustar el tono del amarillo primario (por ejemplo, reducir luminosidad de 50% a un valor que cumpla contraste) o THE Landing_Page SHALL usar una variante oscura del primario para texto sobre fondos claros.
3. THE Landing_Page SHALL mantener la identidad visual amarilla de la marca de taxis al ajustar el contraste.

---

### Requisito 11: Unificar estilos de botones con el Design System

**User Story:** Como desarrollador, quiero que todos los botones usen las variantes del Design System, para mantener consistencia visual y facilitar cambios globales.

#### Criterios de Aceptación

1. THE ContactSection SHALL reemplazar las clases inline de los botones de teléfono (`bg-yellow-400 hover:bg-yellow-500 text-black font-bold border-none`) por una variante del Design_System (por ejemplo, `variant="hero"` o una nueva variante `variant="call"`).
2. THE Landing_Page SHALL asegurar que todos los botones visibles utilicen variantes definidas en `buttonVariants` de `button.tsx`.

---

### Requisito 12: Corregir solapamiento del Header con el contenido

**User Story:** Como visitante del sitio, quiero ver el contenido completo de la sección hero sin que el header fijo lo oculte parcialmente.

#### Criterios de Aceptación

1. WHILE el Header está fijo en la parte superior (`fixed top-0`), THE Index_Page SHALL aplicar un padding-top al contenido principal (`<main>`) equivalente a la altura del Header (mínimo `pt-16` / 64px).
2. WHEN el usuario hace scroll, THE Header SHALL permanecer visible sin ocultar el inicio de ninguna sección.

---

### Requisito 13: Evitar desbordamiento de la tarjeta flotante de estadísticas

**User Story:** Como visitante en dispositivo móvil, quiero que la tarjeta de estadísticas "98% Satisfacción" no se desborde fuera de la pantalla.

#### Criterios de Aceptación

1. WHILE la pantalla tiene un ancho menor a 640px (breakpoint `sm`), THE BenefitsSection SHALL posicionar la tarjeta flotante de estadísticas de forma que no se desborde horizontalmente del viewport.
2. THE BenefitsSection SHALL usar posicionamiento responsivo para la tarjeta (por ejemplo, `static` en móvil y `absolute` en pantallas grandes).

---

### Requisito 14: Evitar solapamiento de botones flotantes WhatsApp/Facebook

**User Story:** Como visitante en dispositivo móvil, quiero que los botones flotantes de WhatsApp y Facebook no se solapen entre sí, para poder interactuar con cada uno sin dificultad.

#### Criterios de Aceptación

1. THE WhatsAppFloat SHALL posicionar los botones flotantes de Facebook y WhatsApp con separación vertical suficiente (mínimo 60px entre centros) para evitar solapamiento en pantallas pequeñas.
2. WHILE el menú de números de WhatsApp está abierto, THE WhatsAppFloat SHALL posicionar el menú de forma que no se superponga con el botón de Facebook.

---

### Requisito 15: Implementar animaciones funcionales

**User Story:** Como visitante del sitio, quiero que las animaciones de entrada (fade-in) y los efectos hover (scale) funcionen visualmente, para una experiencia más atractiva.

#### Criterios de Aceptación

1. WHEN un elemento con clase `animate-fade-in` entra en el viewport, THE Landing_Page SHALL aplicar una animación de aparición gradual (opacidad de 0 a 1, con desplazamiento vertical opcional).
2. WHEN el usuario pasa el cursor sobre un elemento con clase `hover-scale`, THE Landing_Page SHALL aplicar una transformación de escala sutil (por ejemplo, `scale(1.05)`).
3. WHEN un elemento tiene `animationDelay` inline, THE Landing_Page SHALL respetar el delay antes de iniciar la animación `fade-in`.

---

### Dimensión 3: Mejoras Funcionales

---

### Requisito 16: Completar la navegación del sitio

**User Story:** Como visitante del sitio, quiero poder navegar a todas las secciones de la página desde el Header y el Footer, para acceder fácilmente a la información que busco.

#### Criterios de Aceptación

1. THE Header SHALL incluir enlaces de navegación a todas las secciones visibles de la página: Inicio, Servicios, Contacto, Beneficios, Nosotros, Testimonios y Trabaja con nosotros.
2. THE Footer SHALL renderizar sus `quickLinks` como enlaces funcionales que desplazan la vista a la sección correspondiente.
3. WHEN el usuario hace clic en un enlace de navegación, THE Landing_Page SHALL desplazar la vista suavemente (smooth scroll) hasta la sección correspondiente.
4. THE Footer SHALL actualizar el enlace `#flota` para que apunte a la FleetSection una vez integrada (Requisito 1).

---

### Requisito 17: Corregir problemas de SEO

**User Story:** Como responsable de marketing, quiero que la landing page esté optimizada para motores de búsqueda y redes sociales, para mejorar la visibilidad online de la empresa en Girardot.

#### Criterios de Aceptación

1. THE Landing_Page SHALL establecer el atributo `lang="es"` en la etiqueta `<html>` del archivo `index.html`.
2. THE Landing_Page SHALL reemplazar la imagen OG (`og:image`) por una imagen de marca propia de Central de Taxis Girardot en lugar de la imagen genérica de Lovable.
3. THE Landing_Page SHALL actualizar la meta `twitter:site` con la cuenta de la empresa o eliminarla si no existe cuenta de Twitter.
4. THE Landing_Page SHALL incluir un archivo `sitemap.xml` en `public/` con las URLs del sitio.
5. THE Landing_Page SHALL incluir datos estructurados JSON-LD de tipo `LocalBusiness` en `index.html` con nombre, dirección, teléfono y horario de la empresa.
6. THE Landing_Page SHALL incluir "Girardot" en la meta description para mejorar el posicionamiento local.

---

### Requisito 18: Mejorar UX de formularios

**User Story:** Como visitante del sitio, quiero que los formularios me den retroalimentación clara y validen mis datos correctamente, para completar mi reserva o solicitud sin problemas.

#### Criterios de Aceptación

1. WHEN el formulario de reserva (ContactSection) se envía exitosamente, THE ContactSection SHALL mostrar una notificación usando el Toast_System en lugar de `alert()` nativo del navegador.
2. WHEN el formulario de reserva falla al enviarse, THE ContactSection SHALL mostrar una notificación de error usando el Toast_System en lugar de `alert()` nativo.
3. THE ContactSection SHALL validar el formato del número de teléfono (mínimo 7 dígitos, solo números y caracteres permitidos como `+` y espacios) antes de enviar el formulario.
4. THE DriverForm SHALL validar el formato del número de teléfono con las mismas reglas que ContactSection.
5. WHEN el usuario selecciona una fecha en el formulario de reserva, THE ContactSection SHALL revalidar que la fecha y hora seleccionadas estén al menos 12 horas en el futuro en el momento del envío (no solo al renderizar el componente).
6. THE Landing_Page SHALL mover las URLs de webhooks de Make.com a variables de entorno (`VITE_*`) en lugar de tenerlas hardcodeadas en el código fuente.

---

### Requisito 19: Traducir la página 404 al español

**User Story:** Como visitante hispanohablante, quiero que la página de error 404 esté en español, para entender que la página no existe y poder volver al inicio.

#### Criterios de Aceptación

1. THE NotFound_Page SHALL mostrar el mensaje de error en español (por ejemplo, "Página no encontrada" en lugar de "Oops! Page not found").
2. THE NotFound_Page SHALL mostrar el enlace de retorno en español (por ejemplo, "Volver al inicio" en lugar de "Return to Home").
3. THE NotFound_Page SHALL utilizar los estilos del Design_System (colores, tipografía) consistentes con el resto del sitio.

---

### Requisito 20: Optimizar rendimiento de carga

**User Story:** Como visitante del sitio, quiero que la página cargue rápidamente, para no abandonar el sitio por tiempos de espera largos.

#### Criterios de Aceptación

1. THE Landing_Page SHALL incluir `<link rel="preload">` para la imagen hero (`hero-taxi.jpg`) en `index.html` para optimizar el Largest Contentful Paint (LCP).
2. THE Landing_Page SHALL incluir `<link rel="preconnect">` para los dominios externos utilizados: `https://www.google.com` (Maps), `https://hook.us2.make.com` (webhooks).
3. THE HeroSection SHALL incluir el atributo `fetchpriority="high"` en la imagen hero para indicar al navegador su prioridad de carga.

---

### Requisito 21: Endurecer la configuración de TypeScript

**User Story:** Como desarrollador, quiero que la configuración de TypeScript sea más estricta, para detectar errores potenciales en tiempo de compilación y mejorar la calidad del código.

#### Criterios de Aceptación

1. THE Landing_Page SHALL habilitar `strict: true` en `tsconfig.app.json` (o en `tsconfig.json` si aplica a todo el proyecto).
2. THE Landing_Page SHALL habilitar `noImplicitAny: true` para evitar tipos `any` implícitos.
3. WHEN se habilita el modo estricto, THE Landing_Page SHALL corregir todos los errores de tipo resultantes para que el build compile sin errores.
