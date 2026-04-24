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
          observer.unobserve(entry.target); // solo se anima una vez
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  animElements.forEach((el) => observer.observe(el));
});
