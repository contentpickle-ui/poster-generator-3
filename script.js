(() => {
  "use strict";
  const W = 1080, H = 1350;
  const canvas = document.getElementById("poster");
  const ctx = canvas.getContext("2d");
  const nameInput = document.getElementById("name");
  const designationInput = document.getElementById("designation");
  const companyInput = document.getElementById("company");
  const downloadButton = document.getElementById("download");
  const resetButton = document.getElementById("reset");
  const status = document.getElementById("status");
  const error = document.getElementById("error");
  canvas.width = W; canvas.height = H;
  const template = new Image();
  let loaded = false;
  function showError(message) { error.textContent = message; error.style.display = "block"; }
  function clearError() { error.textContent = ""; error.style.display = "none"; }
  template.onload = () => { loaded = true; clearError(); render(); };
  template.onerror = () => showError("Cannot load poster-template.jpg. Keep it beside index.html and script.js.");
  template.src = "poster-template.jpg";
  function fittedSize(text, maxWidth, start, weight) {
    let size = start;
    while (size > 12) { ctx.font = `${weight} ${size}px Arial, Helvetica, sans-serif`; if (ctx.measureText(text).width <= maxWidth) break; size--; }
    return size;
  }
  function drawText(text, y, startSize, weight) {
    if (!text) return;
    const maxWidth = W * 0.84;
    const size = fittedSize(text, maxWidth, startSize, weight);
    ctx.font = `${weight} ${size}px Arial, Helvetica, sans-serif`;
    ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillStyle = "#fff";
    ctx.shadowColor = "rgba(0,0,0,.35)"; ctx.shadowBlur = 2; ctx.shadowOffsetY = 1;
    ctx.fillText(text, W / 2, y, maxWidth);
    ctx.shadowColor = "transparent"; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
  }
  function render() {
    if (!loaded) return;
    clearError(); ctx.clearRect(0, 0, W, H); ctx.drawImage(template, 0, 0, W, H);
    // Text sits between the two decorative dividers in the supplied artwork.
    drawText(nameInput.value.trim(), 1190, 29, 700);
    drawText(designationInput.value.trim(), 1228, 24, 400);
    drawText(companyInput.value.trim(), 1266, 24, 400);
    status.textContent = "Preview updated.";
  }
  [nameInput, designationInput, companyInput].forEach(input => input.addEventListener("input", render));
  downloadButton.addEventListener("click", () => {
    if (!loaded) { showError("Please wait for the poster template to load."); return; }
    render(); canvas.toBlob(blob => {
      if (!blob) { showError("Could not export the poster. Please try again."); return; }
      const url = URL.createObjectURL(blob), link = document.createElement("a");
      const safeName = (nameInput.value.trim() || "poster").replace(/[^a-z0-9_-]/gi, "-").replace(/-+/g, "-");
      link.href = url; link.download = `${safeName}-poster-1080x1350.png`;
      document.body.appendChild(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
      status.textContent = "Poster downloaded.";
    }, "image/png");
  });
  resetButton.addEventListener("click", () => { nameInput.value = ""; designationInput.value = ""; companyInput.value = ""; clearError(); render(); status.textContent = "Fields cleared."; });
})();
