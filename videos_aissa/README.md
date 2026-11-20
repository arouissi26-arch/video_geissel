# Cómo unir el video dividido

`Aissa Planxa.mp4` se guardó en dos partes para que los archivos puedan subirse a GitHub.

Desde esta carpeta, en macOS o Linux, ejecuta:

```sh
cat Aissa_Planxa.mp4.part00 Aissa_Planxa.mp4.part01 > "Aissa Planxa.mp4"
```

En Windows (Símbolo del sistema), ejecuta:

```bat
copy /b Aissa_Planxa.mp4.part00+Aissa_Planxa.mp4.part01 "Aissa Planxa.mp4"
```

El resto de los videos está completo y no necesita reconstrucción.
