document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector("#nav-menu");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      const open = navMenu.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
    });
  }

  document.querySelectorAll("#nav-menu a").forEach(a => {
    a.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  });

  const form = document.querySelector("#meetingForm");
  const status = document.querySelector("#formStatus");

  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const subject = `Solicitud de reunión — ${data.get("empresa")}`;
    const body = [
      "Solicitud de reunión PUBLIAVISO C.A.",
      "",
      `Empresa: ${data.get("empresa")}`,
      `Contacto: ${data.get("contacto")}`,
      `Cargo: ${data.get("cargo") || "No indicado"}`,
      `Móvil: ${data.get("movil") || "No indicado"}`,
      `Sector: ${data.get("sector")}`,
      `Línea técnica: ${data.get("linea") || "No indicada"}`,
      `Ubicación / Nodo: ${data.get("ubicacion") || "No indicada"}`,
      `Alcance / volumen: ${data.get("alcance") || "No indicado"}`,
      "",
      `Mensaje: ${data.get("mensaje") || "Sin mensaje adicional"}`
    ].join("\n");

    status.textContent = "Abriendo su cliente de correo con la solicitud preparada…";
    window.location.href = `mailto:publiaviso@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
});
