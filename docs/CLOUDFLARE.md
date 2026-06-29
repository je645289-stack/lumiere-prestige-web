# Despliegue en Cloudflare Pages

Este proyecto usa **Cloudflare KV** (contenido CMS) y **Cloudflare R2** (imágenes). No usa `fs` ni `path` — compatible con Edge Runtime.

## 1. Crear recursos en Cloudflare

### KV Namespace
```bash
npx wrangler kv namespace create CMS_KV
```
Copia el `id` en `wrangler.jsonc` → `kv_namespaces[0].id`.

### R2 Bucket
```bash
npx wrangler r2 bucket create lumiere-prestige-uploads
```
(O usa el dashboard de Cloudflare → R2 → Create bucket)

Opcional: habilita acceso público al bucket y configura `NEXT_PUBLIC_R2_PUBLIC_URL` con la URL pública.

## 2. Variables de entorno

En Cloudflare Pages → Settings → Environment variables, agrega las de `.env.example`:
- `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `JWT_SECRET`
- `NEXT_PUBLIC_SITE_URL` (tu dominio de producción)
- `NEXT_PUBLIC_R2_PUBLIC_URL` (si usas dominio público R2)

## 3. Build en Cloudflare Pages

| Campo | Valor |
|-------|-------|
| **Build command** | `npm run pages:build` |
| **Build output directory** | `.open-next` |
| **Node.js version** | 20+ |

> Si usas **Workers** en lugar de Pages clásico: `npm run pages:deploy`

## 4. Bindings en Cloudflare Pages

En Pages → Settings → Functions → Bindings:

| Tipo | Variable name | Recurso |
|------|---------------|---------|
| KV Namespace | `CMS_KV` | tu namespace CMS |
| R2 Bucket | `CMS_R2` | `lumiere-prestige-uploads` |

## 5. Desarrollo local

```bash
npm install
npm run dev          # Next.js + KV/R2 en memoria (recomendado)
npm run dev:cloudflare # Next.js + bindings Wrangler locales (opcional)
npm run pages:preview  # Preview de producción con Wrangler
```

En `npm run dev`, el contenido se guarda **en memoria** (sin Wrangler). Los uploads se sirven via `/api/media/...`.

Para probar bindings KV/R2 reales en local, usa `npm run dev:cloudflare` o `npm run pages:preview`.

## 6. Contenido inicial

Al primer acceso, cada clave de contenido se **siembra automáticamente** desde `data/*.json` en KV. No necesitas scripts de seed con filesystem.

## 7. Migrar contenido existente

Si tenías datos en archivos JSON locales, el primer deploy los carga como defaults. Edita desde `/admin` y se persisten en KV.
