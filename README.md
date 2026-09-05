# Página de cumpleaños 🎂💜

Página lista para editar en Visual Studio Code y publicar gratis en GitHub Pages.

## 1. Ya está personalizada para Yulesi

El nombre, el mensaje de dedicatoria, el cierre y las 33 frases de la galería
ya están escritos para ella. Si quieres ajustar algo:

- El nombre y el mensaje de dedicatoria están en `index.html`.
- Las 33 frases de las fotos están al inicio de `js/script.js`, dentro de la
  lista `FRASES`. Cada línea corresponde a la foto en ese mismo orden
  (la primera frase va con `foto1.jpg`, la segunda con `foto2.jpg`, etc.),
  así que si quieres cambiar el orden de las fotos, mueve también su frase.

## 2. Agrega tus fotos y tu video

- Copia tus 33 fotos dentro de la carpeta `fotos/`, nombradas exactamente:
  `foto1.jpg`, `foto2.jpg`, `foto3.jpg` ... hasta `foto33.jpg`.
- Copia tu video dentro de la carpeta `video/`, nombrado exactamente: `video.mp4`.
- Borra los archivos `PON_TUS_FOTOS_AQUI.txt` y `PON_TU_VIDEO_AQUI.txt` cuando termines.

Mientras una foto no exista, la página muestra automáticamente un recuadro lila
con el nombre del archivo pendiente, así puedes ir viendo el avance sin que se rompa nada.

## 3. Míralo en tu computador antes de publicar (opcional pero recomendable)

En VS Code instala la extensión **Live Server** (icono de extensiones, buscar "Live Server", instalar).
Luego, clic derecho sobre `index.html` → **"Open with Live Server"**. Se abrirá en tu navegador.

## 4. Sube el proyecto a GitHub

1. Crea una cuenta en [github.com](https://github.com) si no tienes.
2. Crea un repositorio nuevo (botón verde **New**), por ejemplo llamado `feliz-cumple`.
   Déjalo público y sin agregar README (ya tienes uno).
3. En VS Code, abre la carpeta del proyecto (`Archivo → Abrir carpeta`).
4. Abre la terminal integrada (`Terminal → Nueva terminal`) y ejecuta, uno por uno:

   ```
   git init
   git add .
   git commit -m "primera version"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/feliz-cumple.git
   git push -u origin main
   ```

   (Reemplaza `TU-USUARIO` y `feliz-cumple` por tu usuario y el nombre real de tu repositorio.
   Si nunca has usado Git, VS Code te pedirá iniciar sesión en GitHub la primera vez; solo sigue el asistente.)

## 5. Activa GitHub Pages

1. En tu repositorio en github.com, ve a **Settings → Pages**.
2. En "Branch", selecciona `main` y la carpeta `/ (root)`. Clic en **Save**.
3. Espera 1-2 minutos. Tu página quedará publicada en:

   ```
   https://TU-USUARIO.github.io/feliz-cumple/
   ```

## 6. Genera el código QR

Con la URL de arriba, entra a cualquier generador gratuito, por ejemplo:
[qr-code-generator.com](https://www.qr-code-generator.com/) o [qrcode-monkey.com](https://www.qrcode-monkey.com/)
(este último te deja ponerle color lila y hasta un logo en el centro).

Pega la URL, genera el QR, descárgalo como imagen y ya puedes imprimirlo o
enviarlo para que ella lo escanee.

## Notas útiles

- Si subes más fotos después, solo repite `git add .`, `git commit -m "mensaje"`, `git push`.
- Los cambios tardan 1-2 minutos en verse reflejados en la página publicada.
- Si una foto se ve "acostada" o girada, ábrela en cualquier editor de imágenes y guárdala de nuevo antes de subirla (a veces el celular guarda la rotación en los metadatos y el navegador no la respeta).
