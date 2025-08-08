// Body style
document.body.style.margin = "0";
document.body.style.height = "100vh";
document.body.style.background = "black";

document.body.style.display = "flex";
document.body.style.justifyContent = "center";
document.body.style.alignItems = "center";
document.body.style.overflow = "hidden";

//  glitter effect
const stars = document.createElement("div");
stars.style.position = "absolute";
stars.style.width = "100%";
stars.style.height = "100%";
stars.style.background = "radial-gradient(white 1px, transparent 1px)";
stars.style.backgroundSize = "10px 10px";
stars.style.opacity = "0.05";
document.body.appendChild(stars);

// Calculator container
const calculator = document.createElement("div");
calculator.style.width = "90vw";
calculator.style.maxWidth = "400px";
calculator.style.height = "auto"; 
calculator.style.padding = "20px";
calculator.style.borderRadius = "20px";
calculator.style.background = "#111";
calculator.style.boxShadow = "0 0 15px #00f260, 0 0 25px #0575e6";
calculator.style.display = "flex";
calculator.style.flexDirection = "column";
calculator.style.gap = "20px";
calculator.style.zIndex = "1";
document.body.appendChild(calculator);

// Display
const display = document.createElement("input");
display.type = "text";
display.disabled = true;
display.style.padding = "20px";
display.style.fontSize = "28px";
display.style.borderRadius = "10px";
display.style.border = "none";
display.style.textAlign = "right";
display.style.background = "#222";
display.style.color = "#0f0";
display.style.boxShadow = "inset 0 0 10px #0f0";
calculator.appendChild(display);

// Buttons
const buttonLayout = [
  "C", "DEL", "%", "/",
  "7", "8", "9", "*",
  "4", "5", "6", "-",
  "1", "2", "3", "+",
  "0", ".", "="
];

const buttonGrid = document.createElement("div");
buttonGrid.style.display = "grid";
buttonGrid.style.gridTemplateColumns = "repeat(4, 1fr)";
buttonGrid.style.gap = "15px";
calculator.appendChild(buttonGrid);

buttonLayout.forEach(label => {
  const btn = document.createElement("button");
  btn.textContent = label;
  btn.style.padding = "20px";
  btn.style.fontSize = "20px";
  btn.style.border = "none";
  btn.style.borderRadius = "12px";
  btn.style.cursor = "pointer";
  btn.style.color = "#fff";
  btn.style.background = "linear-gradient(145deg,rgb(19, 18, 18), #0a0a0a)";
  btn.style.boxShadow = "0 0 15px #00f260, 0 0 25px #0575e6";
  btn.style.transition = "0.2s ease";
  btn.style.userSelect = "none";
  btn.style.outline = "none";
  btn.style.webkitTapHighlightColor = "transparent";

  // style for '='
  if (label === "=") {
    btn.style.background = "linear-gradient(to right, #00f260, #0575e6)";
    btn.style.boxShadow = "0 0 15px #00f260, 0 0 25px #0575e6";
    btn.style.color = "#000";
  }

  // Prevent click changing style
  btn.addEventListener("mousedown", e => e.preventDefault());

  btn.addEventListener("click", () => handleClick(label));
  buttonGrid.appendChild(btn);
});

// Logic
function handleClick(value) {
  if (value === "C") {
    display.value = "";
  } else if (value === "DEL") {
    display.value = display.value.slice(0, -1);
  } else if (value === "=") {
    try {
      display.value = eval(display.value);
    } catch {
      display.value = "Error";
    }
  } else {
    display.value += value;
  }
}



