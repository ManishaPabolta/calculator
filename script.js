// // Body style
// document.body.style.margin = "0";
// document.body.style.height = "100vh";
// document.body.style.background = "black";

// document.body.style.display = "flex";
// document.body.style.justifyContent = "center";
// document.body.style.alignItems = "center";
// document.body.style.overflow = "hidden";

// //  glitter effect
// const stars = document.createElement("div");
// stars.style.position = "absolute";
// stars.style.width = "100%";
// stars.style.height = "100%";
// stars.style.background = "radial-gradient(white 1px, transparent 1px)";
// stars.style.backgroundSize = "10px 10px";
// stars.style.opacity = "0.05";
// document.body.appendChild(stars);

// // Calculator container
// const calculator = document.createElement("div");
// calculator.style.width = "90vw";
// calculator.style.maxWidth = "400px";
// calculator.style.height = "auto"; 
// calculator.style.padding = "20px";
// calculator.style.borderRadius = "20px";
// calculator.style.background = "#111";
// calculator.style.boxShadow = "0 0 15px #00f260, 0 0 25px #0575e6";
// calculator.style.display = "flex";
// calculator.style.flexDirection = "column";
// calculator.style.gap = "20px";
// calculator.style.zIndex = "1";
// document.body.appendChild(calculator);

// // Display
// const display = document.createElement("input");
// display.type = "text";
// display.disabled = true;
// display.style.padding = "20px";
// display.style.fontSize = "28px";
// display.style.borderRadius = "10px";
// display.style.border = "none";
// display.style.textAlign = "right";
// display.style.background = "#222";
// display.style.color = "#0f0";
// display.style.boxShadow = "inset 0 0 10px #0f0";
// calculator.appendChild(display);

// // Buttons
// const buttonLayout = [
//   "C", "DEL", "%", "/",
//   "7", "8", "9", "*",
//   "4", "5", "6", "-",
//   "1", "2", "3", "+",
//   "0", ".", "="
// ];

// const buttonGrid = document.createElement("div");
// buttonGrid.style.display = "grid";
// buttonGrid.style.gridTemplateColumns = "repeat(4, 1fr)";
// buttonGrid.style.gap = "15px";
// calculator.appendChild(buttonGrid);

// buttonLayout.forEach(label => {
//   const btn = document.createElement("button");
//   btn.textContent = label;
//   btn.style.padding = "20px";
//   btn.style.fontSize = "20px";
//   btn.style.border = "none";
//   btn.style.borderRadius = "12px";
//   btn.style.cursor = "pointer";
//   btn.style.color = "#fff";
//   btn.style.background = "linear-gradient(145deg,rgb(19, 18, 18), #0a0a0a)";
//   btn.style.boxShadow = "0 0 15px #00f260, 0 0 25px #0575e6";
//   btn.style.transition = "0.2s ease";
//   btn.style.userSelect = "none";
//   btn.style.outline = "none";
//   btn.style.webkitTapHighlightColor = "transparent";

//   // style for '='
//   if (label === "=") {
//     btn.style.background = "linear-gradient(to right, #00f260, #0575e6)";
//     btn.style.boxShadow = "0 0 15px #00f260, 0 0 25px #0575e6";
//     btn.style.color = "#000";
//   }

//   // Prevent click changing style
//   btn.addEventListener("mousedown", e => e.preventDefault());

//   btn.addEventListener("click", () => handleClick(label));
//   buttonGrid.appendChild(btn);
// });

// // Logic
// function handleClick(value) {
//   if (value === "C") {
//     display.value = "";
//   } else if (value === "DEL") {
//     display.value = display.value.slice(0, -1);
//   } else if (value === "=") {
//     try {
//       display.value = eval(display.value);
//     } catch {
//       display.value = "Error";
//     }
//   } else {
//     display.value += value;
//   }
// }












// Body style
document.body.style.margin = "0";
document.body.style.height = "100vh";
document.body.style.background = "black";
document.body.style.display = "flex";
document.body.style.justifyContent = "center";
document.body.style.alignItems = "center";
document.body.style.overflow = "hidden";

// Glitter effect
const stars = document.createElement("div");
stars.style.position = "absolute";
stars.style.width = "12000px";
stars.style.height = "100%";
stars.style.background = "radial-gradient(white 1px, transparent 1px)";
stars.style.backgroundSize = "10px 10px";
stars.style.opacity = "0.05";
document.body.appendChild(stars);

// Calculator container
const calculator = document.createElement("div");
calculator.style.width = "50vh";
calculator.style.maxWidth = "50vh";
calculator.style.padding = "20px";
calculator.style.borderRadius = "20px";
calculator.style.background = "#111";
calculator.style.boxShadow = "0 0 15px #00f260, 0 0 25px #0575e6";
calculator.style.display = "flex";
calculator.style.flexDirection = "column";
calculator.style.gap = "20px";
calculator.style.zIndex = "1";
document.body.appendChild(calculator);

// for icon + input
const displayWrapper = document.createElement("div");
displayWrapper.style.position = "relative";
calculator.appendChild(displayWrapper);

// Display input
const display = document.createElement("input");
display.type = "text";
display.disabled = true;
display.id = "display";
display.style.padding = "30px 50px 30px 50px"; 
display.style.fontSize = "28px";
display.style.width ="39vh"
display.style.borderRadius = "10px";
display.style.border = "none";
display.style.textAlign = "right";
display.style.background = "#222";
display.style.color = "#0f0";
display.style.boxShadow = "inset 0 0 10px #0f0";
displayWrapper.appendChild(display);

// History icon
let historyContainer;
let historyData = [];
const historyIcon = document.createElement("span");
historyIcon.innerHTML = "🔄";
historyIcon.style.cursor = "pointer";
historyIcon.style.position = "absolute";
historyIcon.style.left = "10px";
historyIcon.style.top = "50%";
historyIcon.style.transform = "translateY(-50%)";
historyIcon.style.fontSize = "20px";
historyIcon.title = "Show History";
displayWrapper.appendChild(historyIcon);

// Dropdown container
historyContainer = document.createElement("div");
historyContainer.style.position = "absolute";
historyContainer.style.top = "110%";
historyContainer.style.left = "0";
historyContainer.style.background = "#fff";
historyContainer.style.border = "1px solid #ccc";
historyContainer.style.borderRadius = "5px";
historyContainer.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
historyContainer.style.padding = "5px";
historyContainer.style.display = "none";
historyContainer.style.zIndex = "999";
displayWrapper.appendChild(historyContainer);

// Toggle history
historyIcon.addEventListener("click", () => {
    historyContainer.style.display =
        historyContainer.style.display === "none" ? "block" : "none";
    renderHistory();
});

// Render history
function renderHistory() {
    historyContainer.innerHTML = "";
    if (historyData.length === 0) {
        historyContainer.innerHTML = "<p style='margin:0'>No history</p>";
        return;
    }
    historyData.slice().reverse().forEach(item => {
        let entry = document.createElement("div");
        entry.style.padding = "4px";
        entry.style.cursor = "pointer";
        entry.style.borderBottom = "1px solid #eee";
        entry.innerHTML = `${item.expr} = <b>${item.result}</b>`;
        entry.addEventListener("click", () => {
            display.value = item.result;
            historyContainer.style.display = "none";
        });
        historyContainer.appendChild(entry);
    });
}

function saveHistory(expr, result) {
    historyData.push({ expr, result });
    if (historyData.length > 5) historyData.shift();
}

// Button Layout
const buttonLayout = [
  "C", "DEL", "%", "/",
  "7", "8", "9", "*",
  "4", "5", "6", "-",
  "1", "2", "3", "+",
  "0", ".", "=", "≡"
];


// Buttons Grid
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
  
  

  if (label === "=") {
    btn.style.background = "linear-gradient(to right, #00f260, #0575e6)";
    btn.style.color = "#000";
  }
  if (label === "≡") {
    btn.style.background = "linear-gradient(to right,rgb(102, 173, 255),rgb(40, 121, 175))";
  }

  btn.addEventListener("mousedown", e => e.preventDefault());
  btn.addEventListener("click", () => handleClick(label));
  buttonGrid.appendChild(btn);
});

// Advanced Panel
const advancedPanel = document.createElement("div");
advancedPanel.style.display = "none";
advancedPanel.style.flexWrap = "wrap";
advancedPanel.style.gap = "10px";
advancedPanel.style.marginTop = "10px";
calculator.appendChild(advancedPanel);

const advButtons = ["sin", "cos", "tan", "π", "e", "√", "x²", "xʸ", "log", "ln", "!", "EXP"];
advButtons.forEach(fn => {
  const b = document.createElement("button");
  b.textContent = fn;
  b.style.flex = "1 1 calc(25% - 10px)";
  b.style.padding = "10px";
  b.style.background = "#222";
  b.style.color = "#fff";
  b.style.border = "none";
  b.style.borderRadius = "8px";
  b.style.cursor = "pointer";
  b.addEventListener("click", () => applyAdvanced(fn));
  advancedPanel.appendChild(b);
});

// Handle button clicks
function handleClick(value) {
    if (value === "C") {
        display.value = "";
    } else if (value === "DEL") {
        display.value = display.value.slice(0, -1);
    } else if (value === "=") {
        try {
            let expr = display.value.replace(/%/g, "/100");
            let result = eval(expr);
            saveHistory(display.value, result);
            display.value = result;
        } catch {
            display.value = "Error";
        }
    } else if (value === "≡") {
        advancedPanel.style.display =
            advancedPanel.style.display === "none" ? "flex" : "none";
    } else {
        display.value += value;
    }
}

function applyAdvanced(fn) {
    switch (fn) {
        case "sin": display.value = Math.sin(eval(display.value)); break;
        case "cos": display.value = Math.cos(eval(display.value)); break;
        case "tan": display.value = Math.tan(eval(display.value)); break;
        case "π": display.value += Math.PI; break;
        case "e": display.value += Math.E; break;
        case "√": display.value = Math.sqrt(eval(display.value)); break;
        case "x²": display.value = Math.pow(eval(display.value), 2); break;
        case "xʸ": display.value += "**"; break;
        case "log": display.value = Math.log10(eval(display.value)); break;
        case "ln": display.value = Math.log(eval(display.value)); break;
        case "!": display.value = factorial(eval(display.value)); break;
        case "EXP": display.value += "e"; break;
    }
}

function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0) return 1;
    return n * factorial(n - 1);
}
