function confirmar() {
  window.location.href = "https://forms.gle/TU_LINK";
}

// COUNTDOWN
const fechaBoda = new Date("November 14, 2026 17:00:00").getTime();

setInterval(() => {
  const ahora = new Date().getTime();
  const diff = fechaBoda - ahora;

  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  document.getElementById("countdown").innerHTML =
    `${dias} días ${horas}h ${minutos}m`;
}, 1000);

// ANIMACIONES
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

// MÚSICA
const musica = document.getElementById("musica");

function toggleMusica() {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
}
