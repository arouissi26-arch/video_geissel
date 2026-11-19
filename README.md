# Kinetik — Avaluació inicial

Montaje de fuerza en catalán hecho con React y Remotion. **No incluye un render final.** La vista previa usa exactamente la composición de exportación, no un vídeo precocinado.

## Abrir la sesión

Con Node 22 y npm: `npm ci` y `npm run dev`. `npm run studio` abre Remotion Studio. El monitor arranca pausado en un fotograma legible de la intro; «Reproduir sessió» reproduce desde el golpe inicial. La lista de escenas, la regla y los bloques permiten saltar a cualquier corte. La barra bajo la imagen permite buscar por fotograma.

## Material definitivo

Subí MP4 (H.264 recomendado, mínimo 4 s cada uno) a `public/clips/`:

| Archivo | Ejercicio | Fuente provisional en `videos/` |
|---|---|---|
| exercici-1.mp4 | Sentadilla | Squats 4.mp4 |
| exercici-2.mp4 | Lunge | lunges 1.mp4 |
| exercici-3.mp4 | Pont de glutis | pont de glutis 2.mp4 |
| exercici-4.mp4 | Lumbars | **Pendiente** |
| exercici-5.mp4 | Sit-up | abdominals nivel 3.mp4 |
| exercici-6.mp4 | Planxa | **Pendiente** |
| exercici-7.mp4 | Dominades | dominadas.1.mp4 |
| exercici-8.mp4 | Flexions | Flexcions 3.mp4 |
| exercici-9.mp4 | Burpees | **Pendiente** |

Los archivos numerados siempre tienen prioridad. `npm run media` actualiza el índice al subir material; dev/studio/build/render lo generan automáticamente al arrancar. Para los seis vídeos existentes prepara extractos de cuatro segundos a partir de 00:01; no altera los originales. Si tu plataforma no incluye el binario ffmpeg de Remotion, instala FFmpeg o define `FFMPEG_BIN` con la ruta al ejecutable. Los clips se silencian en el montaje.

**Música:** `public/audio/pulse.mp3` es una composición electrónica original sin muestras externas, sintetizada por `scripts/score.py` para este proyecto. Se permite usarla, editarla y distribuirla con el vídeo, sin regalías. A 120 BPM, cada bloque dura ocho pulsos. Aumentan la percusión y los contratiempos antes de la reflexión. Para sustituirla, guarda `public/audio/music.mp3` (también se admite `music.wav` o `music.m4a`); usa música autorizada a 120 BPM con primer golpe en 0 s o reajusta el montaje. No hay detección automática del tempo.

**Respuestas:** reemplaza los tres `[Resposta]` en `src/data.ts`, o proporciona las tres respuestas al confirmar. El panel **Materials** permite ensayar clips, música y respuestas **solo en memoria del navegador**. Para exportar hay que guardar los archivos y respuestas en el proyecto.

## Montaje y efectos

| Tiempo | Escena |
|---|---|
| 00:00–00:04 | Portada deportiva, glitch rojo/cian en modo screen, entrada elástica, partículas, etiqueta cinética y sello dentado |
| 00:04–00:40 | Nueve ejercicios de 4 s: whip horizontal, zoom, slide desenfocado, diagonal, obturador, rotación, iris, barrido lateral y cortina con zoom |
| 00:40–00:52 | Tres reflexiones de 4 s, palabra por palabra, sobre una luz violeta en movimiento; destello y fundido a negro |

`src/video/Movie.tsx` contiene `Intro`, `Ejercicio({numero,nombre,clip,colorAccent})`, `Outro` y la composición de secuencias. Partículas deterministas, `spring()` e `interpolate()` controlan la imagen en función del fotograma. `src/video/Root.tsx` registra ambos formatos.

**Claude Code:** skill completo [claude-video-effects](https://github.com/Vibha-Ramprakash/claude-video-effects), revisión `60840acc7e126a5e34068276a23e912ec4c8c34c`, instalado en `.claude/skills/effects/` (también en `~/.claude/skills/effects` en este entorno). Reinicia Claude Code para usar `/effects`; el flujo Python independiente hace su preparación según el README del skill. Conserva su licencia MIT y los avisos independientes de fuentes y modelos.

Se adaptaron **cover-star** (portada y código de barras), **tape-label** (cinta de acento), **lean-in** y **slow-push** (impulso y aproximación), **red-collage** (foto monocroma y titulares escalonados) y **moody** (filtro SVG en `Look.tsx`, basado en la curva de luminancia, gamma y contraste de `fx.py`). Son adaptaciones sincronizadas a React, no 51 filtros apilados ni seguimiento facial. El render no necesita Python, MediaPipe ni red para obtener material creativo.

## Exportar solo después de confirmar

- `npm run render` → `out/avaluacio-inicial.mp4`, **1920×1080**, H.264, 30 fps.
- `npm run render:vertical` → `out/avaluacio-vertical.mp4`, **1080×1920**, H.264, 30 fps. Mantiene completa la figura si el material es horizontal.
- `npm test` comprueba los tipos, `npm run build` compila la web.

Los seis originales existentes son horizontales; por eso la vista previa abre en 16:9. Antes del render definitivo, verifica las nueve correspondencias, las respuestas y el encuadre en Studio. Para cambiar la duración o el ritmo, ajusta la música y los tiempos juntos.
