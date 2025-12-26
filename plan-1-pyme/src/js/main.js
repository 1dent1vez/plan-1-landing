import { initConfig } from "./config-loader.js";
import { initComponents } from "./components.js";

function buildWhatsAppLink(config) {
  const content = config && config.content ? config.content : {};
  const whatsapp = content.whatsapp || {};
  const number = typeof whatsapp.number === "string" ? whatsapp.number.replace(/\D/g, "") : "";
  if (!number) return "";
  const message = typeof whatsapp.message === "string" ? whatsapp.message.trim() : "";
  const encodedMessage = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${number}${encodedMessage}`;
}

function applyWhatsAppLinks(config) {
  const link = buildWhatsAppLink(config);
  if (!link) return;
  document.querySelectorAll("[data-whatsapp-link]").forEach((el) => {
    el.setAttribute("href", link);
  });
}

function setCurrentYear() {
  const year = String(new Date().getFullYear());
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = year;
  });
}

document.documentElement.classList.add("js");
async function init() {
  const config = await initConfig();
  initComponents();
  applyWhatsAppLinks(config);
  setCurrentYear();
}

init();
