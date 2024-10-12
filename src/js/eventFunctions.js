const closeBtn = document.getElementById("closeBtn");
const miniBtn = document.getElementById("miniBtn");
const maxBtn = document.getElementById("maxBtn");
const SAVE_AS_BUTTON = document.getElementById("save-as-btn");

closeBtn.addEventListener("click", () => {
  window.electronAPI.closeApp();
});

miniBtn.addEventListener("click", () => {
  window.electronAPI.minimizeApp();
});

maxBtn.addEventListener("click", () => {
  window.electronAPI.maximizeApp();
});
