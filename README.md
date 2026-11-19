# Avaluació inicial · Test de força

Proyecto Remotion a 30 fps con dos formatos: `Avaluacio` (1080×1920) y `Avaluacio-16x9` (1920×1080). Montaje provisional de 67,5 s: intro de 3,5 s, nueve ejercicios de 6 s y tres tarjetas de 5 s.

## Vista previa

```sh
npm ci
node scripts/import-clips.mjs
python3 scripts/make-beat.py
npm run dev
```

La importación copia seis clips del repositorio sin sobreescribir archivos. Agregá los restantes en `public/clips/`:

| Archivo | Ejercicio | Fuente inicial |
| --- | --- | --- |
| exercici-1.mp4 | Sentadilla | `Squats 4.mp4` |
| exercici-2.mp4 | Lunge | `lunges 1.mp4` |
| exercici-3.mp4 | Pont de glutis | `pont de glutis 2.mp4` |
| exercici-4.mp4 | Lumbars | Pendiente |
| exercici-5.mp4 | Sit-up | `abdominals nivel 3.mp4` |
| exercici-6.mp4 | Planxa | Pendiente |
| exercici-7.mp4 | Dominades | `dominadas.1.mp4` |
| exercici-8.mp4 | Flexions | `Flexcions 3.mp4` |
| exercici-9.mp4 | Burpees | Pendiente |

Los clips se muestran desde su inicio, sin audio original y con recorte centrado para llenar el formato. Antes del render final conviene revisar el encuadre y elegir el tramo de cada ejercicio. Los archivos ausentes muestran una tarjeta animada. Si Studio no detecta un archivo nuevo, recargá la pestaña.

La pista base es de síntesis original, sin samples de terceros, a 120 BPM. El título entra sobre el segundo golpe y los cortes caen en pulsos de 15 fotogramas. Podés sustituirla poniendo tu pista en `public/audio/` e indicando su ruta relativa (ej. `audio/tema.mp3`) en la prop `music`; para conservar sincronía debe comenzar en el pulso y tener 120 BPM. Completá `responses` con las tres respuestas en orden. Los medios importados o generados no se versionan.

## Render, tras confirmar medios y respuestas

```sh
npm run render
npx remotion render src/index.jsx Avaluacio-16x9 output/avaluacio-horizontal.mp4
```

Si la descarga de Chromium no está disponible, usá `--browser-executable=/ruta/a/chromium` con un Chromium instalado y sus bibliotecas del sistema.

## Skill Claude Code

`.claude/skills/effects/` incluye el skill MIT de Vibha Ramprakash (commit `60840acc7e126a5e34068276a23e912ec4c8c34c`). Sus ideas de punch-in, grading, barrido y encuadre deportivo se adaptaron al montaje con React. El pipeline nativo del skill está pensado para efectos con seguimiento facial y requiere su propio setup Python/FFmpeg; no es una dependencia de este proyecto ni se ejecutó sobre los clips.
