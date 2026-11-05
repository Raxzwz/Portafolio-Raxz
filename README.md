# Raxzwz — sitio para Vercel

Sitio estático (HTML + CSS + JS), sin build.

## Fotos y logos
Pon las imágenes en `assets/logos/` con estos nombres (png, webp, jpg o svg):

`minenight` · `clownmc` · `velixmc` · `onixmc` · `nixermc` · `cocomc` · `arkencraft` · `ametra`

Si falta alguna, la página muestra la inicial del servidor automáticamente.
Avatar opcional: `assets/avatar.png`.

## Reseñas
Agrega reseñas reales en el arreglo `REVIEWS` de `script.js`; la sección aparece sola cuando hay al menos una.

## Desplegar
1. Sube esta carpeta a un repo de GitHub y impórtalo en vercel.com/new (Framework: *Other*, sin build command), o
2. Desde la carpeta: `npx vercel --prod`.
