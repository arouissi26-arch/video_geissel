# Avaluació inicial — Remotion

Reel de evaluación de fuerza con motion design cinético, preparado para MP4 en **1920 × 1080, 30 fps**. Los seis clips existentes son horizontales 16:9 (1920×1080 y 1280×720), así que se conserva su encuadre. Duración: **48 s** (4 s de intro + 9 escenas de 4 s + 8 s de outro), con cortes sincronizados a **120 BPM**.

## Proyecto

- Componentes reutilizables `<Intro />`, `<Ejercicio />` y `<Outro />`.
- Nueve entradas distintas, número animado, lower third con easing, barra de progreso, grade cinematográfico y punch visual en los cortes.
- Fondo procedimental de partículas/retícula, glitch RGB, tipografía cinética y tres preguntas finales con fade a negro.
- Música demo original, generada sin samples externos; se reemplaza automáticamente al subir una pista propia.
- Skill completa `claude-video-effects` instalada en `.claude/skills/effects` (MIT, upstream `Vibha-Ramprakash/claude-video-effects`, commit `60840ac`). Sus tipografías Anton, Inter y Space Mono se usan en el vídeo.

## Clips disponibles

Ya están preparados Sentadilla, Lunge, Pont de glutis, Sit-up, Dominades y Flexions. No hay grabaciones para **Lumbars (04), Planxa (06) ni Burpees (09)**; esas tres escenas se renderizan como placas gráficas animadas que indican «sin registro visual». **No hacen falta esos archivos para generar el MP4.**

Los nombres opcionales de carga son `exercici-1.mp4` … `exercici-9.mp4` dentro de `public/clips/`. `npm run assets:sync` copia los seis originales desde `videos/` y prepara el manifiesto. Los MP4 de `public/clips/` están ignorados por Git para no versionar medios pesados.

## Música

Para usar una pista propia, ponela en `public/audio/music.mp3` (también se aceptan WAV, M4A, AAC, OGG y FLAC). Sin una pista propia, se genera una base demo electrónica original de 120 BPM con build y fade-out. El WAV demo está ignorado por Git y se regenera si hace falta.

## Desarrollo y render

```bash
npm ci
npm run dev          # Remotion Studio, puerto 3000
npm run typecheck    # comprobación TypeScript
npm run still        # still de revisión, no es el vídeo final
npm run render       # out/avaluacio-inicial.mp4
```

El render usa Chromium empaquetado y los binarios de FFmpeg de Remotion. Para hacerlo en una máquina con más CPU/RAM, seguí **[README-CODESPACES.md](README-CODESPACES.md)**; recomienda un Codespace de 8 cores / 16 GB y explica cómo descargar el MP4.

## Skill de efectos

La skill original está incluida en `.claude/skills/effects/` para que Claude Code la detecte al abrir el proyecto. El montaje adapta referencias de su catálogo de 51 efectos —`moody`, `lean-in`, `timeline`, `countdown-flip`, `locked-on`, `uninstall`, `rabbit-hole`, `glass-widgets`, `liquid-glass-graph`, `checklist`, entre otros— a componentes y frames de Remotion. La tubería Python original es opcional; requiere FFmpeg/FFprobe y Python 3.10+ y está orientada a vídeos talking-head, no hace falta para este montaje.
