# Kinetik — Avaluació inicial · Geissel Canelas

Evaluación de fuerza en catalán, hecha con React y Remotion. La edición para revisión docente conserva **cada grabación disponible entera**, desde 00:00, sin acelerar, recortar la imagen ni tapar el cuerpo con rótulos. Se conserva el sonido de cámara y la música baja durante los ejercicios.

## Montaje actual

- Portada original de 4 s, con el nombre de Geissel Canelas.
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
