// Body
document.body.style.margin = "0";
document.body.style.height = "100vh";
document.body.style.background = "black";
document.body.style.display = "flex";
document.body.style.justifyContent = "center";
document.body.style.alignItems = "center";
document.body.style.fontFamily = "Arial, sans-serif";
document.body.style.overflow = "hidden";

// Starfield canvas
const canvas = document.createElement("canvas");
canvas.style.position = "absolute";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.zIndex = "-1";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");
let stars = [];
let numStars = 200; // number of stars

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Initialize stars
function initStars() {
    stars = [];
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5 + 0.5,
            speed: Math.random() * 0.5 + 0.1,
            alpha: Math.random() * 0.5 + 0.5
        });
    }
}
initStars();

// Animate stars
function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.y -= star.speed;
        if (star.y < 0) star.y = canvas.height;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
    });
    requestAnimationFrame(animateStars);
}
animateStars();

// -------------------------
// Calculator container
const calculator = document.createElement("div");
calculator.style.width = "90%";
calculator.style.maxWidth = "400px";
calculator.style.padding = "5vw";
calculator.style.borderRadius = "3vw";
calculator.style.background = "#111";
calculator.style.boxShadow = "0 0 3vw #00f260, 0 0 5vw #0575e6";
calculator.style.display = "flex";
calculator.style.flexDirection = "column";
calculator.style.gap = "3vw";
calculator.style.boxSizing = "border-box";
calculator.style.transition = "all 0.3s ease";
document.body.appendChild(calculator);

// Display wrapper
const displayWrapper = document.createElement("div");
displayWrapper.style.position = "relative"; 
calculator.appendChild(displayWrapper);

// Display input
const display = document.createElement("input");
display.type = "text";
display.disabled = true;
display.id = "display";
display.style.padding = "1.5vw 3vw";
display.style.fontSize = "4vw";
display.style.borderRadius = "2vw";
display.style.width = "100%";
display.style.border = "none";
display.style.textAlign = "right";
display.style.background = "#222";
display.style.color = "#0f0";
display.style.boxShadow = "inset 0 0 2vw #0f0";
displayWrapper.appendChild(display);

// History icon
let historyData = [];
const historyIcon = document.createElement("span");
historyIcon.innerHTML = "🔄";
historyIcon.style.position = "absolute";
historyIcon.style.left = "2vw";
historyIcon.style.top = "50%";
historyIcon.style.transform = "translateY(-50%)";
historyIcon.style.fontSize = "4vw";
historyIcon.style.cursor = "pointer";
historyIcon.title = "Show History";
displayWrapper.appendChild(historyIcon);

// History container
const historyContainer = document.createElement("div");
historyContainer.style.position = "absolute";
historyContainer.style.top = "100%";
historyContainer.style.left = "0";
historyContainer.style.width = "100%"; 
historyContainer.style.maxHeight = "40vh";
historyContainer.style.background = "#fff";
historyContainer.style.border = "0.2vw solid #ccc";
historyContainer.style.borderRadius = "1vw";
historyContainer.style.boxShadow = "0 0 2vw rgba(0,0,0,0.2)";
historyContainer.style.padding = "1vw";
historyContainer.style.display = "none";
historyContainer.style.overflowY = "auto";
displayWrapper.appendChild(historyContainer);

// Load and save history
function loadHistory() {
    const saved = localStorage.getItem("calcHistory");
    if (saved) {
        const oneYearAgo = Date.now() - 365*24*60*60*1000;
        historyData = JSON.parse(saved).filter(item => item.timestamp > oneYearAgo);
        saveHistoryToStorage(); 
    } else historyData = [];
}
function saveHistoryToStorage() {
    localStorage.setItem("calcHistory", JSON.stringify(historyData));
}

// Toggle history
historyIcon.addEventListener("click", () => {
    historyContainer.style.display =
        historyContainer.style.display === "none" ? "block" : "none";
    renderHistory();
});

function renderHistory() {
    historyContainer.innerHTML = "";
    if (historyData.length === 0) {
        historyContainer.innerHTML = "<p style='margin:0'>No history</p>";
        return;
    }
    historyData.slice().reverse().forEach(item => {
        const entry = document.createElement("div");
        entry.style.padding = "1vw";
        entry.style.borderBottom = "0.2vw solid #eee";
        entry.style.cursor = "pointer";
        const date = new Date(item.timestamp).toLocaleString();
        entry.innerHTML = `${item.expr} = <b>${item.result}</b> <small style="color:gray;">(${date})</small>`;
        entry.addEventListener("click", () => {
            display.value = item.result;
            historyContainer.style.display = "none";
        });
        historyContainer.appendChild(entry);
    });
}

// Save history
function saveHistory(expr, result) {
    const now = Date.now();
    historyData.push({ expr, result, timestamp: now });
    if (historyData.length > 20) historyData.shift();
    saveHistoryToStorage();
}

// Click sound
const clickSound = new Audio("https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg");
function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play();
}

// Buttons
const buttonLayout = [
  "C", "DEL", "%", "/",
  "7", "8", "9", "*",
  "4", "5", "6", "-",
  "1", "2", "3", "+",
  "0", ".", "=", "≡"
];

const buttonGrid = document.createElement("div");
buttonGrid.style.display = "grid";
buttonGrid.style.gridTemplateColumns = "repeat(4, 1fr)";
buttonGrid.style.gap = "2vw";
calculator.appendChild(buttonGrid);

buttonLayout.forEach(label => {
  const btn = document.createElement("button");
  btn.textContent = label;
  btn.style.padding = "3vw 0";
  btn.style.fontSize = "4vw";
  btn.style.border = "none";
  btn.style.borderRadius = "2vw";
  btn.style.cursor = "pointer";
  btn.style.color = "#fff";
  btn.style.background = "linear-gradient(145deg,rgb(19, 18, 18), #0a0a0a)";
  btn.style.boxShadow = "0 0 2vw #00f260, 0 0 3vw #0575e6";
  btn.style.userSelect = "none";
  if (label === "=") {
    btn.style.background = "linear-gradient(to right, #00f260, #0575e6)";
    btn.style.color = "#000";
  }
  if (label === "≡") {
    btn.style.background = "linear-gradient(to right,rgb(102, 173, 255),rgb(40, 121, 175))";
  }
  btn.addEventListener("mousedown", e => e.preventDefault());
  btn.addEventListener("click", () => {
      playClickSound();
      handleClick(label);
  });
  buttonGrid.appendChild(btn);
});

// Advanced panel
const advancedPanel = document.createElement("div");
advancedPanel.style.display = "none";
advancedPanel.style.flexWrap = "wrap";
advancedPanel.style.gap = "2vw";
advancedPanel.style.marginTop = "2vw";
calculator.appendChild(advancedPanel);

const advButtons = ["sin", "cos", "tan", "π", "e", "√", "x²", "xʸ", "log", "ln", "!", "EXP"];
advButtons.forEach(fn => {
    const b = document.createElement("button");
    b.textContent = fn;
    b.style.flex = "1 1 calc(25% - 2vw)";
    b.style.padding = "2vw 0";
    b.style.background = "#222";
    b.style.color = "#fff";
    b.style.border = "none";
    b.style.borderRadius = "1.5vw";
    b.style.cursor = "pointer";
    b.addEventListener("click", () => {
        playClickSound();
        applyAdvanced(fn);
    });
    advancedPanel.appendChild(b);
});

// Button logic
function handleClick(value) {
    if (value === "C") display.value = "";
    else if (value === "DEL") display.value = display.value.slice(0, -1);
    else if (value === "=") {
        try {
            let expr = display.value.replace(/%/g, "/100");
            let result = eval(expr);
            saveHistory(display.value, result);
            display.value = result;
        } catch { display.value = "Error"; }
    } else if (value === "≡") {
        advancedPanel.style.display = advancedPanel.style.display === "none" ? "flex" : "none";
    } else display.value += value;
}

// Keyboard support
document.addEventListener("keydown", (e) => {
    const allowedKeys = ["0","1","2","3","4","5","6","7","8","9","+","-","*","/",".","%","Enter","Backspace"];
    if (!allowedKeys.includes(e.key)) return;
    playClickSound();
    if (e.key === "Enter") handleClick("=");
    else if (e.key === "Backspace") handleClick("DEL");
    else display.value += e.key;
});

// Advanced functions
function applyAdvanced(fn) {
    try {
        switch(fn) {
            case "sin": display.value = Math.sin(eval(display.value)); break;
            case "cos": display.value = Math.cos(eval(display.value)); break;
            case "tan": display.value = Math.tan(eval(display.value)); break;
            case "π": display.value += Math.PI; break;
            case "e": display.value += Math.E; break;
            case "√": display.value = Math.sqrt(eval(display.value)); break;
            case "x²": display.value = Math.pow(eval(display.value),2); break;
            case "xʸ": display.value += "**"; break;
            case "log": display.value = Math.log10(eval(display.value)); break;
            case "ln": display.value = Math.log(eval(display.value)); break;
            case "!": display.value = factorial(eval(display.value)); break;
            case "EXP": display.value += "e"; break;
        }
    } catch { display.value = "Error"; }
}

function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0) return 1;
    return n * factorial(n-1);
}

// Load history
loadHistory();

