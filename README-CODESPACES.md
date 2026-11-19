# Renderizar en GitHub Codespaces

Esta guía renderiza el MP4 dentro de un Codespace Linux, usando la CPU asignada al Codespace. El proyecto dura **48 s**, a **1920×1080, 30 fps**, con una salida H.264. Está preparado para renderizar con los seis clips actuales: **Lumbars (04), Planxa (06) y Burpees (09)** quedan como placas gráficas animadas de «sin registro visual»; no bloquean el render.

## Máquina recomendada

Al crear el Codespace, elegí **8 cores / 16 GB RAM** si está disponible; **4 cores / 8 GB** alcanza, pero tardará más. Conviene tener al menos **32 GB de almacenamiento** libre para dependencias, vídeos y render temporal.

1. En GitHub, abrí este repositorio y elegí **Code → Codespaces → Create codespace** en la rama de trabajo.
2. Si el Codespace ya está creado, podés cambiar su tamaño desde la página de Codespaces: menú `…` → **Change machine type**.
3. Abrí una terminal en el Codespace y comprobá Node:

```bash
node --version
```

Se requiere **Node 22.17 o posterior**. Si tu imagen ofrece `nvm` y tiene una versión anterior:

```bash
nvm install 22
nvm use 22
```

## Instalar y revisar el proyecto

Desde la raíz del repositorio:

```bash
npm ci
npm run assets:sync
npm run typecheck
```

`assets:sync` prepara los seis vídeos que ya están en `videos/` y el manifiesto. No hace falta subir los tres clips que no tenés: sus escenas conservan número, nombre, progreso y transición, y muestran una gráfica de ausencia de registro.

### Música opcional

Si querés usar una pista propia, copiala a `public/audio/music.mp3` antes de renderizar (también se aceptan WAV, M4A, AAC, OGG y FLAC). El proyecto la selecciona automáticamente. Si no agregás una, genera una base demo original de 120 BPM, sin samples externos.

## Preview (opcional)

```bash
npm run dev
```

Codespaces debería reenviar el puerto **3000**; abrilo desde la pestaña **Ports** para ver Remotion Studio. Cuando termines de revisar, detené el servidor con `Ctrl+C` para liberar memoria para el render.

## Generar el MP4

```bash
npm run render
```

El render queda en:

```text
out/avaluacio-inicial.mp4
```

El comando sincroniza los medios y renderiza las nueve escenas, incluidas las tres placas sin clip. El proyecto ya instala Chromium para Linux desde npm y usa los binarios FFmpeg de Remotion: **no hace falta instalar Chrome ni FFmpeg con apt**. La concurrencia está configurada en el 95 % de los cores detectados para aprovechar casi toda la CPU del Codespace.

Para descargarlo, abrí `out/` en el Explorer de VS Code del Codespace, hacé clic derecho sobre `avaluacio-inicial.mp4` y elegí **Download**. La carpeta `out/` está ignorada por Git; descargá el MP4 antes de eliminar el Codespace.

## Si el render consume demasiada memoria

Si el Codespace se queda sin memoria, bajá temporalmente la concurrencia del `render` en `package.json` de `95%` a `50%` y volvé a ejecutar:

```bash
npm run render
```

Si `npm ci` informa que Node es demasiado antiguo, actualizá a Node 22.17+ y repetí `npm ci`. No subas `node_modules/`, `out/` ni los MP4 de `public/clips/` al repositorio.
