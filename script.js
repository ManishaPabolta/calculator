






// Body style
document.body.style.margin = "0";
document.body.style.height = "100vh";
document.body.style.background = "black";
document.body.style.display = "flex";
document.body.style.justifyContent = "center";
document.body.style.alignItems = "center";

// Glitter effect
const stars = document.createElement("div");
stars.style.position = "absolute";
stars.style.background = "radial-gradient(white 1px, transparent 1px)";
stars.style.backgroundSize = "10px 10px";
document.body.appendChild(stars);

// Calculator container
const calculator = document.createElement("div");
calculator.style.width = "90%";
calculator.style.maxWidth = "400px";
calculator.style.padding = "20px";
calculator.style.borderRadius = "20px";
calculator.style.background = "#111";
calculator.style.boxShadow = "0 0 15px #00f260, 0 0 25px #0575e6";
calculator.style.display = "flex";
calculator.style.flexDirection = "column";
calculator.style.gap = "20px";

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
display.style.padding = "15px 50px 15px 40px"; 
display.style.fontSize = "1.5rem";
display.style.borderRadius = "10px";
display.style.margin="0 auto";
display.style.border = "none";
display.style.textAlign = "right";
display.style.background = "#222";
display.style.color = "#0f0";
display.style.overflow="hidden";
// display.style.width = "35vh";
display.style.boxShadow = "inset 0 0 10px #0f0";
displayWrapper.appendChild(display);

// History icon
let historyContainers;
let historyData = [];

// Load history from localStorage
function loadHistory() {
    const saved = localStorage.getItem("calcHistory");
    if (saved) {
        const parsed = JSON.parse(saved);
        const oneYearAgo = Date.now() - 365*24*60*60*1000;
        historyData = parsed.filter(item => item.timestamp > oneYearAgo);
        saveHistoryToStorage(); 
    } else {
        historyData = [];
    }
}
function saveHistoryToStorage() {
    localStorage.setItem("calcHistory", JSON.stringify(historyData));
}

// History icon (inside input, left)
const historyIcon = document.createElement("span");
historyIcon.innerHTML = "🔄";
historyIcon.style.position = "absolute";
historyIcon.style.left = "10px";
historyIcon.style.top = "50%";
historyIcon.style.fontSize = "1.2rem";
historyIcon.title = "Show History";
displayWrapper.appendChild(historyIcon);

// History container
const historyContainer = document.createElement("div");
historyContainer.style.position = "absolute";
historyContainer.style.top = "100%";
historyContainer.style.left = "0";
historyContainer.style.width = "100%"; 
historyContainer.style.maxHeight = "200px";
historyContainer.style.background = "#fff";
historyContainer.style.border = "1px solid #ccc";
historyContainer.style.borderRadius = "5px";
historyContainer.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
historyContainer.style.padding = "5px";
historyContainer.style.display = "none";
historyContainer.style.boxSizing = "border-box"; 
historyContainer.style.overflow="hidden";
historyContainer.style.overflowY = "scroll";
displayWrapper.style.position = "relative";
displayWrapper.appendChild(historyContainer);

// Toggle history
historyIcon.addEventListener("click", () => {
    historyContainer.style.display =
        historyContainer.style.display === "none" ? "block" : "none";
    renderHistory();

});

// Render history with timestamp display
function renderHistory() {
    historyContainer.innerHTML = "";
    if (historyData.length === 0) {
        historyContainer.innerHTML = "<p style='margin:0'>No history</p>";
        return;
    }
    historyData.slice().reverse().forEach(item => {
        let entry = document.createElement("div");
        entry.style.padding = "4px";
        entry.style.borderBottom = "1px solid #eee";
        
        // Format date 
        let date = new Date(item.timestamp);
        let dateString = date.toLocaleString();
        
        entry.innerHTML = `${item.expr} = 
<b>${item.result}</b> <small style="color:gray;">(${dateString})</small>`;
        entry.addEventListener("click", () => {
            
display.value = item.result;
            
historyContainer.style.display = "none";
        });
        historyContainer.appendChild(entry);
    });
}

// Save history with timestamp & keep max 20 entries
function saveHistory(expr, result) {
    const now = Date.now();
               historyData.push({ expr, result, timestamp: now });
    if (historyData.length > 20) historyData.shift();

    saveHistoryToStorage();
}

// Button click sound setup
const clickSound = new Audio("https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg");

// Button Layout
const buttonLayout = [
  "C", "DEL", "%", "/",
  "7", "8", "9", "*",
  "4", "5", "6", "-",
  "1", "2", "3", "+",
  "0", ".", "=", "≡"
];

// Buttons Grid
const 
buttonGrid = document.createElement("div");
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
  btn.style.userSelect =    "none";

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
  b   .style.flex = "1 1 calc(25% - 10px)";
  b.style.padding = "10px";
  b.style.background = "#222";
  b.style.color = "#fff";
       b.style.border = "none";
  b.style.borderRadius = "8px";
  b.addEventListener("click", () => {
      playClickSound();
      applyAdvanced(fn);
  });
  advancedPanel.appendChild(b);


});


// Play click sound function (reset sound to start)
function playClickSound() {
                   clickSound.currentTime = 0;
       clickSound.play();


}   

// Handle button clicks
function handleClick(value) {
    if (value === "C") {
        display.value = "";
    } else if (value === "DEL") {
        display.value = display.value.slice(0, -1);
    } 
else if (value === "=") {
        try {
                let expr = display.value.replace(/%/g, "/100");
                          let result = eval(expr);
            saveHistory(display.value, result);display.value = result;
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

// Keyboard input handler for numeric keys only
document.addEventListener("keydown", (e) => {
    const allowedKeys = ["0","1","2","3","4","5","6","7","8","9","+","-","*","/",".","%","Enter","Backspace"];
    
if (allowedKeys.includes(e.key)) {


        playClickSound();
        if (e.key === "Enter") {
            handleClick("=");
        } else if (e.key === "Backspace") {
            handleClick("DEL");
        } else {
            display.value += e.key;
        }
    }
});

// Advanced functions
function applyAdvanced(fn) {
    try {
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
    } catch {
        display.value = "Error";
    }
}

function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0) return 1;
    return n * factorial(n - 1);
}

// Load history from localStorage on page load
loadHistory();
