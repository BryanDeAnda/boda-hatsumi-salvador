function confirmar() {
  window.location.href = "https://forms.gle/TU_LINK";
}

/* =========================
   COUNTDOWN
========================= */

document.addEventListener("DOMContentLoaded", () => {
  const countdownEl = document.getElementById("countdown");

  if (!countdownEl) return;

  const fechaBoda = new Date("November 14, 2026 17:00:00").getTime();

  setInterval(() => {
    const ahora = new Date().getTime();
    const diff = fechaBoda - ahora;

    if (diff <= 0) {
      countdownEl.innerHTML = "¡Hoy es el gran día! 🤎";
      return;
    }

    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    countdownEl.innerHTML = `${dias} días ${horas}h ${minutos}m`;
  }, 1000);
});

/* =========================
   ANIMACIONES
========================= */

const elementos = document.querySelectorAll(".fade-in");

const mostrar = () => {
  const trigger = window.innerHeight * 0.85;

  elementos.forEach((el) => {
    if (el.getBoundingClientRect().top < trigger) {
      el.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", mostrar);
window.addEventListener("load", mostrar);

/* =========================
   MÚSICA
========================= */

const musica = document.getElementById("musica");

function toggleMusica() {
  if (!musica) return;

  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
}
