function setMode(modeId) {
  const modes = ["autoMode", "batteryMode", "performanceMode"];

  modes.forEach(id => {
    const btn = document.getElementById(id);
    const h3 = btn.querySelector("h3");
    const svg = btn.querySelector("svg");

    const isActive = id === modeId;
    btn.style.backgroundColor = isActive ? "#ff4444" : "#f4f4f4";
    if (h3) h3.style.color = isActive ? "white" : "#ff4444";
    if (svg) svg.setAttribute("fill", isActive ? "white" : "#ff4444");
  });
}

function setAutoMode() {
  setMode("autoMode");
}

function setBatteryMode() {
  setMode("batteryMode");
}

function setPerformanceMode() {
  setMode("performanceMode");
}

document.getElementById("disableThermal").checked = true;