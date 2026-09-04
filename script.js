const toast = document.querySelector(".toast");
const showToast = message => {
  toast.textContent = message;
  const mark = document.createElement("span");
  mark.textContent = "✓";
  toast.appendChild(mark);
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2400);
};

document.querySelectorAll(".add-kit").forEach(button => {
  button.addEventListener("click", () => {
    const kit = button.dataset.kit;
    localStorage.setItem("glyah-kit", kit);
    showToast(`${kit} adicionado ao seu pedido`);
    const select = document.querySelector("#payment-form select");
    if (select) {
      const option = [...select.options].find(item => item.textContent.startsWith(kit));
      if (option) select.value = option.value;
    }
  });
});

document.querySelector("#payment-form")?.addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  const kit = form.querySelector("select").value;
  if (kit) localStorage.setItem("glyah-kit", kit.split(" — ")[0]);
  window.location.href = "pagamento.html";
});

const header = document.querySelector(".site-header");
window.addEventListener("scroll", () => header?.classList.toggle("compact", window.scrollY > 20), { passive: true });

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(element => observer.observe(element));

document.querySelector(".menu-button")?.addEventListener("click", () => {
  document.querySelector(".site-header")?.classList.toggle("menu-open");
});
