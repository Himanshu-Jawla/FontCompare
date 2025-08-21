const fontSelect = document.getElementById("fontSelect");
const fontSizeInput = document.getElementById("fontSizeInput");
const fontColor = document.getElementById("fontColor");
const bgColor = document.getElementById("bgColor");
const preview = document.querySelector(".card");
const themeToggle = document.getElementById("themeToggle");
const vibeInput = document.getElementById("vibeInput");
const recommendBtn = document.getElementById("recommendBtn");
const pairingList = document.getElementById("pairingList");
const accessibilityReport = document.getElementById("accessibilityReport");
const performanceReport = document.getElementById("performanceReport");
const saveBtn = document.getElementById("saveBtn");

// Load Google Fonts
async function loadFonts() {
  const res = await fetch("https://www.googleapis.com/webfonts/v1/webfonts?key=YOUR_API_KEY");
  const data = await res.json();
  data.items.forEach(font => {
    const option = document.createElement("option");
    option.value = font.family;
    option.textContent = font.family;
    fontSelect.appendChild(option);
  });
}
loadFonts();

// Apply selected font
fontSelect.addEventListener("change", () => {
  const font = fontSelect.value;
  const link = document.createElement("link");
  link.href = `https://fonts.googleapis.com/css2?family=${font.replace(/ /g, "+")}&display=swap`;
  link.rel = "stylesheet";
  document.head.appendChild(link);
  preview.style.fontFamily = `'${font}', sans-serif`;
  checkPerformance(font);
});

// Manual font size
fontSizeInput.addEventListener("input", () => {
  preview.style.fontSize = `${fontSizeInput.value}px`;
});

// Colors
fontColor.addEventListener("input", () => {
  preview.style.color = fontColor.value;
  checkAccessibility();
});
bgColor.addEventListener("input", () => {
  preview.style.background = bgColor.value;
  checkAccessibility();
});

// Dark/light toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Font recommendation
recommendBtn.addEventListener("click", () => {
  const vibe = vibeInput.value.toLowerCase();
  let rec = "Roboto";
  if (vibe.includes("formal")) rec = "Merriweather";
  if (vibe.includes("playful")) rec = "Comic Neue";
  if (vibe.includes("serious")) rec = "Times New Roman";
  alert(`Recommended font: ${rec}`);
});

// Save & Share
saveBtn.addEventListener("click", () => {
  const settings = {
    font: fontSelect.value,
    size: fontSizeInput.value,
    color: fontColor.value,
    background: bgColor.value
  };
  const json = JSON.stringify(settings);
  alert(`Your setup: ${json}`);
});

// Accessibility checker
function checkAccessibility() {
  const textColor = fontColor.value;
  const bg = bgColor.value;
  accessibilityReport.textContent = `Contrast check between ${textColor} and ${bg}... (demo only)`;
}

// Performance insights
function checkPerformance(font) {
  performanceReport.textContent = `Checking performance for ${font}... Avoid loading too many weights.`;
}
