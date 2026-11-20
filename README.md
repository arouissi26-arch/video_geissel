> **Aissa en Codespaces:** sigue [RENDER-CODESPACES.md](./RENDER-CODESPACES.md) para instalar, previsualizar, renderizar y descargar el MP4. Composición: `Aissa`.

# Kinetik — Avaluació inicial · Geissel Canelas

Evaluación de fuerza en catalán, hecha con React y Remotion. La edición para revisión docente conserva **cada grabación disponible entera**, desde 00:00, sin acelerar, recortar la imagen ni tapar el cuerpo con rótulos. Se conserva el sonido de cámara y la música baja durante los ejercicios.

## Montaje actual

- Portada original de 4 s, con el nombre de Geissel Canelas.
- Seis avances de **2,5 s**: movimiento real junto a una foto IA editorial por ejercicio (`public/art/exercise-N.jpg`), identificada como ilustración. Tipografía cinética y partículas.
- Seis grabaciones reales, en este orden: Sentadilla (17,100 s), Lunge (26,900 s), Pont de glutis (23,499 s), Sit-up (24,921 s), Dominades (13,335 s) y Flexions (16,833 s). El nombre, el contador y el progreso se animan en una banda **fuera** de la imagen. Sin secuencias vacías para Lumbars, Planxa o Burpees.
- Tres reflexiones de 8 s. Las respuestas en `src/data.ts` son una **propuesta editable** de autoevaluación; no son mediciones de rendimiento. La portada del corredor y las dos nuevas imágenes de zapatillas y agarre son ilustraciones fotográficas generadas para las cartelas, no fotos documentales de Geissel.

## Previsualizar o exportar

Node 22: `npm ci`, luego `npm run dev` para la vista interactiva o `npm run studio` para Remotion Studio. «Reproduir sessió» comienza en 00:00. La lista de escenas y la línea de tiempo reflejan la duración real del material.

- `npm test` comprueba los tipos; `npm run build` compila la web.
- `npm run render` → `out/avaluacio-inicial.mp4` (1920×1080, H.264, 30 fps).
- `npm run render:vertical` → `out/avaluacio-vertical.mp4` (1080×1920, 30 fps, sin recortar las grabaciones).

## Cambiar material

`npm run media` usa FFprobe para medir la pista de vídeo de cada archivo y reservar `ceil(duración × 30)` fotogramas. No transcodifica extractos. Los originales de `videos/` se enlazan o copian enteros al directorio público generado. Se recalcula el índice al arrancar dev/studio/build/render. Se pueden indicar `FFMPEG_BIN` y `FFPROBE_BIN` si los ejecutables no están disponibles en la plataforma.

`public/clips/exercici-N.mp4` tiene prioridad sobre el original correspondiente. La numeración de **archivos** sigue siendo 1 Sentadilla, 2 Lunge, 3 Pont de glutis, 4 Lumbars, 5 Sit-up, 6 Planxa, 7 Dominades, 8 Flexions y 9 Burpees. Si no existe un archivo ni un original, se omite ese ejercicio del montaje. El contador **en pantalla** numera solo los presentes.

El panel **Materials** permite probar archivos y respuestas en memoria; para conservar cambios al exportar, guarda los MP4 en `public/clips/` y las respuestas en `src/data.ts`. Para cambiar la pista, guarda música autorizada en `public/audio/music.mp3` (también `.wav` o `.m4a`). La pista incluida, `pulse.mp3`, es una composición original de 120 BPM sin muestras externas, generada por `scripts/score.py` y autorizada para usar y distribuir con el vídeo sin regalías.

## Efectos

El proyecto incluye el skill [claude-video-effects](https://github.com/Vibha-Ramprakash/claude-video-effects) en `.claude/skills/effects/`, revisión `60840acc7e126a5e34068276a23e912ec4c8c34c`, con sus licencias. La portada y el cierre conservan las adaptaciones gráficas de portada editorial, cinta de acento, foto impresa monocroma y tipografía cinética. La escena de evaluación prescinde deliberadamente de efectos sobre el cuerpo para que se pueda ver la técnica.

## Entrega para Dropbox

`entrega/Geissel-Canelas-Final.mp4`: exportación 1080p, 30 fps, H.264 a 4000 kb/s y AAC a 128 kb/s, aproximadamente 2 min 46 s. Este bitrate mantiene el archivo por debajo del límite de 100 MB del conector. Los MP4 de entrega no se versionan.

# Aissa — Arxiu de moviment / 001

Película independiente registrada como composición **`Aissa`**. No sustituye el montaje ni los archivos de Geissel. Identidad nueva: azul eléctrico `#164bff`, naranja `#ff6b35`, tinta `#080f20` y blanco hielo `#edf4fa`; nueve fotografías IA nuevas en `public/art/aissa/`, composición editorial, barridos geométricos, retícula, partículas, contador circular, tipografía cinética y cierre propio. Las imágenes conceptuales se identifican como IA. La música `public/audio/aissa-drive.mp3` es una composición original de 112 BPM, sin muestras, generada por `scripts/aissa-score.py`.

## Fuentes y nombres comprobados

Los originales están en **`videos_aissa/` en `main`**. Si esta rama no los contiene aún, actualiza la referencia y recupera solo esa carpeta, sin cambiar de rama:

```sh
git fetch origin main
git restore --source=origin/main -- videos_aissa
```

El directorio de fuentes queda ignorado en esta rama para no duplicar cientos de MB que ya existen en `main`. `npm run aissa:media` reconstruye la plancha concatenando **bytes**, no concatenando dos vídeos, y enlaza los originales sin transcodificarlos a `public/aissa/` (también ignorado). Genera `src/aissa-media.json` y miniaturas. La reconstrucción y los enlaces son idempotentes.

| Pantalla | Archivo original | Duración de vídeo |
|---|---|---:|
| Sentadilles | Aissa Quads.mp4 | 31,359 s |
| Gambades | Aissa Sentadilla.mp4 | 19,100 s |
| Pont de glutis | Aissa pont gluti.mp4 | 21,600 s |
| Lumbars | Aissa lumbars.mp4 | 19,699 s |
| Abdominals | Aissa Abdominals.mp4 | 39,400 s |
| Planxa | Aissa_Planxa.mp4.part00 + part01 | 60,560 s |
| Dominades | Aissa Dominades 1.mp4 | 17,052 s |
| Flexions · suport elevat | Aissa Flexions.mp4 | 29,366 s |

**Ojo:** los rótulos de sentadillas y zancadas siguen los movimientos observados en las grabaciones, no los nombres de archivo. No se añaden repeticiones, puntuaciones, afirmaciones de mejora ni respuestas personales inventadas.

## Estructura y exportación

1. Apertura propia de 6 s.
2. Ocho avances de 2,5 s: fotografía IA de cada ejercicio y barrido hacia el movimiento real.
3. Separador de 2 s.
4. Las ocho grabaciones **enteras, desde el inicio, a velocidad normal y sin recortar la imagen**. La banda de nombre, categoría, reloj y progreso está fuera de la grabación. Sonido natural a 0,85 y música reducida a 0,09.
5. Tres tarjetas editoriales de 6 s sobre observación, control y comparación futura. No pretenden ser una autoevaluación personal confirmada.
6. Firma final de 3 s y fundido.

Total: **8615 fotogramas, 4:47,17, 1920×1080, 30 fps**. `src/video/Aissa.tsx` y `src/aissa-data.ts` mantienen el diseño y la línea de tiempo separados del montaje de Geissel.

```sh
npm ci
npm run aissa:media
npm run aissa:test
npm run studio  # seleccionar Aissa
npm run aissa:render
```

Salida: `entrega/Aissa-Avaluacio-Inicial.mp4`, H.264 a 2400 kb/s y AAC a 128 kb/s, para quedar por debajo de 100 MB y poder enviarlo a Dropbox. El MP4 se excluye del control de versiones. En un servidor sin Chrome, añade `-- --browser-executable=/ruta/a/chromium` al comando de exportación.

Las pruebas verifican fuentes, duraciones completas, activos, avances de 75 frames, continuidad exacta y ausencia de solapamientos/huecos. `npm test` comprueba tipos y `npm run build` conserva la aplicación original.
