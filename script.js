/* =========================
   COUNTDOWN
========================= */

/* Espera a que cargue el HTML */
document.addEventListener("DOMContentLoaded", () => {
  /* Obtener elemento */
  const countdownEl = document.getElementById("countdown");

  /* Validación de seguridad */
  if (!countdownEl) return;

  /* Fecha de la boda */
  const fechaBoda = new Date("November 14, 2026 17:00:00").getTime();

  /* Actualizar cada segundo */
  setInterval(() => {
    const ahora = new Date().getTime();
    const diff = fechaBoda - ahora;

    /* Si ya llegó la fecha */
    if (diff <= 0) {
      countdownEl.innerHTML = "¡Hoy es el gran día! 🤎";
      return;
    }

    /* Cálculos */
    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    /* Mostrar resultado */
    countdownEl.innerHTML = `${dias} días ${horas}h ${minutos}m`;
  }, 1000);
});
