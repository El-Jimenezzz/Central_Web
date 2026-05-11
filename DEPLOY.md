# Guía de Despliegue — Central de Taxis Girardot

## Requisitos previos

- Node.js instalado
- Cuenta de GitHub
- El proyecto compila sin errores (`npm run build`)

---

## Opción recomendada: Vercel (gratis)

### Paso 1: Sube el código a GitHub

```bash
git init
git add .
git commit -m "Landing page Central de Taxis Girardot"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/web-central-taxis.git
git push -u origin main
```

### Paso 2: Conecta con Vercel

1. Ve a [vercel.com](https://vercel.com) y crea una cuenta con tu GitHub
2. Clic en "Add New Project"
3. Selecciona tu repositorio `web-central-taxis`
4. Vercel detecta automáticamente que es Vite — no necesitas configurar nada
5. Agrega las variables de entorno:
   - `VITE_WEBHOOK_RESERVA` = tu URL de Make.com para reservas
   - `VITE_WEBHOOK_CONDUCTOR` = tu URL de Make.com para conductores
6. Clic en "Deploy"

En ~30 segundos tendrás tu sitio en `tu-proyecto.vercel.app`.

### Paso 3: Compra tu dominio

Opciones para dominios `.com.co` (Colombia):
- [Namecheap](https://namecheap.com) — ~$10-15 USD/año
- [GoDaddy](https://godaddy.com) — ~$12-18 USD/año
- [Google Domains](https://domains.google) (ahora Squarespace) — ~$12 USD/año

Busca algo como `centraltaxisgirardot.com` o `centraltaxisgirardot.com.co`.

### Paso 4: Conecta el dominio a Vercel

1. En Vercel, ve a tu proyecto → Settings → Domains
2. Escribe tu dominio (ej: `centraltaxisgirardot.com`) y clic "Add"
3. Vercel te dará registros DNS para configurar:
   - Tipo `A` → `76.76.21.21`
   - Tipo `CNAME` para `www` → `cname.vercel-dns.com`
4. Ve al panel de tu registrador de dominio (Namecheap, GoDaddy, etc.)
5. En la sección DNS, agrega esos registros
6. Espera 5-30 minutos para propagación

Vercel configura HTTPS automáticamente con Let's Encrypt.

---

## Alternativa: Netlify (también gratis)

El proceso es casi idéntico:
1. Sube a GitHub
2. Conecta en [netlify.com](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Agrega dominio personalizado en Site Settings → Domain Management

---

## Después de publicar

Actualiza estos valores en tu código con tu dominio real:

1. `public/sitemap.xml` — cambia `https://centraltaxisgirardot.com/` por tu dominio
2. `index.html` — actualiza la URL en el JSON-LD (`"url"`) y las imágenes OG con URL absoluta (`https://tudominio.com/logo_taxis_transparente.png`)

---

## Resumen de costos

| Concepto | Costo |
|----------|-------|
| Hosting (Vercel/Netlify) | Gratis |
| Dominio .com | ~$10-15 USD/año |
| SSL (HTTPS) | Gratis (automático) |
| **Total** | **~$10-15 USD/año** |

---

## Actualizaciones futuras

Cada vez que hagas `git push` a la rama `main`, Vercel/Netlify re-despliega automáticamente en ~30 segundos. No necesitas hacer nada manual.
