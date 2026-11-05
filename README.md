# Discpunt 🎵

App móvil para cargar discos de música, puntuar cada canción del 1 al 10 y ver en el inicio el **promedio de todas las canciones**.

- **Front:** React Native con Expo + React Navigation (Stack) + Axios
- **Back:** Node.js + Express, ordenado por capas (rutas → controllers → services)
- **Base de datos:** Supabase (PostgreSQL)

---

## Cómo está organizado

```
Discpunt/
├── base-de-datos/
│   └── tablas.sql            ← script para crear las tablas en Supabase
│
├── backend/
│   ├── index.js              ← arranca Express y conecta las rutas
│   ├── config/supabase.js    ← conexión a Supabase (lee el .env)
│   ├── routes/               ← qué URL va a qué función
│   ├── controllers/          ← reciben la petición y arman la respuesta
│   ├── services/             ← única capa que habla con la base de datos
│   └── .env.example          ← modelo del .env (las claves NO se suben)
│
└── frontend/
    ├── App.js                ← Stack Navigator con las 3 pantallas
    └── src/
        ├── config.js         ← BASE_URL: dirección del backend
        ├── services/         ← funciones que llaman al backend con axios
        ├── screens/          ← Home, formulario de disco y detalle del disco
        ├── components/       ← piezas reutilizables (tarjeta, botón, selector...)
        └── estilos/          ← colores de la app
```

### El camino de una petición (ejemplo: agregar una canción)

1. **Pantalla** `DiscoDetalleScreen` → el usuario toca "Agregar" y se llama a `crearCancion(...)`.
2. **Service del front** `cancionesService.js` → hace `axios.post(BASE_URL + '/canciones', datos)`.
3. **Ruta** `cancionesRoutes.js` → `POST /` se manda a `ctrl.crear`.
4. **Controller** `cancionesController.js` → toma `disco_id`, `nombre` y `puntaje` del body y llama al service.
5. **Service del back** `cancionesService.js` → hace el `insert` en Supabase.
6. La respuesta vuelve por el mismo camino y la pantalla recarga la lista.

## Base de datos

Dos tablas con una relación **uno a muchos**: un disco tiene muchas canciones.

| discos | canciones |
|---|---|
| id | id |
| titulo | **disco_id** → discos.id |
| banda | nombre |
| cantidad_canciones | puntaje (1 a 10) |
| foto_url | |

Si se borra un disco, sus canciones se borran solas (`on delete cascade`).

## Endpoints

| Método | URL | Qué hace |
|---|---|---|
| GET | `/api/discos` | Lista todos los discos |
| GET | `/api/discos/:id` | Trae un disco |
| POST | `/api/discos` | Crea un disco |
| PUT | `/api/discos/:id` | Edita un disco |
| DELETE | `/api/discos/:id` | Borra un disco (y sus canciones) |
| GET | `/api/canciones/disco/:discoId` | Canciones de un disco |
| GET | `/api/canciones/promedio` | Promedio de todas las canciones |
| POST | `/api/canciones` | Agrega una canción |
| PUT | `/api/canciones/:id` | Edita una canción |
| DELETE | `/api/canciones/:id` | Borra una canción |

---

## Cómo correrlo

### 1. Supabase
1. Entrá a [supabase.com](https://supabase.com) y abrí el proyecto **Discpunt** (o creá uno nuevo).
2. Andá a **SQL Editor → New query**, pegá todo el contenido de `base-de-datos/tablas.sql` y tocá **Run**.
3. En **Project Settings → API Keys** copiá:
   - la **Project URL**
   - la **Secret key** (empieza con `sb_secret_`)

> Usamos la Secret key porque las tablas tienen RLS activado sin políticas: así **solo el backend** puede leer y escribir. Esa clave vive únicamente en el `.env` del servidor, nunca en la app.

### 2. Backend
```bash
cd backend
npm install
```
Copiá `.env.example` como `.env` y completá `SUPABASE_URL` y `SUPABASE_KEY`. Después:
```bash
npm run dev
```
Si abrís http://localhost:3000 tiene que aparecer `Servidor funcionando ✅`.

### 3. Backend en Vercel (para que ande sin la PC prendida)
1. En [vercel.com/new](https://vercel.com/new) importá este repo.
2. **Root Directory:** `backend`.
3. **Environment Variables:** `SUPABASE_URL` y `SUPABASE_KEY` (los mismos valores del `.env`).
4. **Deploy.** Vercel detecta Express solo, a partir de `index.js`.

El backend publicado está en **https://discpunt-api.vercel.app** y el front ya apunta ahí (`frontend/src/config.js`).

### 4. Frontend en Expo Snack (web)
1. En [snack.expo.dev](https://snack.expo.dev), en el **⋮** al lado de "Project", elegí **Import git repository**.
2. Pegá `https://github.com/SantiagoVazquez21/discpunt/tree/main/frontend` y tocá **Import repository**.
3. Elegí la vista previa **Web**.

> El front usa **Expo SDK 54** porque es la versión que Snack compila. En web, `Alert.alert` no muestra nada, así que los avisos pasan por `src/utils/avisos.js`, que usa `window.alert` / `window.confirm` en web y `Alert` en el celular.

### Opcional: correr el front en la PC
```bash
cd frontend
npm install
npx expo start --web
```
