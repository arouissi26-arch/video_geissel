# Renderizar el vídeo de Aissa en GitHub Codespaces

El montaje se llama **Aissa**, no `Avaluacio` (ese es el de Geissel). El resultado es un MP4 **1920×1080, 30 fps, de unos 4 min 47 s**, con las ocho grabaciones completas, introducción, avances de 2,5 s y cierre.

## 1. Abrir un Codespace actualizado

En GitHub, abre este repositorio, selecciona **main → Code → Codespaces → Create codespace on main**. Usa Node.js **22** y, si tienes esa opción, una máquina de **4 núcleos / 8 GB de RAM**. En 2 núcleos también funciona, pero tarda más. Reserva varios GB libres para los fotogramas temporales.

Si usas un Codespace que ya existía, primero guarda sus cambios locales y actualiza `main` con `git pull --ff-only` cuando estés en esa rama. No uses un reset para descartar trabajo. Deben existir `videos_aissa/`, `src/video/Aissa.tsx` y este documento.

## 2. Copiar y pegar en la terminal

Desde la raíz del repositorio:

```bash
node --version
npm ci
npx remotion browser ensure
npm run media
npm run aissa:media
npm test
npm run aissa:test
npm run aissa:render
```

No necesitas instalar Python ni generar las imágenes o la música de nuevo: los activos ya están incluidos. Los programas FFmpeg y FFprobe vienen con las dependencias de Remotion. El primer comando de navegador descarga Chrome Headless Shell; los siguientes renders reutilizan esa descarga.

**La plancha se reconstruye automáticamente** a partir de `Aissa_Planxa.mp4.part00` y `.part01`. No las importes como dos vídeos separados. Los originales no se modifican. El preparador genera enlaces/copias en `public/aissa/` y calcula las duraciones.

## 3. Descargar el MP4

Cuando Remotion termine y muestre la ruta de salida:

```text
entrega/Aissa-Avaluacio-Inicial.mp4
```

En el explorador de archivos de Codespaces abre `entrega`, pulsa con el botón derecho sobre el MP4 y elige **Download / Descargar**. El archivo utiliza H.264 y AAC, y apunta a unos **90 MB**, por debajo de 100 MB en esta duración. El tamaño final puede variar un poco. No se sube automáticamente a Dropbox desde Codespaces: descárgalo o utiliza tu cuenta de Dropbox para subirlo.

Los MP4 finales y las copias temporales están ignorados por Git para no llenar el repositorio.

## Vista previa opcional

```bash
npm run aissa:studio -- --ipv4
```

En **Ports / Puertos**, abre el puerto que anuncie Remotion (normalmente 3000). En Studio selecciona la composición **Aissa**. No hace falta abrir Studio para renderizar desde la terminal.

## Si falla el navegador

Vuelve a ejecutar `npx remotion browser ensure`. Si el error menciona bibliotecas compartidas ausentes, instala las dependencias que falten. Para los errores de NSS/NSPR/GBM habituales en Linux:

```bash
sudo apt-get update
sudo apt-get install -y libnss3 libnspr4 libgbm1
npx remotion browser ensure
npm run aissa:render
```

Si el mensaje indica otra biblioteca, instala el paquete correspondiente a la versión de Ubuntu de tu Codespace. No copies `/tmp/chromium` ni `LD_LIBRARY_PATH=/tmp/klibs/lib` de esta sesión: son rutas exclusivas del sandbox de Arena, **no** de Codespaces.

## Si falta memoria o se cierra Chrome

Cierra Studio y otras tareas pesadas. Usa una sola pestaña de render:

```bash
npm run media
npm run aissa:media
npx remotion render src/video/Root.tsx Aissa entrega/Aissa-Avaluacio-Inicial.mp4 \
  --codec=h264 --video-bitrate=2400k --audio-bitrate=128k \
  --x264-preset=veryfast --concurrency=1 --offthreadvideo-threads=1 \
  --offthreadvideo-cache-size-in-bytes=268435456
```

No hay un tiempo garantizado: depende de CPU, RAM y carga del Codespace. Mira los contadores **Rendered** y **Encoded**; no cierres la terminal hasta que termine el proceso.

## Más calidad, archivo más grande

Si no necesitas el límite de 100 MB, puedes exportar una versión de mayor calidad:

```bash
npm run media
npm run aissa:media
npx remotion render src/video/Root.tsx Aissa entrega/Aissa-Alta-Calidad.mp4 \
  --codec=h264 --crf=18 --audio-bitrate=192k \
  --x264-preset=medium --concurrency=2 --offthreadvideo-threads=2
```

Esta versión tardará más y puede superar ampliamente los 100 MB. No combines `--crf` y `--video-bitrate` en el mismo comando.

## Qué comprobar antes de entregar

- La portada y la firma dicen **AISSA**.
- Hay ocho avances y ocho grabaciones completas.
- La plancha dura aproximadamente un minuto.
- Las sentadillas provienen de `Aissa Quads.mp4`; las gambadas de `Aissa Sentadilla.mp4`. Se han nombrado por el movimiento observado.
- Las flexiones indican **suport elevat**, como en la grabación.
- Las fotos IA están señaladas como conceptuales y el cierre no inventa marcas ni resultados personales.

Los textos y colores están en `src/aissa-data.ts` y `src/video/Aissa.tsx`. El vídeo de Geissel sigue disponible como `Avaluacio` y no se sobrescribe al renderizar Aissa.
