# Lumière Prestige — Web Premium

Sitio web profesional, moderna, editable y lista para entregar a clientes Premium.

## Características incluidas

- **13 secciones** (activables/desactivables desde el panel)
- **Panel de administración** sin código en `/admin`
- **Catálogo, servicios, blog, galería, FAQ, testimonios**
- **Chat/Asistente IA** (estructura + respuestas automáticas)
- **Pagos preparados** (Stripe, PayPal, Square)
- **Integraciones** (WhatsApp, Maps, Analytics, Pixel, Calendly)
- **SEO Premium** (meta tags, schema.org, sitemap, robots.txt)
- **Diseño responsivo** y optimizado para rendimiento
- **30 días de soporte** · **3 rondas de cambios** · **Capacitación personalizada**

## Requisitos

- Node.js 18+ ([descargar](https://nodejs.org/))
- npm

## Instalación

```bash
cd lumiere-prestige-web
npm install
cp .env.example .env.local
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## Panel de administración

- URL: [http://localhost:3000/admin](http://localhost:3000/admin)
- Email: `admin@lumiereprestige.com`
- Contraseña: `Admin123!ChangeMe`

**Cambia estas credenciales en `.env.local` antes de producción.**

## Estructura del proyecto

```
├── data/                  # Contenido inicial (defaults embebidos en build)
├── src/lib/storage/       # KV + R2 (sin fs/path)
├── wrangler.jsonc         # Bindings Cloudflare (CMS_KV, CMS_R2)
├── open-next.config.ts    # Adapter OpenNext para Cloudflare
├── src/
│   ├── app/               # Páginas y API routes
│   ├── components/        # UI, secciones, admin
│   └── lib/               # Utilidades, auth, SEO
└── docs/                  # Manual de capacitación + Cloudflare
```

## Páginas públicas

| Ruta | Descripción |
|------|-------------|
| `/` | Home con todas las secciones |
| `/servicios` | Listado completo de servicios |
| `/catalogo` | Catálogo de productos |
| `/blog` | Blog y noticias |
| `/blog/[slug]` | Artículo individual |
| `/checkout` | Checkout (pagos preparados) |

## Activar integraciones

Edita `.env.local`:

```env
# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=5215512345678

# Pagos
NEXT_PUBLIC_PAYMENTS_ENABLED=true
STRIPE_PUBLIC_KEY=pk_...
STRIPE_SECRET_KEY=sk_...

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID=123456789

# Chat en vivo (Tawk.to)
NEXT_PUBLIC_CHAT_PROVIDER=tawk
NEXT_PUBLIC_CHAT_WIDGET_ID=tu_widget_id

# IA
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_AI_ASSISTANT_ENABLED=true
```

## Despliegue

### Cloudflare Pages (recomendado)

Compatible con Edge Runtime — usa **KV** para contenido y **R2** para imágenes.

```bash
npm run pages:build    # Build para Cloudflare
npm run pages:preview  # Preview local con Wrangler
npm run pages:deploy   # Deploy a Cloudflare Workers/Pages
```

Ver guía completa: [`docs/CLOUDFLARE.md`](docs/CLOUDFLARE.md)

### Vercel / Node.js tradicional

```bash
npm run build
npm start
```

> En Vercel sin KV/R2, el proyecto usa almacenamiento en memoria en dev. Para producción persistente en Vercel, configura Upstash KV o despliega en Cloudflare.

## Soporte

- 30 días de soporte post-entrega
- 3 rondas de cambios incluidas
- Capacitación personalizada del panel (ver `docs/CAPACITACION.md`)
