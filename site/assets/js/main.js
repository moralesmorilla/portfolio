const links = {
  email: "moralesmorillamanuel@gmail.com",
  github: "https://github.com/moralesmorilla",
  linkedin: "https://www.linkedin.com/in/manuel-morales-morilla-a8a6663b1",
  hrRepository: "https://github.com/moralesmorilla/HR-Management-API",
  hrDemo: "https://hr-management-api-production.up.railway.app/",
};

const menuButton = document.querySelector("#menu-toggle");
const menu = document.querySelector("#menu");
const langButton = document.querySelector("#lang-toggle");
const themeButton = document.querySelector("#theme-toggle");
let lang = "es";

function applyLinks() {
  wireProfile("github", links.github);
  wireProfile("linkedin", links.linkedin);

  wireProjectLink("[data-hr-code-link]", links.hrRepository);
  wireProjectLink("[data-hr-demo-link]", links.hrDemo);
}

function wireProjectLink(selector, href) {
  const pending = document.querySelector(selector);
  if (!pending || !href) return;
  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.target = "_blank";
  anchor.rel = "noreferrer";
  anchor.className = "project-link pressable";
  anchor.innerHTML = pending.innerHTML;
  pending.replaceWith(anchor);
}

function wireProfile(name, href) {
  document.querySelectorAll(`[data-profile="${name}"]`).forEach((node) => {
    if (!href) return;
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.target = "_blank";
    anchor.rel = "noreferrer";
    anchor.className = node.className.replace("muted", "").trim();
    anchor.innerHTML = node.innerHTML;
    node.replaceWith(anchor);
  });
}

function setLang(next) {
  lang = next;
  document.documentElement.lang = next;
  document.querySelectorAll("[data-en]").forEach((node) => {
    if (!node.dataset.es) node.dataset.es = node.textContent;
    node.textContent = next === "en" ? node.dataset.en : node.dataset.es;
  });
  document.querySelectorAll("[data-en-label]").forEach((node) => {
    if (!node.dataset.esLabel) node.dataset.esLabel = node.getAttribute("aria-label") || "";
    node.setAttribute("aria-label", next === "en" ? node.dataset.enLabel : node.dataset.esLabel);
  });
  document.querySelectorAll("[data-en-title]").forEach((node) => {
    if (!node.dataset.esTitle) node.dataset.esTitle = node.getAttribute("title") || "";
    node.setAttribute("title", next === "en" ? node.dataset.enTitle : node.dataset.esTitle);
  });
  const navLabel = next === "en" ? "Sections" : "Secciones";
  document.querySelectorAll("[data-nav]").forEach((nav) => nav.setAttribute("aria-label", navLabel));
  langButton.textContent = next === "en" ? "ES" : "EN";
  updateThemeLabel();
}

function updateThemeLabel() {
  const isDark = document.documentElement.dataset.theme === "dark";
  themeButton.setAttribute(
    "aria-label",
    lang === "en"
      ? `Switch to ${isDark ? "light" : "dark"} theme`
      : `Cambiar al tema ${isDark ? "claro" : "oscuro"}`,
  );
  themeButton.dataset.enLabel = `Switch to ${isDark ? "light" : "dark"} theme`;
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeButton.querySelector("use").setAttribute("href", theme === "dark" ? "#i-sun" : "#i-moon");
  updateThemeLabel();
  localStorage.setItem("portfolio-theme", theme);
}

menuButton.addEventListener("click", () => {
  const open = menu.hasAttribute("hidden");
  menu.toggleAttribute("hidden", !open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.querySelector(".sr-only").textContent = open
    ? lang === "en" ? "Close menu" : "Cerrar menú"
    : lang === "en" ? "Menu" : "Menú";
});

menu.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menu.setAttribute("hidden", "");
    menuButton.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    menu.setAttribute("hidden", "");
    menuButton.setAttribute("aria-expanded", "false");
  }
});

langButton.addEventListener("click", () => setLang(lang === "es" ? "en" : "es"));
themeButton.addEventListener("click", () => {
  setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
});

setTheme(localStorage.getItem("portfolio-theme") === "dark" ? "dark" : "light");
applyLinks();
