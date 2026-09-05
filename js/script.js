// ===== Configuración =====
const CARPETA_FOTOS = "fotos";   // carpeta donde van foto1.jpg ... foto33.jpg

// ===== Una frase para cada foto (edítalas si quieres) =====
const FRASES = [
  "Desde el primer día supe que serías mi lugar favorito.",
  "Tu risa cambió para siempre la forma en que veo la vida.",
  "Contigo hasta lo más simple se convierte en un recuerdo hermoso.",
  "Eres la calma que llegó sin pedirla y se quedó para siempre.",
  "Cada foto contigo es una razón más para amarte.",
  "Con Isabel a tu lado se nota lo hermosa que es tu alma de madre.",
  "Eres la mujer que soñé sin saber que existías.",
  "Tu mirada sigue siendo mi lugar seguro.",
  "Gracias por elegirme cada día, incluso en los difíciles.",
  "Ver crecer a nuestra familia contigo es el regalo más grande.",
  "Isabel tiene tu misma luz en los ojos.",
  "Eres el hogar al que siempre quiero volver.",
  "No hay versión de mi vida que no te incluya a ti.",
  "Tu fuerza silenciosa sostiene esta familia todos los días.",
  "Cada año a tu lado se siente como el primero.",
  "Contigo aprendí que el amor también se construye en la rutina.",
  "Eres la mejor decisión que he tomado en la vida.",
  "Tu manera de amar a Isabel me enamora todos los días.",
  "Sigues siendo la razón por la que sonrío sin motivo.",
  "Eres bella incluso en los momentos que ni notas.",
  "Gracias por darme la familia que siempre soñé tener.",
  "Cada recuerdo contigo se vuelve mi favorito.",
  "Tu paciencia y tu amor son el pilar de nuestro hogar.",
  "Eres la mujer más importante en la vida de nuestra hija.",
  "Contigo el tiempo pasa distinto, siempre demasiado rápido.",
  "Eres luz incluso en los días grises.",
  "Nuestra historia apenas comienza y ya es la más bonita que conozco.",
  "Amarte se ha vuelto lo más natural que hago.",
  "Isabel tiene la suerte de tener una madre como tú.",
  "Eres mi persona favorita en cualquier lugar del mundo.",
  "Gracias por construir esta vida junto a mí.",
  "Feliz cumpleaños, mi amor. Que la vida te siga regalando tanto como tú nos regalas a nosotros.",
    "Cada día contigo confirma que elegí bien.",
  "Feliz cumpleaños, mi amor. Que la vida te siga regalando tanto como tú nos regalas a nosotros.",
  "Contigo hasta los días comunes se sienten especiales."
  
];

const TOTAL_FOTOS = FRASES.length;

// ===== Construir la galería =====
const grid = document.getElementById("galeriaGrid");

for (let i = 1; i <= TOTAL_FOTOS; i++) {
  const frase = FRASES[i - 1];

  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const extensiones = ["jpg", "jpeg"]; // probará estas extensiones en orden
  let intento = 0;

  img.src = `${CARPETA_FOTOS}/foto${i}.${extensiones[intento]}`;
  img.alt = frase;
  img.loading = "lazy";

  const caption = document.createElement("figcaption");
  caption.textContent = frase;

  // si la extensión actual no existe, prueba la siguiente antes de rendirse
  img.onerror = () => {
    intento++;
    if (intento < extensiones.length) {
      img.src = `${CARPETA_FOTOS}/foto${i}.${extensiones[intento]}`;
    } else {
      img.replaceWith(Object.assign(document.createElement("div"), {
        className: "foto-placeholder",
        innerHTML: `foto${i}<br>pendiente`
      }));
    }
  };

  img.addEventListener("click", () => abrirLightbox(img.src, frase));

  figure.appendChild(img);
  figure.appendChild(caption);
  grid.appendChild(figure);
}

// ===== Lightbox =====
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");

function abrirLightbox(src, frase) {
  lightboxImg.src = src;
  lightboxImg.alt = frase;
  lightboxCaption.textContent = frase;
  lightbox.classList.add("open");
}

function cerrarLightbox() {
  lightbox.classList.remove("open");
  lightboxImg.src = "";
}

lightboxClose.addEventListener("click", cerrarLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) cerrarLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") cerrarLightbox();
});


// ===== Reproductor de la canción (YouTube oculto + controles propios) =====
const YT_VIDEO_ID = "EUDZAhq16mM"; // ← si cambias la canción, pon aquí el ID del nuevo link

let ytPlayer;
let repiteActivo = false;
let progresoInterval;

function onYouTubeIframeAPIReady() {
  ytPlayer = new YT.Player("yt-player", {
    height: "0",
    width: "0",
    videoId: YT_VIDEO_ID,
    playerVars: { playsinline: 1, controls: 0, rel: 0 },
    events: {
      onReady: () => {
        document.getElementById("timeTotal").textContent = formatearTiempo(ytPlayer.getDuration());
      },
      onStateChange: onCambioEstado
    }
  });
}

const btnPlay = document.getElementById("btnPlay");
const iconPlay = document.getElementById("iconPlay");
const btnRepeat = document.getElementById("btnRepeat");
const barra = document.getElementById("playerBar");
const barraFill = document.getElementById("playerBarFill");

function formatearTiempo(segundos) {
  segundos = Math.floor(segundos || 0);
  const m = Math.floor(segundos / 60);
  const s = segundos % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function onCambioEstado(e) {
  if (e.data === YT.PlayerState.PLAYING) {
    btnPlay.classList.add("playing");
    iconPlay.innerHTML = '<rect x="6" y="5" width="4" height="14"></rect><rect x="14" y="5" width="4" height="14"></rect>';
    clearInterval(progresoInterval);
    progresoInterval = setInterval(actualizarProgreso, 400);
  } else {
    btnPlay.classList.remove("playing");
    iconPlay.innerHTML = '<path d="M8 5v14l11-7z"></path>';
    clearInterval(progresoInterval);
  }

  if (e.data === YT.PlayerState.ENDED && repiteActivo) {
    ytPlayer.seekTo(0);
    ytPlayer.playVideo();
  }
}

function actualizarProgreso() {
  if (!ytPlayer || !ytPlayer.getDuration) return;
  const actual = ytPlayer.getCurrentTime();
  const total = ytPlayer.getDuration();
  if (total > 0) {
    barraFill.style.width = `${(actual / total) * 100}%`;
    document.getElementById("timeActual").textContent = formatearTiempo(actual);
    document.getElementById("timeTotal").textContent = formatearTiempo(total);
  }
}

btnPlay.addEventListener("click", () => {
  if (!ytPlayer || !ytPlayer.getPlayerState) return;
  const estado = ytPlayer.getPlayerState();
  if (estado === YT.PlayerState.PLAYING) {
    ytPlayer.pauseVideo();
  } else {
    ytPlayer.playVideo();
  }
});

btnRepeat.addEventListener("click", () => {
  repiteActivo = !repiteActivo;
  btnRepeat.classList.toggle("active", repiteActivo);
});

barra.addEventListener("click", (e) => {
  if (!ytPlayer || !ytPlayer.getDuration) return;
  const rect = barra.getBoundingClientRect();
  const proporcion = (e.clientX - rect.left) / rect.width;
  ytPlayer.seekTo(proporcion * ytPlayer.getDuration(), true);
});