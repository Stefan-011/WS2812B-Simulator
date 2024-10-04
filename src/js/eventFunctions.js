const closeBtn = document.getElementById("closeBtn");
const miniBtn = document.getElementById("miniBtn");
const maxBtn = document.getElementById("maxBtn");

closeBtn.addEventListener("click", () => {
  window.electronAPI.closeApp();
});

miniBtn.addEventListener("click", () => {
  window.electronAPI.minimizeApp();
});

maxBtn.addEventListener("click", () => {
  window.electronAPI.maximizeApp();
});
