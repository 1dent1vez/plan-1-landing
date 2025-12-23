import { initConfig } from "./config-loader.js";
import { initMotion } from "./motion.js";
import { initComponents } from "./components.js";

async function init() {
  await initConfig();
  initComponents();
  initMotion();
}

init();
