# Música

Podés subir una pista libre de derechos como `music.mp3`, `music.wav` o `soundtrack.wav`. El proyecto la selecciona automáticamente (MP3, WAV, M4A, AAC, OGG o FLAC).

Mientras tanto, `npm run assets:sync` genera `demo-bed.wav`: una base electrónica original de 120 BPM, sin samples ni material de terceros, sincronizada con el montaje de 48 segundos. El WAV está ignorado por Git y se regenera cuando hace falta. La mezcla aplica fade-out al final.
