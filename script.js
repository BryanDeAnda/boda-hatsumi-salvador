/* =========================
   COUNTDOWN
========================= */

document.addEventListener("DOMContentLoaded", () => {
  const fechaBoda = new Date("November 14, 2026 17:00:00").getTime();

  const diasEl = document.getElementById("dias");
  const horasEl = document.getElementById("horas");
  const minutosEl = document.getElementById("minutos");
  const segundosEl = document.getElementById("segundos");

  const format = (num) => String(num).padStart(2, "0");

  const interval = setInterval(() => {
    const ahora = new Date().getTime();
    const diff = fechaBoda - ahora;

    if (diff <= 0) {
      clearInterval(interval);
      diasEl.innerText = "00";
      horasEl.innerText = "00";
      minutosEl.innerText = "00";
      segundosEl.innerText = "00";
      return;
    }

    diasEl.innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
    horasEl.innerText = format(
      Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    minutosEl.innerText = format(
      Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    );
    segundosEl.innerText = format(Math.floor((diff % (1000 * 60)) / 1000));
  }, 1000);

  /* =========================
     ANIMACIONES AL HACER SCROLL
  ========================= */

  const animElements = document.querySelectorAll(".anim-ready");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  animElements.forEach((el) => observer.observe(el));

  /* =========================
     RSVP - Web3Forms
  ========================= */

  const params = new URLSearchParams(window.location.search);
  const invitados = params.get("invitados");
  const nombreParam = params.get("nombre");

  if (invitados) {
    document.getElementById("rsvp-numero").textContent = invitados;
    document.getElementById("max-invitados").value = invitados;
    const input = document.querySelector("input[name='personas']");
    input.max = invitados;
  }

  if (nombreParam) {
    const nombre = decodeURIComponent(nombreParam);
    document.getElementById("rsvp-nombre-display").textContent = nombre;
  }

  const form = document.getElementById("rsvp-form");
  const exito = document.getElementById("rsvp-exito");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = new FormData(form);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: data,
    });

    const json = await res.json();

    if (json.success) {
      form.style.display = "none";
      exito.style.display = "block";
    }
  });

  /* =========================
   CARRUSEL DE FOTOS
========================= */

  const track = document.getElementById("carrusel-track");
  const dots = document.querySelectorAll(".dot");
  const totalSlides = dots.length;
  let current = 0;
  let autoplayTimer;
  let startX = 0;
  let isDragging = false;

  const goTo = (index) => {
    current = (index + totalSlides) % totalSlides;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d) => d.classList.remove("activo"));
    dots[current].classList.add("activo");
  };

  const next = () => goTo(current + 1);

  const startAutoplay = () => {
    autoplayTimer = setInterval(next, 4000);
  };

  const stopAutoplay = () => clearInterval(autoplayTimer);

  // Dots
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      stopAutoplay();
      goTo(parseInt(dot.dataset.index));
      startAutoplay();
    });
  });

  // Swipe táctil
  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    stopAutoplay();
  });

  track.addEventListener("touchend", (e) => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? next() : goTo(current - 1);
    }
    startAutoplay();
  });

  // Swipe mouse (desktop)
  track.addEventListener("mousedown", (e) => {
    startX = e.clientX;
    isDragging = true;
    stopAutoplay();
  });

  track.addEventListener("mouseup", (e) => {
    if (!isDragging) return;
    const diff = startX - e.clientX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? next() : goTo(current - 1);
    }
    isDragging = false;
    startAutoplay();
  });

  startAutoplay();

  /* =========================
   AUDIO
========================= */

  const audio = document.getElementById("audio-boda");
  const audioBtn = document.getElementById("audio-btn");
  let audioActivo = false;

  // Primer toque en cualquier parte activa la música
  const activarAudio = () => {
    if (!audioActivo) {
      audio.volume = 0.3;
      audio
        .play()
        .then(() => {
          audioActivo = true;
          audioBtn.textContent = "🎵";
        })
        .catch(() => {});
      document.removeEventListener("touchstart", activarAudio);
      document.removeEventListener("click", activarAudio);
    }
  };

  document.addEventListener("touchstart", activarAudio);
  document.addEventListener("click", activarAudio);

  // Botón mute/unmute
  audioBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (audio.paused) {
      audio.volume = 0.3;
      audio.play();
      audioBtn.textContent = "🎵";
    } else {
      audio.pause();
      audioBtn.textContent = "🔇";
    }
  });

  /* =========================
   PANTALLA BIENVENIDA
========================= */

  const bienvenida = document.getElementById("bienvenida");
  const bienvenidaBtn = document.getElementById("bienvenida-btn");

  bienvenidaBtn.addEventListener("click", () => {
    // Arranca la música
    audio.volume = 0.3;
    audio.play().catch(() => {});
    audioActivo = true;
    audioBtn.textContent = "🎵";

    // Oculta la pantalla con animación
    bienvenida.classList.add("oculta");

    // La quita del DOM después de la transición
    setTimeout(() => {
      bienvenida.remove();
    }, 800);
  });
}); // cierre del DOMContentLoaded
