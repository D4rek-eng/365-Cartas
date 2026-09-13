# 365 cartas para Mi Mai

Sitio estático kawaii (estética Hello Kitty + Cinnamoroll original) con **365 cartas** del **26 de septiembre de 2025** al **25 de septiembre de 2026**.

## Verlo

Abre `index.html` en el navegador, o desde esta carpeta:

```bash
python -m http.server 5173
```

Luego visita `http://localhost:5173`.

Las cartas con fecha posterior a hoy aparecen lacradas hasta su día. El progreso de lectura se guarda en el navegador.

## Regenerar textos

```bash
node scripts/generate-letters.mjs
```
